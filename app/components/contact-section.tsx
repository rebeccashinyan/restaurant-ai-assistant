"use client";

import { CAFE } from "../data/cafe-info";
import RevealOnce from "./reveal-once";

const FIELD_CLASS =
  "w-full rounded-xl border border-transparent bg-white px-4 py-3 text-[#1F1814] outline-none transition-[border-color,box-shadow] duration-300 ease-out hover:border-[#C09F9D]/35 hover:shadow-[0_4px_18px_rgba(192,157,157,0.1)] focus:border-[#C09F9D]/55 focus:shadow-[0_6px_22px_rgba(192,157,157,0.16)]";

export default function ContactSection() {
  return (
    <section className="page-shell py-20">
      <div className="grid gap-16 lg:grid-cols-[7fr_4fr] lg:items-start lg:gap-20">
        <RevealOnce className="min-w-0">
          <h2 className="mb-8 font-serif text-4xl text-white">
            Send Us a Message
          </h2>

          <form className="rounded-3xl bg-[#E8E3D9] p-10 text-[#4A3A32] md:p-12">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-2 block font-serif text-lg">
                  Your Name
                </label>
                <input id="name" type="text" className={FIELD_CLASS} />
              </div>

              <div>
                <label
                  htmlFor="inquiry-type"
                  className="mb-2 block font-serif text-lg"
                >
                  Inquiry Type
                </label>
                <select
                  id="inquiry-type"
                  defaultValue=""
                  className={FIELD_CLASS}
                >
                  <option value="" disabled>
                    Select...
                  </option>
                  <option>Menu Question</option>
                  <option>Store Information</option>
                  <option>Event Inquiry</option>
                  <option>Feedback</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="email" className="mb-2 block font-serif text-lg">
                Email Address
              </label>
              <input id="email" type="email" className={FIELD_CLASS} />
            </div>

            <div className="mt-6">
              <label htmlFor="message" className="mb-2 block font-serif text-lg">
                Message
              </label>
              <textarea
                id="message"
                rows={8}
                className={`${FIELD_CLASS} resize-none`}
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-[#1F1814] px-6 py-4 font-serif text-lg text-[#F7F3ED] transition-colors duration-300 hover:bg-[#4A3A32]"
            >
              Send Message
            </button>
          </form>
        </RevealOnce>

        <RevealOnce delay={180} className="min-w-0 font-serif lg:pt-20">
          <div className="space-y-8">
            <div>
              <p className="mb-2 text-xl font-bold text-white">Phone</p>
              <p className="text-lg text-white/90">{CAFE.phone}</p>
            </div>

            <div>
              <p className="mb-2 text-xl font-bold text-white">Email</p>
              <p className="text-lg text-white/90">{CAFE.email}</p>
            </div>
          </div>

          <hr className="my-10 border-white/30" />

          <div>
            <p className="mb-4 text-xl font-bold text-white">Opening Hours</p>
            <p className="text-lg leading-relaxed text-white/90">
              {CAFE.hours.map(({ days, hours }, index) => (
                <span key={days}>
                  {index > 0 && <br />}
                  {days}: {hours}
                </span>
              ))}
            </p>
          </div>
        </RevealOnce>
      </div>
    </section>
  );
}
