type PetalConfig = {
  left: string;
  size: number;
  drift: string;
  rotateEnd: string;
  duration: string;
  delay: string;
  opacity: number;
  tone: "pink" | "cream";
};

/** Deterministic layout — stable across SSR */
const PETALS: PetalConfig[] = [
  { left: "6%", size: 14, drift: "32px", rotateEnd: "220deg", duration: "20s", delay: "0s", opacity: 0.25, tone: "pink" },
  { left: "14%", size: 10, drift: "44px", rotateEnd: "210deg", duration: "27s", delay: "-19s", opacity: 0.1, tone: "pink" },
  { left: "22%", size: 11, drift: "-40px", rotateEnd: "160deg", duration: "24s", delay: "-5s", opacity: 0.14, tone: "cream" },
  { left: "30%", size: 16, drift: "48px", rotateEnd: "280deg", duration: "28s", delay: "-10s", opacity: 0.24, tone: "pink" },
  { left: "38%", size: 9, drift: "28px", rotateEnd: "180deg", duration: "21s", delay: "-15s", opacity: 0.09, tone: "pink" },
  { left: "46%", size: 12, drift: "-28px", rotateEnd: "190deg", duration: "22s", delay: "-3s", opacity: 0.17, tone: "cream" },
  { left: "52%", size: 13, drift: "-30px", rotateEnd: "230deg", duration: "24s", delay: "-6s", opacity: 0.26, tone: "cream" },
  { left: "58%", size: 15, drift: "56px", rotateEnd: "240deg", duration: "26s", delay: "-14s", opacity: 0.2, tone: "pink" },
  { left: "64%", size: 11, drift: "-44px", rotateEnd: "250deg", duration: "29s", delay: "-12s", opacity: 0.12, tone: "cream" },
  { left: "70%", size: 10, drift: "-52px", rotateEnd: "170deg", duration: "30s", delay: "-7s", opacity: 0.16, tone: "cream" },
  { left: "76%", size: 13, drift: "38px", rotateEnd: "260deg", duration: "23s", delay: "-16s", opacity: 0.22, tone: "pink" },
  { left: "82%", size: 12, drift: "-34px", rotateEnd: "200deg", duration: "25s", delay: "-9s", opacity: 0.13, tone: "cream" },
  { left: "88%", size: 14, drift: "36px", rotateEnd: "215deg", duration: "26s", delay: "-11s", opacity: 0.27, tone: "pink" },
  { left: "94%", size: 11, drift: "-38px", rotateEnd: "195deg", duration: "25s", delay: "-4s", opacity: 0.1, tone: "cream" },
  { left: "4%", size: 12, drift: "-24px", rotateEnd: "175deg", duration: "31s", delay: "-20s", opacity: 0.18, tone: "cream" },
  { left: "48%", size: 10, drift: "40px", rotateEnd: "225deg", duration: "23s", delay: "-17s", opacity: 0.11, tone: "pink" },
  { left: "72%", size: 15, drift: "50px", rotateEnd: "265deg", duration: "27s", delay: "-8s", opacity: 0.24, tone: "pink" },
  { left: "96%", size: 9, drift: "-20px", rotateEnd: "185deg", duration: "29s", delay: "-13s", opacity: 0.12, tone: "cream" },
];

const TONE_CLASS = {
  pink: "bg-[#f8dde1]",
  cream: "bg-[#f5ebe0]",
} as const;

export default function SakuraPetals() {
  return (
    <div
      aria-hidden
      className="sakura-petals-layer pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {PETALS.map((petal, index) => (
        <span
          key={index}
          className={`sakura-petal absolute rounded-[50%_50%_50%_0] ${TONE_CLASS[petal.tone]}`}
          style={{
            left: petal.left,
            width: `${petal.size}px`,
            height: `${petal.size * 1.4}px`,
            ["--sakura-opacity" as string]: String(petal.opacity),
            ["--sakura-drift" as string]: petal.drift,
            ["--sakura-rotate-end" as string]: petal.rotateEnd,
            animationDuration: petal.duration,
            animationDelay: petal.delay,
          }}
        />
      ))}
    </div>
  );
}
