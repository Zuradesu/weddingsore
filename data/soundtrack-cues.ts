export type Phase = "opening" | "early" | "build" | "peak" | "closing";

export type Cue = {
  id: string;
  phase: Phase;
  /** Position as a share of the real track length (0–1). Used when `at` is not set. */
  fraction: number;
  /** Exact second mark. Overrides `fraction`. Fill these after running `npm run audio:probe`. */
  at?: number;
  note: string;
};

export const cues: Cue[] = [
  { id: "opening", phase: "opening", fraction: 0, note: "Restrained and reflective. Cool blue-grey grade." },
  { id: "early", phase: "early", fraction: 0.12, note: "Memories begin appearing. Warmth starts to creep in." },
  { id: "build", phase: "build", fraction: 0.38, note: "Emotional build-up. Photographs become more intense." },
  { id: "peak", phase: "peak", fraction: 0.62, note: "Main emotional peak. Most meaningful moments." },
  { id: "closing", phase: "closing", fraction: 0.82, note: "Closing passage. Full golden hour." },
];

export const phaseWarmth: Record<Phase, number> = { opening: 0, early: 0.25, build: 0.5, peak: 0.8, closing: 1 };
export const phaseVolume: Record<Phase, number> = { opening: 0.55, early: 0.7, build: 0.85, peak: 1, closing: 0.9 };

export function resolveCues(duration: number) {
  const usable = Number.isFinite(duration) && duration > 0;
  return cues
    .filter((c) => c.at !== undefined || usable)
    .map((c) => ({ ...c, time: c.at ?? c.fraction * duration }))
    .sort((a, b) => a.time - b.time);
}

export function phaseAt(duration: number, time: number): Phase {
  let current: Phase = "opening";
  for (const c of resolveCues(duration)) if (time >= c.time) current = c.phase;
  return current;
}
