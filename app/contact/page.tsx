export default function ContactPage() {
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
          Contact Us
        </h1>
      </section>

      {/* Contact content */}
      <section className="mx-auto max-w-6xl px-8 py-20">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Form */}
          <div>
            <h2 className="mb-8 text-4xl font-serif text-white">
              Send Us a Message
            </h2>

            <form className="rounded-3xl bg-[#E8E3D9] p-10 text-[#4A3A32] md:p-12">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-serif text-lg"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="w-full rounded-xl bg-white px-4 py-3 font-sans text-[#1F1814] outline-none"
                  />
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
                    className="w-full rounded-xl bg-white px-4 py-3 font-sans text-[#1F1814] outline-none"
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
                <label
                  htmlFor="email"
                  className="mb-2 block font-serif text-lg"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full rounded-xl bg-white px-4 py-3 font-sans text-[#1F1814] outline-none"
                />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="message"
                  className="mb-2 block font-serif text-lg"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows={8}
                  className="w-full resize-none rounded-xl bg-white px-4 py-3 font-sans text-[#1F1814] outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-8 w-full rounded-xl bg-[#1F1814] px-6 py-4 font-serif text-lg text-[#F7F3ED] transition hover:bg-[#4A3A32]"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact details */}
          <div className="font-serif lg:pt-20">
            <div className="space-y-8">
              <div>
                <p className="mb-2 text-xl font-bold text-white">Phone</p>
                <p className="text-lg text-white/90">(212) 555-2038</p>
              </div>

              <div>
                <p className="mb-2 text-xl font-bold text-white">Email</p>
                <p className="text-lg text-white/90">
                  hello@sakurabloommatcha.com
                </p>
              </div>
            </div>

            <hr className="my-10 border-white/30" />

            <div>
              <p className="mb-4 text-xl font-bold text-white">
                Opening Hours
              </p>
              <p className="text-lg leading-relaxed text-white/90">
                Mon – Fri: 8AM – 8PM
                <br />
                Sat – Sun: 9AM – 9PM
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
