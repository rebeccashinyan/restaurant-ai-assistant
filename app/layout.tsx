import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import SakuraPetals from "./components/SakuraPetals";
import SiteNav from "./components/site-nav";
import SocialLinks from "./components/social-links";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Sakura Bloom Matcha",
  description: "Modern matcha café experience",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.variable}>
      <body className="bg-[#1F1814] font-serif text-[#F7F3ED]">
        <SakuraPetals />

        <div className="relative z-[2]">
        {/* Navbar */}
        <SiteNav />

        {/* Page Content */}
        {children}

        {/* Footer */}
        <footer className="bg-[#E4DBCA] py-28 text-[#1F1814]">
          <div className="page-shell grid grid-cols-1 gap-20 md:grid-cols-2">

            <div>
              <h3 className="mb-4 text-4xl font-serif">
                Subscribe Form
              </h3>

              <p className="mb-8 text-xl">
                Sign up to get the latest on sales, new releases and more...
              </p>

              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Email"
                  aria-label="Email address"
                  className="w-full max-w-xl rounded-full border border-transparent bg-white px-6 py-4 text-xl text-[#1F1814] outline-none transition-[border-color,box-shadow] duration-300 ease-out placeholder:text-[#8A7A70] hover:border-[#C09F9D]/35 hover:shadow-[0_4px_18px_rgba(192,157,157,0.12)] focus-visible:border-[#C09F9D]/55 focus-visible:shadow-[0_6px_22px_rgba(192,157,157,0.18)]"
                />

                <button className="rounded-full bg-black px-8 py-4 text-white text-xl">
                  Join
                </button>
              </div>
            </div>

            <div>
              <h3 className="mb-8 text-4xl font-serif">
                Follow
              </h3>

              <SocialLinks />
            </div>

          </div>
        </footer>
        </div>

      </body>
    </html>
  );
}