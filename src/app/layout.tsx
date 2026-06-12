import type { Metadata } from 'next'
import { Bodoni_Moda, Jost, Space_Mono } from 'next/font/google'
import { CartProvider } from '@/context/CartContext'
import { DealerProvider } from '@/context/DealerContext'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import { CartDrawer } from '@/components/CartDrawer'
import './globals.css'

const fontHead = Bodoni_Moda({
  subsets: ['latin'],
  axes: ['opsz'],
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
  title: 'Oak & Anvil — Heirloom Seating, Sold Direct',
  description: 'Solid-wood dining chairs and counter stools. Imported, finished by hand, sold direct at honest prices.',
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
