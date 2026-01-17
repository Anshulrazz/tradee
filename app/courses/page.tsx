import Header from "@/components/header"
import CoursesSection from "@/components/courses-section"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { GraduationCap, BookOpen, Users, Award, HelpCircle, ChevronDown } from "lucide-react"

export const metadata = {
  title: "Trading Courses - Learn from Samrat Trader",
  description: "Beginner, advanced, and mentorship trading courses. Learn proven strategies and risk management.",
}

export default function CoursesPage() {
  const faqs = [
    { q: "How long do I have access to the course?", a: "You have lifetime access to all course materials, including future updates." },
    { q: "Is there a refund policy?", a: "Yes, we offer a 30-day money-back guarantee if you're not satisfied." },
    { q: "Do you provide live trading sessions?", a: "Yes, advanced courses include weekly live trading sessions and analysis." },
    { q: "Can I access courses on mobile?", a: "All courses are optimized for mobile and desktop viewing." },
    { q: "What if I have questions during the course?", a: "You get access to our community forum and direct support for all queries." },
    { q: "Do I need prior trading experience?", a: "No! Our beginner course is perfect for complete newcomers to trading." },
  ]

  const stats = [
    { icon: Users, value: "10,000+", label: "Students Enrolled" },
    { icon: BookOpen, value: "500+", label: "Video Lessons" },
    { icon: Award, value: "96%", label: "Success Rate" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Premium Trading Education</span>
          </div>
          
          <h1 className="font-nav text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Learn Trading the <span className="text-gradient">Right Way</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Choose from comprehensive courses designed for every skill level, from complete beginners to advanced traders
          </p>

          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="glass-card rounded-2xl p-4 text-center">
                  <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className="text-xl md:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CoursesSection />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-primary font-nav text-sm uppercase tracking-wider mb-4">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </div>
            <h2 className="font-nav text-3xl md:text-4xl font-bold text-foreground">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((faq, idx) => (
              <Card key={idx} className="glass-card rounded-2xl p-6 border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift">
                <h3 className="font-semibold text-foreground mb-3 flex items-start gap-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs text-primary font-bold">{idx + 1}</span>
                  </span>
                  {faq.q}
                </h3>
                <p className="text-muted-foreground text-sm pl-8">{faq.a}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
