import type { Metadata } from 'next'
import { Cormorant_Garamond, Jost, Space_Mono } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import { DealerProvider } from '@/context/DealerContext'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import './globals.css'

const fontHead = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-head',
  display: 'swap',
})

const fontBody = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-body',
  display: 'swap',
})

const fontMono = Space_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Oak & Anvil — The Considered Home',
  description: 'Premium dining chairs and counter stools. Designed with intention, sourced directly, sold without the markup.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fontHead.variable} ${fontBody.variable} ${fontMono.variable}`}>
      <body>
        <DealerProvider>
          <CartProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
            <CartDrawer />
          </CartProvider>
        </DealerProvider>
      </body>
    </html>
  )
}
