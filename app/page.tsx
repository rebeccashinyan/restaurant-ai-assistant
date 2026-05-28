import FadeUp, { FADE_UP_STAGGER } from "./components/fade-up";
import GallerySection from "./components/gallery-section";
import HomeHero from "./components/home-hero";
import ParallaxImage from "./components/parallax-image";
import ReviewsSection from "./components/reviews-section";

const meaningImage =
  "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200&auto=format&fit=crop";

const storyImage =
  "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200&auto=format&fit=crop";

const missionImage =
  "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1200&auto=format&fit=crop";

const galleryImages = [
  "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=840&h=576&fit=crop",
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=840&h=576&fit=crop",
  "https://images.unsplash.com/photo-1522383225653-ed111181a951?w=840&h=576&fit=crop",
  "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=840&h=576&fit=crop",
  "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=840&h=576&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=840&h=576&fit=crop",
  "https://images.unsplash.com/photo-1611143080716-fb3b0ff2986d?w=840&h=576&fit=crop",
  "https://images.unsplash.com/photo-1564890369478-c89ca6d9ed5e?w=840&h=576&fit=crop",
  "https://images.unsplash.com/photo-1559494020-52d36de326f0?w=840&h=576&fit=crop",
  "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=840&h=576&fit=crop",
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
