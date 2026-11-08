import { after, beforeEach, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const temp = mkdtempSync(join(tmpdir(), "vgl-audio-"));
for (const name of ["playlist", "ClubAudioEngine"]) {
  const source = readFileSync(
    new URL(`../src/features/audio/${name}.ts`, import.meta.url),
    "utf8",
  );
  writeFileSync(
    join(temp, `${name}.mjs`),
    ts
      .transpileModule(source, {
        compilerOptions: {
          target: ts.ScriptTarget.ES2022,
          module: ts.ModuleKind.ES2022,
        },
      })
      .outputText.replace('"./playlist"', '"./playlist.mjs"'),
  );
}
const { ClubAudioEngine } = await import(
  pathToFileURL(join(temp, "ClubAudioEngine.mjs"))
);
after(() => rmSync(temp, { recursive: true }));

let timer;
class Param {
  calls = [];
  setValueAtTime(...args) {
    this.calls.push(["set", ...args]);
  }
  setValueCurveAtTime(...args) {
    this.calls.push(["curve", ...args]);
  }
  setTargetAtTime(...args) {
    this.calls.push(["target", ...args]);
  }
}
class Node {
  gain = new Param();
  connect(target) {
    this.output = target;
  }
  disconnect() {
    this.disconnected = true;
  }
  start(time) {
    this.startTime = time;
  }
  stop() {
    this.stopped = true;
  }
}
class Context {
  currentTime = 0;
  state = "suspended";
  destination = {};
  sources = [];
  gains = [];
  createAnalyser() {
    return new Node();
  }
  createGain() {
    const gain = new Node();
    this.gains.push(gain);
    return gain;
  }
  createBufferSource() {
    const source = new Node();
    this.sources.push(source);
    return source;
  }
  async decodeAudioData() {
    return { duration: 90 };
  }
  async resume() {
    this.state = "running";
  }
  async suspend() {
    this.state = "suspended";
  }
  async close() {
    this.state = "closed";
  }
}
beforeEach((t) => {
  timer = undefined;
  t.mock.method(globalThis, "setInterval", (callback) => {
    timer = callback;
    return 1;
  });
  t.mock.method(globalThis, "clearInterval", () => {});
  t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    arrayBuffer: async () => new ArrayBuffer(8),
  }));
  globalThis.AudioContext = Context;
});
after(() => {
  delete globalThis.AudioContext;
});

test("audio is not loaded or started until play; start reports the first track", async (t) => {
  const reports = [];
  const engine = new ClubAudioEngine((index) => reports.push(index));
  assert.equal(fetch.mock.calls.length, 0);
  assert.equal(engine.context.sources.length, 0);
  assert.equal(await engine.play(), true);
  assert.equal(fetch.mock.calls.length, 2);
  assert.equal(engine.context.sources.length, 1);
  assert.deepEqual(reports, [0]);
  engine.dispose();
});

test("tracks overlap for six seconds and repeat first → second → first", async () => {
  const reports = [];
  const engine = new ClubAudioEngine((index) => reports.push(index));
  await engine.play();
  engine.context.currentTime = 75;
  timer();
  assert.equal(engine.context.sources.length, 2);
  assert.ok(Math.abs(engine.context.sources[1].startTime - 84.05) < 0.001);
  engine.context.currentTime = 85;
  timer();
  assert.deepEqual(reports, [0, 1]);
  engine.context.currentTime = 160;
  timer();
  assert.equal(engine.context.sources.length, 3);
  assert.ok(Math.abs(engine.context.sources[2].startTime - 168.05) < 0.001);
  engine.context.currentTime = 169;
  timer();
  assert.deepEqual(reports, [0, 1, 0]);
  engine.dispose();
});

test("equal-power fade envelopes have continuous endpoints and no power dip", async () => {
  const engine = new ClubAudioEngine(() => {});
  await engine.play();
  engine.context.currentTime = 75;
  timer();
  const outgoing = engine.context.sources[0].output.gain.calls.filter(
    ([kind]) => kind === "curve",
  )[1];
  const incoming = engine.context.sources[1].output.gain.calls.find(
    ([kind]) => kind === "curve",
  );
  assert.equal(incoming[2], outgoing[2]);
  assert.equal(incoming[3], 6);
  assert.equal(outgoing[3], 6);
  assert.equal(incoming[1][0], 0);
  assert.equal(incoming[1].at(-1), 1);
  assert.equal(outgoing[1][0], 1);
  assert.equal(outgoing[1].at(-1), 0);
  for (let i = 0; i < 64; i++)
    assert.ok(
      Math.abs(incoming[1][i] ** 2 + outgoing[1][i] ** 2 - 1) < 0.000001,
    );
  engine.dispose();
});

test("pause/resume preserves position and scheduled sources; mute covers the entire mix", async () => {
  const engine = new ClubAudioEngine(() => {});
  await engine.play();
  engine.context.currentTime = 85;
  timer();
  engine.pause();
  assert.equal(engine.context.state, "suspended");
  const count = engine.context.sources.length;
  await engine.play();
  assert.equal(engine.context.state, "running");
  assert.equal(engine.context.sources.length, count);
  engine.setVolume(0);
  assert.equal(engine.context.gains[0].gain.calls.at(-1)[1], 0);
  engine.setVolume(2);
  assert.equal(engine.context.gains[0].gain.calls.at(-1)[1], 1);
  engine.dispose();
  assert.equal(engine.context.state, "closed");
  assert.ok(engine.context.sources.every((source) => source.stopped));
});

test("hiding the page during loading does not start audio after the download finishes", async (t) => {
  const pending = [];
  t.mock.method(
    globalThis,
    "fetch",
    () => new Promise((resolve) => pending.push(resolve)),
  );
  const engine = new ClubAudioEngine(() => {});
  const playing = engine.play();
  engine.pause();
  pending.forEach((resolve) =>
    resolve({ ok: true, arrayBuffer: async () => new ArrayBuffer(8) }),
  );
  assert.equal(await playing, false);
  assert.equal(engine.context.sources.length, 0);
  assert.equal(engine.context.state, "suspended");
  engine.dispose();
});

test("a failed download can be retried without a stuck loading state", async (t) => {
  const engine = new ClubAudioEngine(() => {});
  t.mock.method(globalThis, "fetch", async () => ({ ok: false, status: 503 }));
  await assert.rejects(engine.play(), /503/);
  assert.equal(engine.context.state, "suspended");
  t.mock.method(globalThis, "fetch", async () => ({
    ok: true,
    arrayBuffer: async () => new ArrayBuffer(8),
  }));
  assert.equal(await engine.play(), true);
  engine.dispose();
});
