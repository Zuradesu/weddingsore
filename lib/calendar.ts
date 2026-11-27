import type { WeddingEvent } from "@/data/wedding";

const stamp = (iso: string) => new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

export function googleCalendarUrl(e: WeddingEvent) {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Ahmad & Fatimah — ${e.title}`,
    dates: `${stamp(e.start)}/${stamp(e.end)}`,
    location: `${e.venue}, ${e.address}`,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcs(e: WeddingEvent) {
  const body = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Sore Invitation//EN",
    "BEGIN:VEVENT",
    `UID:${e.id}-${stamp(e.start)}@sore-invitation`,
    `DTSTAMP:${stamp(new Date().toISOString())}`,
    `DTSTART:${stamp(e.start)}`,
    `DTEND:${stamp(e.end)}`,
    `SUMMARY:Ahmad & Fatimah — ${e.title}`,
    `LOCATION:${e.venue}, ${e.address}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  const url = URL.createObjectURL(new Blob([body], { type: "text/calendar;charset=utf-8" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${e.id}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

export function mapsHref(e: WeddingEvent, placeholder: (s: string) => boolean) {
  if (e.mapsUrl) return e.mapsUrl;
  if (placeholder(e.venue) || placeholder(e.address)) return null;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${e.venue} ${e.address}`)}`;
}
