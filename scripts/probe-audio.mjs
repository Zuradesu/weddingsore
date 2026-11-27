import { execFileSync } from "node:child_process";
import { existsSync } from "node:fs";

const file = process.argv[2] ?? "public/audio/terbuang-dalam-waktu.mp3";
if (!existsSync(file)) {
  console.error(`Not found: ${file}\nPut your licensed MP3 there, or pass a path: npm run audio:probe -- path/to/file.mp3`);
  process.exit(1);
}

const duration = parseFloat(execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file]).toString());
const raw = execFileSync(
  "ffmpeg",
  ["-v", "error", "-i", file, "-af", "aresample=8000,astats=metadata=1:reset=1:length=1,ametadata=print:key=lavfi.astats.Overall.RMS_level:file=-", "-f", "null", "-"],
  { maxBuffer: 64 * 1024 * 1024 },
).toString();

const points = [];
let t = 0;
for (const line of raw.split("\n")) {
  const pts = line.match(/pts_time:([\d.]+)/);
  if (pts) t = parseFloat(pts[1]);
  const lvl = line.match(/RMS_level=(-?[\d.]+|-inf)/);
  if (lvl && lvl[1] !== "-inf") points.push([t, parseFloat(lvl[1])]);
}

const win = 10;
const buckets = new Map();
for (const [time, db] of points) {
  const k = Math.floor(time / win);
  (buckets.get(k) ?? buckets.set(k, []).get(k)).push(db);
}
const rows = [...buckets.entries()].map(([k, v]) => [k * win, v.reduce((a, b) => a + b, 0) / v.length]);
const min = Math.min(...rows.map((r) => r[1]));
const max = Math.max(...rows.map((r) => r[1]));

console.log(`Duration: ${duration.toFixed(2)}s (${Math.floor(duration / 60)}:${String(Math.round(duration % 60)).padStart(2, "0")})\n`);
console.log("Average loudness per 10s window (longer bar = louder):");
for (const [start, db] of rows) {
  const bar = "█".repeat(Math.round(((db - min) / (max - min || 1)) * 40));
  console.log(`${String(Math.floor(start / 60)).padStart(2)}:${String(start % 60).padStart(2, "0")}  ${db.toFixed(1).padStart(6)} dB  ${bar}`);
}
console.log("\nUse this to set `at` (seconds) on each cue in data/soundtrack-cues.ts: quiet start → opening, first lift → early/build, loudest sustained section → peak, release → closing.");
