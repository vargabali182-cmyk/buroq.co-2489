import { Navbar } from "../components/navbar";
import { Hero } from "../components/hero";
import { Features } from "../components/features";
import { Showcase } from "../components/showcase";
import { Colors } from "../components/colors";
import { Why } from "../components/why";
import { Waitlist } from "../components/waitlist";
import { Footer } from "../components/footer";

function Index() {
  return (
    <div className="no-scrollbar">
      <Navbar />
      <Hero />
      <Features />
      <Showcase />
      <Colors />
      <Why />
      <Waitlist />
      <Footer />
    </div>
  );
}

export default Index;
