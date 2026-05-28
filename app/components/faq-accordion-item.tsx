"use client";

import { useReducedMotion } from "./use-reduced-motion";

const ACCORDION_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";

type FaqAccordionItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  showDivider: boolean;
};

export default function FaqAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  showDivider,
}: FaqAccordionItemProps) {
  const reducedMotion = useReducedMotion();
  const motionDisabled = reducedMotion === true;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-8 py-6 text-left font-serif"
      >
        <span className="text-lg">{question}</span>
        <span
          aria-hidden
          className={`inline-flex shrink-0 text-2xl text-[#C09F9D] ${
            motionDisabled ? "" : "transition-transform duration-500"
          } ${isOpen ? "rotate-45" : "rotate-0"}`}
          style={
            motionDisabled ? undefined : { transitionTimingFunction: ACCORDION_EASE }
          }
        >
          +
        </span>
      </button>

      <div
        className={`grid ${
          motionDisabled ? "" : "transition-[grid-template-rows,opacity] duration-500"
        } ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        style={
          motionDisabled ? undefined : { transitionTimingFunction: ACCORDION_EASE }
        }
      >
        <div className="overflow-hidden">
          <p className="border-t border-[#E8D5D2]/60 px-8 pb-6 font-serif leading-relaxed text-[#4A3A32]">
            {answer}
          </p>
        </div>
      </div>

      {showDivider && <hr className="border-[#E8D5D2]/60" />}
    </div>
  );
}
