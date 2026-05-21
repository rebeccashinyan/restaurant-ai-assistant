import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sakura Bloom Matcha",
  description: "AI-powered matcha café",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-orange-50 text-gray-900">
        <nav className="flex gap-8 p-8 text-2xl font-medium">
          <Link href="/">Home</Link>
          <Link href="/menu">Menu</Link>
          <Link href="/visit">Visit Us</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/ask">Ask Sakura</Link>
        </nav>

        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}