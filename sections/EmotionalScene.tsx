"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Photo from "@/components/Photo";
import { assets } from "@/data/assets";

export default function EmotionalScene() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const zoomA = useTransform(p, [0, 1], [1, reduce ? 1 : 1.14]);
  const zoomB = useTransform(p, [0.4, 1], [1.12, 1]);
  const opacityB = useTransform(p, [0.42, 0.62], [0, 1]);
  const bg = useTransform(p, [0, 0.5, 1], ["#263B4B", "#8a6a5f", "#C77F59"]);

  const o1 = useTransform(p, [0.06, 0.18, 0.4, 0.5], [0, 1, 1, 0]);
  const b1 = useTransform(p, [0.06, 0.18, 0.4, 0.5], ["blur(10px)", "blur(0px)", "blur(0px)", "blur(8px)"]);
  const o2 = useTransform(p, [0.58, 0.72, 0.96, 1], [0, 1, 1, 1]);
  const b2 = useTransform(p, [0.58, 0.72], ["blur(10px)", "blur(0px)"]);

  return (
    <section ref={ref} id="emotional" className="relative h-[320svh]">
      <motion.div className="sticky top-0 h-svh overflow-hidden text-sky-paper" style={{ backgroundColor: bg }}>
        <motion.div className="absolute inset-0" style={{ scale: zoomA }}>
          <Photo src={assets.sunsetA.src} alt="Ahmad and Fatimah at sunset, soft focus" tone="dusk" className="absolute inset-0 opacity-80" />
        </motion.div>
        <motion.div className="absolute inset-0" style={{ opacity: opacityB, scale: zoomB }}>
          <Photo src={assets.sunsetB.src} alt="Ahmad and Fatimah in the last light of the day" tone="sun" className="absolute inset-0" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-sky-deep/70 via-sky-deep/25 to-sky-deep/50" />

        <p className="scene-label absolute left-6 top-8 z-10">Scene 04 · If time could speak</p>

        <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
          <motion.p style={{ opacity: o1, filter: b1 }} className="title-serif absolute max-w-2xl px-6 text-2xl italic md:text-5xl md:leading-[1.2]">
            Time moves forward, memories stay behind, but somehow, every road keeps bringing us back to each other.
          </motion.p>
          <motion.p style={{ opacity: o2, filter: b2 }} className="title-serif absolute max-w-2xl px-6 text-3xl md:text-6xl md:leading-[1.15]">
            If I could choose again, I would still choose you.
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
