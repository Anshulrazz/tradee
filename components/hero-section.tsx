"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, TrendingUp, Users, Award, Play, Sparkles } from "lucide-react"

function CountUp({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const countRef = useRef<HTMLSpanElement>(null)
  const [isVisible, setIsVisible] = useState(false)

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

    if (countRef.current) {
      observer.observe(countRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [isVisible, end, duration])

  return <span ref={countRef}>{count}{suffix}</span>
}

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saleEnd = new Date("2026-01-20T23:59:59")

    const updateTimer = () => {
      const now = new Date()
      const diff = saleEnd.getTime() - now.getTime()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / (1000 * 60)) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateTimer()
    const interval = setInterval(updateTimer, 1000)
    return () => clearInterval(interval)
  }, [])

  const stats = [
    { icon: TrendingUp, value: 7, suffix: "+", label: "Years Experience" },
    { icon: Users, value: 10, suffix: "k+", label: "Students Trained" },
    { icon: Award, value: 96, suffix: "%", label: "Success Rate" },
  ]

  return (
    <section className="relative min-h-[90vh] lg:min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute inset-0 bg-radial-glow" />
      
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse animation-delay-500" />
      
      <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-primary rounded-full animate-float" />
      <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-secondary rounded-full animate-float animation-delay-300" />
      <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-primary/60 rounded-full animate-float animation-delay-600" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className={`w-full lg:w-1/2 flex flex-col justify-center space-y-6 text-center lg:text-left ${mounted ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mx-auto lg:mx-0 w-fit glass-card">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="font-nav text-sm text-primary font-medium">Transform Your Trading Journey</span>
            </div>

            <h1 className="font-nav text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-foreground">
              Master the Art of{" "}
              <span className="text-gradient relative">
                Trading
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 10C50 2 150 2 198 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary/50" />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Learn proven trading strategies, risk management, and the winning mindset. Join 10,000+ successful traders who transformed their financial future.
            </p>

            <div className="glass-card rounded-2xl p-4 sm:p-6 glow-primary mt-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-bounce-subtle">🔥</span>
                  <span className="font-bold text-lg sm:text-xl text-foreground">Limited Time Offer!</span>
                </div>
                <div className="flex gap-2 sm:gap-3">
                  {[
                    { value: timeLeft.days, label: "Days" },
                    { value: timeLeft.hours, label: "Hrs" },
                    { value: timeLeft.minutes, label: "Min" },
                    { value: timeLeft.seconds, label: "Sec" },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-primary/20 rounded-lg px-3 py-2 min-w-[50px] sm:min-w-[60px] text-center border border-primary/30">
                      <p className="text-primary font-bold text-lg sm:text-xl tabular-nums">{String(item.value).padStart(2, '0')}</p>
                      <p className="text-muted-foreground text-xs">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
              <a href="/courses" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground group px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-primary/25 transition-all duration-300 hover:-translate-y-1">
                  Start Learning Now
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </Button>
              </a>

              <a href="/consultation" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-primary/50 text-primary bg-transparent hover:bg-primary/10 transition-all duration-300 px-8 py-6 text-lg font-semibold rounded-xl group"
                >
                  <Play className="mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                  Book Consultation
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-8 border-t border-border/50 mt-4">
              {stats.map((stat, idx) => {
                const Icon = stat.icon
                return (
                  <div key={idx} className={`text-center lg:text-left animate-fade-in-up`} style={{ animationDelay: `${(idx + 1) * 0.2}s` }}>
                    <div className="flex items-center justify-center lg:justify-start gap-2 mb-1">
                      <Icon className="w-5 h-5 text-primary hidden sm:block" />
                      <p className="text-primary font-bold text-2xl sm:text-3xl">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </p>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm">{stat.label}</p>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={`w-full lg:w-1/2 flex justify-center lg:justify-end mt-8 lg:mt-0 ${mounted ? 'animate-fade-in-right animation-delay-300' : 'opacity-0'}`}>
            <div className="relative w-full max-w-md lg:max-w-lg xl:max-w-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 rounded-3xl blur-2xl transform scale-105" />
              
              <div className="relative glass-card rounded-3xl p-2 glow-primary">
                <img
                  src="/chart.png"
                  alt="Trading chart showing profitable strategy"
                  className="w-full rounded-2xl object-cover"
                />
                
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 glass-card rounded-xl p-3 sm:p-4 animate-fade-in-up animation-delay-500">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Today's Profit</p>
                      <p className="text-lg sm:text-xl font-bold text-green-500">+₹24,500</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 glass-card rounded-xl p-3 sm:p-4 animate-fade-in-down animation-delay-700">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1,2,3].map((i) => (
                        <div key={i} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-background" />
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Active Now</p>
                      <p className="text-sm font-semibold text-foreground">2.5k+ Students</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-primary/20 rounded-full blur-xl animate-pulse hidden lg:block" />
              <div className="absolute -bottom-8 left-1/4 w-20 h-20 bg-secondary/20 rounded-full blur-xl animate-pulse animation-delay-300 hidden lg:block" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
    </section>
  )
}
