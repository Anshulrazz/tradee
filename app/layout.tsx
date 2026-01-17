import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import ReduxProvider from '@/components/redux-provider'
import LoadUser from '@/components/load-user'
import { Toaster } from '@/components/ui/toaster'
import Script from 'next/script';

export const metadata: Metadata = {
  title: "Samrat Trader - Master Trading Strategies",
  description:
    "Learn proven trading strategies from Samrat Trader. 7+ years of trading experience, 10,000+ students trained. Trading courses and mentorship.",
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    images: "/logo.png",
  },
  twitter: {
    images: "/logo.png",
  },
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Elms+Sans:ital,wght@0,100..900;1,100..900&family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`}>
        <ReduxProvider>
          <LoadUser />
          {children}
        </ReduxProvider>
        <Toaster />
        <Analytics />
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="beforeInteractive" />
      </body>
    </html>
  )
}
