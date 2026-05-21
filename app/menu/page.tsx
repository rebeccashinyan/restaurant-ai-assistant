const sections = [
    {
      title: "Signature Drinks",
      image:
        "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?q=80&w=1200&auto=format&fit=crop",
      items: [
        {
          name: "Sakura Bloom Latte",
          price: "$7",
          description:
            "Ceremonial-grade matcha blended with milk and topped with delicate sakura cream foam.",
        },
        {
          name: "Strawberry Sakura Matcha",
          price: "$8",
          description:
            "Fresh strawberry puree layered with creamy matcha and cherry blossom cold foam.",
        },
        {
          name: "Cloud Matcha",
          price: "$7",
          description:
            "Smooth matcha latte finished with soft vanilla cream cloud.",
        },
        {
          name: "Hojicha Blossom Latte",
          price: "$7",
          description:
            "Roasted hojicha with floral cream and a subtle sakura sweetness.",
        },
        {
          name: "Ube Bloom Fusion",
          price: "$8",
          description:
            "Creamy ube and premium matcha swirled together for a rich earthy flavor.",
        },
      ],
    },
    {
      title: "Bloom Cakes & Desserts",
      image:
        "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=1200&auto=format&fit=crop",
      items: [
        {
          name: "Sakura Shortcake",
          price: "$8",
          description:
            "Light vanilla sponge layered with fresh strawberries and sakura cream.",
        },
        {
          name: "Matcha Mille Crepe",
          price: "$9",
          description:
            "Delicate layers of crepes with rich ceremonial matcha cream.",
        },
        {
          name: "Ube Cheesecake",
          price: "$8",
          description:
            "Creamy ube cheesecake with a buttery graham crust.",
        },
        {
          name: "Hojicha Roll Cake",
          price: "$7",
          description:
            "Soft sponge cake filled with roasted hojicha cream.",
        },
      ],
    },
  ];
  
  const softServeScoops = [
    { name: "1 Scoop", price: "$5" },
    { name: "2 Scoops", price: "$8" },
    { name: "3 Scoops", price: "$11" },
  ];
  
  const softServeFlavors = ["Sakura Matcha", "Hojicha", "Ube Blossom"];
  
  const addOns = [
    { name: "Oat Milk", price: "+$1" },
    { name: "Matcha Shot", price: "+$1.5" },
    { name: "Sakura Cream Foam", price: "+$1" },
  ];
  
  const toppings = [
    { name: "Mochi Bites", price: "+$1.5" },
    { name: "Strawberry Drizzle", price: "+$1" },
  ];
  
  export default function MenuPage() {
    return (
      <main className="min-h-screen bg-[#fff7eb] px-8 py-16">
        <section className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-orange-600">
            Sakura Bloom Matcha
          </p>
  
          <h1 className="mb-16 text-5xl font-bold text-zinc-950">
            Our Menu
          </h1>
  
          <div className="space-y-28">
            {sections.map((section, index) => (
              <div
                key={section.title}
                className={`grid items-center gap-0 lg:grid-cols-2 ${
                  index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative z-0 h-[430px] overflow-hidden rounded-[2rem]">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="h-full w-full object-cover"
                  />
                </div>
  
                <div className="relative z-10 -mt-10 rounded-[2rem] bg-[#efffc8] p-10 shadow-sm lg:-ml-8 lg:mt-0">
                  <h2 className="mb-8 text-2xl font-bold text-zinc-950">
                    {section.title}
                  </h2>
  
                  <div className="space-y-7">
                    {section.items.map((item) => (
                      <div key={item.name}>
                        <div className="mb-1 flex items-baseline justify-between gap-6">
                          <h3 className="text-lg font-bold text-zinc-950">
                            {item.name}
                          </h3>
                          <p className="shrink-0 text-lg font-bold text-zinc-950">
                            {item.price}
                          </p>
                        </div>
  
                        <p className="max-w-2xl text-base leading-relaxed text-zinc-800">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
  
            <div className="grid items-start gap-8 lg:grid-cols-3">
              <div className="rounded-[2rem] bg-[#efffc8] p-10 shadow-sm lg:col-span-2">
                <h2 className="mb-8 text-2xl font-bold text-zinc-950">
                  Bloom Soft Serve
                </h2>
  
                <h3 className="mb-4 text-lg font-bold text-zinc-950">
                  Choose Your Scoops
                </h3>
  
                <div className="mb-8 space-y-3">
                  {softServeScoops.map((item) => (
                    <div
                      key={item.name}
                      className="flex max-w-md justify-between text-lg"
                    >
                      <span className="font-semibold">{item.name}</span>
                      <span className="font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
  
                <h3 className="mb-4 text-lg font-bold text-zinc-950">
                  Flavors
                </h3>
  
                <ul className="space-y-2 text-lg text-zinc-800">
                  {softServeFlavors.map((flavor) => (
                    <li key={flavor}>• {flavor}</li>
                  ))}
                </ul>
              </div>
  
              <div className="rounded-[2rem] bg-white p-10 shadow-sm">
                <h2 className="mb-6 text-2xl font-bold text-zinc-950">
                  Extras
                </h2>
  
                <h3 className="mb-3 text-lg font-bold">Drink Add-ons</h3>
                <div className="mb-8 space-y-3">
                  {addOns.map((item) => (
                    <div key={item.name} className="flex justify-between gap-6">
                      <span>{item.name}</span>
                      <span className="font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
  
                <h3 className="mb-3 text-lg font-bold">
                  Soft Serve Toppings
                </h3>
                <div className="space-y-3">
                  {toppings.map((item) => (
                    <div key={item.name} className="flex justify-between gap-6">
                      <span>{item.name}</span>
                      <span className="font-bold">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }