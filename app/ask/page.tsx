"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FaqAccordionItem from "../components/faq-accordion-item";
import FilterPanel from "../components/filter-panel";
import PageHero from "../components/page-hero";
import PairingChoices from "../components/pairing-choices";
import PairingResult from "../components/pairing-result";
import RecommendationCard from "../components/recommendation-card";
import RevealOnce from "../components/reveal-once";
import TypingMessage from "../components/typing-message";
import { useReducedMotion } from "../components/use-reduced-motion";
import { FAQ } from "../data/cafe-info";
import {
  EMPTY_FILTERS,
  FILTER_KEYS,
  getItem,
  mergeFilters,
  type Category,
  type MenuFilters,
  type PairingDirection,
} from "../data/menu";

type Pairing = {
  /** What the guest already had; the partner is what Sakura chose to go with it. */
  anchorId: string;
  partnerId: string;
  reason: string | null;
};

/** What the guest has settled so far. A pairing needs all three. */
type PairingDraft = {
  anchorId: string | null;
  partnerCategory: Category | null;
  direction: PairingDirection | null;
};

type PairingChoiceKind = "anchor" | "partner" | "direction";

type PairingChoiceOptions = {
  categories: Category[];
  directions: PairingDirection[];
};

type Message = {
  role: "user" | "assistant";
  content: string;
  /** Menu items the reply refers to. Cards are rendered from local data. */
  itemIds?: string[];
  allergyWarning?: boolean;
  /** Set once the guest has given an anchor, a category, and a direction. */
  pairing?: Pairing | null;
  /** Which pairing question this reply asked, if any. */
  awaitingPairingChoice?: PairingChoiceKind | null;
  /** The buttons that belong under that question. */
  pairingChoiceOptions?: PairingChoiceOptions | null;
};

const suggestedPrompts = [
  "Help me choose a drink",
  "What should I try as a matcha beginner?",
  "Show me dairy-free options",
  "Find something iced and not too sweet",
  "Pair a dessert with my drink",
  "What can I order under $15?",
  "When are you open?",
  "Where are you located?",
];

const welcomeText =
  "Hi! I'm Sakura, your AI assistant. Ask me about our matcha drinks and seasonal desserts, or about visiting — opening hours, where to find us, and how to reach us.";

const INPUT_CLASS =
  "flex-1 rounded-xl border border-transparent bg-white px-5 py-4 font-serif text-[#1F1814] outline-none transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#C09F9D]/30 hover:shadow-[0_4px_16px_rgba(192,157,157,0.08)] focus:border-[#C09F9D]/50 focus:shadow-[0_6px_20px_rgba(192,157,157,0.14)]";

const SUGGESTED_PROMPT_CLASS =
  "rounded-full border border-[#C09F9D]/40 bg-white px-4 py-2 font-serif text-sm text-[#4A3A32] transition-[transform,background-color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:border-[#C09F9D]/70 hover:bg-[#F4EAE8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C09F9D] active:translate-y-0 motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const CONTACT_BUTTON_CLASS =
  "inline-block rounded-xl bg-[#C1C8BC] px-8 py-4 font-serif text-lg text-[#1F1814] transition-[transform,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-[#b5bdb0] hover:shadow-[0_8px_24px_rgba(193,200,188,0.32)] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

export default function AskPage() {
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [filters, setFilters] = useState<MenuFilters>(EMPTY_FILTERS);
  /** Tags the guest took off by hand, so the model cannot quietly restore them. */
  const [removedFilters, setRemovedFilters] = useState<(keyof MenuFilters)[]>([]);
  /** The pairing being assembled across turns. Reset once a pairing lands. */
  const [pairingDraft, setPairingDraft] = useState<PairingDraft>({
    anchorId: null,
    partnerCategory: null,
    direction: null,
  });

  const transcriptRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  // The card no longer grows, so a new reply arrives below the fold unless the
  // transcript follows it down. Keyed on the turn count and the thinking state:
  // the guest's own message, the "thinking" line, and the answer each scroll.
  useEffect(() => {
    const transcript = transcriptRef.current;
    if (!transcript) return;

    transcript.scrollTo({
      top: transcript.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [messages, isLoading, reducedMotion]);

  const removeFilter = (key: keyof MenuFilters) => {
    setFilters((prev) => ({ ...prev, [key]: null }));
    setRemovedFilters((prev) => (prev.includes(key) ? prev : [...prev, key]));
  };

  const clearFilters = () => {
    setFilters(EMPTY_FILTERS);
    setRemovedFilters(FILTER_KEYS);
  };

  const handleSend = async (
    presetMessage?: string,
    /** Set when the guest clicked a pairing button instead of typing. */
    chosen?: Partial<PairingDraft>,
  ) => {
    const currentMessage = (presetMessage ?? userMessage).trim();

    if (!currentMessage || isLoading) {
      return;
    }

    // Snapshot before the optimistic update so the request carries prior turns only.
    const history = messages.map(({ role, content }) => ({ role, content }));

    // Carry forward whatever the flow has already established, so clicking a
    // direction still knows which item was picked two turns ago.
    const pairingRequest: PairingDraft = {
      anchorId: chosen?.anchorId ?? pairingDraft.anchorId,
      partnerCategory: chosen?.partnerCategory ?? pairingDraft.partnerCategory,
      direction: chosen?.direction ?? pairingDraft.direction,
    };

    setMessages((prev) => [...prev, { role: "user", content: currentMessage }]);
    setUserMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentMessage,
          history,
          filters,
          removedFilters,
          pairingRequest,
        }),
      });

      const data = await response.json();

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
        {
          role: "assistant",
          content: data.reply,
          itemIds: data.itemIds ?? [],
          allergyWarning: data.allergyWarning ?? false,
          pairing: data.pairing ?? null,
          awaitingPairingChoice: data.awaitingPairingChoice ?? null,
          pairingChoiceOptions: data.pairingChoiceOptions ?? null,
        },
      ]);

      // The server clears the draft itself once the three inputs have been
      // spent, whether that ended in a pairing or in a dead end, so this only
      // has to mirror what came back.
      setPairingDraft({
        anchorId: data.pairingRequest?.anchorId ?? null,
        partnerCategory: data.pairingRequest?.partnerCategory ?? null,
        direction: data.pairingRequest?.direction ?? null,
      });

      // The reply is authoritative: the server has already stripped anything the
      // guest took off, so it replaces the panel rather than adding to it.
      const nextFilters = mergeFilters(EMPTY_FILTERS, data.filters ?? {});
      setFilters(nextFilters);
      // A condition the guest raised again is theirs to keep; stop suppressing it.
      setRemovedFilters((prev) => prev.filter((key) => nextFilters[key] === null));
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sakura could not be reached. Check your connection and try again.",
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
          {/* Fixed height: the transcript scrolls inside the card rather than
              growing it, so the page below stays where the guest left it. */}
          <div className="flex h-[560px] flex-col overflow-hidden rounded-3xl bg-[#F7F3F0] md:h-[640px]">
            <div className="min-h-[56px] shrink-0 bg-[#E8D5D2] md:min-h-[64px]" />

            <div className="flex min-h-0 flex-1 flex-col">
              <div
                ref={transcriptRef}
                className="chat-scroll min-h-0 flex-1 space-y-6 overflow-y-auto px-8 pt-8 md:px-10 md:pt-10"
              >
                <TypingMessage text={welcomeText} />

                {messages.length === 0 && !isLoading && (
                  <div className="mr-auto flex max-w-[85%] flex-wrap gap-2">
                    {suggestedPrompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => handleSend(prompt)}
                        className={SUGGESTED_PROMPT_CLASS}
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}

                {messages.map((message, index) => {
                  const items = (message.itemIds ?? [])
                    .map(getItem)
                    .filter((item) => item !== undefined);

                  // Only the newest reply keeps its buttons — an older question
                  // has already been answered, and re-answering it would be
                  // ambiguous.
                  const showChoices =
                    message.awaitingPairingChoice != null &&
                    index === messages.length - 1;

                  return (
                    <div
                      key={index}
                      className={
                        message.role === "user"
                          ? "ml-auto w-fit max-w-[75%]"
                          : "mr-auto max-w-[85%]"
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

                      {message.allergyWarning && (
                        <p className="mt-3 rounded-xl border border-[#C09F9D]/45 bg-[#F4EAE8] px-4 py-3 text-sm leading-relaxed text-[#6B4A44]">
                          Everything is prepared in a shared kitchen. Please confirm
                          allergens with a staff member before ordering.
                        </p>
                      )}

                      {items.length > 0 && (
                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          {items.map((item) => (
                            <RecommendationCard key={item.id} item={item} />
                          ))}
                        </div>
                      )}

                      {showChoices && (
                        <PairingChoices
                          kind={message.awaitingPairingChoice!}
                          categories={
                            message.pairingChoiceOptions?.categories ?? []
                          }
                          directions={
                            message.pairingChoiceOptions?.directions ?? []
                          }
                          disabled={isLoading}
                          onChooseAnchor={(anchorId, label) =>
                            handleSend(label, { anchorId })
                          }
                          onChoosePartner={(partnerCategory, label) =>
                            handleSend(label, { partnerCategory })
                          }
                          onChooseDirection={(direction, label) =>
                            handleSend(label, { direction })
                          }
                        />
                      )}

                      {message.pairing && (
                        <div className="mt-4 rounded-2xl bg-white/60 p-5">
                          <PairingResult
                            anchorId={message.pairing.anchorId}
                            partnerId={message.pairing.partnerId}
                            reason={message.pairing.reason}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="mr-auto w-fit max-w-[85%]">
                    <p className="w-fit rounded-2xl bg-[#C1C8BC] px-5 py-4 font-serif text-[#1F1814]">
                      Sakura is thinking…
                    </p>
                  </div>
                )}
              </div>

              <div className="flex shrink-0 gap-4 px-8 pb-8 pt-6 md:px-10 md:pb-10">
                <input
                  type="text"
                  placeholder="Ask about drinks, desserts, or visiting us..."
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
                  onClick={() => handleSend()}
                  disabled={isLoading}
                  className="rounded-xl bg-[#E8D5D2] px-8 py-4 font-serif text-lg text-[#1F1814] transition hover:bg-[#dcc4c0] disabled:opacity-50"
                >
                  {isLoading ? "…" : "Send"}
                </button>
              </div>
            </div>
          </div>
        </RevealOnce>

        <div className="mt-6">
          <FilterPanel
            filters={filters}
            onRemove={removeFilter}
            onClearAll={clearFilters}
          />
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
            <Link href="/contact" className={CONTACT_BUTTON_CLASS}>
              Contact Us
            </Link>
          </div>

          <div className="min-w-0 overflow-hidden rounded-3xl bg-[#F7F3F0] text-[#1F1814]">
            {FAQ.map((item, index) => (
              <FaqAccordionItem
                key={item.question}
                question={item.question}
                answer={item.answer}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
                showDivider={index < FAQ.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
