import { Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar/Navbar'

const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cormorant',
})

export const metadata = {
  title: 'ARQUENE - Luxury Furniture',
  description: 'Experience timeless elegance and craftsmanship with ARQUENE luxury furniture collection',
  keywords: 'luxury furniture, premium furniture, designer furniture, ARQUENE',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable}`}>
      <body className={`${cormorant.className} antialiased`}>
        <Navbar/>
        {children}
      </body>
    </html>
  )
}
