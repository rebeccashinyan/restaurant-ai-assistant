export default function ContactPage() {
    return (
      <main className="min-h-screen bg-[#fffaf2] px-8 py-20">
        <section className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
  
            <div className="max-w-md">
                <h1 className="mb-6 text-6xl font-bold uppercase leading-tight text-zinc-950">
                    Contact Us
                </h1>

                <p className="mb-8 text-lg leading-relaxed text-zinc-700">
                    We’ll get back to you within 24 hours.
                </p>

                <div className="space-y-4 text-zinc-800">
                    <div>
                    <p className="mb-1 text-xl font-semibold uppercase tracking-wide text-orange-700">
                        Phone
                    </p>

                    <p className="text-2xl">(212) 555-2038</p>
                    </div>

                    <div>
                    <p className="mb-1 text-xl font-semibold uppercase tracking-wide text-orange-700">
                        Email
                    </p>

                    <p className="text-2xl">hello@sakurabloommatcha.com</p>
                    </div>
                </div>
                </div>
          </div>
          
  
          <form className="rounded-2xl bg-[#e9e5dc] p-8 md:p-12">
            <p className="mb-8 text-3xl font-bold leading-relaxed text-zinc-700">
                Send Us a Message
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-semibold uppercase text-zinc-900">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Jane Smith"
                  className="w-full rounded-xl bg-white px-5 py-5 text-zinc-900 outline-none"
                />
              </div>
  
              <div>
                <label className="mb-3 block text-sm font-semibold uppercase text-zinc-900">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="jane@email.com"
                  className="w-full rounded-xl bg-white px-5 py-5 text-zinc-900 outline-none"
                />
              </div>
  
              <div>
                <label className="mb-3 block text-sm font-semibold uppercase text-zinc-900">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Question about Sakura Bloom"
                  className="w-full rounded-xl bg-white px-5 py-5 text-zinc-900 outline-none"
                />
              </div>
  
              <div>
                <label className="mb-3 block text-sm font-semibold uppercase text-zinc-900">
                  Inquiry Type
                </label>
                <select className="w-full rounded-xl bg-white px-5 py-5 text-zinc-500 outline-none">
                  <option>Select...</option>
                  <option>Menu Question</option>
                  <option>Store Information</option>
                  <option>Event Inquiry</option>
                  <option>Feedback</option>
                </select>
              </div>
            </div>
  
            <div className="mt-8">
              <label className="mb-3 block text-sm font-semibold uppercase text-zinc-900">
                Message
              </label>
              <textarea
                placeholder="Enter your message here"
                rows={7}
                className="w-full resize-none rounded-xl bg-white px-5 py-5 text-zinc-900 outline-none"
              />
            </div>
  
            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-zinc-950 px-6 py-5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-orange-600"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
    );
  }