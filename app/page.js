import About from "@/Components/About";
import Features from "@/Components/Features";
import Story from "@/Components/Story";
import Hero from "@/Components/HeroSection/Hero";
import NavBar from "@/Components/Navbar";
import Contact from "@/Components/Contact";
import Footer from "@/Components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </main>
  );
}
