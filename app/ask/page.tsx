"use client";

import Link from "next/link";
import { useState } from "react";
import PageHero from "../components/page-hero";

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

const welcomeMessage: Message = {
  role: "assistant",
  content:
    "Welcome to Sakura Bloom!\nFeel free to ask me anything about our matcha drinks, seasonal desserts, or personalized recommendations.",
};

export default function AskPage() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
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
        <h2 className="mb-8 font-serif text-4xl text-white">
          Ask Our AI Assistant
        </h2>

        <div className="flex min-h-[420px] flex-col overflow-hidden rounded-3xl bg-[#F7F3F0] md:min-h-[480px]">
          <div className="min-h-[56px] shrink-0 bg-[#E8D5D2] md:min-h-[64px]" />

          <div className="flex flex-1 flex-col p-8 md:p-10">
            <div className="flex-1 space-y-6">
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
                className="flex-1 rounded-xl bg-white px-5 py-4 font-serif text-[#1F1814] outline-none"
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
            <Link
              href="/contact"
              className="inline-block rounded-xl bg-[#C1C8BC] px-8 py-4 font-serif text-lg text-[#1F1814] transition hover:bg-[#b0b8a8]"
            >
              Contact Us
            </Link>
          </div>

          <div className="min-w-0 overflow-hidden rounded-3xl bg-[#F7F3F0] text-[#1F1814]">
            {faqItems.map((item, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 px-8 py-6 text-left font-serif"
                  >
                    <span className="text-lg">{item.question}</span>
                    <span className="shrink-0 text-2xl text-[#C09F9D]">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="border-t border-[#E8D5D2]/60 px-8 pb-6 font-serif leading-relaxed text-[#4A3A32]">
                      {item.answer}
                    </p>
                  )}

                  {index < faqItems.length - 1 && (
                    <hr className="border-[#E8D5D2]/60" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
