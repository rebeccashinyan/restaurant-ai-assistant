"use client";

import { useReducedMotion } from "./use-reduced-motion";

const MAPS_EMBED =
  "https://www.google.com/maps?q=128+Sakura+Street+New+York+NY+10012&output=embed";

type VisitMapProps = {
  className?: string;
};

export default function VisitMap({ className = "" }: VisitMapProps) {
  const reducedMotion = useReducedMotion();
  const motionDisabled = reducedMotion === true;

  return (
    <div className={`visit-map-wrap group relative ${className}`}>
      <div
        aria-hidden
        className={`visit-map-glow pointer-events-none absolute -inset-3 rounded-[1.75rem] md:-inset-4 ${
          motionDisabled ? "" : "visit-map-glow--pulse"
        }`}
      />
      <div
        className={`visit-map-card relative overflow-hidden rounded-3xl border border-[#E4DBCA]/20 bg-[#1F1814] ${
          motionDisabled
            ? ""
            : "transition-[transform,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1 group-hover:border-[#E4DBCA]/38 group-hover:shadow-[0_18px_50px_rgba(31,24,20,0.28)]"
        }`}
      >
        <iframe
          title="Sakura Bloom Matcha on Google Maps"
          src={MAPS_EMBED}
          className="h-[360px] w-full border-0 sm:h-[440px] lg:h-[520px]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
