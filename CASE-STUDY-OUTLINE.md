# Sakura Bloom Matcha — Case Study Outline

A content plan, not the case study itself. Each section lists what it has to accomplish, what goes
in it, what visuals carry it, and what is still missing.

Source material: [PROJECT.md](PROJECT.md) — section references below point there.

**Overall targets:** ~2,000–2,500 words of copy, 16–20 visuals. The design sections (5, 6, 7) should
occupy roughly 60% of the page height. If a reader only looks at images and headings, they should
still come away with the argument.

---

## 1. Overview

**Purpose:** In 15 seconds, tell the reader what this is and why it's worth scrolling.

**Include**
- One-sentence positioning: a matcha café site with an AI concierge that is structurally incapable
  of inventing a price, an allergen, or a menu item.
- The framing question the project explores: *when a website has a conversational AI in it, what is
  actually being designed?*
- Metadata block: role, timeline (May–Jul 2026), stack, scope (5 pages, 21 menu items, 1 assistant
  with 3 interaction modes), and that the brand is fictional.
- One line naming the split honestly: ~80% brand/UI/UX, ~20% AI interaction design.

**Visuals**
- **Hero shot of the finished product, immediately.** Home page hero, full width.
- A 3-up or 4-up strip: Menu page, Ask Sakura mid-conversation with cards showing, pairing result.

**Do not**
- Open with "In today's fast-paced world…" or a paragraph of context before any image.
- Explain the process here. This section only sells the scroll.

**Length:** 100–150 words.

---

## 2. The Premise

**Purpose:** Establish the starting point honestly, so nothing later reads as retrofitted.

**Include**
- State plainly that Sakura Bloom Matcha is invented for this project, and why a fictional brand was
  the right vehicle: it allows full control of the menu data, which is what the AI constraints
  depend on.
- The brand premise: a modern matcha café in New York drawing on Tokyo and Kyoto tea houses — calm,
  quiet, designed for slowing down.
- **The constraint that premise creates**, stated up front because it drives everything in §5 and
  §7: the site has to feel unhurried, which rules out the standard conversational-UI vocabulary —
  bouncing dots, emoji, exclamation marks, "Great question!" openers.
- The design question, framed as a real question rather than a fake business problem: most AI is
  added to a product as a floating chat bubble that knows nothing about the product. What would it
  look like if the assistant and the interface were built from the same data?

**Visuals**
- Brand mood: the palette, a sakura/matcha reference image, the wordmark.
- A "before" example if you have one — a screenshot of a generic bolted-on support chat widget, to
  set up the contrast.

**Missing / needs from you**
- Whether there was an earlier framing before this one — what you thought the project was when you
  started in May, versus what it became in July. That shift is honest and interesting.

**Length:** 150–200 words.

---

## 3. Research & Product Opportunity

**Purpose:** Show that the design decisions came from somewhere outside your own head.

**Include**
- Method and sample: how many people, who, what you asked. Keep it factual and proportionate — a
  small sample honestly described is fine; a small sample dressed up as a study is not.
- 2–3 insights, each phrased as a finding rather than an observation. A finding has an implication:
  *"People couldn't tell whether a recommendation was real or generated, so they didn't trust it"*
  beats *"People were unsure about AI."*
- For each insight, name the design decision it produced. This is the section's actual job — the
  through-line from insight to decision. Candidates from the build:
  - trust in AI answers → the "model narrates, data decides" rule (§7.1) and cards rendered from
    real data
  - not knowing what the assistant understood → visible removable filter tags (§7.4)
  - open-ended chat being hard to start → the 8 suggested prompt chips
  - dietary/allergy anxiety → the shared-kitchen advisory and code-resolved dietary filters
- **The opportunity statement**: one sentence naming the gap the project goes after.

**Visuals**
- Insight cards (3 across), each with the resulting design decision beneath it.
- Affinity map, interview quotes, or competitive scan — whatever artifacts exist.

**Missing / needs from you**
- **All of it.** This is `TO FILL IN` in PROJECT.md §4. Interview count, who they were, questions
  asked, what came back.
- Whether any finding actually *changed* something mid-build. Those are the valuable ones — an
  insight that only confirms what you already built is weak evidence.
- If the research was informal, say so and keep this section short. A short honest research section
  is much stronger than a padded one.

**Length:** 200–300 words. Cut it shorter if the research was light.

---

## 4. Scope & Strategy

**Purpose:** Show product judgement — what you chose to build and, more tellingly, what you cut.

**Include**
- MVP scope table: 5 routes and what each one does (PROJECT.md §5).
- **The core architectural decision, framed as product strategy**: one menu database as the single
  source of truth, read by both the Menu page and the assistant. This is the decision everything
  else depends on — it belongs here, not buried in a technical section.
- What was deliberately left out and why: ordering/checkout, reservations, accounts, delivery. The
  assistant is explicitly designed to *decline* these rather than fake them.
- The three interaction modes the assistant supports, and why three: browse (filters), ask (chat),
  and guided (pairing buttons). Different guests arrive with different amounts of certainty.
- User flow diagram for the primary journey: arrive → browse menu → ask for a recommendation →
  refine via tags → pair a dessert.

**Visuals**
- Site map (5 routes).
- Data-flow diagram: `menu.ts` → Menu page **and** → assistant. One box, two arrows. This single
  diagram carries the whole argument.
- The primary user flow.

**Length:** 250–300 words, diagram-led.

---

## 5. Brand & Visual System

**Purpose:** This is where 50% of the work went. It needs to be the visually richest section on the
page.

**Include**
- **Color**: the full token table (PROJECT.md §6.1) — warm near-black base `#1F1814`, cream, blossom
  `#E8D5D2`, matcha `#C1C8BC`, rose `#C09F9D`. Explain *why* warm near-black rather than pure black
  or a light background, and what was tried and rejected.
- **The palette doing semantic work**: guest speaks in blossom pink, Sakura speaks in matcha green.
  Speaker identity legible before a word is read, using brand color instead of the default gray/blue
  chat convention. Small, concrete, memorable — a good pull-quote moment.
- **Typography**: Playfair Display throughout; hierarchy from size, weight, and measure rather than
  a second family. Be honest that this is a deviation from the usual display/text pairing and that
  you'd test a pairing next (PROJECT.md §11).
- **Layout system**: one gutter formula, one `.page-shell`, `--page-max` / `--content-max` /
  `--page-gutter`. Every section aligns to the same edge at every breakpoint.
- **Depth**: three planes — base page, elevated light islands, floating cards — with color-tinted
  shadows (`rgba(192,157,157,0.08–0.32)`) rather than neutral gray.
- **Motion as a named system**, not a list of effects. The premise says "unhurried," so: ambient
  sakura petals with randomized drift, SVG grain at 3.5% soft-light, parallax, opposing 50s/55s
  gallery marquees, one house easing curve `cubic-bezier(0.16, 1, 0.3, 1)`, `transform`/`opacity`
  only.
- **Motion was its own pass**, not sprinkled on during layout — 12 consecutive commits doing nothing
  but animation after the structure was settled. Present that as method.
- **Reduced motion handled twice, deliberately**: CSS strips the ambient layers; the JS hook makes
  the typing effect resolve instantly to full text rather than being skipped, and returns `null`
  until measured so nothing animates before the preference is known.

**Visuals**
- Palette swatches with hex and role.
- Type specimen at real sizes.
- **Motion clips — essential.** Short looping GIF/MP4 of: hero reveal, sakura petals, gallery
  marquee, scroll reveal. Static screenshots cannot carry this section.
- Side-by-side: full motion vs. reduced-motion.
- Spacing/grid overlay on a real page.

**Missing / needs from you**
- The *decision* narrative behind each choice — what you tried before landing here. Currently
  PROJECT.md records the outcome, not the path. Specifically:
  - why `#1F1814` and what was rejected
  - how Playfair was chosen, what it was compared against
  - whether the ambient layers (petals, grain) were planned or added later because the composition
    felt empty
  - what changed between the Figma comp and the build, and why (commit `updated home after Figma`)
  - what happened between the two consecutive `menu animation updated` commits — visible rework is
    good material

**Length:** 400–500 words, and the most image-dense section on the page.

---

## 6. Designing the Menu Experience

**Purpose:** Show UX craft on a conventional surface, before the AI section raises the stakes.

**Include**
- The Menu page rendered entirely from data: 21 items across drinks, desserts, soft serve, plus
  modifiers and tiered soft-serve scoop pricing.
- **Filter chips with live results and an explicit empty state.** Note the empty state as a
  deliberate design object — the case where nothing matches is designed, not left to chance.
- The item data model as a design decision: sweetness and matcha intensity as 0–5 scales, caffeine
  as an ordered level, temperature including `hot-or-iced`. **These scales are what let a sentence
  like "not too sweet" become a checkable condition later** — set this up here so §7 pays it off.
- Recommendation card design: what it shows, why price and allergens live on the card rather than
  in prose.

**Visuals**
- Menu page, full and detail.
- Filter chips: default → filtered → empty state, three frames.
- The data model, shown as an annotated item record.

**Length:** 200–250 words.

---

## 7. Ask Sakura: AI Experience & System Design

**Purpose:** The differentiator. 20% of the hours, and the reason a reviewer remembers the project.

Build it as one argument in four beats, not a feature list.

**Beat 1 — The principle**
> The model may choose what to talk about. It may never be the source of a fact.

Prices, ingredients, allergens, hours, and addresses cross into the UI from data, never from the
model's sentence. Say why: an assistant that confidently quotes a wrong price is worse than no
assistant, because the guest can't tell the difference.

**Beat 2 — Making interpretation visible (the lead idea)**
- A guest types *"something iced, not too sweet, dairy-free, under $10"*; the interpretation appears
  as **removable tags** with a live match count.
- Three things it buys: the guest can see what was understood; can disagree with one part without
  restarting; and matching is arithmetic, so the result set is right even when the interpretation
  isn't.
- The subtle rule: **a direct manipulation outranks an inference.** A tag the guest removed does not
  come back unless they raise the subject again in their own new words.

**Beat 3 — Designing against observed failure**
- Present the failure table (PROJECT.md §7.5) as what it is: a usability-testing log with the model
  as the test subject.
- Pick the two most legible failures rather than all five — "names an item but shows no card" and
  "invents a caffeine constraint nobody asked for" are the easiest to grasp.
- Land the finding: **three of the five started as prompt instructions the model kept violating.
  Moving the requirement into code beat tightening the prompt every time.**

**Beat 4 — Where judgement belongs**
- The pairing flow: code narrows the candidate pool (`vegan` and `dairy-free` resolved entirely in
  code, so an ineligible dessert is never on the menu of options), the model picks within it and
  writes the reason.
- Buttons instead of open questions: a click sends an exact id, not a sentence to be re-interpreted.
- One question per turn, and the options are not repeated in the question text because they are
  already on the buttons below.
- **The panel → chat consolidation**, with before/after: two places to do the same thing is worse
  than one place that handles both typing and clicking.

**Visuals**
- Annotated conversation screenshot: reply bubble, cards, tags, buttons, each labelled with where
  its content comes from (model vs. data). **The single most valuable image in the case study.**
- Filter tags: appearing → one removed → result count updating.
- Failure table as designed graphics, before/after per row.
- Pairing flow as a 4-frame sequence.
- Before/after of the pairing panel vs. in-chat version.

**Length:** 500–600 words. Longest text section, but keep each beat tight.

---

## 8. Final MVP

**Purpose:** Let the finished work be seen properly, without commentary competing with it.

**Include**
- Full-page shots of all five routes, minimal captions.
- 2–3 short conversation walkthroughs showing the assistant handling different intents:
  a recommendation with constraints, a café-facts question (hours/address), a pairing.
- Responsive frames.
- **Implementation compressed to a short block, not a section**: Next.js 16 App Router, React 19,
  TypeScript, Tailwind v4, OpenAI Responses API with strict structured outputs. Three or four lines.
  A design case study loses momentum the moment it turns into an architecture write-up.

**Length:** 100–150 words. Images carry it.

---

## 9. Evaluation, Limitations & Next Steps

**Purpose:** Demonstrate judgement about your own work. Reviewers read this section closely.

**Include**
- **Evaluation** — be careful here. State only what was actually measured. If the assistant's
  behaviour was verified by hand rather than by formal testing, say exactly that; do not imply
  metrics that don't exist.
- **Limitations**, drawn from PROJECT.md §11, chosen for what they show about your judgement:
  - `html { zoom: 0.9 }` as a global scaling shortcut standing in for a real type scale — naming
    your own shortcut is a credibility move
  - single typeface doing display and body work
  - no per-item photography
  - no response streaming; no conversation persistence
  - not yet formally accessibility-audited (focus states and reduced motion were designed
    deliberately; keyboard traversal, live-region announcements, and contrast on light-on-light
    surfaces were not verified)
  - no automated evaluation of the assistant — failure modes were found by hand
- **Next steps**, in priority order: a fixed set of test prompts run against every prompt change,
  streaming, a display/text type pairing, accessibility audit.
- **One reflection paragraph.** The strongest one available: the recurring finding that when a model
  was unreliable, the answer was never a longer prompt — it was moving the requirement into code,
  or into the interface, where it couldn't drift. That generalizes beyond this project, which is
  what makes it worth saying.

**Length:** 250–300 words.

---

## Still blocking a complete draft

1. **§3 research** — nothing usable exists yet. Everything about interviews.
2. **§5 decision narrative** — the *why* behind color, type, and the ambient layers; the Figma-to-build
   delta.
3. **Visual assets** — nothing is production-ready. Needed: clean full-page captures of all five
   routes, annotated conversation states, filter tag sequence, pairing sequence, before/after pairs,
   and motion clips. The existing `temporary screenshots/` were captured for development checking,
   not for presentation.
