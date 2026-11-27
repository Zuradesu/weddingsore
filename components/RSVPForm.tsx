"use client";

import { Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { wedding } from "@/data/wedding";

type Status = "idle" | "sending" | "sent" | "unconfigured" | "error";

export default function RSVPForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState(1);
  const [wishes, setWishes] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, attending, guests, wishes }),
      });
      const data = (await res.json().catch(() => ({}))) as { saved?: boolean; reason?: string };
      if (res.ok && data.saved) setStatus("sent");
      else if (data.reason === "not_configured") setStatus("unconfigured");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const wa = wedding.rsvp.whatsappFallback
    ? `https://wa.me/${wedding.rsvp.whatsappFallback}?text=${encodeURIComponent(
        `RSVP — ${name}\n${attending === "yes" ? `Attending (${guests} guest${guests > 1 ? "s" : ""})` : "Unable to attend"}\n${wishes}`,
      )}`
    : null;

  if (status === "sent") {
    return (
      <p role="status" className="title-serif text-3xl italic">
        Thank you, {name.split(" ")[0]}. Your reply has been saved.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-8 text-left">
      <label className="block">
        <span className="scene-label">Guest name</span>
        <input required className="field mt-1" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
      </label>

      <fieldset>
        <legend className="scene-label">Will you attend?</legend>
        <div className="mt-3 flex gap-3">
          {(
            [
              ["yes", "Insha’Allah, I’ll attend"],
              ["no", "Unable to attend"],
            ] as const
          ).map(([v, label]) => (
            <label key={v} className={`btn-film flex-1 cursor-pointer text-center !tracking-[0.18em] ${attending === v ? "bg-sun-peach/90 text-sky-deep border-sun-peach" : "border-white/30"}`}>
              <input type="radio" name="attending" value={v} checked={attending === v} onChange={() => setAttending(v)} className="sr-only" />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {attending === "yes" && (
        <label className="block">
          <span className="scene-label">Number of guests</span>
          <select className="field mt-1 [&>option]:text-sky-deep" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
            {Array.from({ length: wedding.rsvp.maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className="block">
        <span className="scene-label">Wishes &amp; prayers (optional)</span>
        <textarea rows={3} maxLength={1000} className="field mt-1 resize-none" value={wishes} onChange={(e) => setWishes(e.target.value)} />
      </label>

      <button type="submit" disabled={status === "sending"} className="btn-film w-full border-white/40 hover:bg-white/10 disabled:opacity-50">
        <Send size={14} /> {status === "sending" ? "Sending" : "Send RSVP"}
      </button>

      {status === "unconfigured" && (
        <p role="alert" className="font-sans text-sm leading-relaxed opacity-90">
          Nothing was saved: RSVP storage isn’t connected yet.{" "}
          {wa ? (
            <a href={wa} className="underline underline-offset-4" target="_blank" rel="noreferrer">
              Send your reply on WhatsApp instead.
            </a>
          ) : (
            "Please reply to the couple directly."
          )}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="font-sans text-sm opacity-90">
          Your reply wasn’t saved. Check your connection and try again.
        </p>
      )}
    </form>
  );
}
