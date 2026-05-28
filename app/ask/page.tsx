"use client";

import Link from "next/link";
import { useState } from "react";
import FaqAccordionItem from "../components/faq-accordion-item";
import PageHero from "../components/page-hero";
import RevealOnce from "../components/reveal-once";
import TypingMessage from "../components/typing-message";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const faqItems = [
  {
    question: "What kind of matcha does Sakura Bloom use?",
    answer:
      "We use ceremonial-grade matcha sourced from Uji, Japan. It is stone-ground for a smooth, vibrant flavor and whisked fresh for every drink.",
  },
  {
    question: "Do you offer dairy-free options?",
    answer:
      "Yes. Oat milk is available for all lattes and specialty drinks, and many desserts can be made without dairy upon request.",
  },
  {
    question: "Are your desserts made fresh daily?",
    answer:
      "Our wagashi, cakes, and pastries are prepared in small batches each morning so they stay soft, delicate, and at their best throughout the day.",
  },
  {
    question: "What is the most popular drink at Sakura Bloom?",
    answer:
      "The Sakura Bloom Latte is our signature — ceremonial matcha with milk and delicate sakura cream foam. The Strawberry Sakura Matcha is a close favorite.",
  },
  {
    question: "Can I study or work at Sakura Bloom?",
    answer:
      "Absolutely. Our space is designed to feel calm and welcoming, with comfortable seating and a quiet atmosphere perfect for reading, studying, or remote work.",
  },
  {
    question: "Do you offer seasonal menu items?",
    answer:
      "Yes. We rotate limited-time drinks and desserts inspired by cherry blossom season, summer fruit, and other Japanese seasonal traditions.",
  },
  {
    question: "Is Sakura Bloom inspired by Japanese cafés?",
    answer:
      "Very much so. Our aesthetic, ingredients, and pacing are influenced by tea houses and specialty matcha shops in Tokyo and Kyoto, reimagined for a modern New York setting.",
  },
];

const welcomeText =
  "Hi! I'm Sakura, your AI assistant. You can ask me anything about our matcha drinks, seasonal desserts, café atmosphere, or personalized recommendations.";

const INPUT_CLASS =
  "flex-1 rounded-xl border border-transparent bg-white px-5 py-4 font-serif text-[#1F1814] outline-none transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#C09F9D]/30 hover:shadow-[0_4px_16px_rgba(192,157,157,0.08)] focus:border-[#C09F9D]/50 focus:shadow-[0_6px_20px_rgba(192,157,157,0.14)]";

const CONTACT_BUTTON_CLASS =
  "inline-block rounded-xl bg-[#C1C8BC] px-8 py-4 font-serif text-lg text-[#1F1814] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#b5bdb0] hover:shadow-[0_8px_24px_rgba(193,200,188,0.32)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export default function AskPage() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSend = async () => {
    if (!userMessage.trim() || isLoading) {
      return;
    }

    const currentMessage = userMessage.trim();

    setMessages((prev) => [...prev, { role: "user", content: currentMessage }]);
    setUserMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: currentMessage }),
      });

      const text = await response.text();

      if (!text) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "No response from the API. Check your terminal for backend errors.",
          },
        ]);
        return;
      }

      const data = JSON.parse(text);

      if (!response.ok) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.error || "Something went wrong. Please try again.",
          },
        ]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Something went wrong. Check the browser console and terminal.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="text-[#F7F3ED]">
      <PageHero title="Ask Sakura" />

      {/* AI Assistant */}
      <section className="page-shell py-20">
        <RevealOnce>
          <h2 className="mb-8 font-serif text-4xl text-white">
            Ask Our AI Assistant
          </h2>
        </RevealOnce>

        <RevealOnce delay={140} elevation>
          <div className="flex min-h-[420px] flex-col overflow-hidden rounded-3xl bg-[#F7F3F0] md:min-h-[480px]">
            <div className="min-h-[56px] shrink-0 bg-[#E8D5D2] md:min-h-[64px]" />

            <div className="flex flex-1 flex-col p-8 md:p-10">
              <div className="flex-1 space-y-6">
                <TypingMessage text={welcomeText} />

                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={
                      message.role === "user"
                        ? "ml-auto w-fit max-w-[75%]"
                        : "mr-auto w-fit max-w-[85%]"
                    }
                  >
                    <p
                      className={`w-fit whitespace-pre-line rounded-2xl px-5 py-4 font-serif text-[#1F1814] leading-relaxed ${
                        message.role === "user"
                          ? "bg-[#E8D5D2]"
                          : "bg-[#C1C8BC]"
                      }`}
                    >
                      {message.content}
                    </p>
                  </div>
                ))}

                {isLoading && (
                  <div className="mr-auto w-fit max-w-[85%]">
                    <p className="w-fit rounded-2xl bg-[#C1C8BC] px-5 py-4 font-serif text-[#1F1814]">
                      Sakura is thinking…
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-4">
                <input
                  type="text"
                  placeholder="Ask about drinks, desserts, or recommendations..."
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSend();
                    }
                  }}
                  className={INPUT_CLASS}
                />
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={isLoading}
                  className="rounded-xl bg-[#E8D5D2] px-8 py-4 font-serif text-lg text-[#1F1814] transition hover:bg-[#dcc4c0] disabled:opacity-50"
                >
                  {isLoading ? "…" : "Send"}
                </button>
              </div>
            </div>
          </div>
        </RevealOnce>
      </section>

      {/* FAQ */}
      <section className="page-shell pb-28">
        <div className="grid gap-16 lg:grid-cols-[4fr_7fr] lg:items-start lg:gap-20">
          <div className="min-w-0">
            <h2 className="mb-6 text-4xl font-serif text-white">
              Frequently Asked Questions
            </h2>
            <p className="mb-10 font-serif text-lg leading-relaxed text-white/90">
              If you have further questions, don&apos;t hesitate to reach out to
              us.
            </p>
            <Link href="/contact" className={CONTACT_BUTTON_CLASS}>
              Contact Us
            </Link>
          </div>

          <div className="min-w-0 overflow-hidden rounded-3xl bg-[#F7F3F0] text-[#1F1814]">
            {faqItems.map((item, index) => (
              <FaqAccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                showDivider={index < faqItems.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
