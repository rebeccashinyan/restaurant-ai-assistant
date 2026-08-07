import type { PairingDirection } from "../../data/menu";

/**
 * How to choose within the already-narrowed candidate list, per direction.
 * Written without naming a category on either side: the anchor can be a drink,
 * a dessert, or a soft serve, and so can the candidate.
 */
export const DIRECTION_GUIDANCE: Record<PairingDirection, string> = {
  similar:
    "Pick the candidate whose flavor and texture most echo what the guest is already having. Check that item's own \"pairs well with\" list first, then shared flavor notes.",
  contrast:
    "Pick a candidate that plays against what the guest is already having on purpose — a different primary flavor or a contrasting texture — so the pairing reads as a deliberate choice, not a random one.",
  light:
    "Pick the lightest, most refreshing candidate — favor lower sweetness and an airy, icy, or light texture over anything dense or heavy.",
  rich:
    "Pick the most indulgent candidate — favor a dense, creamy, or thick texture and a fuller flavor.",
  budget:
    "These candidates are already the more affordable half of what is on offer. Pick whichever is still the best flavor match.",
  "dairy-free":
    "Every candidate here is already dairy-free. Pick whichever is the best flavor match — do not mention the dietary filter, it's redundant.",
  vegan:
    "Every candidate here is already vegan. Pick whichever is the best flavor match — do not mention the dietary filter, it's redundant.",
};
