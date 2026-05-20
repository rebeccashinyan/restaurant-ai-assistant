import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-orange-50 p-10">
      <nav className="flex gap-6 mb-10 text-lg">
        <Link href="/">Home</Link>
        <Link href="/menu">Menu</Link>
        <Link href="/location">Location</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/ask">Ask Sakura</Link>
      </nav>

      <h1 className="text-5xl font-bold text-orange-600">
        Sakura Bloom Matcha
      </h1>

      <p className="mt-4 text-lg text-gray-700">
        Modern matcha café experience.
      </p>
    </main>
  );
}