import { CROSSFADE_SECONDS, playlist } from "./playlist";

type ScheduledTrack = { index: number; start: number; end: number };

/** Audio-clock scheduling keeps both fades aligned, independently of rendering. */
export class ClubAudioEngine {
  readonly context = new AudioContext();
  readonly analyser = this.context.createAnalyser();
  private master = this.context.createGain();
  private buffers: AudioBuffer[] = [];
  private loading?: Promise<void>;
  private abort = new AbortController();
  private timer?: ReturnType<typeof setInterval>;
  private queue: ScheduledTrack[] = [];
  private sources = new Set<AudioBufferSourceNode>();
  private wanted = false;
  private disposed = false;
  private reportedIndex = -1;

  constructor(private reportTrack: (index: number) => void) {
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.82;
    this.master.connect(this.analyser);
    this.analyser.connect(this.context.destination);
  }

  setVolume(volume: number) {
    this.master.gain.setTargetAtTime(
      Math.max(0, Math.min(1, volume)),
      this.context.currentTime,
      0.06,
    );
  }

  async play() {
    this.wanted = true;
    // Unlock the audio context directly inside the user's click gesture.
    const resume = this.context.resume();
    if (!this.loading) {
      this.loading = Promise.all(
        playlist.map(async ({ src }) => {
          const response = await fetch(src, { signal: this.abort.signal });
          if (!response.ok) throw new Error(`Audio HTTP ${response.status}`);
          return this.context.decodeAudioData(await response.arrayBuffer());
        }),
      )
        .then((buffers) => {
          this.buffers = buffers;
        })
        .catch((error) => {
          this.loading = undefined;
          throw error;
        });
    }
    try {
      await Promise.all([resume, this.loading]);
      if (!this.wanted || this.disposed) return false;
      await this.context.resume();
      if (!this.queue.length)
        this.schedule(0, this.context.currentTime + 0.05, true);
      this.tick();
      clearInterval(this.timer);
      this.timer = setInterval(() => this.tick(), 250);
      return true;
    } catch (error) {
      this.pause();
      throw error;
    }
  }

  pause() {
    this.wanted = false;
    clearInterval(this.timer);
    if (this.context.state !== "closed")
      void this.context.suspend().catch(() => {});
  }

  private schedule(index: number, start: number, first = false) {
    const source = this.context.createBufferSource();
    const envelope = this.context.createGain();
    const buffer = this.buffers[index];
    source.buffer = buffer;
    source.connect(envelope);
    envelope.connect(this.master);
    const fade = Math.min(CROSSFADE_SECONDS, buffer.duration / 3);
    const fadeIn = first ? 1.2 : fade;
    // Equal-power crossfade avoids a dip in perceived volume between tracks.
    const incoming = Float32Array.from({ length: 64 }, (_, i) =>
      Math.sin(((i / 63) * Math.PI) / 2),
    );
    const outgoing = Float32Array.from(
      incoming,
      (_, i) => incoming[63 - i],
    );
    envelope.gain.setValueAtTime(0, start);
    envelope.gain.setValueCurveAtTime(incoming, start, fadeIn);
    envelope.gain.setValueAtTime(1, start + buffer.duration - fade);
    envelope.gain.setValueCurveAtTime(
      outgoing,
      start + buffer.duration - fade,
      fade,
    );
    source.start(start);
    this.sources.add(source);
    source.onended = () => {
      this.sources.delete(source);
      source.disconnect();
      envelope.disconnect();
    };
    this.queue.push({ index, start, end: start + buffer.duration });
  }

  private tick() {
    const now = this.context.currentTime;
    this.queue = this.queue.filter((item) => item.end > now);
    // If a browser suspended timers for a long time, recover without a dead player.
    if (!this.queue.length)
      this.schedule(
        (this.reportedIndex + 1) % playlist.length,
        now + 0.05,
        true,
      );
    const last = this.queue[this.queue.length - 1];
    const nextStart =
      last.end -
      Math.min(CROSSFADE_SECONDS, this.buffers[last.index].duration / 3);
    if (nextStart - now <= 10)
      this.schedule(
        (last.index + 1) % playlist.length,
        Math.max(now + 0.01, nextStart),
      );
    const audible =
      [...this.queue].reverse().find((item) => item.start <= now) ??
      this.queue[0];
    if (audible.index !== this.reportedIndex) {
      this.reportedIndex = audible.index;
      this.reportTrack(audible.index);
    }
  }

  dispose() {
    this.disposed = true;
    this.pause();
    this.abort.abort();
    this.sources.forEach((source) => {
      source.onended = null;
      source.stop();
      source.disconnect();
    });
    this.sources.clear();
    void this.context.close().catch(() => {});
  }
}
