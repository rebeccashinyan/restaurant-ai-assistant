import RevealFrom from "./reveal-from";
import RevealLine from "./reveal-line";
import VisitMap from "./visit-map";

export default function VisitSection() {
  return (
    <section className="page-shell py-20 md:py-24">
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[3fr_7fr] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
        {/* Left — top-aligned with the map */}
        <RevealFrom
          direction="left"
          className="order-1 min-w-0 lg:order-none lg:col-start-1 lg:row-start-2 lg:ml-auto lg:max-w-[300px] lg:pl-8 xl:pl-12"
        >
          <div className="space-y-10 font-serif">
            <div>
              <p className="mb-3 text-xl font-bold text-white">Address</p>
              <p className="text-lg leading-relaxed text-white/90">
                128 Sakura Street
                <br />
                New York, NY 10012
              </p>
            </div>

            <RevealLine />

            <div>
              <p className="mb-3 text-xl font-bold text-white">Opening Hours</p>
              <p className="text-lg leading-relaxed text-white/90">
                Mon – Fri: 8AM – 8PM
                <br />
                Sat – Sun: 9AM – 9PM
              </p>
            </div>
          </div>
        </RevealFrom>

        {/* Map title */}
        <RevealFrom
          direction="right"
          delay={120}
          className="order-2 min-w-0 lg:order-none lg:col-start-2 lg:row-start-1"
        >
          <h2 className="font-serif text-4xl text-white md:text-[2.75rem]">
            Find Us on Google Maps
          </h2>
        </RevealFrom>

        {/* Map — wider column */}
        <RevealFrom
          direction="right"
          delay={220}
          className="order-3 min-w-0 lg:order-none lg:col-start-2 lg:row-start-2"
        >
          <VisitMap />
        </RevealFrom>
      </div>
    </section>
  );
}
