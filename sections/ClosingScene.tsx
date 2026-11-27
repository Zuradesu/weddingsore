"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useRef, useState } from "react";
import Photo from "@/components/Photo";
import RSVPForm from "@/components/RSVPForm";
import { Reveal } from "@/components/SceneTransition";
import { assets } from "@/data/assets";
import { isPlaceholder, wedding } from "@/data/wedding";

function Gift() {
  const [copied, setCopied] = useState(false);
  const { bank, accountNumber, accountName } = wedding.gift;
  const ready = !isPlaceholder(accountNumber);
  async function copy() {
    try {
      await navigator.clipboard.writeText(accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  }
  return (
    <div className="border-t border-white/20 pt-10 text-center">
      <p className="scene-label">Digital gift</p>
      <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed opacity-80">Your presence is the greatest gift. If you wish to send a token of love, you may do so here.</p>
      <p className="title-serif mt-6 text-2xl">{bank}</p>
      <p className="title-serif mt-1 text-3xl tabular-nums tracking-wider">{accountNumber}</p>
      <p className="mt-1 font-sans text-sm opacity-75">{accountName}</p>
      <button onClick={copy} disabled={!ready} className="btn-film mt-6 border-white/40 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40">
        {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? "Copied" : "Copy account number"}
      </button>
    </div>
  );
}

export default function ClosingScene() {
  const stage = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: stage, offset: ["start start", "end end"] });
  const scale = useTransform(p, [0, 1], [reduce ? 1 : 1.4, 1]);
  const o1 = useTransform(p, [0.15, 0.3, 0.5, 0.58], [0, 1, 1, 0]);
  const o2 = useTransform(p, [0.6, 0.75, 1], [0, 1, 1]);

  return (
    <section id="closing" className="relative bg-sky-deep text-sky-paper">
      <div ref={stage} className="relative h-[240svh]">
        <div className="sticky top-0 h-svh overflow-hidden">
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Photo src={assets.closingSunset.src} alt="Ahmad and Fatimah from behind, facing the sunset" tone="dusk" className="absolute inset-0" />
          </motion.div>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-sky-deep/80 via-sky-deep/20 to-sky-deep/40" />
          <p className="scene-label absolute left-6 top-8 z-10">Scene 06 · Our story continues</p>
          <div className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center">
            <motion.p style={{ opacity: o1 }} className="title-serif absolute max-w-xl px-6 text-4xl italic md:text-6xl">
              Every moment brought us here.
            </motion.p>
            <motion.p style={{ opacity: o2 }} className="title-serif absolute max-w-xl px-6 text-2xl md:text-4xl md:leading-snug">
              We would be grateful if you could celebrate the beginning of our forever.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-xl space-y-24 px-6 py-28 md:py-40">
        <Reveal>
          <p className="scene-label">RSVP</p>
          <h2 className="title-serif mb-10 mt-4 text-4xl md:text-5xl">Confirm your attendance</h2>
          <RSVPForm />
        </Reveal>
        {wedding.gift.enabled && (
          <Reveal>
            <Gift />
          </Reveal>
        )}
        <Reveal className="text-center">
          <h2 className="title-serif text-4xl md:text-5xl">Thank you</h2>
          <p className="mx-auto mt-6 max-w-sm font-sans text-base leading-relaxed opacity-85">{wedding.content.thanks}</p>
        </Reveal>
      </div>

      <div className="flex min-h-svh flex-col items-center justify-center px-6 text-center">
        <Reveal>
          <p className="title-serif text-4xl italic tracking-wide md:text-7xl">To be continued...</p>
          <p className="title-serif mt-14 text-2xl uppercase tracking-[0.3em] md:text-3xl">
            {wedding.groom} &amp; {wedding.bride}
          </p>
          <p className="scene-label mt-6">{wedding.dateShort}</p>
        </Reveal>
      </div>
    </section>
  );
}
