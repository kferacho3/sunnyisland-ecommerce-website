// src/app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

// For theme or other providers
import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import Navbar from '@/components/layout/Navbar'
import { ThemeProvider } from '@/context/ThemeContext'

// Sticky additions
import StickyAccessibility from '@/components/layout/StickyComponents/StickyAccessibility'
import StickyCookieConsent from '@/components/layout/StickyComponents/StickyCookieConsent'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SunnyIslandPepper',
  description: 'A modern Caribbean pepper sauce website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-black dark:text-white`}>
        <ThemeProvider>
          <Navbar />
          <Header />
          {/* 
            Added top padding to main to ensure content begins below 
            the fixed Navbar (h-20) and Header (roughly 40px).
            Adjust the value (e.g. pt-32 equals 8rem, which is 128px) as needed.
          */}
          <main className="pt-28 min-h-screen">
            {children}
          </main>
    
          {/* Sticky Components */}
          <StickyAccessibility />
          <StickyCookieConsent />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
