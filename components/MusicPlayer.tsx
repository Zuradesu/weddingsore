"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useAudio } from "./AudioProvider";

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

export default function MusicPlayer() {
  const { entered, playing, muted, time, duration, unavailable, toggle, toggleMute, seek } = useAudio();
  const progress = duration > 0 ? time / duration : 0;

  return (
    <AnimatePresence>
      {entered && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="fixed bottom-4 left-4 right-4 z-[75] flex items-center gap-3 rounded-full border border-white/15 bg-sky-deep/70 px-4 py-2 text-sky-paper backdrop-blur-md sm:left-auto sm:w-72"
        >
          {unavailable ? (
            <p className="py-1 font-sans text-[0.68rem] leading-snug opacity-80">Add terbuang-dalam-waktu.mp3 to /public/audio to hear the score.</p>
          ) : (
            <>
              <button onClick={toggle} aria-label={playing ? "Pause music" : "Play music"} className="shrink-0 p-1 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2">
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <div className="flex h-4 items-end gap-[2px]" aria-hidden>
                {[0, 0.25, 0.5, 0.75].map((d) => (
                  <span key={d} className={`block h-full w-[2px] origin-bottom bg-sun-peach ${playing ? "animate-eq" : "scale-y-[0.3]"}`} style={{ animationDelay: `${d}s` }} />
                ))}
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <input
                  type="range"
                  min={0}
                  max={1000}
                  value={Math.round(progress * 1000)}
                  onChange={(e) => seek(Number(e.target.value) / 1000)}
                  aria-label="Playback position"
                  className="h-1 w-full cursor-pointer accent-[#E8B99B]"
                />
                <span className="font-sans text-[0.6rem] tabular-nums opacity-60">
                  {fmt(time)} / {duration ? fmt(duration) : "--:--"}
                </span>
              </div>
              <button onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"} className="shrink-0 p-1 transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2">
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
