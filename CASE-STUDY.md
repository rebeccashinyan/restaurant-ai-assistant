# Sakura Bloom Matcha

**A café menu experience where the product facts on screen come from structured data, not from what
the model wrote.**

---

> 🖼 **[HERO IMAGE]** — Home page hero, full width. The finished product, before any explanation.

## 1. Overview

Sakura Bloom Matcha is a responsive café site with a conversational concierge built into it. The
assistant recommends drinks and desserts, answers practical questions about visiting, and runs a
guided dessert-pairing flow.

It exists to do something a menu can't. Guests often know what they want — *strong, refreshing,
dairy-free, not too sweet* — without knowing which of 21 items matches. The assistant translates
that language into visible, editable menu conditions, and every price, allergen, and product
attribute it shows is rendered from the menu database rather than written by the model.

The question I started from, and still think is the right one to ask:

> When a website has a conversational AI in it, what is actually being designed?

| | |
|---|---|
| **Role** | Product designer and front-end developer |
| **Project type** | Self-initiated functional MVP |
| **Timeline** | May – July 2026 |
| **Platform** | Responsive web |
| **Scope** | 5 routes · 21 menu items · 3 interaction modes |
| **Status** | Functional MVP — not user-tested |
| **Stack** | Next.js 16, React 19, TypeScript, Tailwind CSS v4, OpenAI Responses API |
| **Brand** | Fictional, created for this project |

**Where the time went: roughly 80% brand, visual, and UI/UX design; 20% AI interaction design.** The
smaller share is what makes the project unusual, so it gets a section of its own — but the bulk of
the work was the site itself.

> 🖼 **[IMAGE STRIP — 3 up]** — Menu page · Ask Sakura mid-conversation with recommendation cards ·
> a completed dessert pairing.

---

## 2. The Premise & Product Problem

### The brand

Sakura Bloom Matcha does not exist. Inventing it was deliberate rather than a fallback: the whole
project depends on controlling the menu data, because the constraints that keep the assistant honest
are built on top of it. A real client's menu — half-documented, changing weekly — would have made
the core idea untestable.

The premise: a modern matcha café in New York, drawing on tea houses in Tokyo and Kyoto. Calm, quiet,
designed for slowing down.

That premise is not decoration. It creates a constraint that governs every later decision — **the
site has to feel unhurried** — and that single requirement rules out most of the standard
conversational-UI vocabulary. No bouncing dots. No emoji. No exclamation marks. No "Great question!"
openers. An assistant behaving like a support widget would break the room the rest of the site spent
months building.

### Who it's for

Guests who are interested in matcha but don't necessarily know how drinks differ in sweetness,
intensity, milk, temperature, or flavour profile — the person who likes the idea of a matcha café
but can't tell a Hojicha Blossom Latte from a Bloom Dirty Matcha by name.

*(Not a persona. A described audience, because I don't have the research to support a persona.)*

### Initial hypothesis

> Visual presentation could create interest, but photography and menu descriptions alone might not
> help a guest translate a subjective preference into a confident choice.

Calling this a hypothesis rather than a finding is the honest framing: it's what I believed when the
project turned toward the assistant, and it has not been validated with users. §9 says what that
means for the conclusions.

### The problem, in two layers

**The customer problem.** Guests can describe what they want in their own words — *something strong,
not too sweet, no dairy* — but a menu is organised by product name and category, not by preference.
The translation between the two is work the guest has to do alone, using descriptions that were
written to sound appealing rather than to be compared.

**The product-design problem.** A conversational assistant could do that translation, but the usual
implementation makes it worse rather than better: a chat widget bolted into the corner, disconnected
from the real menu, able to describe items fluently and inaccurately. Fluency reads as authority,
and a guest has no way to tell a correct answer from a confident one.

### How the project got here

It started as a brand and storefront exercise. Through May and early June the work was entirely
identity, layout, and motion — the assistant didn't exist. As the menu became genuinely detailed —
sweetness and intensity scales, allergens, dietary flags — the design question changed underneath
me. It stopped being *how do I present these products attractively* and became *how do I help
someone who doesn't know this menu choose between them*. The AI layer was the answer to the second
question, not the starting point.

> 🖼 **[IMAGE]** — Brand mood: palette, sakura and matcha reference imagery, wordmark.

> 🖼 **[IMAGE — before/after]** — The first version of dessert pairing as a standalone panel, beside
> the final in-chat version. A real before-and-after from this project, rather than a competitor
> screenshot used as a straw man.

---

## 3. Research, Testing & Product Opportunity

> ⚠️ **SCAFFOLD — parts of this section are not yet publishable.**
> Three kinds of evidence are separated below because they are not equally strong. Sections 3.1 and
> 3.2 need your real material. **Section 3.3 is complete and is currently the strongest evidence in
> the project.** Delete anything you cannot support — three honest findings beat five padded ones.

### 3.1 Competitive and reference review

【FILL IN: how many references you actually looked at, and what they were — café sites, digital
menus, restaurant recommendation products, conversational commerce, generic support chatbots.】

Compare them on dimensions that matter to this project, not generic ones:

| Dimension | What to look for |
|---|---|
| Brand coherence | Does the assistant look and sound like the rest of the site, or like a vendor widget? |
| Preference input | Can a guest express *"not too sweet"*, or only pick from fixed categories? |
| Recommendation explanation | Is a reason given, and is it specific to what was asked? |
| Assistant ↔ product link | Does a recommendation connect back to a real, purchasable item? |
| Discovery support | What happens when the guest doesn't know the vocabulary? |

### 3.2 Informal user feedback

【FILL IN, **only if it happened**: how many people, their familiarity with matcha, what you asked
them, what they actually said or did, and what changed as a result.

Keep the label accurate. "Five informal conversations with people who order matcha regularly" is
respectable. Calling the same thing usability research is not — and it's the kind of claim that
collapses under one follow-up question.】

### 3.3 Internal AI and interaction testing

This is where the strongest evidence in the project actually came from. I tested the assistant
systematically against the scenarios it would face: multiple simultaneous preferences, dietary
restrictions, ambiguous requests, comparisons between items, pairing requests, requests for things
the café doesn't offer, and questions whose answers aren't in the data.

It produces findings about **system behaviour**, not about customer behaviour — a distinction worth
keeping visible.

| Evidence | Interpretation | Design decision | Still unvalidated |
|---|---|---|---|
| The model named an item in its reply but didn't return the matching structured id, so no card rendered | Prompt instructions did not reliably enforce the link between prose and interface output | Item names are read back out of the reply text and matched to real ids, so a mentioned item always produces a card | Whether guests notice the difference between generated prose and verified data |
| Around one turn in four, a request that never mentioned caffeine came back with a caffeine restriction attached | The model fills schema fields it has no evidence for | A new dietary or caffeine condition is rejected unless the term appears in the guest's own words | Whether an unexpected tag would confuse a guest or just be ignored |
| The model reliably caught which drink a guest named, but dropped the *kind* of pairing wanted about half the time | Free-text intent with several parts is unreliable to extract in one pass | The valid answers became buttons; a click sends an exact value | Whether guests prefer choosing from buttons or typing freely |
| The model highlighted items that failed the conditions it had just set | The model does not check its own output for internal consistency | Highlighted items are re-checked against the active filters before rendering | — |
| Asked which kind of pairing the guest wanted, the model supplied a direction they had never given — skipping its own question and delivering a finished pairing | Given a field to fill, the model fills it whether or not the evidence exists | The direction is accepted only from an explicit click or the guest's own wording. Anything else means we don't know yet, and asking is the correct failure | Whether guests find the extra question helpful or tedious |
| The reply named two desserts while the pairing block below it showed a third | The sentence is written before the dessert is chosen, so any dessert named in it is a guess | The interface owns that sentence: a fixed handover line, with the model's explanation carried inside the pairing block where it is written *after* the choice | — |
| The question "what kind of pairing?" arrived with the options listed in the sentence, duplicating the buttons directly below it | A prompt rule the model would not keep | The two questions have fixed wording the interface supplies | — |
| A guest who asked about opening hours had their established preferences silently cleared | The model returns empty conditions for an off-topic question, which the interface read as the guest clearing them | Changing the subject is not changing your mind: conditions persist unless the guest's words touch them | — |

### Assumptions still to validate

Listed as open questions, because none of them have been tested:

- Whether guests meaningfully struggle to choose from a menu this size
- Whether they would open the assistant at all, rather than just browsing
- Whether conversation improves confidence in a choice, or just adds a step
- Whether guests prefer filters, conversation, or the combination
- Whether visible filter tags are understood as *the assistant's interpretation*, or read as controls the site imposed
- Whether recommendations influence what people actually order

### The opportunity

The opportunity was not to add chat to a café website. It was to connect visual browsing, structured
filtering, and conversational guidance through the same menu data, so that all three describe the
same products in the same terms.

> 🖼 **[IMAGE]** — The evidence→decision table as designed graphics.

---

## 4. Scope & Strategy

### MVP goal

To demonstrate that a branded menu experience and a constrained conversational assistant can work as
one continuous discovery flow, rather than as a website with a chatbot attached.

Demonstrate, not validate — the difference matters, and §9 holds the line on it.

### What I built

Five routes: **Home**, **Menu**, **Visit**, **Contact**, and **Ask Sakura**. The menu holds 21 items
— 10 drinks, 8 desserts, 3 soft serve — plus modifiers and tiered scoop pricing.

### The decision everything else rests on

One menu database, read by both the Menu page and the assistant.

This sounds like an engineering choice and is really a product one. Because the Menu page and Ask
Sakura render from the same source, they cannot disagree. A price change updates both at once. An
item marked unavailable disappears from both at once. The assistant returns item *ids* rather than
item descriptions, so every card a guest sees is a real product rendered from real data — enforced
by the response schema, not by asking the model nicely.

The same pattern covers the café itself: hours, address, contact details, and the FAQ live in a
second file read by the Visit page, the Contact section, the map, the FAQ accordion, **and** the
assistant.

> 🖼 **[DIAGRAM]** — One box (`menu.ts`), two arrows: → Menu page, → Ask Sakura. The single most
> useful image for explaining this project.

### Acceptance criteria

Not success metrics — nothing here was measured against users. These are the conditions the build
had to satisfy to be worth showing:

1. Guests can browse and filter the whole menu without using the assistant at all.
2. The assistant only ever recommends items that exist on the menu.
3. Prices, allergens, and product attributes shown as fact come from menu data.
4. Guests can see the conditions the assistant inferred, and remove any of them.
5. Dietary exclusions are applied before the model is allowed to choose.
6. Every recommendation offers a visible path back to a real menu item.
7. The core journey works on phone and desktop.
8. Unsupported actions are declined rather than simulated.

### Three ways in, for three levels of certainty

Not three features — three different states a guest can arrive in:

- **Browse** — the guest knows which attributes matter and wants direct control. Filter chips.
- **Ask** — the guest can describe a preference but doesn't know how it maps to the menu.
  Conversation.
- **Guided** — the guest wants help but is not served by an empty text field. Bounded choices
  offered as buttons.

### The journey

Arrive → read the brand → browse the menu → hit uncertainty → ask for guidance → see the
interpreted conditions → remove or adjust one → get grounded recommendations → open a menu item →
ask for a pairing.

The interesting part is the middle. Most flows end at "receives recommendation"; this one assumes
the first interpretation will sometimes be wrong and designs the correction step into the path.

### What I deliberately left out

| Excluded | Why |
|---|---|
| Ordering and checkout | The design question is discovery and decision support, not transaction completion |
| Reservations | Same |
| Accounts and personalisation | Requires returning users the project doesn't have |
| Live inventory | Would make the menu data a moving target |
| Delivery | Out of scope |

Leaving these out took design work rather than just omission: the assistant is explicitly instructed
to **decline** them and redirect to the phone number. A confident *"I've booked you a table"* would
be far worse than *"I can't confirm that."*

> 🖼 **[DIAGRAM]** — Site map and primary flow.

---

## 5. Brand & Visual System

Most of the four months went here.

### Color

**Direction → problem → revision → rationale.**

The palette needed the blossom and matcha accents to read as *light* rather than as decoration
placed on top of a page.

| Token | Hex | Role |
|---|---|---|
| Base | `#1F1814` | Page background — warm near-black |
| Foreground | `#F7F3ED` | Body text on dark |
| Cream | `#E4DBCA` | Footer, elevated warm surfaces |
| Panel | `#F7F3F0` | Chat and FAQ surfaces — light islands on dark |
| Blossom | `#E8D5D2` | Guest messages, primary actions, the current-page mark |
| Matcha | `#C1C8BC` | Assistant messages, secondary actions |
| Rose | `#C09F9D` | Borders, focus rings, hover states |

`#1F1814` rather than pure black because black is a colour a screen produces and a room never does.
The premise is a quiet café; pure black reads as a product page — high contrast, high alertness,
exactly the register the brand is trying to avoid.

【FILL IN: what you tried before this. A rejected direction shown beside the final one is one of the
most convincing things a case study can contain — including whether a light background was
considered and why it lost.】

**The palette also does semantic work.** In the chat, the guest speaks in blossom pink and Sakura
speaks in matcha green. Speaker identity is legible before a word is read, using the brand's own
colours instead of importing the grey-and-blue chat convention that belongs to some other product.

> 🖼 **[IMAGE]** — Palette swatches with hex values and roles.

### Typography

Playfair Display throughout, with hierarchy carried by size, weight, and measure rather than a
second family.

【FILL IN: what alternatives you compared, and why Playfair matched the brand.】

The honest assessment: the single-family system creates strong visual continuity, but longer body
passages expose its limits — a serif at body size over a wide measure is harder to read than it
needs to be, and hierarchy has to work harder without a contrasting face. I kept it for the MVP
because the continuity is doing real brand work. Testing a display/text pairing is in §9.

> 🖼 **[IMAGE]** — Type specimen at real sizes.

### Layout

One gutter formula for the entire site, applied through a single shared class:

```css
--page-max:     1440px;
--content-max:  1260px;
--page-gutter:  max(1.25rem, (min(100vw, var(--page-max)) - var(--content-max)) / 2);
```

Every section on every page aligns to the same edge at every breakpoint, without a single
per-section padding value.

### Depth

Three planes rather than one flat surface: the base page, elevated light islands (chat panel, FAQ,
menu blocks), and floating elements (cards, tags, buttons). The floating layer uses colour-tinted
shadows drawn from the rose accent rather than neutral grey, so depth belongs to the palette instead
of sitting on top of it.

### Motion

The premise says unhurried, so the motion system is ambient and slow. Everything animates transform
and opacity only, on one house easing curve.

- **Sakura petals** — an ambient layer behind all content, with drift, rotation, and opacity
  randomised per petal.
- **Grain** — a soft-light noise layer that drifts almost imperceptibly.
- **Scroll reveals** — four variants with distinct characters, so a heading, a line, and an image
  block don't all arrive the same way.
- **Parallax imagery** and a pointer-reactive hero atmosphere.
- **Opposing gallery marquees**.
- **The assistant's welcome types out**, character by character, with a longer pause at punctuation.
  This is the one place motion does interaction work rather than atmosphere: the pacing establishes
  Sakura as a presence that speaks before the guest has sent anything. It's tuned to read as
  *composed*, not as a loading state.

**Motion was developed as a dedicated design pass after the structural layout was stable**, so
animation could be evaluated as a system rather than added component by component. That sequencing
is the method worth taking away — the choreography is consistent because it was designed once, not
negotiated eleven times.

> 🎞 **[MOTION CLIPS — essential]** — Hero reveal · sakura petals · gallery marquee · scroll reveal.
> Static images cannot carry this section.

### Reduced motion

The ambient layers are removed when the system asks for reduced motion. The typing effect needed a
different answer: skipping it would leave the guest looking at nothing, so it **resolves instantly
to the full text**. The preference is read before the first frame, so nothing animates and then
corrects itself.

Reduced motion was a design question — *what should this become?* — rather than a switch. **That is
not a claim of accessibility compliance**: the product has not had a formal audit, and §9 says what
remains unchecked.

> 🖼 **[IMAGE]** — Side by side: full motion vs. reduced motion.

【FILL IN: were the ambient layers planned from the start, or added when the composition felt too
static? And what changed between the Figma comp and the build — hero proportions, text width, image
cropping, navigation spacing, motion pacing, mobile ordering. Coding always reveals something the
comp didn't.】

> 🖼 **[IMAGE — 3 up]** — Figma composition → first implementation → final.

---

## 6. Designing the Menu Experience

The Menu page renders entirely from the database. Nothing on it is hand-written markup.

### Information hierarchy

Every item carries far more data than the page shows. What surfaces immediately is what a guest
needs to *choose*: name, price, a short description, and dietary indicators. Temperature, sweetness,
matcha intensity, allergens, and ingredients exist as structured values but stay out of the default
view — surfacing all of them would turn a menu into a spreadsheet, which is precisely the failure the
assistant exists to prevent.

The scales aren't hidden because they don't matter. They're hidden because **their job is to power
comparison, not to be read.**

### Filtering

Guests filter by temperature, sweetness, matcha strength, caffeine, dietary needs, price, and
category, with results updating live. The **empty state is a designed object** — the case where
nothing matches is the one a guest is most likely to hit while narrowing, and leaving it undesigned
would undo the calm the rest of the page works for.

### Subjective language, structured data

This is the connection the whole product runs on.

Guests express preferences subjectively — *strong*, *light*, *not too sweet*. The menu represents
those same qualities as consistent scales: sweetness and matcha intensity from 0 to 5, caffeine as an
ordered level, temperature including a value for items served either hot or iced.

**Modelling taste as ordered values rather than as adjectives in a description field is what lets a
sentence become a condition the interface can check.** "Not too sweet" is only actionable if
sweetness is a number. That decision, made while building the Menu page, is what made the assistant
possible two weeks later.

### Responsive behaviour

The site is phone-first in use even though it was designed at desktop width, and testing at real
device sizes changed the design rather than just rescaling it.

| | Desktop | Phone |
|---|---|---|
| **Navigation** | Five links inline, wordmark opposite | Wordmark leads, links collapse behind a menu control |
| **Menu listing** | Category blocks with alternating image sides | Single column, images stacked above their sections |
| **Filter chips** | Inline row beside results | Wrapped, with the result count staying in view while filtering |
| **Recommendation cards** | Two per row beside the reply | Full width, stacked, so the item name and price stay legible |
| **FAQ** | Two columns — intro beside the accordion | Single column, intro first |
| **Hover states** | Underline grows in on hover | No hover to rely on, so the current page is marked persistently |

**The navigation is the example worth showing.** At phone width the original inline navigation
wrapped onto two lines and consumed 22% of the screen height before any content appeared. Rebuilding
it as a collapsible panel brought the bar down to a single line, and gave the site something it had
been missing at every width: a visible indication of which page you are on, and hover and focus
states on links that previously had none.

Measuring it also surfaced a real defect. A global scaling shortcut in the stylesheet
(`zoom: 0.9`, plus a reduced root font size) was silently shrinking anything sized in relative units
— the menu control measured 32px against a 44px minimum touch target. It had to be sized explicitly
to compensate. **A convenience at the top of the stylesheet had become an accessibility problem four
months later**, which is why replacing it is first on the list in §9.

> 🖼 **[IMAGE — desktop/mobile pairs]** — Navigation · menu listing · filter chips · recommendation
> cards · empty state.

### Where the assistant appears

"Ask Sakura" is a route in the main navigation, not a floating bubble. It's positioned as a
destination for guests who want help, rather than an interruption for guests who don't — browsing
the menu never requires acknowledging it.

### Why facts live on cards, not in prose

Prices, allergens, and attributes appear on recommendation cards rather than inside the assistant's
sentences because cards are easier to scan, consistent between the Menu page and the chat, reusable,
directly tied to structured data, comparable side by side — and, critically, **not subject to model
variation**.

> 🖼 **[IMAGE]** — Menu page, full and detail; filter states; an annotated item record.

---

## 7. Ask Sakura: AI Experience & System Design

### Why conversation belongs here at all

Not because AI is interesting. Because the other tools fail at a specific point:

- **Search** requires knowing the right term. A guest who doesn't know "hojicha" cannot search for it.
- **Filters** require knowing which attributes exist and which matter to you.
- **An FAQ** answers isolated questions and nothing combinational.

A guest may not know to search for a particular drink or which filters to set — but they can say
*"something creamy, refreshing, dairy-free, and not too sweet."* Conversation earns its place when it
turns that sentence into visible, editable menu conditions.

**It doesn't replace the filters. It produces them.** The product is stronger because both exist.

### What it's for, and what it isn't

| Designed to | Not designed to |
|---|---|
| Recommend menu items | Place orders |
| Compare two drinks | Confirm inventory |
| Answer ingredient and café questions | Guarantee allergen safety |
| Explain matcha terminology | Handle reservations |
| Guide dessert pairings | Act as general-purpose chat |

### Beat 1 — The model narrates, the data decides

> **The model interprets intent and explains a choice. It is not the source of the product facts the
> interface presents as authoritative.**

The reason is asymmetric risk. An assistant that confidently quotes a wrong price is worse than no
assistant, because the guest cannot tell the difference. Fluency reads as authority, and a language
model is fluent whether or not it is right.

**Where the guarantee is real, and where it isn't** — worth being precise about, because "the AI
can't get it wrong" is a claim almost no product can honestly make:

| | Enforced by | Residual risk |
|---|---|---|
| Item identity on cards | Response schema — ids come from an enum of real items | None: an id that isn't a real product cannot be returned |
| Price, allergens, ingredients, dietary flags | Rendered from the database by the interface | None on the card itself |
| Prices or ingredients inside the reply text | Instruction not to state them | The model could still write one — a rule, not a mechanism |
| Hours, address, contact details | Instruction to copy verbatim from data | Same — these have no card, so prose carries them |

The honest version: **everything the interface presents as a fact is data-controlled; the prose
beside it is governed by instruction and is the weaker link.** The design absorbs that by moving the
facts a guest acts on — what it costs, what's in it, whether it's safe for them — out of the sentence
and onto a card.

A side effect I didn't anticipate: forbidding prices and ingredient lists in the prose forces the
assistant to talk about **taste, texture, and fit** instead — which is what a good server does
anyway. The constraint that protects accuracy also produced better copy.

> 🖼 **[KEY IMAGE]** — An annotated conversation screenshot, labelling every element with where its
> content comes from: reply text → model; item name, price, allergens, photo → database; filter tags
> → interpretation; buttons → interface. The most important image in this case study.

### Beat 2 — Making interpretation visible

A guest types: *"something iced, not too sweet, dairy-free, under $10."*

The assistant's reading of that sentence doesn't stay hidden. It appears as **removable tags** —
`Iced`, `Sweetness 2 of 5 or less`, `Dairy-free`, `Under $10` — with a live count of matching items.

1. **The guest can see what was understood.** "Not too sweet" becoming *Sweetness 2 of 5 or less* is
   a translation they can check.
2. **They can disagree with one part without starting over.** Removing a condition is a click, not a
   sentence like *"no wait, I don't actually care about caffeine."*
3. **Matching is deterministic relative to the tags.** The model may still misread the original
   request — but the condition that produced the results is visible, and the guest can correct it.
   The failure mode becomes a wrong tag they can see, instead of a wrong recommendation they can't
   detect.

The subtle part was **respecting a removal**. A guest who takes off "dairy-free" should not have it
quietly restored on the next turn because it's still sitting in the conversation history. Asking the
model to track this failed — it reports back anything it can still see. So removals are held in
interface state and re-applied after every reply. A removed condition returns only when the guest
raises that subject again in their own new words.

> **A direct manipulation outranks an inference.** If the guest touched it, the interface is wrong to
> argue.

> 🖼 **[IMAGE — 3 frames]** — Tags appearing → one removed → match count updating.

### Beat 3 — Moving unreliable requirements out of the prompt

**Expected:** every item named in a reply also renders as a card.
**Failure:** the reply recommended an item and no card appeared — a recommendation with no price, no
photo, no allergens.
**Prompt attempt:** an explicit instruction to always return the id of anything mentioned. Still
violated.
**Solution:** the interface reads item names back out of the reply text and renders cards from them.

**What that did and didn't fix:** an item the assistant names now reliably produces a card — unless
that item fails the conditions the assistant itself just set. Then the card is correctly withheld,
and the sentence is left recommending something the tags exclude. The interface is right and the
prose is wrong, and no amount of reading the sentence more carefully repairs that. The real fix is
architectural — narrow the candidates *before* the model writes, the way the pairing flow already
does — and it's in §9 rather than claimed as done here.

**Expected:** conditions reflect only what the guest asked for.
**Failure:** roughly one turn in four attached a caffeine restriction to a request that never
mentioned caffeine.
**Prompt attempt:** instructions to leave unmentioned fields empty. Still violated.
**Solution:** a new dietary or caffeine condition is rejected unless the term appears in the guest's
own words.

The pattern held across every guardrail in the project, and it isn't that "code beat prompting" — it's
*why*:

- Code makes eligibility **deterministic** rather than probable.
- Structured schemas tie language to **ids** that can be checked.
- Interface state **preserves the guest's corrections** across turns.
- Invalid states can be **rejected before rendering** instead of apologised for afterwards.

**A third example, and the clearest one.** The prompt fixes the two pairing questions word for word
and forbids repeating the options, because they are already on the buttons below. The model appended
them anyway. It also invented pairing directions the guest had never given, skipping its own
question, and named desserts in its handover sentence that the pairing block then contradicted.

Three separate rules, all ignored — and none of them were judgement calls. The questions have fixed
wording. The direction either came from a click or it didn't. The dessert isn't chosen yet when the
sentence is written. **So the interface took all three back**: it supplies those sentences itself,
and accepts a direction only from a click or from the guest's own words. The model kept the one part
that needs judgement — explaining why a pairing works, written after the dessert is chosen, inside
the block that shows it.

Every guardrail in this project began as a prompt instruction the model kept violating. Moving each
one into code was more reliable *and* less work than the prompt engineering it replaced.

### Beat 4 — Bounded judgement in pairing

A guest asks for a dessert to go with their drink. The assistant asks **one** short question; the
interface renders the valid answers as **buttons**; the guest clicks; repeat for the second input;
the pairing appears with both items and a reason.

1. **Code narrows the candidates.** "Vegan" and "dairy-free" are dietary facts resolved entirely in
   code — the model is never shown an ineligible dessert, so it cannot return one. "Budget" is
   computed by price.
2. **The model chooses within that pool** and writes why the pairing works. Taste judgement is where
   its contribution genuinely beats a rule.
3. **The choice is re-checked** against the candidate list before anything renders.

**Buttons instead of open questions.** A click sends an exact id, not a sentence to be re-interpreted
— which directly fixed the failure where the model caught the drink but dropped the pairing
direction half the time.

**One question per turn, and the options are not repeated in the question.** *"Would you prefer
something rich, light, or contrasting?"* is wrong: those words are already on the buttons directly
below, and printing them twice makes the guest read the same list from two places.

**One place, not two.** Pairing was first built as a separate panel with its own controls, then moved
fully into the chat. Two surfaces doing the same job is worse than one that handles both typing and
clicking; a guest who typed their way in shouldn't have to find a different control to finish. Both
paths now run through the same pairing logic, so a pairing reached by typing carries the same
guarantee as one reached by clicking.

> The system assigns responsibility by reliability: **code controls eligibility, the model provides
> interpretation and explanation, and the guest keeps final control through visible interface state.**

> 🖼 **[IMAGE — 4 frames]** — The pairing flow, start to result.
> 🖼 **[IMAGE — before/after]** — Standalone panel vs. in-chat.

### Guardrails, in summary

| Risk | System response |
|---|---|
| Invented product | Recommendations must reference a valid item id |
| Wrong price or allergen | Verified values rendered from menu data |
| Dietary risk | Eligibility rules applied before the model selects |
| Unsupported action | Declined, with a redirect to phone or email — never simulated |
| Ambiguous request | One high-value clarifying question, not a guess |
| Guest rejects an inference | The removal is preserved in interface state |
| Allergy raised | Shared-kitchen advisory; the assistant never certifies an item as safe |
| "Are you open right now?" | The assistant has no clock — it gives posted hours and lets the guest read them |

---

## 8. Final MVP

> 🖼 **[IMAGES]** — Full-page captures: Home · Menu · Visit · Contact · Ask Sakura.
> 🖼 **[IMAGES — 3 walkthroughs]** — A recommendation with constraints · a café-facts question · a
> completed pairing.
> 🖼 **[IMAGES]** — Responsive frames.

### What works

Responsive navigation · menu rendered from structured data · filtering with live results and an empty
state · real model responses · visible, removable interpreted conditions · menu-grounded
recommendation cards · café information answers · the pairing flow · links from assistant results
back to menu items · loading and error states on every failure path.

### What isn't included

Checkout · payment · live inventory · reservations · accounts · conversation persistence ·
personalisation.

### What implementation changed about the design

Three decisions came from building rather than from designing:

1. **Menu content became structured data.** It began as page copy. Turning it into a typed record
   with scales and flags is what made both filtering and grounded recommendations possible — the
   single most consequential change in the project, and it came from implementation.
2. **Buttons replaced free text in the pairing flow.** Watching intent extraction fail on real
   sentences turned an interface decision into an obvious one.
3. **The mobile navigation was rebuilt after measuring it.** At phone width the original wrapped to
   two lines and ate 22% of the screen; measuring also exposed touch targets below the accessible
   minimum, caused by a global scaling shortcut in the stylesheet.

**Implementation.** Next.js 16 App Router · React 19 and TypeScript · Tailwind CSS v4 · OpenAI
Responses API with strict structured outputs, constraining item ids to real menu entries.

---

## 9. Evaluation, Limitations & Reflection

### How it was evaluated

**Functional QA.** Navigation, responsive breakpoints, filters, empty states, loading and error
states, links, and repeated interactions were checked by hand across desktop and phone widths.

**Scenario-based AI testing.** The assistant was probed systematically against the scenarios in §3.3
— multiple simultaneous preferences, dietary restrictions, ambiguous requests, comparisons, pairing
requests, and out-of-scope questions — assessing groundedness, factual correctness, whether the
interpretation was visible, whether the guest could act on the answer, recovery from a bad turn, and
tone.

**Usability testing: not done.** Formal usability testing with target users has not been completed. My
own systematic testing is evidence about the system, not about guests, and I'm not going to present
one as the other.

### Limitations

**Most significant:**

- **No usability testing.** Every claim about guest confidence in this case study is a hypothesis.
- **No automated evaluation of the assistant.** All failure modes were found by hand, so a prompt
  change could silently reintroduce one. Several were found only by capturing the finished flow and
  reading it closely — which is not a process that scales.
- **The assistant's prose can still contradict its own conditions.** It may name an item that fails
  the filters it just set; the card is correctly withheld, so the sentence over-promises. Fixing it
  properly means narrowing candidates before the model writes — a two-pass request, the way pairing
  already works — at the cost of an extra round trip.
- **Allergy handling needs operational validation.** The advisory and the code-resolved dietary
  filters are a design response, not a food-safety process.
- **No conversation persistence.** A refresh loses the thread.

**Craft and technical debt:**

- A global scaling shortcut (`zoom: 0.9` and a reduced root font size) stands in for a real type
  scale, and has already caused one measurable accessibility defect.
- One typeface doing both display and body work.
- No per-item photography.
- No response streaming.
- No formal accessibility audit — focus states and reduced motion were designed deliberately, but
  keyboard traversal of the chat, live-region announcements for incoming messages, and contrast on
  light-on-light surfaces remain unverified.

### Next steps

1. **Usability testing** with people at different levels of matcha familiarity — everything else is
   guessing until this happens.
2. **A fixed benchmark set of prompts**, re-run after every prompt or model change.
3. **Two-pass recommendations** — extract conditions, narrow the menu, then let the model choose and
   write within the narrowed set, so the prose cannot contradict the tags.
3. **Accessibility audit**: keyboard navigation, focus behaviour, live-region announcements,
   contrast.
4. **Strengthen dietary and allergy safeguards** with an operational process behind them.
5. Replace the scaling shortcut with a real type scale.
6. Streaming and conversation persistence.
7. Test a display/body type pairing.
8. Connect recommendations to ordering — but only after discovery is validated.

### Reflection

The lesson that keeps generalising: **unreliable model behaviour could not be solved by writing more
detailed instructions.**

Three separate times I tried to fix a behaviour with a firmer instruction, and three times the model
kept violating it — not maliciously, just probabilistically. What worked was moving the requirement
somewhere it couldn't drift. Facts moved into structured data. Eligibility rules moved into
application logic. The guest's corrections moved into interface state. The valid answers to a
question became buttons instead of a sentence to be parsed.

Each time, the result was more dependable *and* less work than the prompting it replaced.

That reframes what designing with AI involves. The model is not the product, and prompting is not the
design work. **The design work is deciding what the model is allowed to be responsible for** — giving
it bounded judgement rather than full control, and building the interface so that everything else is
somebody else's job.
