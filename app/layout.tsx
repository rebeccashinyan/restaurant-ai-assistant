import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import SakuraPetals from "./components/SakuraPetals";
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
        <nav className="sticky top-0 z-50 w-full bg-black text-white">
          <div className="nav-shell flex items-center justify-between py-6">
            
            <div className="flex flex-wrap gap-6 text-xl font-serif md:gap-10 md:text-2xl">
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/visit">Visit Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/ask">Ask Sakura</Link>
            </div>

            <div className="text-3xl font-serif">
              Sakura Bloom Matcha
            </div>

          </div>
        </nav>

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
                  className="w-full max-w-xl rounded-full px-6 py-4 text-xl outline-none"
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