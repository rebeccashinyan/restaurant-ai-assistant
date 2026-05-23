import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

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
    <html lang="en">
      <body className="bg-[#1F1814] text-[#F7F3ED]">
        
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-black text-white">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-6">
            
            <div className="flex gap-10 text-2xl font-serif">
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
        <footer className="bg-[#E4DBCA] px-10 py-28 text-[#1F1814]">
          <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-2 gap-20">

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

              <div className="flex gap-8">
                <div className="h-16 w-16 rounded-full bg-[#D9D9D9]" />
                <div className="h-16 w-16 rounded-full bg-[#D9D9D9]" />
                <div className="h-16 w-16 rounded-full bg-[#D9D9D9]" />
              </div>
            </div>

          </div>
        </footer>

      </body>
    </html>
  );
}