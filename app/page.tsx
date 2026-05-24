const heroImage =
  "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2000&auto=format&fit=crop";

const meaningImage =
  "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200&auto=format&fit=crop";

const storyImage =
  "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200&auto=format&fit=crop";

const missionImage =
  "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1200&auto=format&fit=crop";

const reviewImages = [
  "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1470337458703-46ad1756c187?q=80&w=600&auto=format&fit=crop",
];

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
    <main className="bg-[#1F1814] text-[#F7F3ED]">
      {/* Hero */}
      <section className="page-shell pt-6">
        <div
          className="relative h-[72vh] overflow-hidden rounded-b-2xl bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <h1 className="absolute inset-0 flex items-center justify-center font-serif text-5xl text-[#F3E8E8] md:text-7xl">
            Sakura Bloom Matcha
          </h1>
        </div>
      </section>

      {/* Meaning */}
      <section className="page-shell py-28">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="mb-8 font-serif text-4xl md:text-5xl">
              What Does Sakura Bloom Mean?
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-[#E6E2DD]">
              “Sakura Bloom” represents a moment of quiet beauty. Inspired by the
              short but memorable cherry blossom season in Japan, the name
              reflects the idea of slowing down and appreciating small moments —
              whether it’s a warm matcha latte, a conversation with friends, or a
              peaceful afternoon alone.
            </p>
            <p className="text-lg leading-relaxed text-[#E6E2DD]">
              To us, Sakura Bloom is more than just a matcha store. It’s a space
              designed to feel calm, comforting, and intentional.
            </p>
          </div>

          <img
            src={meaningImage}
            alt="Cherry blossoms at Sakura Bloom"
            className="h-[480px] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* Story */}
      <section className="page-shell py-20">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
          <img
            src={storyImage}
            alt="Matcha latte at Sakura Bloom"
            className="h-[480px] w-full rounded-2xl object-cover"
          />

          <div>
            <h2 className="mb-8 font-serif text-4xl md:text-5xl">Our Story</h2>
            <p className="mb-6 text-lg leading-relaxed text-[#E6E2DD]">
              Sakura Bloom Matcha began with a simple idea: creating a modern
              matcha experience that feels both elevated and peaceful.
            </p>
            <p className="mb-6 text-lg leading-relaxed text-[#E6E2DD]">
              After traveling through tea shops and specialty matcha stores in
              Tokyo, Kyoto, and Seoul, our founders fell in love with the balance
              between minimal design, high-quality ingredients, and quiet
              atmosphere.
            </p>
            <p className="text-lg leading-relaxed text-[#E6E2DD]">
              Every drink, dessert, and detail is carefully designed to create a
              feeling — soft, warm, and memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="page-shell py-28">
        <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <h2 className="mb-8 font-serif text-4xl md:text-5xl">Our Mission</h2>
            <p className="mb-6 text-lg leading-relaxed text-[#E6E2DD]">
              At Sakura Bloom, our mission is to create moments of comfort and
              connection through thoughtfully crafted matcha drinks, desserts, and
              experiences.
            </p>
            <p className="text-lg leading-relaxed text-[#E6E2DD]">
              We believe matcha should be more than just a trend or a drink. It
              should be part of a lifestyle centered around balance, quality, and
              slowing down.
            </p>
          </div>

          <img
            src={missionImage}
            alt="Matcha preparation"
            className="h-[480px] w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* Reviews */}
      <section className="page-shell py-24">
        <h2 className="mb-4 font-serif text-4xl md:text-5xl">Users Review</h2>
        <p className="mb-14 font-serif text-3xl uppercase tracking-wide md:text-5xl">
          20K+ Happy Users Says About Our Product
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[2.3fr_0.7fr]">
          <div className="rounded-3xl bg-[#F7F3ED] p-12 text-[#1F1814]">
            <p className="mb-28 font-serif text-2xl leading-relaxed">
              “One of the most calming cafés I’ve been to in NYC. The interior
              feels so intentional and peaceful, and the matcha quality is
              actually amazing — not overly sweet like most places. I ordered
              the Strawberry Sakura Matcha and the Sakura Nerikiri, and both
              looked almost too pretty to eat.”
            </p>
            <p className="font-serif text-lg">Emily R.</p>
            <p className="font-serif text-lg">Creative Director</p>
          </div>

          <div className="grid gap-6">
            {reviewImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Customer photo ${index + 1}`}
                className="h-40 w-full rounded-3xl object-cover md:h-auto md:min-h-[140px]"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="page-shell overflow-hidden py-24">
        <h2 className="mb-14 font-serif text-4xl md:text-5xl">Our Gallery</h2>

        <div className="flex gap-10 overflow-x-auto pb-8">
          {galleryImages.map((image, index) => (
            <img
              key={`gallery-top-${index}`}
              src={image}
              alt={`Sakura Bloom gallery ${index + 1}`}
              width={420}
              height={288}
              className="h-72 w-[420px] shrink-0 rounded-2xl object-cover"
            />
          ))}
        </div>

        <div className="flex gap-10 overflow-x-auto">
          {galleryImages
            .slice()
            .reverse()
            .map((image, index) => (
              <img
                key={`gallery-bottom-${index}`}
                src={image}
                alt={`Sakura Bloom gallery ${galleryImages.length - index}`}
                width={420}
                height={288}
                className="h-72 w-[420px] shrink-0 rounded-2xl object-cover"
              />
            ))}
        </div>
      </section>
    </main>
  );
}
