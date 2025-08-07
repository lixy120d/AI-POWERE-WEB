import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  demoAction?: () => void;
  gradient?: boolean;
}

export const FeatureCard = ({ icon: Icon, title, description, demoAction, gradient }: FeatureCardProps) => {
  return (
    <Card className={`group relative overflow-hidden border border-[var(--glass-border)] backdrop-blur-glass transition-all duration-500 hover:scale-105 hover:shadow-glow-card ${
      gradient ? 'bg-gradient-secondary' : 'bg-[var(--glass-bg)]'
    }`}>
      <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative p-6 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors duration-300">
            <Icon className="w-6 h-6 text-primary group-hover:animate-float" />
          </div>
          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary-glow transition-colors duration-300">
            {title}
          </h3>
        </div>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
        {demoAction && (
          <Button 
            variant="glass" 
            size="sm" 
            onClick={demoAction}
            className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0"
          >
            Try it
          </Button>
        )}
      </div>
    </Card>
  );
};