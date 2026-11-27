"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.65, 0, 0.35, 1] as const;

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 1.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

const MASKS = {
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
  top: "inset(0 0 100% 0)",
  bottom: "inset(100% 0 0 0)",
} as const;

export function MaskReveal({
  children,
  className,
  from = "left",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  from?: keyof typeof MASKS;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { clipPath: MASKS[from] }}
      whileInView={{ clipPath: "inset(0 0% 0% 0)" }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 2, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Soft bridge between two scenes with different grades. */
export default function SceneTransition({ from, to, height = "36svh" }: { from: string; to: string; height?: string }) {
  return <div aria-hidden style={{ height, background: `linear-gradient(180deg, ${from}, ${to})` }} />;
}
