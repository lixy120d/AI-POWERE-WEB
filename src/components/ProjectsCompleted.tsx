import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const ProjectsCompleted = () => {
  return (
    <section id="projects" className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground">Projects Completed So Far</h2>
          <p className="text-muted-foreground mt-2">A quick snapshot of our delivery track record.</p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-primary">25+</p>
              <p className="text-muted-foreground mt-2">Across web apps, dashboards, and integrations</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>Client Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-primary">98%</p>
              <p className="text-muted-foreground mt-2">Measured via post‑project feedback</p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle>On‑Time Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-extrabold text-primary">100%</p>
              <p className="text-muted-foreground mt-2">Committed to timelines and quality</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
