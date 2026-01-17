"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Instagram, Send, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/store/hooks"
import type { RootState } from "@/store"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user } = useAppSelector((s: RootState) => s.auth)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Life Style", href: "/about" },
    { label: "Courses", href: "/courses" },
    { label: "Performance", href: "/performance" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5" 
          : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-16 sm:h-20 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-all duration-300 group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-lg group-hover:bg-primary/30 transition-all" />
                <img src="/logo.png" alt="logo" className="relative z-10 w-full h-full object-contain" />
              </div>
              <span className="font-nav text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
                Samrat <span className="text-primary">Trader</span>
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, idx) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="font-nav text-foreground/80 hover:text-primary text-sm uppercase tracking-wider px-4 py-2 rounded-lg relative group transition-all duration-300"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span className="absolute inset-0 bg-primary/10 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-1/2 transition-all duration-300" />
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Link
                  href="https://www.instagram.com/__mishrasamrat777/"
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  <Instagram size={18} />
                </Link>
                <Link
                  href="https://t.me/+nk2sYK1OEyQzOTk1"
                  target="_blank"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-foreground/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
                >
                  <Send size={18} />
                </Link>
              </div>
              
              {user ? (
                <Link href="/dashboard">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-nav px-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-nav px-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:-translate-y-0.5">
                    Login
                  </Button>
                </Link>
              )}
            </div>

            <div className="flex items-center gap-3 lg:hidden">
              <Link
                href="https://www.instagram.com/__mishrasamrat777/"
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-foreground/5 text-muted-foreground hover:text-primary transition-all"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="https://t.me/+nk2sYK1OEyQzOTk1"
                target="_blank"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-foreground/5 text-muted-foreground hover:text-primary transition-all"
              >
                <Send size={18} />
              </Link>

              <button
                className="w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 text-foreground hover:bg-primary/20 hover:text-primary transition-all duration-300"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}>
        <div 
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />
        
        <nav className={`absolute inset-x-0 top-16 sm:top-20 p-6 transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"}`}>
          <div className="glass-card rounded-2xl p-6 space-y-2">
            {navItems.map((item, idx) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-primary/10 transition-all duration-300 group"
                onClick={() => setIsOpen(false)}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <span className="font-nav text-lg text-foreground group-hover:text-primary transition-colors uppercase tracking-wide">
                  {item.label}
                </span>
                <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </Link>
            ))}
            
            <div className="pt-4 mt-4 border-t border-border/50">
              {user ? (
                <Link href="/dashboard" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-nav py-6 rounded-xl text-lg shadow-lg">
                    Go to Dashboard
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              ) : (
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-nav py-6 rounded-xl text-lg shadow-lg">
                    Login to Account
                    <ChevronRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>

      <div className="h-16 sm:h-20" />
    </>
  )
}
