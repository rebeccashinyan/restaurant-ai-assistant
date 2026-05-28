"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "./use-reduced-motion";

const TYPE_INTERVAL_MS = 36;
const PUNCTUATION_PAUSE_MS = 120;

type TypingMessageProps = {
  text: string;
  className?: string;
};

function pauseForChar(char: string) {
  return char === "." || char === "!" || char === "?" || char === ","
    ? PUNCTUATION_PAUSE_MS
    : 0;
}

export default function TypingMessage({ text, className = "" }: TypingMessageProps) {
  const reducedMotion = useReducedMotion();
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (reducedMotion === null) return;

    if (reducedMotion) {
      setDisplayed(text);
      setIsTyping(false);
      return;
    }

    setDisplayed("");
    setIsTyping(true);

    let index = 0;
    let timeoutId = 0;

    const typeNext = () => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        setIsTyping(false);
        return;
      }

      timeoutId = window.setTimeout(
        typeNext,
        TYPE_INTERVAL_MS + pauseForChar(text[index - 1] ?? ""),
      );
    };

    timeoutId = window.setTimeout(typeNext, TYPE_INTERVAL_MS);

    return () => window.clearTimeout(timeoutId);
  }, [text, reducedMotion]);

  return (
    <div className="mr-auto w-fit max-w-[85%]">
      <p
        className={`w-fit whitespace-pre-line rounded-2xl bg-[#C1C8BC] px-5 py-4 font-serif text-[#1F1814] leading-relaxed ${className}`}
      >
        {displayed}
        {isTyping && (
          <span
            aria-hidden
            className="ml-0.5 inline-block w-[2px] animate-[typing-cursor_1s_step-end_infinite] text-[#1F1814]/70"
          >
            |
          </span>
        )}
      </p>
    </div>
  );
}
