import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { AuthDialog } from "@/components/AuthDialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
const feLogo = "/lovable-uploads/a6f28e29-1fc3-4139-99a4-00f100f8a5da.png";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const loginPopupTimer = useRef<number | null>(null);

  const [userInitial, setUserInitial] = useState<string | null>(null);

  useEffect(() => {
    const deriveInitial = (fullName?: string | null, email?: string | null) => {
      const src = (fullName || email || '').trim();
      return src ? src.charAt(0).toUpperCase() : null;
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        const meta = session?.user?.user_metadata as any;
        setUserInitial(deriveInitial(meta?.full_name, session?.user?.email ?? null));
        if (loginPopupTimer.current) window.clearTimeout(loginPopupTimer.current);
        loginPopupTimer.current = window.setTimeout(() => {
          toast({
            title: "Welcome!",
            description: "You’re logged in. You can dismiss this message.",
          });
        }, 60000);
      }
      if (event === 'SIGNED_OUT') {
        setUserInitial(null);
        if (loginPopupTimer.current) window.clearTimeout(loginPopupTimer.current);
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      const session = data.session;
      if (session?.user) {
        const meta = session.user.user_metadata as any;
        setUserInitial(deriveInitial(meta?.full_name, session.user.email ?? null));
      }
    });

    return () => {
      if (loginPopupTimer.current) window.clearTimeout(loginPopupTimer.current);
      subscription.unsubscribe();
    };
  }, [toast]);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src={feLogo}
              alt="F&E Tech Lab Logo"
              className="w-12 h-12 md:w-14 md:h-14 filter brightness-95 contrast-150 saturate-110"
            />
            <div>
              <span className="text-xl font-bold text-primary">F&E Tech Lab</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            ))}
            {userInitial ? (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">{userInitial}</AvatarFallback>
              </Avatar>
            ) : (
              <AuthDialog />
            )}
            <a href="https://wa.me/256726798473" target="_blank" rel="noopener noreferrer">
              <Button size="sm">
                <Phone className="w-4 h-4 mr-2" />
                Get Quote
              </Button>
            </a>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-6 mt-8">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="text-left text-lg text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </button>
                ))}
                {userInitial ? (
                  <div className="flex items-center justify-start">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">{userInitial}</AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <AuthDialog triggerClassName="w-full" triggerSize="default" />
                )}
                <a href="https://wa.me/256726798473" target="_blank" rel="noopener noreferrer" className="w-full mt-6">
                  <Button className="w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Get Quote
                  </Button>
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};