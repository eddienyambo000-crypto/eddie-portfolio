const ITEMS = [
  "CONVERSION WEBSITES",
  "WHATSAPP AI AGENTS",
  "24/7 LEAD CAPTURE",
  "AUTOMATED FOLLOW-UP",
  "BUSINESS AUTOMATION",
  "OPERATIONS ON AUTOPILOT",
  "RWANDA'S AUTOMATION GUY",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative z-[1] overflow-hidden border-y border-mocha-line bg-cream2 py-4">
      <div className="flex w-max animate-marquee">
        {row.map((t, i) => (
          <div key={i} className="flex items-center gap-7 whitespace-nowrap px-7 font-mono text-[0.82rem] text-coffee">
            {t}
            <span className="text-caramel">✦</span>
          </div>
        ))}
      </div>
    </div>
  );
}
