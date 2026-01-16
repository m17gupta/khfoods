/* ================= DATA ================= */

const xColumns = ["CALORIES", "FAT", "CARBS", "PROTEIN"];

const yRows = [
  { key: "FAT", tone: "uhp" },
  { key: "CARBS", tone: "fs" },
  { key: "PROTEIN", tone: "hp" },
  { key: "SODIUM", tone: "p" },
];

const bars = [
  {
    row: "FAT",
    label: "TOTAL FAT 13g (21% DV)",
    left: 50,
    width: 80,
    tone: "uhp",
  },
  {
    row: "FAT",
    label: "SAT FAT (9% DV)",
    left: 32,
    width: 20,
    tone: "fs",
  },
  {
    row: "CARBS",
    label: "TOTAL CARBS 6g (2% DV)",
    left: 0,
    width: 28,
    tone: "p",
  },
  {
    row: "CARBS",
    label: "FIBER 3g (11% DV)",
    left: 22,
    width: 80,
    tone: "hp",
  },
  {
    row: "PROTEIN",
    label: "PROTEIN 7g (14% DV)",
    left: 22,
    width: 60,
    tone: "uhp",
  },
  {
    row: "SODIUM",
    label: "SODIUM 120mg (5% DV)",
    left: 0,
    width: 25,
    tone: "fs",
  },
];

/* ================= TONE HELPERS ================= */

const toneBg = (tone: string) => {
  switch (tone) {
    case "uhp":
      return "bg-[#2F5F87]"; // UHP axis
    case "fs":
      return "bg-[#4A4F55]"; // FS axis
    case "hp":
      return "bg-[#3F5F78]"; // HP axis
    case "p":
      return "bg-[#A7C0D3]"; // P axis
    default:
      return "bg-neutral-300";
  }
};

const barTone = (tone: string) => {
  switch (tone) {
    case "uhp":
      return "bg-[#1F2D3D]"; // UHP bar
    case "fs":
      return "bg-[#3F4348]"; // FS bar
    case "hp":
      return "bg-[#3B566F]"; // HP bar
    case "p":
      return "bg-[#9DB4C8]"; // P bar
    default:
      return "bg-neutral-400";
  }
};

/* ================= LEGEND ================= */

const Legend = ({ label, tone }: { label: string; tone: string }) => (
  <div
    className={`px-4 py-2 rounded-md text-white text-xs font-semibold ${barTone(
      tone
    )}`}
  >
    {label}
  </div>
);

/* ================= CHART ================= */

export default function NutritionChart() {
  return (
    <div className="rounded-[18px] border border-neutral-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.06)] overflow-hidden">
      <div className="overflow-x-auto">
        <div className="min-w-[900px]">

          {/* X AXIS */}
          <div className="grid grid-cols-4 bg-[#1F1F1F] text-white text-[11px] tracking-[0.18em] uppercase">
            {xColumns.map((c) => (
              <div
                key={c}
                className="py-4 text-center border-r border-white/10 last:border-r-0"
              >
                {c}
              </div>
            ))}
          </div>

          <div className="relative">

            {/* Y AXIS */}
            <div className="absolute left-0 top-0 bottom-0 w-[76px] border-r border-neutral-200 z-10">
              {yRows.map((r) => (
                <div
                  key={r.key}
                  className={`h-[112px] flex items-center justify-center font-semibold tracking-[0.22em] text-[12px] text-white ${toneBg(
                    r.tone
                  )}`}
                >
                  {r.key}
                </div>
              ))}
            </div>

            {/* PLOT */}
            <div className="ml-[76px] p-6">
              <div className="relative rounded-[14px] border border-neutral-200 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.15)_1px,transparent_1px)] [background-size:18px_18px] opacity-30" />

                {yRows.map((r) => (
                  <div
                    key={r.key}
                    className="relative h-[112px] border-b border-neutral-200 last:border-b-0"
                  >
                    {bars
                      .filter((b) => b.row === r.key)
                      .map((b, i) => (
                        <div
                          key={i}
                          className={`absolute top-1/2 -translate-y-1/2 h-[46px] px-5 rounded-lg flex items-center   ${barTone(
                            b.tone
                          )}`}
                          style={{
                            left: `${b.left}%`,
                            width: `${b.width}%`,
                          }}
                        >
                          <span className="text-white text-[12px] font-semibold uppercase whitespace-nowrap">
                            {b.label}
                          </span>
                        </div>
                      ))}
                  </div>
                ))}
              </div>

              {/* LEGEND */}
              <div className="mt-6 flex flex-wrap gap-3">
                <Legend label="HIGH" tone="uhp" />
                <Legend label="MODERATE" tone="fs" />
                <Legend label="GOOD SOURCE" tone="hp" />
                <Legend label="LOW" tone="p" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-neutral-400 text-center py-3 md:hidden">
        ← Swipe to explore →
      </p>
    </div>
  );
}
