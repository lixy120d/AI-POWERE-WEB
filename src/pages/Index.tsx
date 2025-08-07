import { HeroSection } from "@/components/HeroSection";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { InteractiveDemo } from "@/components/InteractiveDemo";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <ShowcaseGrid />
      <InteractiveDemo />
    </div>
  );
};

export default Index;
