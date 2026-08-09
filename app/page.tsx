import FadeUp, { FADE_UP_STAGGER } from "./components/fade-up";
import GallerySection from "./components/gallery-section";
import HomeHero from "./components/home-hero";
import ParallaxImage from "./components/parallax-image";
import ReviewsSection from "./components/reviews-section";

const meaningImage = "/images/sakura-bloom-meaning.png";

const storyImage = "/images/our-story.png";

const missionImage = "/images/our-mission.png";

// Eleven distinct photographs. The gallery splits them across two marquee rows
// with no overlap, so nothing shows up twice on screen at once.
const galleryImages = [
  "/images/gallery-1.png",
  "/images/gallery-2.png",
  "/images/gallery-3.png",
  "/images/gallery-4.png",
  "/images/gallery-8.png",
  "/images/gallery-6.png",
  "/images/gallery-7.png",
  "/images/gallery-9.png",
  "/images/gallery-10.png",
  "/images/menu-drinks.png",
  "/images/menu-desserts.png",
];

export default function Home() {
  return (
    <main className="text-[#F7F3ED]">
      <HomeHero />

      {/* Meaning */}
      <section className="page-shell py-28">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <FadeUp variant="heading">
              <h2 className="mb-8 font-serif text-4xl md:text-5xl">
                What Does Sakura Bloom Mean?
              </h2>
            </FadeUp>
            <FadeUp variant="text" delay={FADE_UP_STAGGER.afterHeading}>
              <p className="mb-6 text-lg leading-relaxed text-[#E6E2DD]">
                “Sakura Bloom” represents a moment of quiet beauty. Inspired by the
                short but memorable cherry blossom season in Japan, the name
                reflects the idea of slowing down and appreciating small moments —
                whether it’s a warm matcha latte, a conversation with friends, or a
                peaceful afternoon alone.
              </p>
            </FadeUp>
            <FadeUp
              variant="text"
              delay={
                FADE_UP_STAGGER.afterHeading + FADE_UP_STAGGER.betweenParagraphs
              }
            >
              <p className="text-lg leading-relaxed text-[#E6E2DD]">
                To us, Sakura Bloom is more than just a matcha store. It’s a space
                designed to feel calm, comforting, and intentional.
              </p>
            </FadeUp>
          </div>

          <ParallaxImage
            src={meaningImage}
            alt="Cherry blossoms at Sakura Bloom"
          />
        </div>
      </section>

      {/* Story */}
      <section className="page-shell py-20">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
          <ParallaxImage src={storyImage} alt="Matcha latte at Sakura Bloom" />

          <div>
            <FadeUp variant="heading">
              <h2 className="mb-8 font-serif text-4xl md:text-5xl">Our Story</h2>
            </FadeUp>
            <FadeUp variant="text" delay={FADE_UP_STAGGER.afterHeading}>
              <p className="mb-6 text-lg leading-relaxed text-[#E6E2DD]">
                Sakura Bloom Matcha began with a simple idea: creating a modern
                matcha experience that feels both elevated and peaceful.
              </p>
            </FadeUp>
            <FadeUp
              variant="text"
              delay={
                FADE_UP_STAGGER.afterHeading + FADE_UP_STAGGER.betweenParagraphs
              }
            >
              <p className="mb-6 text-lg leading-relaxed text-[#E6E2DD]">
                After traveling through tea shops and specialty matcha stores in
                Tokyo, Kyoto, and Seoul, our founders fell in love with the balance
                between minimal design, high-quality ingredients, and quiet
                atmosphere.
              </p>
            </FadeUp>
            <FadeUp
              variant="text"
              delay={
                FADE_UP_STAGGER.afterHeading +
                FADE_UP_STAGGER.betweenParagraphs * 2
              }
            >
              <p className="text-lg leading-relaxed text-[#E6E2DD]">
                Every drink, dessert, and detail is carefully designed to create a
                feeling — soft, warm, and memorable.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="page-shell py-28">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <FadeUp variant="heading">
              <h2 className="mb-8 font-serif text-4xl md:text-5xl">Our Mission</h2>
            </FadeUp>
            <FadeUp variant="text" delay={FADE_UP_STAGGER.afterHeading}>
              <p className="mb-6 text-lg leading-relaxed text-[#E6E2DD]">
                At Sakura Bloom, our mission is to create moments of comfort and
                connection through thoughtfully crafted matcha drinks, desserts, and
                experiences.
              </p>
            </FadeUp>
            <FadeUp
              variant="text"
              delay={
                FADE_UP_STAGGER.afterHeading + FADE_UP_STAGGER.betweenParagraphs
              }
            >
              <p className="text-lg leading-relaxed text-[#E6E2DD]">
                We believe matcha should be more than just a trend or a drink. It
                should be part of a lifestyle centered around balance, quality, and
                slowing down.
              </p>
            </FadeUp>
          </div>

          <ParallaxImage src={missionImage} alt="Matcha preparation" />
        </div>
      </section>

      <ReviewsSection />

      <GallerySection images={galleryImages} />
    </main>
  );
}
