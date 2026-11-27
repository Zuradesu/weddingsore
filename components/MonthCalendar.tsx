export default function MonthCalendar({ date }: { date: string }) {
  const [year, month, day] = date.split("-").map(Number);
  const first = new Date(Date.UTC(year, month - 1, 1));
  const offset = first.getUTCDay();
  const total = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const name = new Intl.DateTimeFormat("en-GB", { timeZone: "UTC", month: "long" }).format(first);
  const cells: (number | null)[] = [...Array<null>(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];

  return (
    <div className="mx-auto mt-8 max-w-xs" role="group" aria-label={`${name} ${year}`}>
      <p className="scene-label mb-6 !opacity-90">
        {name} {year}
      </p>
      <div className="grid grid-cols-7 gap-y-1 text-center font-sans text-sm">
        {["S", "M", "T", "W", "T", "F", "S"].map((l, i) => (
          <span key={i} aria-hidden className="scene-label py-2 !text-[0.6rem]">
            {l}
          </span>
        ))}
        {cells.map((n, i) =>
          n === null ? (
            <span key={i} />
          ) : n === day ? (
            <span key={i} aria-current="date" className="mx-auto flex h-9 w-9 items-center justify-center rounded-full bg-sun-orange text-sun-ivory">
              {n}
            </span>
          ) : (
            <span key={i} className="py-2 opacity-70">
              {n}
            </span>
          ),
        )}
      </div>
    </div>
  );
}
