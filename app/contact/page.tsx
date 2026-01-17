import Header from "@/components/header"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Mail } from "lucide-react"

/* =======================
   Metadata (SEO Optimized)
======================= */
export const metadata = {
  title: "Contact Samrat Trader | Trading Support & Course Inquiries",
  description:
    "Contact Samrat Trader for professional trading consultations, stock market courses, mentorship programs, and collaboration opportunities.",

  keywords: [
    "Samrat Trader",
    "stock market trading",
    "trading courses",
    "trading mentorship",
    "technical analysis",
    "Indian stock market",
    "contact Samrat Trader",
    "trading consultation",
  ],

  authors: [{ name: "Samrat Trader" }],
  creator: "Samrat Trader",
  publisher: "Samrat Trader",

  openGraph: {
    title: "Contact Samrat Trader | Let’s Connect",
    description:
      "Reach out for trading guidance, stock market courses, or professional collaboration with Samrat Trader.",
    url: "https://samraattrader.com/contact",
    siteName: "Samrat Trader",
    images: [
      {
        url: "https://samraattrader.com/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Samrat Trader",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Samrat Trader",
    description:
      "Have questions about trading or courses? Get in touch with Samrat Trader today.",
    images: ["https://samraattrader.com/og-contact.jpg"],
    creator: "@samraattrader",
  },

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://samraattrader.com/contact",
  },
}

/* =======================
   Page Component
======================= */
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="font-nav text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Let’s <span className="text-primary">Connect</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            For trading consultations, course inquiries, or collaborations,
            feel free to reach out to us anytime.
          </p>
        </div>
      </section>

      {/* Contact Info Card */}
      <section className="max-w-4xl mx-auto w-full px-4 -mt-16 relative z-10">
        <Card className="bg-card border-border p-8 shadow-lg text-center">
          <div className="flex flex-col items-center gap-3">
            <Mail className="text-primary" size={32} />
            <p className="text-sm text-muted-foreground">Email Us At</p>
            <h3 className="text-xl font-semibold text-foreground">
              noreply@samraattrader.com
            </h3>
          </div>
        </Card>
      </section>

      {/* Extended Contact Section */}
      <ContactSection />

      <Footer />
    </main>
  )
}
