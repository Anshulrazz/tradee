"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, TrendingUp, Users, Check, Sparkles, Zap } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { useRouter } from "next/navigation";
import { RootState } from "@/store";
import toast, { Toaster } from "react-hot-toast";
import { API_ENDPOINTS } from "@/lib/api";

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CoursesSection() {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    price: number
  ) => {
    e.preventDefault();

    const response = await fetch(API_ENDPOINTS.auth.order, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: price * 100,
        currency,
        receipt: receiptId,
      }),
    });

    const order = await response.json();

    const options = {
      key: "rzp_live_RxrkpzkPSg3ZzF",
      amount: price * 100,
      currency,
      name: "Samrat Trader",
      description: "Course Enrollment",
      image: "/logo.png",
      order_id: order.id,
      handler: async function (response: any) {
        const validateRes = await fetch(API_ENDPOINTS.auth.validate, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...response,
            amount: price * 100,
          }),
        });

        const jsonRes = await validateRes.json();

        if (jsonRes.success) {
          router.push("/success");
        } else {
          toast.error("Payment validation failed");
        }
      },
      prefill: {
        name: user?.name || "Guest User",
        email: user?.email || "guest@example.com",
        contact: user?.phone || "9000000000",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (res: any) => {
      toast.error("Payment failed: " + res.error.description);
    });

    rzp.open();
  };

  const handleEnrollClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    price: number
  ) => {
    if (!user) {
      toast.success("Please log in to enroll");
      router.push("/login");
      return;
    }
    paymentHandler(e, price);
  };

  const courses = [
    {
      title: "Beginner Trading Course",
      description: "Perfect for those starting their trading journey. Learn the fundamentals.",
      originalPrice: 2899,
      price: 1999,
      discount: 31,
      icon: BookOpen,
      topSelling: true,
      popular: true,
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "hover:border-blue-500/50",
      features: [
        "89% accuracy signals (24/7)",
        "Market Basics & Analysis",
        "Binary Secrets Strategies",
        "Candlestick Patterns",
        "Trading Psychology",
        "Video Sessions",
      ],
    },
    {
      title: "Advanced Trading Masterclass",
      description: "Take your skills to the next level with advanced strategies.",
      price: 4999,
      originalPrice: 5899,
      discount: 15,
      icon: TrendingUp,
      color: "from-primary/20 to-amber-500/20",
      borderColor: "hover:border-primary/50",
      features: [
        "Free Premium Signals",
        "Advanced Video Sessions",
        "Pro-Level Strategies",
        "Risk Management",
        "Portfolio Building",
        "Live Trading Sessions",
      ],
    },
    {
      title: "One-on-One Mentorship",
      description: "Personal guidance from Samrat Trader himself.",
      originalPrice: 15899,
      price: 12999,
      discount: 18,
      icon: Users,
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "hover:border-purple-500/50",
      features: [
        "Exclusive VIP Signals",
        "1:1 Video Calls",
        "Personal Trading Plan",
        "Portfolio Review",
        "Custom Strategy",
        "Lifetime Access & Support",
      ],
    },
  ];

  return (
    <>
      <Toaster />

      <section
        ref={sectionRef}
        id="courses"
        className="relative py-16 md:py-24 lg:py-32 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/20 to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        
        <div className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-12 lg:mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <span className="inline-flex items-center gap-2 text-primary font-nav text-sm uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              Premium Courses
            </span>
            <h2 className="font-nav text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
              Learn with <span className="text-gradient">Expert Guidance</span>
            </h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Choose the perfect course for your trading journey and 5x your capital with 89% assured success rate
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {courses.map((course, idx) => {
              const Icon = course.icon;
              const isHovered = hoveredCard === idx;

              return (
                <Card
                  key={idx}
                  className={`relative glass-card rounded-2xl overflow-hidden flex flex-col transition-all duration-500 border-border/50 ${course.borderColor} ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} ${isHovered ? 'scale-[1.02] shadow-2xl' : ''}`}
                  style={{ animationDelay: `${idx * 0.15}s` }}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.color} opacity-50`} />
                  
                  {course.topSelling && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                        <Zap className="w-3 h-3" />
                        Top Selling
                      </span>
                    </div>
                  )}

                  <div className="relative p-6 lg:p-8 flex-1 space-y-5">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center transition-transform duration-300 ${isHovered ? 'scale-110 rotate-3' : ''}`}>
                      <Icon className="text-foreground w-7 h-7" />
                    </div>

                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-2">{course.title}</h3>
                      <p className="text-sm text-muted-foreground">{course.description}</p>
                    </div>

                    <div className="space-y-3 pt-2">
                      {course.features.map((f, i) => (
                        <div
                          key={i}
                          className={`flex items-center gap-3 text-sm transition-all duration-300 ${isHovered ? 'translate-x-1' : ''}`}
                          style={{ transitionDelay: `${i * 30}ms` }}
                        >
                          <div className="w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-secondary" />
                          </div>
                          <span className="text-foreground/80">{f}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-6 border-t border-border/50 space-y-2">
                      <div className="flex items-center gap-3 flex-wrap">
                        {course.originalPrice && (
                          <span className="text-muted-foreground line-through text-lg">
                            ₹{course.originalPrice.toLocaleString()}
                          </span>
                        )}
                        {course.discount && (
                          <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full font-semibold">
                            Save {course.discount}%
                          </span>
                        )}
                      </div>

                      <p className="text-3xl lg:text-4xl font-bold text-gradient">
                        ₹{course.price.toLocaleString()}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        One-time payment • Lifetime access
                      </p>
                    </div>
                  </div>

                  <div className="relative p-6 lg:p-8 pt-0">
                    <Button
                      className={`w-full py-6 text-base font-semibold rounded-xl transition-all duration-300 ${
                        course.topSelling
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg shadow-orange-500/25'
                          : 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25'
                      } ${isHovered ? '-translate-y-1' : ''}`}
                      onClick={(e) => handleEnrollClick(e, course.price)}
                    >
                      Enroll Now
                      <ArrowRight className={`ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} size={18} />
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className={`mt-12 lg:mt-16 text-center ${isVisible ? 'animate-fade-in-up animation-delay-600' : 'opacity-0'}`}>
            <div className="glass-card inline-flex items-center gap-4 sm:gap-8 rounded-2xl px-6 sm:px-8 py-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">100% Secure Payment</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-secondary" />
                <span className="text-sm text-muted-foreground">Instant Access</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-border" />
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-secondary" />
                <span className="text-sm text-muted-foreground">Money Back Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
