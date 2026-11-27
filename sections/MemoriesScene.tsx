"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Photo from "@/components/Photo";
import { MaskReveal, Reveal } from "@/components/SceneTransition";
import { memories, type Memory } from "@/data/memories";

const LAYOUTS = [
  { wrap: "md:col-span-7 md:col-start-1", aspect: "aspect-[4/5]", from: "left" as const },
  { wrap: "md:col-span-5 md:col-start-8 md:mt-40", aspect: "aspect-[3/4]", from: "right" as const },
  { wrap: "md:col-span-8 md:col-start-3", aspect: "aspect-[16/10]", from: "bottom" as const },
  { wrap: "md:col-span-5 md:col-start-1 md:mt-20", aspect: "aspect-[1/1]", from: "left" as const },
  { wrap: "md:col-span-6 md:col-start-6", aspect: "aspect-[4/5]", from: "top" as const },
];

function Frame({ m, i }: { m: Memory; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  const layout = LAYOUTS[i % LAYOUTS.length];
  return (
    <figure ref={ref} className={`col-span-12 ${layout.wrap}`}>
      <MaskReveal from={layout.from}>
        <div className={`relative overflow-hidden ${layout.aspect}`}>
          <motion.div className="absolute -inset-[8%]" style={reduce ? undefined : { y }}>
            <Photo src={m.src} alt={m.title} tone={i % 2 ? "sun" : "sky"} className="absolute inset-0" sizes="(min-width:768px) 640px, 100vw" />
          </motion.div>
        </div>
      </MaskReveal>
      <Reveal delay={0.5}>
        <figcaption className="mt-4 flex items-baseline justify-between gap-4 text-sky-deep">
          <span className="title-serif text-2xl italic">{m.title}</span>
          <span className="scene-label whitespace-nowrap">{m.date}</span>
        </figcaption>
        <p className="mt-1 max-w-xs font-sans text-sm leading-relaxed text-sky-deep/75">{m.text}</p>
      </Reveal>
    </figure>
  );
}

export default function MemoriesScene() {
  return (
    <section id="memories" className="relative bg-sun-ivory px-6 py-28 text-sky-deep md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="scene-label">Scene 03 · Our memories</p>
          <h2 className="title-serif mt-6 max-w-lg text-4xl md:text-6xl">Every frame, a day we kept.</h2>
        </Reveal>
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-24 md:mt-32 md:gap-y-32">
          {memories.map((m, i) => (
            <Frame key={m.id} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
