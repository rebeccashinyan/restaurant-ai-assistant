# Sakura Bloom Matcha — Project Document

An AI-enhanced UI/UX and product design project.
Working document — the source material a case study will later be written from.

---

## 1. Overview

**Sakura Bloom Matcha** is a fictional matcha café in New York, designed as an exercise in a
specific question:

> When a website has a conversational AI in it, what is actually being designed?

The answer this project argues for: not "a website, plus a chatbot bolted on." The AI is a
**material the interface is made of** — it has states, failure modes, and edge cases the same way
a form field does, and it has to be designed with the same care.

The deliverable is a five-page marketing site with a concierge assistant ("Ask Sakura") that
recommends drinks and desserts, answers practical questions about visiting, and runs a guided
dessert-pairing flow — built so that the product facts the interface presents as authoritative
(prices, ingredients, allergens, dietary attributes) are rendered from the menu database rather
than written by the model. See §7.1 for where that guarantee is structural and where it rests on
instruction.

| | |
|---|---|
| **Type** | Self-directed design project, fictional brand |
| **Role** | Product design, UI/UX, visual design, front-end implementation, AI interaction design |
| **Stack** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, OpenAI Responses API |
| **Scope** | 5 public pages, 21 menu items, 1 assistant with 3 interaction modes |
| **Timeline** | May – July 2026, 42 commits across 4 working phases |

---

## 2. Discipline split

By time actually invested, this is roughly **80% UI/UX, brand and visual design, 20% AI interaction
design** — and the commit history backs that up. Of 42 commits, 36 fall between May 21 and Jun 12
and are entirely brand, layout, motion, and composition; the AI layer is six commits across two days
in late July. The brand direction, the motion system, and the visual language took the bulk of the
work.

Two things worth separating, though.

**First: effort share and case-study space are different questions.** The AI layer is 20% of the
hours and close to 100% of what makes this project unusual. A carefully art-directed café site is a
well-populated category; a café site where the assistant's interpretation is a set of removable tags
the guest can argue with is not. So the number below records how the time was spent — it is not a
prescription for how much room each part gets in a write-up.

**Second: the AI work is not a separate discipline here.**

Almost nothing in that 20% was a model or infrastructure decision. They were interface decisions
that happened to be about an AI:

- Should the assistant's understanding of the guest be **invisible** (a hidden system prompt) or
  **visible and editable** (removable filter tags on screen)? → visible.
- When the assistant needs two pieces of information, should it ask an open question, or should the
  interface **offer the valid answers as buttons**? → buttons.
- Should prices come from the model's sentence, or from the **menu data rendered as a card next to
  it**? → the card, always.

Each of those is a UX decision with an AI implementation, not the other way around. So the document
below is organised by design problem, and the AI shows up inside those sections rather than in a
separate "technical" appendix.

| Band | Time invested | What it covers |
|---|---|---|
| Brand, visual & motion design | ~50% | Brand direction, type, color, layering, imagery, choreography, reduced-motion |
| Product & UX design | ~30% | IA, page structure, menu system, filter model, flows, content design |
| AI interaction design | ~20% | Grounding, structured output, visible interpretation, failure-mode design, voice spec |

---

## 3. Brand and premise

Sakura Bloom Matcha is invented for this project. The premise: a modern matcha café in New York,
drawing on tea houses in Tokyo and Kyoto — calm, quiet, designed for slowing down.

That premise sets a constraint that runs through every other decision: **the site should feel
unhurried.** It rules out the usual conversational-UI patterns — bouncing dot indicators, cheerful
emoji, exclamation marks, "Great question!" openers. The assistant's voice spec is written directly
against them (§7.7).

Brand facts (address, hours, phone, email, FAQ) live in one file, [cafe-info.ts](app/data/cafe-info.ts),
and are read by the Visit page, the Contact section, the map embed, the FAQ accordion, **and** the
assistant. A guest gets the same address whether they read the page or ask for it.

---

## 4. Research and design inputs

> **TO FILL IN** — this section is the one part of the document I can't reconstruct from the
> repository. Notes to add:
>
> - **User research / interviews**: how many people, who they were, what was asked, what came back.
>   The findings that changed a design decision are the valuable ones — e.g. anything that led to
>   the filter tags, the suggested-prompt chips, or the pairing buttons.
> - **Figma**: link to the file, which pages were designed before implementation
>   (commit `updated home after Figma`, May 23 2026, indicates Home was), and where the build
>   deliberately diverged from the comp and why.
> - **Competitive / reference scan**: any real café sites or AI-concierge products looked at, and
>   what was rejected.

What the repository *does* record is the iteration — see §10, which reconstructs the build phases
from commit history. Several of the strongest design decisions in §7.5 came out of watching the
model fail during development, which is its own form of research and is worth writing up as such.

---

## 5. Information architecture

Five routes in the primary navigation:

| Route | Purpose |
|---|---|
| `/` | Home — hero, atmosphere, gallery, reviews, entry points |
| `/menu` | Full menu, rendered from data: drinks, desserts, soft serve, add-ons |
| `/visit` | Location, hours, map |
| `/contact` | Contact details and form |
| `/ask` | **Ask Sakura** — the assistant, plus the FAQ accordion |

An [`/about`](app/about/page.tsx) route also exists (brand story, "what Sakura Bloom means") but is
not currently linked from the navigation — see §11.

**Menu inventory:** 21 items — 10 drinks, 8 desserts, 3 soft serve — plus 5 modifiers (add-ons and
toppings) and tiered soft-serve scoop pricing.

The key IA decision is that the Menu page and the assistant are **the same data, presented two
ways**. [menu.ts](app/data/menu.ts) is the single source of truth; the Menu page renders it as a
list, and Ask Sakura renders it as recommendation cards. Neither can drift from the other, and a
change to a price or an item's availability updates both at once.

---

## 6. Design system

### 6.1 Color

Derived from the brand premise rather than from a default palette — a dark, warm base so the
blossom and matcha accents read as light rather than decoration.

| Token | Hex | Role |
|---|---|---|
| Base | `#1F1814` | Page background — warm near-black |
| Foreground | `#F7F3ED` | Body text on dark |
| Cream | `#E4DBCA` | Footer, elevated warm surfaces |
| Panel | `#F7F3F0` | Chat surface, FAQ surface — light island on dark |
| Blossom | `#E8D5D2` | Guest messages, primary buttons |
| Matcha | `#C1C8BC` | Assistant messages, secondary actions |
| Rose | `#C09F9D` | Borders, focus rings, hover states |
| Ink | `#1F1814` / `#4A3A32` / `#6B4A44` | Text on light surfaces |

The chat carries the palette's clearest piece of semantic work: **guest speaks in blossom pink,
Sakura speaks in matcha green.** Speaker identity is legible before a single word is read.

### 6.2 Typography

Playfair Display throughout, loaded via `next/font`. Hierarchy is carried by size, weight, and
measure rather than by a second family.

*Noted as a deliberate deviation from the usual display/sans pairing rule — see §11 for the honest
assessment of whether it holds up at body sizes.*

### 6.3 Layout tokens

```
--page-max      1440px     outer bound
--content-max   1260px     text and content bound
--page-gutter   max(1.25rem, (min(100vw, 1440px) - 1260px) / 2)
```

One gutter formula, applied through a single `.page-shell` class, so every section aligns to the
same edge at every breakpoint without per-section padding values.

### 6.4 Motion

Motion is ambient and slow, in service of the "unhurried" premise. All of it animates `transform`
and `opacity` only.

- **Sakura petals** — a global ambient layer behind all content; randomized drift, rotation, and
  opacity per petal via CSS custom properties.
- **Scroll reveals** — four IntersectionObserver components with different characters:
  [reveal-once](app/components/reveal-once.tsx), [reveal-from](app/components/reveal-from.tsx),
  [reveal-line](app/components/reveal-line.tsx), [fade-up](app/components/fade-up.tsx).
- **Hero grain** — an inline SVG `feTurbulence` noise layer at 3.5% opacity, `soft-light` blended,
  drifting on an 8-step 14s cycle.
- **Parallax imagery** and a **hero atmosphere** hook for pointer-reactive depth.
- **Gallery marquee** — opposing 50s / 55s infinite rows.
- **Assistant typing** — the welcome line types at 36ms per character with a 120ms pause on
  punctuation. This is the one place motion is doing *interaction* work rather than atmosphere: it
  establishes that Sakura is a presence that speaks, before the guest sends anything.
- **Easing** — `cubic-bezier(0.16, 1, 0.3, 1)` as the single house curve.

**Reduced motion is handled twice**: in CSS (`@media (prefers-reduced-motion: reduce)` removes the
petal layer, the grain drift, the map glow) and in JS (the
[`useReducedMotion`](app/components/use-reduced-motion.ts) hook, which makes the typing effect
resolve instantly to full text rather than being skipped). The hook returns `null` until it has
measured, so nothing animates on the first frame before the preference is known.

### 6.5 Depth

Three planes: the base page (`#1F1814`), elevated light islands (chat panel, FAQ, menu blocks), and
floating elements (cards, tags, buttons) carried by color-tinted low-opacity shadows —
`rgba(192,157,157,0.08–0.32)` — rather than neutral gray.

---

## 7. The AI layer

### 7.1 Core principle: the model narrates, the data decides

Every constraint in this section follows from one rule:

> **The model interprets intent and explains a choice. It is not the source of the product facts
> the interface presents as authoritative.**

Two tiers of enforcement, and it matters which is which:

| | Mechanism | Can the model get it wrong? |
|---|---|---|
| Item identity on cards | Response schema: `itemIds` is an enum of real ids | No — an id outside the enum cannot be returned |
| Price, allergens, ingredients, dietary flags on cards | Rendered by the interface from [menu.ts](app/data/menu.ts) | No — these never pass through the model |
| Prices / ingredients inside the reply text | System prompt forbids stating them | **Yes** — instruction, not mechanism |
| Hours, address, contact in the reply text | System prompt says copy verbatim from [cafe-info.ts](app/data/cafe-info.ts) | **Yes** — these have no card, so prose carries them |

The claim that holds: **anything the interface presents as a fact is data-controlled. The prose
beside it is governed by instruction and is the weaker link.** The design absorbs that by moving
every fact a guest acts on — cost, contents, dietary safety — out of the sentence and onto a card.

This is the design decision the whole project rests on. A café assistant that confidently quotes a
wrong price is worse than no assistant at all, because the guest has no way to tell the difference.

### 7.2 Grounding

Both data files are serialized into the system prompt as context ([menu-context.ts](app/api/_lib/menu-context.ts),
[cafe-context.ts](app/api/_lib/cafe-context.ts)), framed with hard boundaries:

> "This is the complete menu. Nothing else exists."
> "Everything you know about visiting. Nothing else is confirmed."

Anything outside those two sections — reservations, parking, delivery, events — the assistant is
instructed to decline and redirect to the phone number or email. Explicitly designing the *refusal*
was as important as designing the answer.

### 7.3 The structured output contract

The assistant does not return prose. It returns a strict JSON schema
([route.ts](app/api/chat/route.ts#L60-L156)) with five fields:

| Field | What it drives in the UI |
|---|---|
| `reply` | The message bubble |
| `itemIds` | Which recommendation cards render — **enum-constrained to real menu ids** |
| `allergyWarning` | Whether the shared-kitchen advisory appears |
| `filters` | Which condition tags appear in the filter panel |
| `pairingRequest` | Whether pairing buttons appear, and which set |

Because `itemIds` is an enum of ids that actually exist, **the model is structurally incapable of
naming an item the café doesn't sell** in the card layer. The reply text is prose and can still
drift — which is what §7.5 is about.

### 7.4 Filter tags: making interpretation visible and editable

This is the design idea I'd lead a case study with.

When a guest types *"something iced, not too sweet, dairy-free, under $10"*, the assistant
translates that into structured conditions — and those conditions appear on screen as **removable
tags** in a filter panel below the chat, with a live count of matching items.

Three things this buys:

1. **The guest can see what was understood.** "Not too sweet" becoming
   `Sweetness 2 of 5 or less` is a translation the guest can check, and correct if it's wrong.
2. **The guest can disagree with one part without restarting.** Removing a tag is a click, not a
   sentence like "no wait, I don't care about caffeine actually."
3. **Matching is arithmetic, not judgement.** Once conditions are set, `matchesFilters()` in
   [menu.ts](app/data/menu.ts) decides which items qualify — pure comparison, no model involved.
   The result set is always correct even when the interpretation isn't.

The subtle part is **respecting a removal.** A guest who takes off the "dairy-free" tag should not
have it silently restored on the next turn just because it's still visible in the conversation
history. Asking the model to track this did not work — it reports anything it can still see. So
removals are held in client state, sent with each request, and re-applied server-side; a removed
condition only returns if the guest raises that subject again *in their own new words*, matched
against a per-filter keyword pattern.

The principle underneath: **a direct manipulation always outranks an inference.** If the guest
touched it, the interface is wrong to argue.

### 7.5 Designing against observed failure

These guardrails are not defensive programming written in advance — each one is a response to a
specific failure watched during development. This is, in effect, the project's usability-testing
log, with the model as the test subject.

| Observed failure | Design response |
|---|---|
| The reply names "Cloud Matcha" but `itemIds` comes back empty — a guest reads a recommendation with no card, no price, no photo | The item name is read back out of the model's own sentence via whole-word regex, longest name first, and unioned with `itemIds`. The prose can't promise a card the interface doesn't show. |
| Roughly 1 turn in 4, the model invents a condition nobody asked for (`maxCaffeine: "none"` on a request that never mentioned caffeine) | A *new* dietary or caffeine constraint is rejected unless the term appears in the guest's actual words or was already on screen |
| The model fills every schema field rather than leaving nulls, producing meaningless tags like "Matcha 0 of 5 or more" | `normalizeFilters()` drops conditions that exclude nothing |
| The model highlights an item that fails the filters it just set — a visible self-contradiction | Highlighted items are re-checked against the final filters. The panel wins, not the prose. |
| For pairing, the model reliably catches which drink was named but drops the *direction* about half the time — "something rich" and "a vegan dessert" both returned null while "a light dessert" worked | The direction is read from the guest's wording via ordered keyword patterns, with dietary terms checked first so "a rich vegan dessert" resolves to *vegan*, not *rich* |
| The model supplies a direction the guest never gave, skipping its own question — clicking "Ceremonial Matcha" returned a finished pairing | The model's reading is no longer a source for `direction`. A click is exact, the guest's wording is evidence, and anything else means asking |
| The handover sentence names desserts the pairing block then contradicts — it is written before the dessert is chosen, so any name in it is a guess | The interface supplies that line. The model's explanation lives inside the pairing block, written after the choice |
| The two pairing questions arrive with the options listed, duplicating the buttons directly below | `PAIRING_QUESTION` — the wording is fixed by the prompt anyway, so the interface owns it |
| Both items appear twice on a pairing turn: once as cards read out of the sentence, once in the pairing block | A pairing turn contributes no cards of its own |
| A café question clears every condition the guest had established | Conditions persist unless the guest's own words touch them — changing the subject is not changing your mind |

The general lesson, and the one worth putting in a case study: **when a model is unreliable at
something, the answer is usually not a longer prompt.** Most of the rows above began as explicit
instructions in the system prompt that the model kept violating — the fixed question wording, the
ban on naming a dessert before it is chosen, leaving unmentioned fields null. Moving each
requirement into code, where it cannot drift, was both more robust and, in every case, less work.

One row resists this treatment and is worth keeping visible: the reply can still name an item that
fails the filters it just set. The card is correctly withheld, so the interface stays consistent and
the sentence over-promises. No amount of reading the sentence more carefully repairs it — the fix is
to narrow candidates *before* the model writes, the way §7.6 already does for pairing, at the cost
of a second round trip.

### 7.6 The dessert pairing flow

Pairing is where the split between "code decides" and "model judges" is drawn most explicitly.

**The flow:** guest asks for a dessert to go with a drink → the assistant asks *one* short question
→ the interface renders the valid answers as buttons → the guest clicks → repeat for the second
input → the pairing result renders with both items and a reason.

**The division of labour** ([find-pairing.ts](app/api/_lib/find-pairing.ts)):

1. Code narrows the candidate pool by direction. `vegan` and `dairy-free` are **dietary facts,
   resolved entirely in code** — the model is never given an ineligible dessert to choose from, so
   it has no way to return one. `budget` is the cheaper half by price, also computed.
2. The narrowed list becomes the `enum` for the response schema.
3. The model picks one from that list and writes the reason — genuine taste judgement, which is
   where it adds real value.
4. The returned id is re-checked against the candidate list before rendering.

Two design points:

- **Buttons instead of open questions.** Clicking sends an exact id, not a sentence to be
  re-interpreted. The choice cannot be misread on the way back. The system prompt explicitly forbids
  listing the options in the question text too — "Would you prefer something rich, light, or
  contrasting?" is wrong, because those exact words are already on the buttons directly below and
  printing them twice makes the guest read the same list from two places.
- **One question at a time.** The prompt enforces asking about one thing per turn, and the reply is
  a single short question and nothing else when an input is missing.

The flow was originally built as a **separate panel** with its own controls and moved fully into the
chat two commits later (`moved dessert pairing fully into chat with clickable options`, Jul 29).
That relocation is worth writing up: two places to do the same thing is a worse experience than one
place that handles both typing and clicking. Both paths now run through the same `findPairing()`
function, so a pairing reached by typing carries exactly the same guarantee as one reached by
clicking.

### 7.7 Voice specification

> Warm, brief, and concrete. Two or three sentences per reply. No emoji, no exclamation marks, no
> sales language.

Plus a content rule that shapes every sentence the assistant writes: **it cannot state a price or
list ingredients**, because the interface renders those. So it has to talk about taste, texture, and
fit instead — which is what a good server would do anyway. The constraint that protects factual
accuracy also produces better copy.

A parallel rule handles the inverse case: an address, a set of hours, a phone number, or an email
has *no card*, so those are written out in the reply itself and copied verbatim from the data.

### 7.8 Trust and safety

- **Allergies** set an `allergyWarning` flag, rendering a shared-kitchen advisory below the reply
  and directing the guest to confirm with staff. The assistant never certifies an item as safe.
- **No clock.** The assistant is explicitly told it doesn't know the current time and must never say
  whether the café is open *right now* — it gives the posted hours and lets the guest read them
  against their own clock. A confident "yes, we're open!" that's wrong sends someone across a city.
- **Explicit uncertainty.** Anything not in the two data files gets "I can't confirm that" plus the
  phone number, never a guess.

---

## 8. Interaction detail — the Ask page

- **Suggested prompts** — eight chips on the empty state, covering ordering, dietary, budget,
  pairing, and practical questions. They teach the assistant's range without a paragraph of
  instructions, and they disappear once the conversation starts.
- **Card rendering** — recommendation cards are built from local menu data, with the model
  supplying only the ids.
- **Stale controls are removed** — pairing buttons only stay live on the most recent message. An
  older question has been answered; re-answering it would be ambiguous.
- **History is bounded** — the last 12 messages are sent, enough to keep the thread of a short
  consultation without unbounded growth.
- **Every failure path has copy** — missing API key, malformed request, empty message, API error,
  and network failure each produce a specific in-character message rather than a stack trace or a
  silent nothing.
- **The FAQ accordion sits below the chat** and is fed by the same `FAQ` data the assistant is
  given as fact — so opening the accordion and typing the question return the same answer.

---

## 9. Technical architecture

```
app/
├── data/
│   ├── menu.ts          21 items, 5 modifiers, filter logic, pairing candidate pools
│   └── cafe-info.ts     hours, address, contact, FAQ
├── api/
│   ├── chat/
│   │   ├── route.ts             schema, guardrails, filter reconciliation
│   │   └── system-prompt.ts     assistant behaviour spec
│   ├── pair/                    direction guidance + standalone endpoint
│   └── _lib/
│       ├── find-pairing.ts      the one place a dessert is chosen
│       ├── menu-context.ts      menu → prompt text
│       └── cafe-context.ts      café facts → prompt text
├── components/          25 components: motion primitives, chat UI, page sections
└── [routes]             page.tsx per route
```

**Request cycle:** client sends `{ message, history, filters, removedFilters, pairingRequest }` →
server calls the model with a strict JSON schema → the response passes through the guardrails in
§7.5 → server returns `{ reply, itemIds, allergyWarning, filters, pairing, awaitingPairingChoice,
pairingRequest }`. The client renders cards, tags, and buttons from that shape, reading every fact
from local data.

Model: `gpt-4o-mini` via the OpenAI Responses API, `strict: true` structured outputs, on both the
chat and the pairing call.

---

## 10. Build phases

Reconstructed from 42 commits, May 21 – Jul 30 2026.

**Phase 1 — Structure (May 21–23).** All five pages built, navigation and footer, Home reworked
against the Figma comp.

**Phase 2 — Motion (May 24–28).** Twelve commits, entirely animation: home, hero, menu, contact,
visit, sakura petals. A dedicated pass rather than motion added ad hoc during layout.

**Phase 3 — Composition (Jun 12).** Zoom and spacing calibration, imagery, side spaces.

**Phase 4 — The AI layer (Jul 29–30).** Six commits in two days, and the arc inside them is the
project's real story:

1. Menu database created; the Menu page becomes data-driven; Ask Sakura is grounded with
   recommendation cards. *— the single-source-of-truth decision*
2. Menu filter chips with live results and an empty state. *— filters as a UI primitive*
3. Two drinks removed; price/prose mismatch and missing recommendation cards fixed. *— the
   guardrails of §7.5*
4. AI dessert pairing with locked candidate pools. *— code narrows, model judges*
5. Pairing moved fully into the chat with clickable options. *— consolidating two surfaces into one*
6. The assistant learns hours, address, and contact; Menu page uses local photography. *— extending
   grounding to café facts*

Each step is a design decision with a visible before and after — good case-study material, because
the reasoning is legible from the diff.

---

## 11. Known gaps and next steps

**Honest list, for the case study's "what I'd do next" section.**

- **`html { font-size: 80%; zoom: 0.9 }`** in [globals.css](app/globals.css#L4-L7) is a global
  scaling shortcut standing in for a proper type scale. It works, but it makes every downstream
  size relative to a hack. Replacing it with real tokens is the first thing I'd fix.
- **Single typeface.** Playfair Display is doing both display and body work. It's coherent, but a
  serif at body size and long measure is harder to read than a sans; a display/text pairing is worth
  testing.
- **`/about` is orphaned** — the page exists and is written, but nothing links to it.
- **`/api/pair` is dead code** — a leftover endpoint from the standalone pairing panel. No client
  calls it; the chat route uses `findPairing()` directly. Should be removed or documented.
- **No per-item photography.** The Menu page uses three category header images; `MISSING_ITEM_IMAGES`
  is a known placeholder set.
- **No response streaming.** Replies arrive whole after a "Sakura is thinking…" state. Streaming
  would make longer answers feel faster.
- **No conversation persistence** — a refresh loses the thread.
- **Not yet accessibility-audited.** Focus-visible states and reduced-motion are handled
  deliberately; keyboard traversal of the chat, live-region announcements for new messages, and
  contrast ratios on the light-on-light card surfaces have not been formally checked.
- **No automated evaluation of the assistant.** The failure modes in §7.5 were found by hand. A
  small fixed set of test prompts run against each prompt change would catch regressions.

---

## 12. Case study talking points

Split by where the work went, since the two bands earn attention for different reasons: the design
work is the substance, the AI work is the differentiator.

### Design-led

1. **A brand premise that constrains, rather than decorates.** "Calm, quiet, designed for slowing
   down" is not a mood board — it is the reason the motion is ambient and slow, the reason the
   palette is a warm near-black rather than a bright one, and the reason the assistant is forbidden
   emoji, exclamation marks, and sales language. One premise, traceable into typography, motion,
   color, and copy. That traceability is the thing to demonstrate.
2. **Motion designed as its own pass.** Twelve consecutive commits doing nothing but animation,
   after the structure was settled — not motion sprinkled on during layout. Worth showing as a
   deliberate method: build the bones, then choreograph them.
3. **Reduced motion handled twice, on purpose.** CSS removes the ambient layers; the JS hook makes
   the typing effect *resolve instantly to full text* rather than being skipped, and returns `null`
   until it has measured so nothing animates before the preference is known. A small detail that
   shows accessibility treated as a design problem, not a checkbox.
4. **Color doing semantic work.** Guest speaks in blossom pink, Sakura speaks in matcha green —
   speaker identity is legible before a word is read, using the brand palette rather than the
   default gray/blue chat convention.
5. **One gutter formula for the entire site.** A single `.page-shell` and a clamp-based gutter token
   instead of per-section padding, so every section aligns to the same edge at every breakpoint.

### AI-led

6. **Filter tags as visible interpretation.** The assistant showing its understanding as removable
   objects, rather than hiding it in a system prompt. Directly manipulable, correctable, and it
   makes the AI's reasoning auditable by a non-technical guest.
7. **"The model narrates, the data decides."** One principle, enforced structurally, that explains
   every guardrail in the codebase. Concrete, defensible, and transferable to any AI product.
8. **Designing against observed failure.** A real log of model failures and the interface decisions
   that answered them — with the finding that moving a requirement from prompt into code beat
   tightening the prompt in every single case.
9. **Locked candidate pools for pairing.** Dietary constraints resolved in code so the model
   *cannot* return an ineligible dessert, with the model's judgement used only where judgement
   actually helps.
10. **Buttons over open questions.** Reducing an ambiguous free-text turn to an exact click, and
    removing the duplicated option list from the question text.
11. **Consolidating the pairing panel into the chat.** A design decision with a clear before/after
    and a clear rationale: one place that handles both typing and clicking beats two places doing
    the same job.
