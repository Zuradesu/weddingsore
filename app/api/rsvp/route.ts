import { NextResponse } from "next/server";

/**
 * RSVP integration point.
 * Set RSVP_WEBHOOK_URL (e.g. a Google Apps Script web app that appends to a Sheet,
 * or any endpoint that accepts JSON). Without it, nothing is stored and the API says so.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ saved: false, reason: "invalid_json" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 120);
  const attending = body.attending === "yes" || body.attending === "no" ? body.attending : null;
  const guests = Math.min(10, Math.max(1, Number(body.guests) || 1));
  const wishes = String(body.wishes ?? "").trim().slice(0, 1000);
  if (!name || !attending) return NextResponse.json({ saved: false, reason: "invalid_input" }, { status: 400 });

  const url = process.env.RSVP_WEBHOOK_URL;
  if (!url) return NextResponse.json({ saved: false, reason: "not_configured" }, { status: 501 });

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, attending, guests: attending === "yes" ? guests : 0, wishes, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) return NextResponse.json({ saved: false, reason: "upstream_error" }, { status: 502 });
    return NextResponse.json({ saved: true });
  } catch {
    return NextResponse.json({ saved: false, reason: "upstream_error" }, { status: 502 });
  }
}
