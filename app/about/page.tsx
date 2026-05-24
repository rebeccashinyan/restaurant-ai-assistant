const aboutSections = [
    {
      title: "What Does Sakura Bloom Mean?",
      image:
        "https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200&auto=format&fit=crop",
      text: [
        "“Sakura Bloom” represents a moment of quiet beauty. Inspired by the short but memorable cherry blossom season in Japan, the name reflects the idea of slowing down and appreciating small moments — whether it’s a warm matcha latte, a conversation with friends, or a peaceful afternoon alone.",
        "To us, Sakura Bloom is more than just a matcha store. It’s a space designed to feel calm, comforting, and intentional.",
      ],
    },
    {
      title: "Our Story",
      image:
        "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200&auto=format&fit=crop",
      text: [
        "Sakura Bloom Matcha began with a simple idea: creating a modern matcha experience that feels both elevated and peaceful.",
        "After traveling through tea shops and specialty matcha stores in Tokyo, Kyoto, and Seoul, our founders fell in love with the balance between minimal design, high-quality ingredients, and quiet atmosphere. They wanted to bring that feeling into a modern space where people could slow down from busy city life and enjoy matcha in a more thoughtful way.",
        "What started as a small passion project centered around ceremonial-grade matcha and handcrafted desserts slowly became a creative matcha brand inspired by Japanese aesthetics, seasonal flavors, and intentional experiences.",
        "Every drink, dessert, and detail is carefully designed to create a feeling — soft, warm, and memorable.",
      ],
    },
    {
      title: "Our Mission",
      image:
        "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1200&auto=format&fit=crop",
      text: [
        "At Sakura Bloom, our mission is to create moments of comfort and connection through thoughtfully crafted matcha drinks, desserts, and experiences.",
        "We believe matcha should be more than just a trend or a drink. It should be part of a lifestyle centered around balance, quality, and slowing down.",
        "By combining premium ingredients, intentional design, and seasonal inspiration, we hope to create a modern matcha experience that feels both elegant and welcoming.",
      ],
    },
  ];
  
  export default function AboutPage() {
    return (
      <main className="min-h-screen bg-[#fffaf2]">
        <section className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-zinc-950 px-8 text-center">
          <img
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1600&auto=format&fit=crop"
            alt="Sakura Bloom Matcha"
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
  
          <div className="absolute inset-0 bg-black/50" />
  
          <div className="page-shell relative z-10">
            <div className="content-width text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-[#f2c9a8]">
              About Sakura Bloom
            </p>
  
            <h1 className="mb-5 text-5xl font-bold leading-tight text-[#f6d7b8] md:text-6xl">
              A Modern Matcha Story
            </h1>
  
            <p className="text-lg leading-relaxed text-white/75">
              A modern matcha store inspired by quiet beauty, seasonal rituals,
              and thoughtful moments.
            </p>
            </div>
          </div>
        </section>
  
        <section className="page-shell py-24">
          <div className="content-width space-y-28">
            {aboutSections.map((section, index) => (
              <div
                key={section.title}
                className="grid items-center gap-12 lg:grid-cols-2"
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <h2 className="mb-6 text-4xl font-bold leading-tight text-zinc-950">
                    {section.title}
                  </h2>
  
                  <div className="max-w-xl space-y-5">
                    {section.text.map((paragraph) => (
                      <p
                        key={paragraph}
                        className="text-lg leading-relaxed text-zinc-700"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
  
                <div
                  className={`h-[520px] overflow-hidden rounded-[2rem] shadow-sm ${
                    index % 2 === 1 ? "lg:order-1" : ""
                  }`}
                >
                  <img
                    src={section.image}
                    alt={section.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    );
  }