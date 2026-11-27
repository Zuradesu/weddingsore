"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { wedding } from "@/data/wedding";
import { phaseAt, phaseVolume, phaseWarmth, type Phase } from "@/data/soundtrack-cues";

type AudioCtx = {
  entered: boolean;
  enter: () => void;
  playing: boolean;
  muted: boolean;
  time: number;
  duration: number;
  phase: Phase;
  warmth: number;
  unavailable: boolean;
  toggle: () => void;
  toggleMute: () => void;
  seek: (fraction: number) => void;
};

const Ctx = createContext<AudioCtx | null>(null);

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudio must be used inside AudioProvider");
  return ctx;
}

function animateScrollTo(target: number, duration: number) {
  const start = window.scrollY;
  const delta = target - start;
  const t0 = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    const p = Math.min(1, (now - t0) / duration);
    window.scrollTo(0, start + delta * ease(p));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

export default function AudioProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLAudioElement>(null);
  const [entered, setEntered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = entered ? "" : "hidden";
  }, [entered]);

  const phase = useMemo(() => phaseAt(duration, time), [duration, time]);
  const warmth = phaseWarmth[phase];

  useEffect(() => {
    const a = ref.current;
    if (!a || !playing) return;
    const target = phaseVolume[phase];
    const id = setInterval(() => {
      const d = target - a.volume;
      a.volume = Math.abs(d) < 0.01 ? target : Math.min(1, Math.max(0, a.volume + d * 0.08));
    }, 80);
    return () => clearInterval(id);
  }, [phase, playing]);

  const play = useCallback(() => {
    const a = ref.current;
    if (!a) return;
    a.volume = 0;
    a.play().catch(() => setUnavailable(true));
  }, []);

  const enter = useCallback(() => {
    if (entered) return;
    setEntered(true);
    play();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setTimeout(() => {
      const el = document.getElementById("arrival");
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (reduce) window.scrollTo(0, top);
      else animateScrollTo(top, 2600);
    }, 1100);
  }, [entered, play]);

  const toggle = useCallback(() => {
    const a = ref.current;
    if (!a) return;
    if (a.paused) play();
    else a.pause();
  }, [play]);

  const toggleMute = useCallback(() => {
    const a = ref.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  }, []);

  const seek = useCallback((fraction: number) => {
    const a = ref.current;
    if (!a || !Number.isFinite(a.duration)) return;
    a.currentTime = Math.min(1, Math.max(0, fraction)) * a.duration;
  }, []);

  const value: AudioCtx = { entered, enter, playing, muted, time, duration, phase, warmth, unavailable, toggle, toggleMute, seek };

  return (
    <Ctx.Provider value={value}>
      <audio
        ref={ref}
        src={wedding.audio.src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        onError={() => setUnavailable(true)}
      />
      {children}
    </Ctx.Provider>
  );
}
