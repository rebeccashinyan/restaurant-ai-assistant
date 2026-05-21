export default function VisitPage() {
  return (
    <main className="min-h-screen bg-[#fffaf2] px-8 py-20">
      <section className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">
            Visit Sakura Bloom
          </p>

          <h1 className="mb-8 text-6xl font-bold leading-tight text-zinc-950">
            Visit Us
          </h1>

          <div className="space-y-8 text-zinc-800">
            <div>
              <h2 className="mb-2 text-xl font-bold">Address</h2>
              <p className="text-lg leading-relaxed">
                128 Sakura Street
                <br />
                New York, NY 10012
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-bold">Opening Hours</h2>
              <p className="text-lg leading-relaxed">
                Mon – Fri: 8AM – 8PM
                <br />
                Sat – Sun: 9AM – 9PM
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-xl font-bold">Contact</h2>
              <p className="text-lg leading-relaxed">
                (212) 555-2038
                <br />
                hello@sakurabloommatcha.com
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] shadow-sm">
          <iframe
            title="Sakura Bloom Matcha Google Map"
            src="https://www.google.com/maps?q=New%20York%20NY%2010012&output=embed"
            className="h-[560px] w-full border-0"
            loading="lazy"
          />
        </div>
      </section>
    </main>
  );
}