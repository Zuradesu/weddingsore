import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const PHOTOS = {
  "01-opening-window.jpg": "lnEtS2RnS4A",
  "02-arrival-a.jpg": "yXwxlJPsDeU",
  "02-arrival-b.jpg": "3Y0WjEWVJoI",
  "03-first-meeting.jpg": "GjZb2doGa2k",
  "03-first-conversation.jpg": "mG9BdBz1Qzc",
  "03-first-memorable-day.jpg": "HYzTq8NCIqA",
  "03-growing-together.jpg": "JATo37ssNBU",
  "03-proposal.jpg": "syhdOrkx-98",
  "04-sunset-a.jpg": "WpBUG4e_a6U",
  "04-sunset-b.jpg": "AD3k4pko7wo",
  "05-wedding-wide.jpg": "mVovNhvgDqM",
  "06-closing-sunset.jpg": "HkyT5zXJfXk",
};

const dir = "public/images";
mkdirSync(dir, { recursive: true });
let failed = 0;

for (const [file, id] of Object.entries(PHOTOS)) {
  const target = `${dir}/${file}`;
  if (existsSync(target)) {
    console.log(`skip  ${file} (already exists)`);
    continue;
  }
  try {
    const hop = await fetch(`https://unsplash.com/photos/${id}/download?force=true`, { redirect: "manual" });
    const location = hop.headers.get("location");
    if (!location) throw new Error(`no redirect (HTTP ${hop.status})`);
    const url = new URL(location);
    url.searchParams.set("w", "2000");
    url.searchParams.set("q", "80");
    url.searchParams.set("fm", "jpg");
    const img = await fetch(url);
    if (!img.ok) throw new Error(`HTTP ${img.status}`);
    writeFileSync(target, Buffer.from(await img.arrayBuffer()));
    console.log(`saved ${file}`);
  } catch (e) {
    failed++;
    console.error(`FAIL  ${file} (${id}): ${e.message}`);
  }
}

console.log(failed ? `\n${failed} failed. Re-run, or download manually from https://unsplash.com/photos/<id>.` : "\nDone. These are stock stand-ins: replace them with your own photos of Ahmad & Fatimah.");
