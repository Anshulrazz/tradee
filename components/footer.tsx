"use client"

import Link from "next/link"
import { Instagram, Youtube, MessageCircle, Send, Heart, ArrowUp } from "lucide-react"
import { useEffect, useState, useRef } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (footerRef.current) {
      observer.observe(footerRef.current)
    }

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const footerLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Performance", href: "/performance" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  const courses = [
    { label: "Beginner Course", href: "/courses" },
    { label: "Advanced Masterclass", href: "/courses" },
    { label: "1:1 Mentorship", href: "/courses" },
  ]

  const legal = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Refund Policy", href: "#" },
  ]

  const socialLinks = [
    { icon: MessageCircle, href: "https://t.me/+nk2sYK1OEyQzOTk1", label: "Telegram" },
    { icon: Instagram, href: "https://www.instagram.com/__mishrasamrat777/", label: "Instagram" },
    { icon: Youtube, href: "https://www.youtube.com/@binarytradingexpert-11", label: "YouTube" },
  ]

  return (
    <>
      <footer ref={footerRef} className="relative bg-card/50 border-t border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/30 transition-all" />
                  <img src="./logo.png" alt="Samrat Trader Logo" className="relative z-10 w-full h-full object-contain" />
                </div>
                <span className="font-nav text-xl font-bold text-foreground">
                  Samrat <span className="text-primary">Trader</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground mb-6 max-w-xs">
                Master trading strategies with 7+ years of expertise. Join 10,000+ successful traders.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
                      aria-label={social.label}
                    >
                      <Icon size={18} />
                    </a>
                  )
                })}
              </div>
            </div>

            <div>
              <h4 className="font-nav text-lg font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-nav text-lg font-semibold text-foreground mb-4">Courses</h4>
              <ul className="space-y-3">
                {courses.map((course, idx) => (
                  <li key={idx}>
                    <Link 
                      href={course.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                      {course.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-nav text-lg font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3">
                {legal.map((item, idx) => (
                  <li key={idx}>
                    <Link 
                      href={item.href} 
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1 group"
                    >
                      <span className="w-0 h-px bg-primary group-hover:w-3 transition-all duration-300" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={`glass-card rounded-2xl p-6 mb-8 ${isVisible ? 'animate-fade-in-up animation-delay-300' : 'opacity-0'}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <Send className="w-5 h-5 text-primary" />
                <p className="text-foreground font-medium">Get daily trading signals and updates</p>
              </div>
              <a 
                href="https://t.me/+nk2sYK1OEyQzOTk1" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-medium transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-primary/25"
              >
                Join Telegram Channel
              </a>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

          <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${isVisible ? 'animate-fade-in-up animation-delay-500' : 'opacity-0'}`}>
            <p className="font-nav text-sm text-muted-foreground">
              © {currentYear} Samrat Trader. All rights reserved.
            </p>
            <p className="font-nav text-sm text-muted-foreground flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" /> for traders worldwide
            </p>
          </div>
        </div>
      </footer>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center transition-all duration-500 hover:scale-110 ${
          showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </>
  )
}
