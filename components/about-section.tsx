"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle, TrendingUp, Users, Award, Target } from "lucide-react"

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const highlights = [
    { icon: TrendingUp, text: "7+ Years of Trading Experience" },
    { icon: Users, text: "10,000+ Students Trained Successfully" },
    { icon: Award, text: "96% Student Satisfaction Rate" },
    { icon: Target, text: "Proven Strategies That Work" },
  ]

  const achievements = [
    { value: "₹2Cr+", label: "Student Profits" },
    { value: "500+", label: "Video Lessons" },
    { value: "24/7", label: "Support" },
  ]

  return (
    <section ref={sectionRef} id="about" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className={`relative ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-2xl transform -rotate-6 scale-105" />
              
              <div className="relative glass-card rounded-3xl p-3 glow-primary">
                <img 
                  src="./hro.png" 
                  className="w-full rounded-2xl object-cover" 
                  alt="Samrat Trader" 
                />
                
                <div className="absolute -bottom-6 -right-6 glass-card rounded-2xl p-4 animate-fade-in-up animation-delay-500">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                      <Award className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Verified Expert</p>
                      <p className="text-sm font-bold text-foreground">Top 1% Trader</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -left-4 glass-card rounded-xl p-3 animate-fade-in-down animation-delay-300">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-muted-foreground">Live Trading</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:grid grid-cols-3 gap-4 mt-8">
              {achievements.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`glass-card rounded-xl p-4 text-center hover-lift ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.6 + idx * 0.1}s` }}
                >
                  <p className="text-2xl font-bold text-primary">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`space-y-6 lg:space-y-8 ${isVisible ? 'animate-fade-in-right animation-delay-200' : 'opacity-0'}`}>
            <div>
              <span className="inline-block text-primary font-nav text-sm uppercase tracking-wider mb-3">About Me</span>
              <h2 className="font-nav text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Meet <span className="text-gradient">Samrat Trader</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              I'm a professional stock and forex trader with over 7 years of experience in financial markets. 
              My journey from a curious beginner to a consistently profitable trader has taught me invaluable lessons 
              that I now share with thousands of students worldwide.
            </p>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              My mission is simple: <span className="text-foreground font-medium">to help you achieve financial freedom through smart trading.</span> 
              I believe that with the right knowledge, discipline, and mindset, anyone can succeed in the markets.
            </p>

            <div className="space-y-4 pt-4">
              {highlights.map((highlight, idx) => {
                const Icon = highlight.icon
                return (
                  <div 
                    key={idx} 
                    className={`flex items-center gap-4 p-4 rounded-xl bg-foreground/5 border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                    style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Icon className="text-primary w-5 h-5" />
                    </div>
                    <span className="text-foreground font-medium">{highlight.text}</span>
                    <CheckCircle className="ml-auto text-secondary w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                )
              })}
            </div>

            <div className="lg:hidden grid grid-cols-3 gap-3 pt-6">
              {achievements.map((item, idx) => (
                <div 
                  key={idx} 
                  className="glass-card rounded-xl p-3 text-center"
                >
                  <p className="text-xl font-bold text-primary">{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
