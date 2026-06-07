interface AboutLabProps {
  copy: {
    eyebrow: string;
    title: string;
    text: string;
    stackTitle: string;
    processTitle: string;
    stack: readonly string[];
    process: readonly string[];
  };
}

export function AboutLab({ copy }: AboutLabProps) {
  return (
    <section
      className="bg-paper px-[clamp(16px,4vw,56px)] py-12 text-ink sm:py-16"
      id="about-lab"
      aria-labelledby="about-lab-title"
    >
      <div className="mx-auto grid w-full max-w-[1180px] grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(320px,1.1fr)]">
        <div>
          <p className="mb-3 text-xs font-extrabold uppercase tracking-normal text-coral">{copy.eyebrow}</p>
          <h2 className="m-0 text-3xl font-black leading-none tracking-normal sm:text-5xl" id="about-lab-title">
            {copy.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ink/70 sm:text-lg">{copy.text}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-ink/10 bg-white/65 p-5 shadow-lab-soft">
            <h3 className="m-0 text-lg font-black">{copy.stackTitle}</h3>
            <ul className="mt-4 grid list-none grid-cols-2 gap-2 p-0">
              {copy.stack.map((item) => (
                <li className="rounded-lg bg-ink/5 px-3 py-2 text-sm font-black text-ink/75" key={item}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-ink/10 bg-white/65 p-5 shadow-lab-soft">
            <h3 className="m-0 text-lg font-black">{copy.processTitle}</h3>
            <ol className="mt-4 space-y-2 p-0">
              {copy.process.map((item, index) => (
                <li className="flex items-center gap-3 text-sm font-black text-ink/75" key={item}>
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-amber text-xs text-ink">
                    {index + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
