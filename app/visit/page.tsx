import PageHero from "../components/page-hero";

export default function VisitPage() {
  return (
    <main className="bg-[#1F1814] text-[#F7F3ED]">
      <PageHero title="Visit Us" />

      <section className="page-shell py-20">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-10 font-serif lg:pt-4">
            <div>
              <p className="mb-3 text-xl font-bold text-white">Address</p>
              <p className="text-lg leading-relaxed text-white/90">
                128 Sakura Street
                <br />
                New York, NY 10012
              </p>
            </div>

            <div>
              <p className="mb-3 text-xl font-bold text-white">Opening Hours</p>
              <p className="text-lg leading-relaxed text-white/90">
                Mon – Fri: 8AM – 8PM
                <br />
                Sat – Sun: 9AM – 9PM
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-serif text-4xl text-white">
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
