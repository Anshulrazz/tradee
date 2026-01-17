"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { API_ENDPOINTS } from "@/lib/api"
import { Calendar, User, Mail, Phone, MessageSquare, CheckCircle, Loader2, Video, Clock, Award } from "lucide-react"

export default function ConsultationForm() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(API_ENDPOINTS.consultation, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Something went wrong")

      setSuccess(true)
      setFormData({ name: "", email: "", phone: "", experience: "", message: "" })
    } catch (err: any) {
      alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  const benefits = [
    { icon: Video, title: "1:1 Video Call", desc: "Personal guidance via video call" },
    { icon: Clock, title: "Flexible Timing", desc: "Schedule at your convenience" },
    { icon: Award, title: "Expert Guidance", desc: "7+ years of trading experience" },
  ]

  return (
    <>
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
        
        <div className="relative max-w-6xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-2 mb-6">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary font-medium">Book Your Session</span>
          </div>
          
          <h1 className="font-nav text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Book a <span className="text-gradient">Consultation</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get 1-on-1 personalized trading guidance from Samrat Trader himself
          </p>
        </div>
      </section>

      <section className="relative py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon
              return (
                <Card key={idx} className="glass-card rounded-2xl p-6 border-border/50 text-center hover-lift">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </Card>
              )
            })}
          </div>

          <Card className="glass-card rounded-3xl p-8 md:p-12 border-border/50 max-w-3xl mx-auto">
            {success ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Request Submitted!</h3>
                <p className="text-muted-foreground mb-6">We'll get back to you within 24 hours to schedule your consultation.</p>
                <Button onClick={() => setSuccess(false)} variant="outline" className="rounded-xl">
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Your full name" 
                        required 
                        className="pl-12 h-12 rounded-xl bg-background/50 border-border/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="your@email.com" 
                        required 
                        className="pl-12 h-12 rounded-xl bg-background/50 border-border/50"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <Input 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="+91 98765 43210" 
                        required 
                        className="pl-12 h-12 rounded-xl bg-background/50 border-border/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Trading Experience</label>
                    <Input 
                      name="experience" 
                      value={formData.experience} 
                      onChange={handleChange} 
                      placeholder="e.g., Beginner, 1 year, etc." 
                      className="h-12 rounded-xl bg-background/50 border-border/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your trading goals or challenges..."
                    rows={4}
                    className="rounded-xl bg-background/50 border-border/50 resize-none"
                  />
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={loading}
                  className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl text-base font-semibold shadow-lg shadow-primary/25 transition-all hover:-translate-y-0.5"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Submitting...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      Book Consultation
                    </span>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </section>
    </>
  )
}
