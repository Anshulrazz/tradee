import Header from "@/components/header"
import BlogSection from "@/components/blog-section"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, TrendingUp, Clock, ArrowRight, Send, Sparkles, Filter } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Trading Blog - Market Insights & Tips",
  description: "Latest trading strategies, market analysis, and tips from Samrat Trader.",
}

export default function BlogPage() {
  const categories = [
    { label: "All Posts", count: 24 },
    { label: "Market Analysis", count: 8 },
    { label: "Strategy", count: 6 },
    { label: "Psychology", count: 5 },
    { label: "Education", count: 5 },
  ]

  const featuredPosts = [
    {
      title: "Complete Guide to Risk Management in 2026",
      excerpt: "Master the art of protecting your capital while maximizing returns. Learn position sizing, stop-loss strategies, and portfolio management.",
      category: "Education",
      date: "Jan 15, 2026",
      readTime: "12 min",
      featured: true,
      color: "from-primary/20 to-amber-500/20",
    },
    {
      title: "Market Outlook: What to Expect This Quarter",
      excerpt: "Comprehensive analysis of current market trends, key levels, and potential trading opportunities for the upcoming months.",
      category: "Market Analysis",
      date: "Jan 12, 2026",
      readTime: "8 min",
      color: "from-blue-500/20 to-cyan-500/20",
    },
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
            <BookOpen className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Trading Insights</span>
          </div>
          
          <h1 className="font-nav text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
            Market Insights & <span className="text-gradient">Tips</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest trading strategies, market analysis, and expert insights to improve your trading
          </p>
        </div>
      </section>

      <section className="relative py-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            <span className="text-sm text-muted-foreground flex items-center gap-2 flex-shrink-0">
              <Filter className="w-4 h-4" />
              Filter:
            </span>
            {categories.map((cat, idx) => (
              <Button
                key={idx}
                variant={idx === 0 ? "default" : "outline"}
                size="sm"
                className={`rounded-full flex-shrink-0 ${idx === 0 ? 'bg-primary hover:bg-primary/90' : 'border-border/50 hover:border-primary/50'}`}
              >
                {cat.label}
                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${idx === 0 ? 'bg-primary-foreground/20' : 'bg-muted'}`}>
                  {cat.count}
                </span>
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {featuredPosts.map((post, idx) => (
              <Card 
                key={idx} 
                className={`glass-card rounded-2xl overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 hover-lift cursor-pointer group ${idx === 0 ? 'md:col-span-2' : ''}`}
              >
                <div className={`h-2 bg-gradient-to-r ${post.color}`} />
                <div className="p-6 lg:p-8">
                  {post.featured && (
                    <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span className={`px-2 py-1 rounded-full bg-gradient-to-r ${post.color}`}>{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className={`font-nav font-bold text-foreground group-hover:text-primary transition-colors mb-3 ${idx === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'}`}>
                    {post.title}
                  </h3>

                  <p className={`text-muted-foreground leading-relaxed ${idx === 0 ? 'text-base' : 'text-sm'}`}>
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 mt-6 text-primary font-medium group-hover:gap-3 transition-all">
                    Read Article
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <BlogSection />

      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="relative max-w-3xl mx-auto px-4">
          <Card className="glass-card rounded-3xl p-8 md:p-12 border-border/50 text-center glow-primary">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-6">
              <Send className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="font-nav text-2xl md:text-3xl font-bold mb-4 text-foreground">
              Get Weekly <span className="text-gradient">Insights</span>
            </h2>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Subscribe to receive the latest trading analysis, market updates, and exclusive tips directly in your inbox
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 rounded-xl shadow-lg shadow-primary/25">
                Subscribe
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground mt-4">No spam, unsubscribe anytime. Join 5,000+ traders.</p>
          </Card>
        </div>
      </section>

      <section className="relative py-12 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="glass-card rounded-2xl p-6 md:p-8 border-border/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                  <TrendingUp className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg">Want Daily Market Updates?</h3>
                  <p className="text-sm text-muted-foreground">Join our Telegram for free signals and real-time analysis</p>
                </div>
              </div>
              <Link href="https://t.me/+nk2sYK1OEyQzOTk1" target="_blank">
                <Button className="bg-[#0088cc] hover:bg-[#0088cc]/90 text-white rounded-xl px-8 shadow-lg">
                  Join Telegram
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </main>
  )
}
