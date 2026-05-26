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
  { left: "8%", size: 14, drift: "32px", rotateEnd: "220deg", duration: "20s", delay: "0s", opacity: 0.32, tone: "pink" },
  { left: "18%", size: 11, drift: "-40px", rotateEnd: "160deg", duration: "24s", delay: "-5s", opacity: 0.26, tone: "cream" },
  { left: "28%", size: 16, drift: "48px", rotateEnd: "280deg", duration: "28s", delay: "-10s", opacity: 0.3, tone: "pink" },
  { left: "42%", size: 12, drift: "-28px", rotateEnd: "190deg", duration: "22s", delay: "-3s", opacity: 0.28, tone: "cream" },
  { left: "55%", size: 15, drift: "56px", rotateEnd: "240deg", duration: "26s", delay: "-14s", opacity: 0.31, tone: "pink" },
  { left: "68%", size: 10, drift: "-52px", rotateEnd: "170deg", duration: "30s", delay: "-7s", opacity: 0.24, tone: "cream" },
  { left: "78%", size: 13, drift: "38px", rotateEnd: "260deg", duration: "23s", delay: "-16s", opacity: 0.29, tone: "pink" },
  { left: "88%", size: 12, drift: "-34px", rotateEnd: "200deg", duration: "25s", delay: "-9s", opacity: 0.27, tone: "cream" },
  { left: "14%", size: 11, drift: "44px", rotateEnd: "210deg", duration: "27s", delay: "-19s", opacity: 0.28, tone: "pink" },
  { left: "62%", size: 11, drift: "-44px", rotateEnd: "250deg", duration: "29s", delay: "-12s", opacity: 0.26, tone: "cream" },
  { left: "36%", size: 10, drift: "28px", rotateEnd: "180deg", duration: "21s", delay: "-15s", opacity: 0.25, tone: "pink" },
  { left: "92%", size: 13, drift: "-30px", rotateEnd: "230deg", duration: "24s", delay: "-6s", opacity: 0.27, tone: "cream" },
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
