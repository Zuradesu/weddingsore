"use client";

import Image from "next/image";
import { useState } from "react";

const TONES = {
  sky: "linear-gradient(160deg,#263B4B 0%,#607989 60%,#87949A 100%)",
  sun: "linear-gradient(160deg,#E8B99B 0%,#D6A477 55%,#C77F59 100%)",
  dusk: "linear-gradient(180deg,#607989 0%,#D6A477 70%,#C77F59 100%)",
} as const;

type Props = {
  src?: string;
  alt: string;
  tone?: keyof typeof TONES;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
};

export default function Photo({ src, alt, tone = "sky", className = "", imgClassName = "", priority, sizes = "100vw" }: Props) {
  const [failed, setFailed] = useState(false);
  const file = src?.split("/").pop();
  const position = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";
  return (
    <div className={`${position} overflow-hidden ${className}`}>
      {src && !failed ? (
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} onError={() => setFailed(true)} className={`object-cover ${imgClassName}`} />
      ) : (
        <div role="img" aria-label={`${alt} (placeholder)`} className="absolute inset-0 flex items-end p-3" style={{ background: TONES[tone] }}>
          <span className="font-sans text-[0.58rem] uppercase tracking-[0.22em] text-white/70">Placeholder · {file ?? "photo"}</span>
        </div>
      )}
    </div>
  );
}
