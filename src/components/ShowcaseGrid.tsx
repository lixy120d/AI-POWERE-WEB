import { FeatureCard } from "./FeatureCard";
import { useToast } from "@/hooks/use-toast";
import { 
  Code2, 
  Palette, 
  Zap, 
  Smartphone,
  Globe,
  Shield,
  Users,
  Headphones,
  Rocket
} from "lucide-react";

export const ShowcaseGrid = () => {
  const { toast } = useToast();

  const services = [
    {
      icon: Code2,
      title: "Web Development",
      description: "Custom web applications built with React, TypeScript, and modern frameworks. Scalable, maintainable, and performant solutions.",
      demoAction: () => toast({
        title: "Web Development",
        description: "Full-stack development with cutting-edge technologies.",
      })
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Beautiful, intuitive interfaces that convert visitors into customers. User-centered design with stunning visuals.",
      demoAction: () => toast({
        title: "UI/UX Design",
        description: "Creating exceptional user experiences that drive results.",
      }),
      gradient: true
    },
    {
      icon: Smartphone,
      title: "Mobile Apps",
      description: "Cross-platform mobile applications that work seamlessly on iOS and Android devices.",
      demoAction: () => toast({
        title: "Mobile Development",
        description: "Native performance with cross-platform efficiency.",
      })
    },
    {
      icon: Globe,
      title: "E-Commerce Solutions",
      description: "Complete online stores with payment processing, inventory management, and customer analytics.",
      demoAction: () => toast({
        title: "E-Commerce",
        description: "Full-featured online stores that sell 24/7.",
      })
    },
    {
      icon: Shield,
      title: "Security & Performance",
      description: "Robust security measures and lightning-fast performance optimization for your applications.",
      demoAction: () => toast({
        title: "Security & Performance",
        description: "Enterprise-grade security with optimal performance.",
      }),
      gradient: true
    },
    {
      icon: Zap,
      title: "System Integration",
      description: "Seamless integration with existing systems, APIs, and third-party services.",
      demoAction: () => toast({
        title: "System Integration",
        description: "Connecting your digital ecosystem efficiently.",
      })
    }
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: "Expert Team",
      description: "Experienced developers and designers with proven track records in delivering exceptional results."
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock support and maintenance to keep your applications running smoothly."
    },
    {
      icon: Rocket,
      title: "Fast Delivery",
      description: "Agile development process ensuring quick turnaround times without compromising quality."
    }
  ];

  return (
    <>
      {/* Services Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Our Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive digital solutions to transform your business ideas into powerful, scalable applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={service.title}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <FeatureCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-foreground">
              Why Choose F&E Tech Lab?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine technical expertise with creative vision to deliver solutions that exceed expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div 
                key={item.title}
                className="text-center space-y-4 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};