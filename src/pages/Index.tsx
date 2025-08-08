import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { ShowcaseGrid } from "@/components/ShowcaseGrid";
import { ContactSection } from "@/components/ContactSection";
import { ProjectsCompleted } from "@/components/ProjectsCompleted";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div id="home">
        <HeroSection />
      </div>
      <div id="services">
        <ShowcaseGrid />
      </div>
      <div id="projects">
        <ProjectsCompleted />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </div>
  );
};

export default Index;
