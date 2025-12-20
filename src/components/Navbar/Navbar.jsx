'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import Hamburger from '@/components/Hamburger/Hamburger'
import MenuOverlay from '@/components/MenuOverlay'
import useScrollEffect from '@/hooks/useScrollEffect'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isScrolled = useScrollEffect(50)

  const toggleMenu = () => setIsMenuOpen((v) => !v)

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto'
  }, [isMenuOpen])

  return (
    <>
      <motion.div
        className={`
          fixed top-0 left-0 w-full z-1000
          flex items-center justify-between
          px-8 md:px-12 lg:px-16
          transition-all duration-500
          ${isScrolled ? 'h-16 glass-light-scrolled' : 'h-20 glass-light'}
        `}
        initial={false} 
      >
        {/* Logo - Centered */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <motion.div
            className="cursor-pointer"
            initial={false}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`
                relative overflow-hidden transition-all duration-500
                ${isScrolled ? 'h-9 w-auto' : 'h-11 w-auto'}
              `}
            >
              <Image
                src="/Arqene_Logo.png"
                alt="ARQUENE Luxury Furniture"
                width={isScrolled ? 130 : 160}
                height={isScrolled ? 36 : 44}
                priority
                className="object-contain select-none"
                style={{ filter: 'drop-shadow(0 1px 4px rgba(0, 0, 0, 0.06))' }}
              />
            </div>
          </motion.div>
        </Link>

        {/* Hamburger - Right Side */}
        <motion.div
          className="ml-auto"
          initial={false} // ✅ render immediately
        >
          <Hamburger isOpen={isMenuOpen} onClick={toggleMenu} />
        </motion.div>
      </motion.div>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence mode="wait" initial={false}>
        {isMenuOpen && <MenuOverlay isOpen={isMenuOpen} onClose={toggleMenu} />}
      </AnimatePresence>
    </>
  )
}
