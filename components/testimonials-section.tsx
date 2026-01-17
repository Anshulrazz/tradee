"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"

export default function TestimonialsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const sectionRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const testimonials = [
    {
      name: "Rohit Sharma",
      role: "Full-time Trader",
      avatar: "RS",
      content: "Samrat's course completely changed how I view trading. His risk management lessons are pure gold! I went from losing money consistently to being profitable in just 3 months.",
      rating: 5,
      profit: "+₹2.5L",
    },
    {
      name: "Priya Mehta",
      role: "Business Owner",
      avatar: "PM",
      content: "The personalized mentorship helped me turn my portfolio around. I was skeptical at first, but the results speak for themselves. Best investment I ever made!",
      rating: 5,
      profit: "+₹4.2L",
    },
    {
      name: "Arjun Kumar",
      role: "Software Engineer",
      avatar: "AK",
      content: "Best investment I made for my trading education. Clear, practical, and results-driven approach. The community support is incredible too.",
      rating: 5,
      profit: "+₹1.8L",
    },
    {
      name: "Neha Patel",
      role: "CA Professional",
      avatar: "NP",
      content: "Samrat's strategies are timeless. I've been using them for 2 years now with consistent profits. His teaching style makes complex concepts easy to understand.",
      rating: 5,
      profit: "+₹6.1L",
    },
    {
      name: "Vikram Singh",
      role: "Retired Banker",
      avatar: "VS",
      content: "At my age, I was hesitant to learn trading. But Samrat's patient guidance made it possible. Now I manage my retirement portfolio confidently.",
      rating: 5,
      profit: "+₹3.5L",
    },
    {
      name: "Ananya Gupta",
      role: "Student",
      avatar: "AG",
      content: "Started as a complete beginner and now I'm earning while studying! The beginner course is perfect for anyone just starting out.",
      rating: 5,
      profit: "+₹85K",
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

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const scrollToCard = (index: number) => {
    setActiveIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const nextTestimonial = () => {
    scrollToCard((activeIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    scrollToCard((activeIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="absolute top-1/4 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -left-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 lg:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-flex items-center gap-2 text-primary font-nav text-sm uppercase tracking-wider mb-4">
            <Star className="w-4 h-4 fill-primary" />
            Testimonials
          </span>
          <h2 className="font-nav text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            What My <span className="text-gradient">Students Say</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Real success stories from traders who transformed their lives
          </p>
        </div>

        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-4 lg:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {testimonials.map((testimonial, idx) => (
              <Card
                key={idx}
                className={`glass-card rounded-2xl p-6 lg:p-8 flex-shrink-0 w-[85vw] sm:w-[400px] snap-center border-border/50 transition-all duration-500 ${
                  idx === activeIndex ? 'border-primary/50 scale-100' : 'opacity-70 scale-95'
                } ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-primary fill-primary" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-primary/20" />
                </div>

                <p className="text-foreground/90 leading-relaxed mb-6 text-sm lg:text-base">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-sm font-bold text-primary-foreground">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Profit</p>
                    <p className="text-lg font-bold text-green-500">{testimonial.profit}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollToCard(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    idx === activeIndex 
                      ? 'w-8 h-2 bg-primary' 
                      : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className={`mt-12 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 ${isVisible ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'}`}>
          {[
            { value: "10,000+", label: "Students" },
            { value: "4.9/5", label: "Rating" },
            { value: "₹10Cr+", label: "Student Profits" },
            { value: "96%", label: "Success Rate" },
          ].map((stat, idx) => (
            <div key={idx} className="glass-card rounded-xl p-4 text-center">
              <p className="text-xl lg:text-2xl font-bold text-gradient">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
