"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function BlogSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const blogPosts = [
    {
      title: "Trading Psychology: The Mind Game",
      excerpt: "Master your emotions and develop a winning mindset in trading. Learn the psychological principles that separate winners from losers.",
      category: "Psychology",
      date: "Jan 2026",
      readTime: "5 min",
      color: "from-purple-500/20 to-pink-500/20",
      image: "/chart.png",
    },
    {
      title: "Market Update: Opportunities in 2026",
      excerpt: "Analysis of current market trends and hidden opportunities. Key levels to watch and potential profit targets for this year.",
      category: "Market Analysis",
      date: "Jan 2026",
      readTime: "7 min",
      color: "from-blue-500/20 to-cyan-500/20",
      image: "/chart.png",
    },
    {
      title: "Candlestick Patterns That Actually Work",
      excerpt: "Break down the most reliable candlestick patterns used by professional traders. Real examples from recent market movements.",
      category: "Strategy",
      date: "Dec 2025",
      readTime: "8 min",
      color: "from-green-500/20 to-emerald-500/20",
      image: "/chart.png",
    },
    {
      title: "Risk Management Rules for Beginners",
      excerpt: "Essential risk management principles every trader must know. Protect your capital and grow your wealth systematically.",
      category: "Education",
      date: "Dec 2025",
      readTime: "6 min",
      color: "from-orange-500/20 to-amber-500/20",
      image: "/chart.png",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="blog" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="absolute top-1/3 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12 lg:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div>
            <span className="inline-flex items-center gap-2 text-primary font-nav text-sm uppercase tracking-wider mb-4">
              <BookOpen className="w-4 h-4" />
              Latest Insights
            </span>
            <h2 className="font-nav text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Market Insights & <span className="text-gradient">Tips</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg mt-3 max-w-xl">
              Stay updated with latest trading strategies and market analysis
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 rounded-full px-6">
              View All Posts
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {blogPosts.map((post, idx) => (
            <Card
              key={idx}
              className={`glass-card rounded-2xl overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-500 group cursor-pointer ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} ${hoveredCard === idx ? 'scale-[1.02] shadow-2xl' : ''}`}
              style={{ animationDelay: `${idx * 0.1}s` }}
              onMouseEnter={() => setHoveredCard(idx)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className={`h-2 bg-gradient-to-r ${post.color}`} />
              
              <div className="p-6 lg:p-8 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className={`text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r ${post.color}`}>
                    {post.category}
                  </span>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>{post.date}</span>
                  </div>
                </div>

                <h3 className="text-lg lg:text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
                  {post.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      ST
                    </div>
                    <span className="text-sm text-muted-foreground">Samrat Trader</span>
                  </div>
                  
                  <div className={`flex items-center gap-1 text-primary text-sm font-medium transition-all duration-300 ${hoveredCard === idx ? 'translate-x-1' : ''}`}>
                    Read More
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${hoveredCard === idx ? 'translate-x-1' : ''}`} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className={`mt-12 lg:mt-16 glass-card rounded-2xl p-6 lg:p-8 ${isVisible ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'}`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-lg">Get Daily Market Updates</h3>
                <p className="text-sm text-muted-foreground">Join our Telegram for free trading signals and insights</p>
              </div>
            </div>
            <Link href="https://t.me/+nk2sYK1OEyQzOTk1" target="_blank">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/25">
                Join Telegram
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
