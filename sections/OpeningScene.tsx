"use client";

import { motion } from "framer-motion";
import Photo from "@/components/Photo";
import { useAudio } from "@/components/AudioProvider";
import { assets } from "@/data/assets";

export default function OpeningScene() {
  const { enter, entered } = useAudio();
  return (
    <section id="opening" className="relative flex min-h-svh items-center justify-center overflow-hidden bg-sky-deep px-6 text-center text-sky-paper">
      <div className="absolute inset-0 animate-drift will-change-transform">
        <Photo src={assets.openingWindow.src} alt="A quiet bedroom in blue morning light" tone="sky" className="absolute inset-0" priority />
        <div
          aria-hidden
          className="absolute -right-[10%] top-[8%] h-[70%] w-[55%] opacity-60 blur-2xl"
          style={{ background: "linear-gradient(200deg,rgba(229,232,230,.55),rgba(229,232,230,0) 70%)", clipPath: "polygon(30% 0,100% 0,70% 100%,0 85%)" }}
        />
      </div>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-sky-deep/70 via-sky-deep/30 to-sky-deep/80" />

      <motion.div className="relative z-10 max-w-xl" animate={{ opacity: entered ? 0 : 1 }} transition={{ duration: 1.1 }}>
        <motion.p initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 2.4, delay: 2.4 }} className="title-serif text-4xl italic md:text-6xl">
          Somewhere in time...
        </motion.p>
        <motion.p initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 0.9, filter: "blur(0px)" }} transition={{ duration: 2.4, delay: 5 }} className="title-serif mt-8 text-xl md:text-3xl">
          Before we met, there were already countless moments waiting to happen.
        </motion.p>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2, delay: 7.4 }} className="mt-14">
          <button onClick={enter} disabled={entered} className="btn-film border-sky-paper/60 hover:bg-sky-paper hover:text-sky-deep">
            Enter our story
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
