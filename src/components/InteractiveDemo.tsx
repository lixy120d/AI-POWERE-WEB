import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Pause, RotateCcw, Zap, Layers, Sparkles } from "lucide-react";

export const InteractiveDemo = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  const handleClick = () => {
    setClickCount(prev => prev + 1);
  };

  const reset = () => {
    setIsAnimating(false);
    setClickCount(0);
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-foreground">
            Interactive Playground
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Click, hover, and explore the components I can create
          </p>
        </div>

        <Tabs defaultValue="animations" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-secondary/50 backdrop-blur-glass">
            <TabsTrigger value="animations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Zap className="w-4 h-4 mr-2" />
              Animations
            </TabsTrigger>
            <TabsTrigger value="interactions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Layers className="w-4 h-4 mr-2" />
              Interactions
            </TabsTrigger>
            <TabsTrigger value="effects" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Sparkles className="w-4 h-4 mr-2" />
              Effects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="animations" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-[var(--glass-bg)] backdrop-blur-glass border border-[var(--glass-border)]">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Smooth Animations</h3>
                <div className="space-y-4">
                  <div className={`w-16 h-16 bg-gradient-primary rounded-lg transition-all duration-500 ${isAnimating ? 'transform rotate-45 scale-110' : ''}`} />
                  <div className="flex space-x-2">
                    <Button variant="glass" size="sm" onClick={handleAnimation}>
                      {isAnimating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={reset}>
                      <RotateCcw className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-[var(--glass-bg)] backdrop-blur-glass border border-[var(--glass-border)]">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Hover Effects</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-20 bg-gradient-secondary rounded-lg hover:shadow-glow-primary hover:scale-105 transition-all duration-300 cursor-pointer flex items-center justify-center">
                    <span className="text-sm text-foreground">Hover me</span>
                  </div>
                  <div className="h-20 bg-secondary rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer flex items-center justify-center">
                    <span className="text-sm">Transform</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="interactions" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-[var(--glass-bg)] backdrop-blur-glass border border-[var(--glass-border)]">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Click Counter</h3>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-primary">{clickCount}</div>
                  <Button variant="hero" onClick={handleClick} className="w-full">
                    Click me! (+1)
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Clicked {clickCount} {clickCount === 1 ? 'time' : 'times'}
                  </p>
                </div>
              </Card>

              <Card className="p-6 bg-[var(--glass-bg)] backdrop-blur-glass border border-[var(--glass-border)]">
                <h3 className="text-lg font-semibold mb-4 text-foreground">Dynamic Badges</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="default" className="animate-pulse">Live</Badge>
                    <Badge variant="secondary">React</Badge>
                    <Badge variant="outline" className="animate-bounce">TypeScript</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Beautiful, semantic components with perfect styling
                  </p>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-6">
            <Card className="p-8 bg-[var(--glass-bg)] backdrop-blur-glass border border-[var(--glass-border)] text-center">
              <h3 className="text-2xl font-semibold mb-6 text-foreground">Glassmorphism & Gradients</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-32 bg-gradient-primary rounded-lg flex items-center justify-center text-primary-foreground font-semibold">
                  Gradient Magic
                </div>
                <div className="h-32 bg-[var(--glass-bg)] backdrop-blur-glass border border-[var(--glass-border)] rounded-lg flex items-center justify-center text-foreground">
                  Glass Effect
                </div>
                <div className="h-32 bg-secondary rounded-lg shadow-glow-card flex items-center justify-center text-foreground animate-glow">
                  Glowing Card
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};