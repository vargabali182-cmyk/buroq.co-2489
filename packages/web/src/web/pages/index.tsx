import { Navbar } from "../components/navbar";
import { Hero } from "../components/hero";
import { ProductStory } from "../components/product-story";
import { Features } from "../components/features";
import { Showcase } from "../components/showcase";
import { Colors } from "../components/colors";
import { Why } from "../components/why";
import { InvestorSignal } from "../components/investor-signal";
import { Waitlist } from "../components/waitlist";
import { Footer } from "../components/footer";

function Index() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#1d1d1f] selection:text-white">
      <Navbar />
      <Hero />
      <ProductStory />
      <Features />
      <Showcase />
      <Colors />
      <Why />
      <InvestorSignal />
      <Waitlist />
      <Footer />
    </main>
  );
}

export default Index;
