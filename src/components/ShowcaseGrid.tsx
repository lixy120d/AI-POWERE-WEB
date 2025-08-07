import { FeatureCard } from "./FeatureCard";
import { useToast } from "@/hooks/use-toast";
import { 
  Code2, 
  Palette, 
  Zap, 
  Sparkles, 
  Layout, 
  Smartphone,
  Globe,
  Layers,
  MousePointer
} from "lucide-react";

export const ShowcaseGrid = () => {
  const { toast } = useToast();

  const features = [
    {
      icon: Code2,
      title: "Clean Code",
      description: "TypeScript, React, and modern best practices. Every component is perfectly structured and maintainable.",
      demoAction: () => toast({
        title: "Code Quality",
        description: "All components follow strict TypeScript standards with proper error handling.",
      })
    },
    {
      icon: Palette,
      title: "Design System",
      description: "Consistent, beautiful design tokens with HSL colors, semantic naming, and perfect contrast ratios.",
      demoAction: () => toast({
        title: "Design Tokens",
        description: "All colors, gradients, and animations are defined in the design system.",
      }),
      gradient: true
    },
    {
      icon: Zap,
      title: "Smooth Animations",
      description: "CSS transforms, transitions, and keyframe animations that feel natural and performant.",
      demoAction: () => toast({
        title: "Animation Magic",
        description: "Powered by CSS custom properties and Tailwind's animation utilities.",
      })
    },
    {
      icon: Sparkles,
      title: "Interactive Elements",
      description: "Hover effects, state management, and micro-interactions that delight users.",
      demoAction: () => toast({
        title: "Interactivity",
        description: "React state management with beautiful visual feedback.",
      })
    },
    {
      icon: Layout,
      title: "Responsive Design",
      description: "Mobile-first approach with flexible layouts that work on any screen size.",
      demoAction: () => toast({
        title: "Responsive Grid",
        description: "CSS Grid and Flexbox with Tailwind's responsive utilities.",
      })
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Touch-friendly interfaces with proper accessibility and performance on mobile devices.",
      demoAction: () => toast({
        title: "Mobile First",
        description: "Optimized for touch interactions and mobile performance.",
      })
    },
    {
      icon: Globe,
      title: "SEO Ready",
      description: "Semantic HTML, proper meta tags, and accessibility standards built in from the start.",
      demoAction: () => toast({
        title: "SEO Optimized",
        description: "Semantic HTML with proper ARIA labels and meta descriptions.",
      }),
      gradient: true
    },
    {
      icon: Layers,
      title: "Component Library",
      description: "Reusable components built on shadcn/ui with custom variants and perfect styling.",
      demoAction: () => toast({
        title: "Component System",
        description: "Built on Radix UI primitives with custom styling and variants.",
      })
    },
    {
      icon: MousePointer,
      title: "User Experience",
      description: "Intuitive interfaces with clear feedback, loading states, and error handling.",
      demoAction: () => toast({
        title: "UX Excellence",
        description: "Every interaction is designed for maximum user satisfaction.",
      })
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-foreground">
            What I Can Build
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From simple components to complex applications, I create beautiful, functional interfaces with perfect code quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FeatureCard {...feature} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};