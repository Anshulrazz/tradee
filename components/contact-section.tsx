"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Instagram, Youtube, MessageCircle, Send, MapPin, Phone, CheckCircle, Loader2 } from "lucide-react"
import { API_ENDPOINTS } from "@/lib/api"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [isVisible, setIsVisible] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSubmissionStatus('idle')

    try {
      const response = await fetch(API_ENDPOINTS.contact, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmissionStatus('success')
        setFormData({ name: "", email: "", phone: "", message: "" })
      } else {
        setSubmissionStatus('error')
      }
    } catch {
      setSubmissionStatus('error')
    } finally {
      setLoading(false)
    }
  }

  const socialLinks = [
    { icon: MessageCircle, label: "Telegram", href: "https://t.me/+nk2sYK1OEyQzOTk1", color: "from-blue-500/20 to-cyan-500/20", hoverColor: "hover:border-blue-500/50" },
    { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/__mishrasamrat777/", color: "from-pink-500/20 to-purple-500/20", hoverColor: "hover:border-pink-500/50" },
    { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@binarytradingexpert-11", color: "from-red-500/20 to-orange-500/20", hoverColor: "hover:border-red-500/50" },
  ]

  const contactInfo = [
    { icon: Mail, label: "Email", value: "contact@samrattrader.com" },
    { icon: Phone, label: "Phone", value: "+91 98765 43210" },
    { icon: MapPin, label: "Location", value: "India" },
  ]

  return (
    <section ref={sectionRef} id="contact" className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="absolute top-1/4 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-40 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 lg:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-flex items-center gap-2 text-primary font-nav text-sm uppercase tracking-wider mb-4">
            <Send className="w-4 h-4" />
            Get In Touch
          </span>
          <h2 className="font-nav text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Let's <span className="text-gradient">Connect</span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Have questions? Want to learn more? Reach out and start your trading journey today!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <Card className={`glass-card rounded-2xl p-6 lg:p-8 border-border/50 ${isVisible ? 'animate-fade-in-left' : 'opacity-0'}`}>
            <h3 className="text-xl font-bold text-foreground mb-6">Send a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: "name", type: "text", placeholder: "Your full name", label: "Name" },
                { name: "email", type: "email", placeholder: "your@email.com", label: "Email" },
                { name: "phone", type: "tel", placeholder: "+91 98765 43210", label: "Phone" },
              ].map((field) => (
                <div key={field.name} className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">{field.label}</label>
                  <div className={`relative transition-all duration-300 ${focusedField === field.name ? 'scale-[1.02]' : ''}`}>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                      placeholder={field.placeholder}
                      required
                    />
                  </div>
                </div>
              ))}

              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground">Message</label>
                <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'scale-[1.02]' : ''}`}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    rows={4}
                    className="w-full px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300 resize-none"
                    placeholder="Tell me about your trading goals..."
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 rounded-xl text-base font-semibold shadow-lg shadow-primary/25 transition-all duration-300 hover:-translate-y-1"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>

              {submissionStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-500 bg-green-500/10 rounded-xl p-4">
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
              {submissionStatus === 'error' && (
                <div className="text-red-500 bg-red-500/10 rounded-xl p-4">
                  Failed to send message. Please try again or contact via social media.
                </div>
              )}
            </form>
          </Card>

          <div className={`space-y-6 ${isVisible ? 'animate-fade-in-right animation-delay-200' : 'opacity-0'}`}>
            <div className="glass-card rounded-2xl p-6 lg:p-8 border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-6">Join Our Community</h3>
              
              <div className="space-y-4">
                {socialLinks.map((social, idx) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-4 p-4 rounded-xl glass-card border-border/50 ${social.hoverColor} transition-all duration-300 group hover-lift`}
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-6 h-6 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                          {social.label}
                        </p>
                        <p className="text-sm text-muted-foreground">Connect with us</p>
                      </div>
                      <Send className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </a>
                  )
                })}
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 lg:p-8 border-border/50">
              <h3 className="text-xl font-bold text-foreground mb-6">Contact Info</h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon
                  return (
                    <div key={idx} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{info.label}</p>
                        <p className="text-foreground font-medium">{info.value}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <Card className="glass-card rounded-2xl p-6 border-border/50 glow-primary">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground">Weekly Newsletter</h3>
                  <p className="text-xs text-muted-foreground">Get trading insights delivered</p>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 bg-background/50 border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-all"
                />
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 rounded-xl">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
