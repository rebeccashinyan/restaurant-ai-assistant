# Sakura Bloom Matcha

**This project focuses on building a brand-driven café website designed to attract customers and
enhance the overall customer experience through thoughtful UI/UX and a grounded AI assistant that
helps users explore the menu and make more personalized choices.**

---

> 🖼 **[HERO IMAGE]** — Home page hero, full width. The finished product, before any explanation.

## 1. Overview

- **A matcha café brand I invented** — identity, five pages, and a motion system built to carry an
  unhurried room through a screen
- **The assistant is part of that room, not an exception to it** — no bouncing dots, no emoji, no
  "Great question!". Written to the same brief as the typography
- **The gap it fills:** guests know their preferences — *strong, refreshing, dairy-free, not too
  sweet* — but not which of 21 items matches
- **The constraint:** prices, allergens and product attributes rendered from the menu database,
  never written by the model

| | |
|---|---|
| **Role** | Product designer and front-end developer |
| **Project type** | Self-initiated functional MVP |
| **Timeline** | May – July 2026 |
| **Platform** | Responsive web |
| **Scope** | 5 routes · 21 menu items · 3 interaction modes |
| **Status** | Functional MVP — not user-tested |
| **Stack** | Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · OpenAI Responses API |
| **Brand** | Fictional, created for this project |

- **Where the time went:** ~80% brand, visual and UI/UX design · ~20% AI interaction design
- The brand and the interface do the attracting. The assistant makes the menu navigable once
  someone is interested

> 🖼 **[IMAGE STRIP — 3 up]** — Home hero · Menu page · Ask Sakura mid-conversation with cards.

---

## 2. The Problem

### Core Product Challenges

**1. Standing Out in a Crowded Market**

- Growing number of modern matcha and specialty café brands
- Limited differentiation through products alone
- Need for a recognizable and memorable brand identity
- Stronger connection between brand personality and customer perception

**2. Turning the Brand into an Effective Digital Experience**

- Visually attractive experience without sacrificing usability
- Clear navigation and information hierarchy
- Easy-to-browse menu across desktop and mobile
- Consistent brand expression throughout the website

**3. Helping Customers Decide What to Choose**

- Different levels of familiarity with matcha
- Difficulty understanding menu items, flavors, and ingredients
- Personal preferences not easily translated into a specific drink
- Need for contextual guidance during menu exploration

### Design Challenge

> **How might Sakura create a memorable and easy-to-use digital brand experience that attracts
> customers and helps them choose with confidence?**

> 🖼 **[IMAGE]** — Brand mood: palette, sakura and matcha reference imagery, wordmark.

---

## 3. Research & Insights

### Where this started

**Initial hypothesis:**

> Visual presentation creates interest. Photography and menu descriptions alone may not help a guest
> turn a subjective preference into a confident choice.

- Labelled a **hypothesis**, not a finding — untested with users. See §9
- **Who it assumes:** someone drawn to the idea of a matcha café, never been to this one, unsure how
  drinks differ in sweetness, intensity, milk, temperature, flavour
- *A described audience, not a persona — no research to support one*

**How the project got here:**

- **May – early June:** brand and storefront exercise. No assistant
- **Menu becomes detailed** — sweetness and intensity scales, allergens, dietary flags
- **The question changes:** from *how do I present these attractively* → *how do I help someone who
  doesn't know this menu choose*
- **Late July:** the AI layer, as the answer to the second question — not the starting point

### Approach, and what it can carry

| Method | Type | Supports | Cannot support |
|---|---|---|---|
| **Secondary research** | Desk — published sources, competitor sites | Category context · conventions · where competitors converge | What *these* guests do or want |
| **Internal system testing** | Primary, but the subject is the model | How the assistant behaves under real requests | How a guest reacts to it |
| **Primary user research** | ✕ **Not conducted** | — | — |

- Stated plainly because it changes what every conclusion here is worth
- **Secondary research explains the market. It does not explain a person.** Everything about guest
  behaviour in this case study stays a hypothesis until §9's first next step is done

---

### 3.1 Category context → Challenge 1: standing out

【FILL IN — needs real sources. What to look for, and where it lands:

- Growth and saturation in the matcha / specialty café category — trade press, market reports,
  hospitality industry coverage
- How many new entrants describe themselves in near-identical terms (*minimal, ceremonial-grade,
  Japanese-inspired*)
- Anything on how much of a café's first impression is formed before a visit

**Cite the source inline.** An uncited number is worth less than no number.】

**Where it lands in the design:** if products alone don't differentiate, the site has to carry the
difference — which is why §5 is the largest body of work in the project rather than a skin over the
menu.

### 3.2 Competitive and reference review → Challenge 2: brand into experience

【FILL IN: how many sites reviewed, and which — café and specialty beverage brands, digital menus,
conversational commerce, general support chatbots.】

Reviewed against dimensions chosen for this project, not generic heuristics:

| Dimension | What to look for | Pattern found |
|---|---|---|
| Brand coherence | Does the site keep its character on every page, or only the homepage? | 【FILL IN】 |
| Menu clarity | Is the menu browsable, or a PDF / image dump? | 【FILL IN】 |
| Preference input | Can a guest express *"not too sweet"*, or only pick fixed categories? | 【FILL IN】 |
| Recommendation explanation | Is a reason given, specific to what was asked? | 【FILL IN】 |
| Assistant ↔ product link | Does an assistant's answer connect back to a real, orderable item? | 【FILL IN】 |
| Mobile menu experience | Does browsing survive at phone width? | 【FILL IN】 |

**Where it lands in the design:** the convergence is the opportunity. Every column a competitor
leaves empty is a column this project could fill — see *The opportunity* below.

### 3.3 Internal AI and interaction testing → Challenge 3: helping guests decide

The strongest evidence in the project, and the only place with primary data — though the subject is
the system, not a guest.

- Systematic probing against the scenarios the assistant would face:
  - multiple simultaneous preferences
  - dietary restrictions
  - ambiguous requests
  - comparisons between items
  - pairing requests
  - unsupported actions
  - questions with no answer in the data

| Evidence | Interpretation | Design decision | Still unvalidated |
|---|---|---|---|
| Item named in the reply, no matching card rendered | Prompt instructions don't reliably link prose to interface output | Item names read back out of the reply and matched to real ids | Whether guests notice generated prose vs. verified data |
| ~1 turn in 4 attached a caffeine restriction never mentioned | The model fills schema fields without evidence | New dietary or caffeine conditions must appear in the guest's own words | Whether an unexpected tag confuses or is ignored |
| Drink caught reliably; pairing direction dropped ~half the time | Multi-part free-text intent is unreliable to extract in one pass | Valid answers became buttons — a click sends an exact value | Whether guests prefer buttons or typing |
| Items highlighted that failed the conditions just set | No self-consistency check on output | Highlighted items re-checked against active filters before render | — |
| A direction supplied that the guest never gave — skipping the question, delivering a finished pairing | Given a field, the model fills it regardless of evidence | Direction accepted only from a click or the guest's wording | Whether the extra question reads as helpful or tedious |
| Handover sentence named two desserts; the block below showed a third | The sentence is written before the dessert is chosen — any name in it is a guess | Interface owns that sentence; the model's explanation sits inside the block, written after the choice | — |
| Options listed in the question, duplicating the buttons below | A prompt rule the model wouldn't keep | Both questions have fixed wording the interface supplies | — |
| Established preferences silently cleared by an off-topic question | Empty conditions returned for a café question, read as the guest clearing them | Conditions persist unless the guest's words touch them | — |

- **Evidence about system behaviour — not customer behaviour.** Kept separate on purpose

---

### What this leaves unvalidated

- Whether guests meaningfully struggle to choose from a menu this size
- Whether they would open the assistant at all, rather than just browsing
- Whether conversation improves confidence, or just adds a step
- Whether guests prefer filters, conversation, or the combination
- Whether filter tags read as *the assistant's interpretation*, or as controls the site imposed
- Whether recommendations influence what people actually order

### The opportunity

> Not chat added to a café website. **Visual browsing, structured filtering and conversational
> guidance connected through the same menu data** — all three describing the same products in the
> same terms.

> 🖼 **[IMAGE]** — Competitive convergence: a grid of café sites showing how alike they read.
> 🖼 **[IMAGE]** — The evidence→decision table as designed graphics.

---

## 4. Scope & Strategy

### MVP goal

- To **demonstrate** a branded menu experience and a constrained assistant working as one continuous
  discovery flow
- Demonstrate, not validate — see §9

### Scope

- **5 routes:** Home · Menu · Visit · Contact · Ask Sakura
- **21 items:** 10 drinks · 8 desserts · 3 soft serve
- Plus modifiers and tiered scoop pricing

### The decision everything rests on

> **One menu database, read by both the Menu page and the assistant.**

- Sounds like an engineering choice · is a product one
- Same source → the two **cannot disagree**
- Price change updates both at once
- Item marked unavailable disappears from both at once
- Assistant returns item **ids**, not descriptions → every card is a real product, enforced by the
  response schema
- Same pattern for café facts: hours, address, contact, FAQ → Visit page, Contact, map, accordion,
  **and** the assistant

> 🖼 **[DIAGRAM]** — One box (`menu.ts`), two arrows: → Menu page, → Ask Sakura. The most useful
> image for explaining this project.

### Acceptance criteria

*Not success metrics — nothing measured against users. Conditions the build had to meet:*

- Menu fully browsable and filterable **without** the assistant
- Assistant recommends only items that exist
- Prices, allergens, attributes shown as fact come from menu data
- Inferred conditions visible **and removable**
- Dietary exclusions applied **before** the model selects
- Every recommendation offers a path back to a real menu item
- Core journey works on phone and desktop
- Unsupported actions declined, never simulated

### Three ways in — three levels of certainty

| Mode | The guest | The interface |
|---|---|---|
| **Browse** | Knows which attributes matter, wants direct control | Filter chips |
| **Ask** | Can describe a preference, can't map it to the menu | Conversation |
| **Guided** | Wants help, not served by an empty text field | Bounded choices as buttons |

### The journey

`Arrive → read the brand → browse → hit uncertainty → ask → see the interpreted conditions → remove
or adjust one → grounded recommendations → open an item → request a pairing`

- Most flows end at *receives recommendation*
- **This one assumes the first interpretation will sometimes be wrong** — and designs the correction
  step into the path

### Deliberately excluded

| Excluded | Why |
|---|---|
| Ordering and checkout | The design question is discovery, not transaction |
| Reservations | Same |
| Accounts and **persistent** personalisation | Recommendations are tailored within a conversation, not remembered across visits — that needs returning users the project doesn't have |
| Live inventory | Would make the menu data a moving target |
| Delivery | Out of scope |

- **Exclusion took design work, not just omission** — the assistant is instructed to decline and
  redirect to the phone number
- *"I've booked you a table"* → far worse than *"I can't confirm that"*

> 🖼 **[DIAGRAM]** — Site map and primary flow.

---

## 5. Brand & Visual System

> **The layer that does the attracting.** Nothing else on the site gets a chance to help a guest
> until this has made them want to stay.

*Most of the four months went here.*

### The brand, and the premise it runs on

- Fictional — invented for this project
- **Why invent one rather than borrow a real café:**
  - brand direction end to end — naming, positioning, identity, palette, voice — with no client
    guidelines to apply
  - full control of the menu data, which every later constraint depends on
- **The premise:** a modern matcha café in New York, drawing on tea houses in Tokyo and Kyoto. Calm,
  quiet, built for slowing down

**The premise as a decision tool** — "unhurried" is not a mood board. It rules things out:

| Rejected | Why |
|---|---|
| Pure black background | Reads as a product page — high contrast, high alertness |
| Transition-heavy motion | Draws attention to the interface instead of the room |
| Sales language | Nothing about this brand is trying to close |
| Bouncing dots · emoji · "Great question!" | A support-widget personality, in a café |

- One sentence governing the typography **and** the assistant's voice
- **A premise that only describes a feeling can't be checked. One that rejects things can**

### Color

| Token | Hex | Role |
|---|---|---|
| Base | `#1F1814` | Page background — warm near-black |
| Foreground | `#F7F3ED` | Body text on dark |
| Cream | `#E4DBCA` | Footer, elevated warm surfaces |
| Panel | `#F7F3F0` | Chat and FAQ — light islands on dark |
| Blossom | `#E8D5D2` | Guest messages · primary actions · current-page mark |
| Matcha | `#C1C8BC` | Assistant messages · secondary actions |
| Rose | `#C09F9D` | Borders · focus rings · hover states |

- **Goal:** blossom and matcha accents reading as *light*, not as decoration on top of a page
- **Warm near-black, not pure black** — black is a colour a screen produces and a room never does
- Pure black reads as a product page: high contrast, high alertness. The opposite of the brief

【FILL IN: what was tried before this — including whether a light background was considered, and why
it lost. A rejected direction beside the final one is the most convincing thing a case study can
hold.】

**The palette also carries meaning:**

- Guest speaks in **blossom pink** · Sakura speaks in **matcha green**
- Speaker identity legible before a word is read
- Brand colour doing the work, instead of the grey-and-blue chat convention borrowed from other
  products

> 🖼 **[IMAGE]** — Palette swatches with hex and role.

### Typography

- Playfair Display throughout
- Hierarchy from size, weight and measure — no second family

【FILL IN: alternatives compared, and why Playfair matched the brand.】

- **The honest assessment:**
  - ✓ strong visual continuity, doing real brand work
  - ✕ a serif at body size over a wide measure — harder to read than it needs to be
  - ✕ hierarchy working harder without a contrasting face
- Kept for the MVP · a display/text pairing is in §9

> 🖼 **[IMAGE]** — Type specimen at real sizes.

### Layout

```css
--page-max:     1440px;
--content-max:  1260px;
--page-gutter:  max(1.25rem, (min(100vw, var(--page-max)) - var(--content-max)) / 2);
```

- One formula, one shared class
- Every section aligns to the same edge at every breakpoint
- Zero per-section padding values

### Depth

- Three planes, not one flat surface:
  - **base** — the page
  - **elevated** — light islands: chat panel, FAQ, menu blocks
  - **floating** — cards, tags, buttons
- Colour-tinted shadows drawn from the rose accent, not neutral grey → depth belongs to the palette

### Motion

- **Ambient and slow**, per the premise · transform and opacity only · one house easing curve
- **Sakura petals** — drift, rotation and opacity randomised per petal
- **Grain** — soft-light noise, drifting almost imperceptibly
- **Scroll reveals** — four variants, so a heading, a line and an image block don't all arrive the
  same way
- **Parallax imagery** and a pointer-reactive hero atmosphere
- **Opposing gallery marquees**
- **The assistant's welcome types out** — the one place motion does interaction work rather than
  atmosphere. Tuned to read as *composed*, not as a loading state

> **Method:** motion developed as a dedicated design pass **after** the structural layout was stable
> — so animation could be evaluated as a system, not negotiated component by component.

> 🎞 **[MOTION CLIPS — essential]** — Hero reveal · sakura petals · gallery marquee · scroll reveal.
> Static images cannot carry this section.

### Reduced motion

- Ambient layers removed when the system asks for it
- **Typing effect resolves instantly to full text** — skipping it would leave the guest looking at
  nothing
- Preference read before the first frame → nothing animates and then corrects itself
- Reduced motion as a design question — *what should this become?* — not a switch
- ⚠️ **Not a claim of accessibility compliance.** No formal audit. See §9

> 🖼 **[IMAGE]** — Side by side: full motion vs. reduced motion.

【FILL IN: were the ambient layers planned, or added when the composition felt static? And what
changed between the Figma comp and the build — hero proportions, text width, image cropping,
navigation spacing, motion pacing, mobile ordering.】

> 🖼 **[IMAGE — 3 up]** — Figma composition → first implementation → final.

---

## 6. Designing the Menu Experience

> **Where exploring happens.** The UI/UX layer that turns a list of products into something a guest
> can actually compare — and the data model the assistant later depends on.

- Rendered entirely from the database — no hand-written markup

### Information hierarchy

| Surfaced immediately | Held back |
|---|---|
| Name · price · short description · dietary indicators | Temperature · sweetness · matcha intensity · allergens · ingredients |
| What a guest needs to **choose** | Structured values that power **comparison** |

- Surfacing everything turns a menu into a spreadsheet — the failure the assistant exists to prevent
- **The scales aren't hidden because they don't matter.** Hidden because their job is to be
  compared, not read

### Filtering

- Temperature · sweetness · matcha strength · caffeine · dietary · price · category
- Results update live
- **Empty state as a designed object** — the case a guest is most likely to hit while narrowing

### Subjective language → structured data

*The connection the whole product runs on.*

| Guest says | Menu stores |
|---|---|
| *strong* | matcha intensity 0–5 |
| *not too sweet* | sweetness 0–5 |
| *no caffeine* | ordered caffeine level |
| *iced* | temperature, incl. a value for either |

> **"Not too sweet" is only actionable if sweetness is a number.**

- Modelling taste as ordered values, not adjectives in a description field
- Decided while building the Menu page → **made the assistant possible two weeks later**

### Responsive behaviour

| | Desktop | Phone |
|---|---|---|
| **Navigation** | Five links inline, wordmark opposite | Wordmark leads, links collapse behind a menu control |
| **Menu listing** | Category blocks, alternating image sides | Single column, images stacked above sections |
| **Filter chips** | Inline row beside results | Wrapped, result count staying in view |
| **Recommendation cards** | Two per row beside the reply | Full width, stacked |
| **FAQ** | Two columns — intro beside accordion | Single column, intro first |
| **Hover states** | Underline grows in on hover | No hover to rely on → current page marked persistently |

**The navigation is the example worth showing:**

- Original inline nav at phone width → wrapped to two lines, **22% of screen height before any
  content**
- Rebuilt as a collapsible panel → single line
- Gained what the site lacked at every width: a visible current-page indicator, plus hover and focus
  states on links that had none
- **Measuring surfaced a real defect:** a global scaling shortcut (`zoom: 0.9` + reduced root font
  size) shrinking anything in relative units → menu control at **32px against a 44px minimum**
- A convenience at the top of the stylesheet → an accessibility problem four months later. First on
  the list in §9

> 🖼 **[IMAGE — desktop/mobile pairs]** — Navigation · menu listing · filter chips · recommendation
> cards · empty state.

### Where the assistant appears

- A route in the main navigation — **not a floating bubble**
- A destination for guests who want help, not an interruption for guests who don't
- Browsing never requires acknowledging it

### Why facts live on cards, not in prose

- Easier to scan
- Consistent between Menu page and chat
- Reusable
- Tied directly to structured data
- Comparable side by side
- **Not subject to model variation**

> 🖼 **[IMAGE]** — Menu page, full and detail · filter states · an annotated item record.

---

## 7. Ask Sakura: AI Experience & System Design

> **Grounded, and part of the same room.** Tailored to what a guest actually says, answering only
> from real menu data — and held to the same brief as the typography.

### Why conversation, and not just filters

| Tool | Fails when |
|---|---|
| **Search** | You don't know the word — no search for "hojicha" if you've never heard it |
| **Filters** | You don't know which attributes exist, or which matter to you |
| **FAQ** | Nothing combinational |
| **Conversation** | — *"creamy, refreshing, dairy-free, not too sweet"*: four conditions at once |

> **Conversation doesn't replace the filters. It produces them.**

| Designed to | Not designed to |
|---|---|
| Recommend menu items | Place orders |
| Compare two drinks | Confirm inventory |
| Answer ingredient and café questions | Guarantee allergen safety |
| Explain matcha terminology | Handle reservations |
| Guide dessert pairings | Act as general-purpose chat |

### The principle

> **The model interprets intent and explains a choice. Not the source of the product facts the
> interface presents as authoritative.**

- **Asymmetric risk:** a confidently wrong price is worse than no assistant — the guest can't tell
  the difference
- Fluency reads as authority · a model is fluent whether or not it's right

| | Enforced by | Residual risk |
|---|---|---|
| Item identity on cards | Response schema — ids from an enum of real items | None: an unreal id cannot be returned |
| Price, allergens, ingredients, dietary flags | Rendered from the database by the interface | None on the card itself |
| Prices or ingredients **inside the reply text** | Instruction not to state them | **The model could still write one** — a rule, not a mechanism |
| Hours, address, contact details | Instruction to copy verbatim | **Same** — no card, so prose carries them |

- **Data-controlled:** what the interface presents as fact
- **Instruction-governed:** the prose beside it — the weaker link
- → every fact a guest acts on lives on a card, not in a sentence

> 🖼 **[KEY IMAGE]** — Annotated conversation screenshot: reply text → model · item name, price,
> allergens, photo → database · filter tags → interpretation · buttons → interface. **The most
> important image in this case study.**

### Making the interpretation visible

- Guest types *"something iced, not too sweet, dairy-free, under $10"*
- Interpretation becomes **removable tags** with a live match count — not hidden in a prompt

| | |
|---|---|
| **Visible** | *"not too sweet"* → **Sweetness 2 of 5 or less** — a translation they can check |
| **Correctable** | Disagree with one condition by clicking it away, not by writing another sentence |
| **Deterministic** | Code decides what matches → a misreading becomes a wrong tag they can see, not a wrong recommendation they can't detect |

- **The hard part — honouring a removal:** the model reports back anything still visible in the
  history → removals live in interface state instead

> **A direct manipulation outranks an inference.** Guest touched it → the interface is wrong to
> argue.

> 🖼 **[IMAGE — 3 frames]** — Tags appearing → one removed → match count updating.

### Designing against observed failure

- None written in advance — each answers a failure watched happening
- The build as a testing log, with the model as the subject

| Observed failure | Design response |
|---|---|
| Reply recommends an item · no card appears | Item names read back out of the sentence, matched to real ids |
| ~1 turn in 4 invents a condition nobody asked for | New dietary or caffeine conditions must appear in the guest's own words |
| A pairing direction supplied that the guest never gave — skipping the question | Direction accepted only from a click or the guest's wording. Not knowing → ask |
| Handover sentence names desserts the block then contradicts | Interface supplies that line; the model's explanation sits inside the block, written after the choice |
| Question arrives with the options listed, duplicating the buttons below | Both questions have fixed wording the interface owns |
| A café question silently clears established conditions | Changing the subject ≠ changing your mind |

- Almost every row began as an instruction in the prompt that the model kept violating

> **When a model is unreliable, the answer is rarely a longer prompt.**

- ⚠️ **One row resists this.** The reply can still name an item failing the conditions it just set —
  the card is correctly withheld, so the sentence over-promises. Needs a structural fix, not a
  better-worded rule. See §9

### Where judgement belongs

- **Code narrows the candidates · the model chooses within them**
- Dietary directions resolved in code → an ineligible dessert never on the table
- *Which* dessert and *why* → the part a model does better than a rule
- Buttons carry the answers → an exact value, not a sentence to re-interpret

> Responsibility assigned by reliability: **code controls eligibility · the model provides
> interpretation and explanation · the guest keeps final control through visible interface state.**

> 🖼 **[IMAGE — 4 frames]** — The pairing flow, start to result.

### Guardrails, in summary

| Risk | System response |
|---|---|
| Invented product | Recommendations must reference a valid item id |
| Wrong price or allergen | Verified values rendered from menu data |
| Dietary risk | Eligibility rules applied before the model selects |
| Unsupported action | Declined, redirected to phone or email — never simulated |
| Ambiguous request | One high-value clarifying question, not a guess |
| Guest rejects an inference | The removal preserved in interface state |
| Allergy raised | Shared-kitchen advisory — never a certification of safety |
| "Are you open right now?" | No clock — posted hours, read against the guest's own |

---

## 8. Final MVP

> 🖼 **[IMAGES]** — Full-page captures: Home · Menu · Visit · Contact · Ask Sakura.
> 🖼 **[IMAGES — 3 walkthroughs]** — A recommendation with constraints · a café-facts question · a
> completed pairing.
> 🖼 **[IMAGES]** — Responsive frames.

### Working

- Responsive navigation
- Menu rendered from structured data
- Filtering with live results and an empty state
- Real model responses
- Visible, removable interpreted conditions
- Menu-grounded recommendation cards
- Café information answers
- The pairing flow
- Links from assistant results back to menu items
- Loading and error states on every failure path

### Not included

- Checkout · payment · live inventory · reservations · accounts · conversation persistence
- **Personalisation across visits** — recommendations are tailored to what a guest says in the
  conversation, not to a remembered profile

### What implementation changed about the design

| Change | Origin |
|---|---|
| **Menu content became structured data** — began as page copy | Typed records with scales and flags → made filtering *and* grounded recommendations possible. The most consequential change in the project |
| **Buttons replaced free text in the pairing flow** | Watching intent extraction fail on real sentences |
| **Mobile navigation rebuilt** | Measuring it: two lines, 22% of the screen, touch targets below the accessible minimum |

**Implementation:** Next.js 16 App Router · React 19 + TypeScript · Tailwind CSS v4 · OpenAI
Responses API with strict structured outputs, item ids constrained to real menu entries.

---

## 9. Evaluation, Limitations & Reflection

### How it was evaluated

| Method | What it covered |
|---|---|
| **Functional QA** | Navigation · responsive breakpoints · filters · empty states · loading and error states · links · repeated interactions |
| **Scenario-based AI testing** | The §3.3 scenarios — assessing groundedness, factual correctness, visible interpretation, actionability, recovery, tone |
| **Usability testing** | ✕ **Not done.** No formal testing with target users |

- My own systematic testing is evidence about **the system**, not about guests — not presented as
  the other

### Limitations

**Most significant:**

- **No usability testing** → every claim about guest confidence here is a hypothesis
- **No automated evaluation** → a prompt change could silently reintroduce a fixed failure. Several
  were found only by capturing the finished flow and reading it closely — not a process that scales
- **The prose can still contradict its own conditions** → an item named that fails the filters just
  set; the card is correctly withheld, so the sentence over-promises
- **Allergy handling needs operational validation** → a design response, not a food-safety process
- **No conversation persistence** → a refresh loses the thread

**Craft and technical debt:**

- Global scaling shortcut (`zoom: 0.9` + reduced root font size) standing in for a real type scale —
  already caused one measurable accessibility defect
- One typeface doing display and body work
- No per-item photography
- No response streaming
- No formal accessibility audit — focus states and reduced motion designed deliberately; keyboard
  traversal of the chat, live-region announcements and light-on-light contrast unverified

### Next steps

1. **Usability testing** with people at different levels of matcha familiarity — everything else is
   guessing until this happens
2. **A fixed benchmark set of prompts**, re-run after every prompt or model change
3. **Two-pass recommendations** — extract conditions → narrow the menu → let the model choose and
   write within the narrowed set, so the prose cannot contradict the tags
4. **Accessibility audit** — keyboard navigation, focus behaviour, live regions, contrast
5. Stronger dietary and allergy safeguards, with an operational process behind them
6. Replace the scaling shortcut with a real type scale
7. Streaming and conversation persistence
8. Test a display/body type pairing
9. Connect recommendations to ordering — only after discovery is validated

### Reflection

**On the brand**

> **A premise is only worth having if it can say no.**

- The rejections in §5 are the whole argument — pure black, transition-heavy motion, sales language,
  chatbot conventions
- All refused by one sentence, across two disciplines that don't normally share a brief:
  **typography and an assistant's voice**
- A premise that can only be *felt* is decoration. One that can **reject** is a tool

**On designing with AI**

> **Unreliable model behaviour could not be solved by writing more detailed instructions.**

- Three separate attempts at a firmer instruction · three violations — not malicious, just
  probabilistic
- What worked: moving the requirement somewhere it couldn't drift

| Moved from | Moved to |
|---|---|
| Facts in the prompt | Structured data |
| Eligibility rules in the prompt | Application logic |
| Corrections the model was asked to remember | Interface state |
| Valid answers as a sentence to parse | Buttons |

- Each time: **more dependable *and* less work** than the prompting it replaced

> The model is not the product, and prompting is not the design work. **The design work is deciding
> what the model is allowed to be responsible for** — bounded judgement rather than full control,
> with the interface making everything else somebody else's job.
