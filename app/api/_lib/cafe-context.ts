import { ADDRESS_LINE, CAFE, FAQ } from "../../data/cafe-info";

function buildCafeText() {
  const hours = CAFE.hours
    .map(({ days, hours: times }) => `${days}: ${times}`)
    .join("\n");

  const faq = FAQ.map(({ question, answer }) => `Q: ${question}\nA: ${answer}`).join(
    "\n\n",
  );

  return [
    `Name: ${CAFE.name}`,
    `About: ${CAFE.description}`,
    ``,
    `## Address`,
    ``,
    ADDRESS_LINE,
    ``,
    `## Opening hours`,
    ``,
    hours,
    ``,
    `## Contact`,
    ``,
    `Phone: ${CAFE.phone}`,
    `Email: ${CAFE.email}`,
    `A contact form is on the Contact page of this site.`,
    ``,
    `## Common questions`,
    ``,
    faq,
  ].join("\n");
}

/** Built once at module load — the café details are static. */
export const CAFE_TEXT = buildCafeText();
