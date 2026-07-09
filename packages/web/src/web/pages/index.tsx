import { Navbar } from "../components/navbar";
import { Hero } from "../components/hero";
import { ProductReveal } from "../components/product-reveal";
import { FrontDisplay } from "../components/front-display";
import { RearPanel } from "../components/rear-panel";
import { PoleInside } from "../components/pole-inside";
import { BeachDays } from "../components/beach-days";
import { Resorts } from "../components/resorts";
import { PricingTest } from "../components/pricing-test";
import { InvestorSignal } from "../components/investor-signal";
import { Waitlist } from "../components/waitlist";
import { Colors } from "../components/colors";
import { Footer } from "../components/footer";

function Index() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] antialiased selection:bg-[#1d1d1f] selection:text-white">
      <Navbar />
      <Hero />
      <ProductReveal />
      <FrontDisplay />
      <RearPanel />
      <PoleInside />
      <BeachDays />
      <Resorts />
      <PricingTest />
      <Colors />
      <InvestorSignal />
      <Waitlist />
      <Footer />
    </main>
  );
}

export default Index;
