import About from "@/Components/About";
import Hero from "@/Components/HeroSection/Hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <About />
    </main>
  );
}
