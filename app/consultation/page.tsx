import Header from "@/components/header"
import Footer from "@/components/footer"
import ConsultationForm from "./consultation-form"

export const metadata = {
  title: "Book a Consultation with Samrat Trader",
  description:
    "Book a 1-on-1 trading consultation with Samrat Trader and get personalized guidance.",
}

export default function ConsultationPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <ConsultationForm />
      <Footer />
    </main>
  )
}
