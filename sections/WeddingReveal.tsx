"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { CalendarPlus, Download, MapPin } from "lucide-react";
import { useRef } from "react";
import Countdown from "@/components/Countdown";
import MonthCalendar from "@/components/MonthCalendar";
import Photo from "@/components/Photo";
import { MaskReveal, Reveal } from "@/components/SceneTransition";
import { assets } from "@/data/assets";
import { isPlaceholder, wedding, type WeddingEvent } from "@/data/wedding";
import { downloadIcs, googleCalendarUrl, mapsHref } from "@/lib/calendar";

function EventRow({ e }: { e: WeddingEvent }) {
  const maps = mapsHref(e, isPlaceholder);
  const btn = "btn-film border-sky-deep/40 hover:bg-sky-deep hover:text-sun-ivory !px-4 !py-2.5 !tracking-[0.2em]";
  return (
    <Reveal className="grid gap-6 border-t border-sky-deep/25 py-12 md:grid-cols-12">
      <div className="md:col-span-5">
        <h3 className="title-serif text-4xl md:text-5xl">{e.title}</h3>
      </div>
      <div className="md:col-span-7">
        <p className="font-sans text-base">{e.dateText}</p>
        <p className="scene-label mt-2 !opacity-90">{e.timeText}</p>
        <p className="title-serif mt-6 text-2xl">{e.venue}</p>
        <p className="mt-1 max-w-sm font-sans text-sm leading-relaxed opacity-75">{e.address}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {maps ? (
            <a href={maps} target="_blank" rel="noreferrer" className={btn}>
              <MapPin size={14} /> Location
            </a>
          ) : (
            <span aria-disabled className={`${btn} cursor-not-allowed opacity-40`} title="Add the venue in data/wedding.ts">
              <MapPin size={14} /> Location
            </span>
          )}
          <a href={googleCalendarUrl(e)} target="_blank" rel="noreferrer" className={btn}>
            <CalendarPlus size={14} /> Add to calendar
          </a>
          <button onClick={() => downloadIcs(e)} className={btn}>
            <Download size={14} /> .ics
          </button>
        </div>
      </div>
    </Reveal>
  );
}

export default function WeddingReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.02, reduce ? 1.02 : 1.18]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-12%"]);

  return (
    <section id="wedding" className="relative bg-sun-ivory text-sky-deep">
      <div ref={ref} className="relative h-svh overflow-hidden text-sun-ivory">
        <MaskReveal from="bottom" className="absolute inset-0">
          <motion.div className="absolute inset-0" style={{ scale }}>
            <Photo src={assets.weddingWide.src} alt="Ahmad and Fatimah on their wedding day in golden light" tone="sun" className="absolute inset-0" />
          </motion.div>
        </MaskReveal>
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-[#7a4a33]/80 via-transparent to-sky-deep/30" />
        <motion.div style={{ y: textY }} className="absolute inset-x-0 bottom-0 z-10 px-6 pb-20 text-center md:pb-28">
          <Reveal delay={1.2}>
            <p className="scene-label">Scene 05 · The day we choose</p>
            <h2 className="title-serif mt-6 text-3xl uppercase tracking-[0.12em] md:text-5xl">And now, our next chapter begins.</h2>
            <p className="title-serif mt-8 text-5xl md:text-7xl">
              {wedding.groom} &amp; {wedding.bride}
            </p>
            <p className="scene-label mt-6 !opacity-90">{wedding.dateLong}</p>
          </Reveal>
        </motion.div>
      </div>

      <div className="mx-auto max-w-4xl px-6 pt-28 md:pt-40">
        <Reveal className="text-center">
          <p className="scene-label">Save the date</p>
          <MonthCalendar date={wedding.date} />
          <p className="title-serif mt-10 text-3xl md:text-4xl">{wedding.dateShort}</p>
        </Reveal>
      </div>
      <div className="mx-auto max-w-4xl px-6 py-28 md:py-40">
        <Reveal>
          <p className="scene-label">Akad &amp; Reception</p>
          <h2 className="title-serif mt-4 text-4xl md:text-5xl">Schedule of events</h2>
        </Reveal>
        <div className="mt-10">
          {wedding.events.map((e) => (
            <EventRow key={e.id} e={e} />
          ))}
        </div>
        <Reveal className="mt-20 border-t border-sky-deep/25 pt-16 text-center">
          <p className="scene-label mb-8">Until the day</p>
          <Countdown target={wedding.events[0].start} />
        </Reveal>
      </div>
    </section>
  );
}
