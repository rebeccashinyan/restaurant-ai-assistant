export default function VisitPage() {
  return (
    <main className="bg-[#1F1814] text-[#F7F3ED]">
      {/* Hero */}
      <section
        className="relative flex h-72 items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=1600&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <h1 className="relative z-10 text-5xl font-serif font-bold text-white">
          Visit Us
        </h1>
      </section>

      {/* Location */}
      <section className="mx-auto max-w-6xl px-8 py-20">
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-10 font-serif lg:pt-2">
            <div>
              <p className="mb-3 text-xl font-bold text-white">Address</p>
              <p className="text-lg leading-relaxed text-white/90">
                128 Sakura Street
                <br />
                New York, NY 10012
              </p>
            </div>

            <div>
              <p className="mb-3 text-xl font-bold text-white">
                Opening Hours
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                Mon – Fri: 8AM – 8PM
                <br />
                Sat – Sun: 9AM – 9PM
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-6 text-4xl font-serif text-white">
              Find Us on Google Maps
            </h2>

            <div className="overflow-hidden rounded-3xl">
              <iframe
                title="Sakura Bloom Matcha on Google Maps"
                src="https://www.google.com/maps?q=128+Sakura+Street+New+York+NY+10012&output=embed"
                className="h-[480px] w-full border-0 md:h-[520px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
