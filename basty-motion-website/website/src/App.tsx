import { useReveal } from "./hooks/useReveal";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Stats from "./components/Stats";
import Products from "./components/Products";
import Features from "./components/Features";
import About from "./components/About";
import HowToOrder from "./components/HowToOrder";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  useReveal();
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Stats />
        <Products />
        <Features />
        <About />
        <HowToOrder />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
