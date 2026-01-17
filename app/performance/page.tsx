import Header from "@/components/header"
import PerformanceSection from "@/components/performance-section"
import TestimonialsSection from "@/components/testimonials-section"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
export const metadata = {
  title: "Trading Results & Performance - Samrat Trader",
  description:
    "View verified trading performance, student success stories, and real results from our trading community.",
}
export default function PerformancePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-nav text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Proven <span className="text-primary">Results</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real trading performance, verified student success, and consistent growth over 7+ years
          </p>
        </div>
      </section>
      <PerformanceSection />
      {/* Student Success Stories */}
      <section className="py-20 md:py-32 bg-card/50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-nav text-3xl md:text-4xl font-bold mb-16 text-center">
            Success <span className="text-primary">Stories</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Rajesh", achievement: "Turned ₹50K into ₹3L in 6 months", category: "Beginner Course" },
              { name: "Priya", achievement: "Achieved 80% win rate with advanced strategies", category: "Masterclass" },
              { name: "Arjun", achievement: "Built consistent monthly income of ₹50K+", category: "Mentorship" },
            ].map((story, idx) => (
              <Card
                key={idx}
                className="bg-background border-border p-8 space-y-4 text-center hover:border-primary/50 transition-all"
              >
                <div className="text-5xl">🏆</div>
                <h3 className="font-bold text-foreground text-lg">{story.name}</h3>
                <p className="text-primary font-semibold">{story.achievement}</p>
                <p className="text-xs text-muted-foreground">{story.category}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <TestimonialsSection />
      <Footer />
    </main>
  )
}
