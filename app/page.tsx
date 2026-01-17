import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import CoursesSection from "@/components/courses-section"
import PerformanceSection from "@/components/performance-section"
import TestimonialsSection from "@/components/testimonials-section"
import BlogSection from "@/components/blog-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
export default function Home() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
  <Header />

  {/* Mobile spacing + safe area */}
  <div className="flex flex-col gap-12 sm:gap-16">
    <HeroSection />
    <AboutSection />
    <CoursesSection />
    <PerformanceSection />
    <TestimonialsSection />
    <BlogSection />
    <ContactSection />
  </div>

  <Footer />
</main>
  )
}
