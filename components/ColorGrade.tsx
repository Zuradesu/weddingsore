"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { useAudio } from "./AudioProvider";

export default function ColorGrade() {
  const { warmth } = useAudio();
  const { scrollYProgress } = useScroll();
  const [scroll, setScroll] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setScroll(Math.round(v * 10) / 10));
  const w = Math.max(warmth, scroll);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[30] mix-blend-soft-light transition-opacity duration-[4000ms]"
        style={{ opacity: (1 - w) * 0.5, background: "linear-gradient(180deg,#263B4B,#607989)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[31] mix-blend-soft-light transition-opacity duration-[4000ms]"
        style={{ opacity: w * 0.55, background: "radial-gradient(120% 80% at 85% 10%,#E8B99B,#C77F59 55%,transparent 85%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -inset-x-1/4 inset-y-0 z-[32] animate-leak mix-blend-screen transition-opacity duration-[4000ms]"
        style={{ opacity: w * 0.22, background: "radial-gradient(40% 60% at 50% 30%,#E8B99B,transparent 70%)" }}
      />
    </>
  );
}
