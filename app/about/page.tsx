import Header from "@/components/header"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { User, Target, TrendingUp, Award, BookOpen, Users, Sparkles, Heart, Lightbulb, Shield } from "lucide-react"

export const metadata = {
  title: "About Samrat Trader - Trading Experience & Background",
  description: "Learn about Samrat Trader's 7+ years of experience, training methodology, and proven track record.",
}

export default function AboutPage() {
  const milestones = [
    { year: "2017", title: "Started Trading", desc: "Began trading journey with stock market basics and technical analysis", icon: TrendingUp },
    { year: "2019", title: "First Course Launched", desc: "Created beginner trading course for local trading community", icon: BookOpen },
    { year: "2021", title: "100K+ Views", desc: "Reached milestone of training over 100k views of traders", icon: Users },
    { year: "2024", title: "Global Recognition", desc: "Featured in top finance platforms and expanded mentorship program", icon: Award },
  ]

  const philosophies = [
    { title: "Discipline", desc: "Stick to your trading plan and rules, no matter what the market does.", icon: Target, color: "from-blue-500/20 to-cyan-500/20" },
    { title: "Risk Management", desc: "Protect your capital first, profit second. Never risk what you can't afford to lose.", icon: Shield, color: "from-green-500/20 to-emerald-500/20" },
    { title: "Continuous Learning", desc: "Markets evolve, and successful traders stay ahead by constantly improving their skills.", icon: Lightbulb, color: "from-purple-500/20 to-pink-500/20" },
  ]

  const values = [
    { label: "Transparency", desc: "Real results, no fake promises" },
    { label: "Education First", desc: "Knowledge over quick profits" },
    { label: "Community", desc: "Learn and grow together" },
    { label: "Integrity", desc: "Honest guidance always" },
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
            <User className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">About Me</span>
          </div>
          
          <h1 className="font-nav text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Meet <span className="text-gradient">Samrat Trader</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            7+ years of trading experience and a commitment to helping traders achieve their financial goals
          </p>
        </div>
      </section>

      <AboutSection />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-primary font-nav text-sm uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              My Journey
            </span>
            <h2 className="font-nav text-3xl md:text-4xl font-bold text-foreground">
              Trading <span className="text-gradient">Timeline</span>
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-secondary to-primary/30 hidden md:block" />
            
            <div className="space-y-8">
              {milestones.map((milestone, idx) => {
                const Icon = milestone.icon
                const isLeft = idx % 2 === 0
                return (
                  <div key={idx} className={`relative flex items-center gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`hidden md:block md:w-1/2 ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                      <Card className="glass-card rounded-2xl p-6 border-border/50 hover-lift inline-block">
                        <h3 className="font-nav text-xl font-bold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.desc}</p>
                      </Card>
                    </div>
                    
                    <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border-2 border-primary/50 flex items-center justify-center glass-card">
                        <span className="text-primary font-bold text-sm">{milestone.year}</span>
                      </div>
                    </div>

                    <div className="md:hidden flex-1 pl-20">
                      <Card className="glass-card rounded-2xl p-6 border-border/50">
                        <h3 className="font-nav text-lg font-bold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-muted-foreground text-sm">{milestone.desc}</p>
                      </Card>
                    </div>
                    
                    <div className={`hidden md:block md:w-1/2 ${isLeft ? 'md:pl-12' : 'md:pr-12'}`} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="relative max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-primary font-nav text-sm uppercase tracking-wider mb-4">
              <Heart className="w-4 h-4" />
              Core Beliefs
            </span>
            <h2 className="font-nav text-3xl md:text-4xl font-bold text-foreground">
              Trading <span className="text-gradient">Philosophy</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {philosophies.map((philosophy, idx) => {
              const Icon = philosophy.icon
              return (
                <Card key={idx} className="glass-card rounded-2xl p-8 border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${philosophy.color} flex items-center justify-center mx-auto mb-6`}>
                    <Icon className="w-8 h-8 text-foreground" />
                  </div>
                  <h3 className="font-nav text-xl font-bold text-foreground mb-3">{philosophy.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{philosophy.desc}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 text-primary font-nav text-sm uppercase tracking-wider mb-4">
              <Award className="w-4 h-4" />
              What I Stand For
            </span>
            <h2 className="font-nav text-3xl md:text-4xl font-bold text-foreground">
              My <span className="text-gradient">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {values.map((value, idx) => (
              <Card key={idx} className="glass-card rounded-xl p-4 border-border/50 text-center hover:border-primary/50 transition-all">
                <p className="font-bold text-foreground mb-1">{value.label}</p>
                <p className="text-xs text-muted-foreground">{value.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
