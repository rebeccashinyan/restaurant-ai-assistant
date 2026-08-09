import { CAFE } from "../data/cafe-info";
import RevealFrom from "./reveal-from";
import VisitMap from "./visit-map";

export default function VisitSection() {
  return (
    <section className="page-shell py-20 md:py-24">
      {/* 4fr/7fr mirrors the Contact page's 7fr/4fr split, so the details column
          carries the same weight on both pages. */}
      <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[4fr_7fr] lg:grid-rows-[auto_1fr] lg:items-start lg:gap-x-16 lg:gap-y-6 xl:gap-x-20">
        {/* Left — top-aligned with the map */}
        <RevealFrom
          direction="left"
          className="order-1 min-w-0 lg:order-none lg:col-start-1 lg:row-start-2 lg:pl-24"
        >
          <div className="space-y-10 font-serif">
            <div>
              <p className="mb-3 text-xl font-bold text-white">Address</p>
              <p className="text-lg leading-relaxed text-white/90">
                {CAFE.address.street}
                <br />
                {CAFE.address.cityStateZip}
              </p>
            </div>

            <hr
              aria-hidden
              className="h-px border-0 bg-[#E4DBCA]/25 lg:max-w-[330px]"
            />

            <div>
              <p className="mb-3 text-xl font-bold text-white">Opening Hours</p>
              <p className="text-lg leading-relaxed text-white/90">
                {CAFE.hours.map(({ days, hours }, index) => (
                  <span key={days}>
                    {index > 0 && <br />}
                    {days}: {hours}
                  </span>
                ))}
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
