"use client";

import Photo from "@/components/Photo";
import { MaskReveal, Reveal } from "@/components/SceneTransition";
import { assets } from "@/data/assets";
import { wedding } from "@/data/wedding";

export default function ArrivalScene() {
  return (
    <section id="arrival" className="relative overflow-hidden px-6 pb-32 pt-32 md:pb-48 md:pt-48" style={{ background: "linear-gradient(180deg,#263B4B 0%,#607989 28%,#87949A 45%,#E8B99B 70%,#F1E9D9 90%)" }}>
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <p className="scene-label text-sky-paper">Scene 02 · The arrival</p>
        </Reveal>
        <Reveal delay={0.4} className="mt-10 max-w-2xl">
          <p className="title-serif text-3xl italic text-sky-paper md:text-5xl">Perhaps we were always meant to find each other.</p>
        </Reveal>

        <div className="mt-20 grid grid-cols-12 gap-4 md:mt-32">
          <MaskReveal from="left" className="col-span-8 md:col-span-7">
            <Photo src={assets.arrivalA.src} alt="Ahmad and Fatimah in warm light" tone="dusk" className="aspect-[4/5] w-full" sizes="(min-width:768px) 560px, 70vw" />
          </MaskReveal>
          <MaskReveal from="bottom" delay={0.6} className="col-span-4 mt-24 md:col-span-4 md:col-start-9 md:mt-48">
            <Photo src={assets.arrivalB.src} alt="A candid moment between Ahmad and Fatimah" tone="sun" className="aspect-[3/4] w-full" sizes="(min-width:768px) 360px, 35vw" />
          </MaskReveal>
        </div>

        <Reveal className="mt-28 text-center text-sky-deep md:mt-40">
          <p className="scene-label mb-8 !opacity-80">The wedding of</p>
          <h2 className="title-serif text-6xl tracking-[0.12em] md:text-8xl">{wedding.groom.toUpperCase()}</h2>
          <p className="title-serif my-2 text-4xl italic text-sun-orange md:text-5xl">&amp;</p>
          <h2 className="title-serif text-6xl tracking-[0.12em] md:text-8xl">{wedding.bride.toUpperCase()}</h2>
          <p className="scene-label mt-10 !opacity-80">{wedding.dateLong}</p>
          <p className="title-serif mt-6 text-xl italic">{wedding.content.tagline}</p>
        </Reveal>
      </div>
    </section>
  );
}
