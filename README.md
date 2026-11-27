# SORE — A Love Through Time

Cinematic wedding invitation for Ahmad & Fatimah. Next.js 15, TypeScript, Tailwind, Framer Motion, Lucide.

## Run
```
npm install
npm run dev
```

## Edit
- `data/wedding.ts` — names, dates, venues, maps links, gift account, RSVP limits. Replace every `[placeholder]`.
- `data/memories.ts` — captions and dates for Scene 03.
- `data/soundtrack-cues.ts` — music cues (see below).
- `data/assets.ts` — image manifest (file, scene, description).

## Photos
Drop files into `public/images/` using the names in `data/assets.ts`. Until a file exists, a marked placeholder shows. Use real couple photos only; export JPG at ~2000px on the long edge (Next optimizes to AVIF/WebP).

| File | Scene | Content |
|---|---|---|
| 01-opening-window.jpg | 1 | Quiet interior, window light |
| 02-arrival-a.jpg / 02-arrival-b.jpg | 2 | Couple portrait / candid |
| 03-first-meeting, 03-first-conversation, 03-first-memorable-day, 03-growing-together, 03-proposal (.jpg) | 3 | Memory frames |
| 04-sunset-a.jpg / 04-sunset-b.jpg | 4 | Soft-focus sunset couple frames |
| 05-wedding-wide.jpg | 5 | Wide golden-hour wedding photo |
| 06-closing-sunset.jpg | 6 | Couple from behind facing sunset |

## Soundtrack
1. Put your licensed file at `public/audio/terbuang-dalam-waktu.mp3`.
2. Run `npm run audio:probe` (needs ffmpeg/ffprobe). It prints the real duration and a loudness chart per 10s.
3. Set `at` (seconds) on each cue in `data/soundtrack-cues.ts`. Until you do, cues use `fraction` of the real duration as a starting guess.

Each cue's phase drives the colour grade (cool → golden) and volume curve. Audio starts only on "Enter our story" and lives above the scroll, so it never restarts.

## RSVP
`POST /api/rsvp` forwards to `RSVP_WEBHOOK_URL` (e.g. a Google Apps Script web app writing to a Sheet). Without it the form tells the guest nothing was saved. Optional WhatsApp fallback: `rsvp.whatsappFallback` in `data/wedding.ts` (digits only, with country code).

## Dummy photos
`npm run photos:dummy` downloads free-licence Unsplash stock photos into `public/images/` under the expected filenames. It skips any file that already exists, so your real photos are never overwritten. The people in them are strangers: swap in your own photos before sharing the invitation.

## Changing the date
Edit `DATE` at the top of `data/wedding.ts`. The hero text, Save the date calendar, event dates, countdown and calendar files all derive from it.
