import { Reveal } from "@/components/SceneTransition";
import { wedding } from "@/data/wedding";

export default function BlessingScene() {
  const { verse, blessing } = wedding.content;
  return (
    <section id="blessing" className="bg-sun-ivory px-6 pb-28 pt-12 text-sky-deep md:pb-44">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p lang="ar" dir="rtl" className="font-arabic text-3xl leading-[2.2] md:text-4xl md:leading-[2.2]">
            {verse.arabic}
          </p>
        </Reveal>
        <Reveal delay={0.5} className="mt-10">
          <p className="title-serif text-xl italic md:text-2xl md:leading-relaxed">“{verse.translation}”</p>
          <p className="scene-label mt-6">{verse.source}</p>
        </Reveal>
        <div aria-hidden className="mx-auto my-24 h-px w-16 bg-sky-deep/30" />
        <Reveal>
          <h2 className="title-serif text-3xl md:text-5xl">{blessing.salam}</h2>
          <p className="mx-auto mt-8 max-w-md font-sans text-base leading-relaxed text-sky-deep/80">{blessing.prayer}</p>
        </Reveal>
      </div>
    </section>
  );
}
