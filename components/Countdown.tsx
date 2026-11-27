"use client";

import { useEffect, useState } from "react";

export default function Countdown({ target }: { target: string }) {
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return <div className="h-24" aria-hidden />;
  const diff = new Date(target).getTime() - now;
  if (diff <= 0) return <p className="title-serif text-3xl italic">{diff > -86400000 ? "The day is here." : "Thank you for celebrating with us."}</p>;

  const s = Math.floor(diff / 1000);
  const parts = [
    ["Days", Math.floor(s / 86400)],
    ["Hours", Math.floor((s % 86400) / 3600)],
    ["Minutes", Math.floor((s % 3600) / 60)],
    ["Seconds", s % 60],
  ] as const;

  return (
    <div role="timer" aria-label="Time until the wedding" className="grid grid-cols-4 gap-2 text-center">
      {parts.map(([label, value]) => (
        <div key={label}>
          <p className="title-serif text-4xl tabular-nums md:text-6xl">{String(value).padStart(2, "0")}</p>
          <p className="scene-label mt-2 !text-[0.56rem]">{label}</p>
        </div>
      ))}
    </div>
  );
}
