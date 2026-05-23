export default function Home() {
  const galleryImages = [
    "/gallery-1.png",
    "/gallery-2.png",
    "/gallery-3.png",
    "/gallery-4.png",
    "/gallery-5.png",
    "/gallery-6.png",
    "/gallery-7.png",
  ];

  return (
    <main className="bg-[#1F1814] text-[#F7F3ED]">
      {/* Hero */}
      <section className="px-6 pt-6">
        <div
          className="relative h-[72vh] rounded-b-2xl bg-cover bg-center overflow-hidden"
          style={{ backgroundImage: "url('/hero.png')" }}
        >
          <div className="absolute inset-0 bg-black/30" />
          <h1 className="absolute inset-0 flex items-center justify-center text-5xl md:text-7xl font-serif text-[#F3E8E8]">
            Sakura Bloom Matcha
          </h1>
        </div>
      </section>

      {/* Meaning */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-20 px-8 py-28 items-center">
        <div>
          <h2 className="mb-8 text-4xl md:text-5xl font-serif">
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
          src="/logo-wall.png"
          alt="Sakura Bloom logo wall"
          className="w-full rounded-2xl object-cover"
        />
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-20 px-8 py-20 items-center">
        <img
          src="/story.png"
          alt="Matcha story"
          className="w-full rounded-2xl object-cover"
        />

        <div>
          <h2 className="mb-8 text-4xl md:text-5xl font-serif">Our Story</h2>
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
      </section>

      {/* Mission */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-20 px-8 py-28 items-center">
        <div>
          <h2 className="mb-8 text-4xl md:text-5xl font-serif">Our Mission</h2>
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
          src="/matcha-powder.png"
          alt="Matcha powder"
          className="w-full rounded-2xl object-cover"
        />
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <h2 className="mb-4 text-4xl md:text-5xl font-serif">Users Review</h2>
        <p className="mb-14 text-3xl md:text-5xl font-serif uppercase tracking-wide">
          20K+ Happy Users Says About Our Product
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[2.3fr_0.7fr] gap-6">
          <div className="rounded-3xl bg-[#F7F3ED] p-12 text-[#1F1814]">
            <p className="mb-28 text-2xl leading-relaxed font-serif">
              “One of the most calming cafés I’ve been to in NYC. The interior
              feels so intentional and peaceful, and the matcha quality is
              actually amazing — not overly sweet like most places. I ordered
              the Strawberry Sakura Matcha and the Sakura Nerikiri, and both
              looked almost too pretty to eat.”
            </p>
            <p className="text-lg font-serif">Emily R.</p>
            <p className="text-lg font-serif">Creative Director</p>
          </div>

          <div className="grid gap-6">
            <div className="rounded-3xl bg-[#F7F3ED]" />
            <div className="rounded-3xl bg-[#F7F3ED]" />
            <div className="rounded-3xl bg-[#F7F3ED]" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="px-8 py-24 overflow-hidden">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-14 text-4xl md:text-5xl font-serif">Our Gallery</h2>
        </div>

        <div className="flex gap-10 overflow-x-auto pb-8">
          {galleryImages.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Sakura Bloom gallery ${index + 1}`}
              className="h-72 w-[420px] shrink-0 rounded-2xl object-cover"
            />
          ))}
        </div>

        <div className="flex gap-10 overflow-x-auto">
          {galleryImages.slice().reverse().map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Sakura Bloom gallery ${index + 1}`}
              className="h-72 w-[420px] shrink-0 rounded-2xl object-cover"
            />
          ))}
        </div>
      </section>

    
    </main>
  );
}