import Link from "next/link";

const featuredItems = [
  {
    name: "Sakura Bloom Latte",
    description: "Ceremonial matcha with milk and sakura cream foam.",
    price: "$7",
  },
  {
    name: "Strawberry Sakura Matcha",
    description: "Fresh strawberry puree layered with creamy matcha.",
    price: "$8",
  },
  {
    name: "Cloud Matcha",
    description: "Smooth matcha latte finished with vanilla cream cloud.",
    price: "$7",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#fffaf2]">
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-20 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">
            Sakura Bloom Matcha
          </p>

          <h1 className="mb-6 text-6xl font-bold leading-tight text-zinc-950 md:text-7xl">
            A modern matcha experience for quiet moments.
          </h1>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-zinc-700">
            Ceremonial-grade matcha, soft seasonal flavors, and thoughtful
            drinks designed for slowing down.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-zinc-950 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-600"
            >
              View Menu
            </Link>

            <Link
              href="/ask"
              className="rounded-full border border-zinc-950 px-7 py-4 text-sm font-bold uppercase tracking-wide text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
            >
              Ask Sakura
            </Link>
          </div>
        </div>

        <div className="h-[560px] overflow-hidden rounded-[2rem] shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200&auto=format&fit=crop"
            alt="Sakura Bloom Matcha drink"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-8 py-20">
        <div className="mb-10 flex items-end justify-between gap-8">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">
              Featured Menu
            </p>

            <h2 className="text-4xl font-bold text-zinc-950">
              Signature favorites
            </h2>
          </div>

          <Link
            href="/menu"
            className="hidden text-sm font-bold uppercase tracking-wide text-orange-700 hover:text-zinc-950 md:block"
          >
            See Full Menu →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredItems.map((item) => (
            <div
              key={item.name}
              className="rounded-[2rem] bg-[#efffc8] p-8 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between gap-6">
                <h3 className="text-2xl font-bold text-zinc-950">
                  {item.name}
                </h3>

                <p className="text-xl font-bold text-zinc-950">{item.price}</p>
              </div>

              <p className="leading-relaxed text-zinc-700">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-20 lg:grid-cols-2">
        <div className="h-[520px] overflow-hidden rounded-[2rem] shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1522383225653-ed111181a951?q=80&w=1200&auto=format&fit=crop"
            alt="Sakura blossoms"
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">
            Our Philosophy
          </p>

          <h2 className="mb-6 text-5xl font-bold leading-tight text-zinc-950">
            Designed for slowing down.
          </h2>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-zinc-700">
            Sakura Bloom brings together premium matcha, seasonal inspiration,
            and a peaceful modern space. Every drink, dessert, and detail is
            created to feel soft, warm, and memorable.
          </p>

          <Link
            href="/about"
            className="rounded-full bg-zinc-950 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-600"
          >
            About Us
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-8 py-20 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-[#e9e5dc] p-10">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">
            Visit Us
          </p>

          <h2 className="mb-6 text-4xl font-bold text-zinc-950">
            Come by for your next matcha moment.
          </h2>

          <div className="mb-8 space-y-4 text-lg leading-relaxed text-zinc-700">
            <p>
              128 Sakura Street
              <br />
              New York, NY 10012
            </p>

            <p>
              Mon – Fri: 8AM – 8PM
              <br />
              Sat – Sun: 9AM – 9PM
            </p>
          </div>

          <Link
            href="/visit"
            className="rounded-full bg-zinc-950 px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-600"
          >
            Store Info
          </Link>
        </div>

        <div className="rounded-[2rem] bg-zinc-950 p-10 text-white">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#f2c9a8]">
            Ask Sakura
          </p>

          <h2 className="mb-6 text-4xl font-bold">
            Not sure what to order?
          </h2>

          <p className="mb-8 max-w-xl text-lg leading-relaxed text-white/75">
            Tell Sakura what flavors you like, and get a personalized matcha
            recommendation.
          </p>

          <Link
            href="/ask"
            className="rounded-full bg-[#f6d7b8] px-7 py-4 text-sm font-bold uppercase tracking-wide text-zinc-950 transition hover:bg-white"
          >
            Ask Now
          </Link>
        </div>
      </section>
    </main>
  );
}