
'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { menuItems } from '@/lib/menuData'
import { Purple_Purse } from 'next/font/google'

/* Google Font */
const purplePurse = Purple_Purse({
  subsets: ['latin'],
  weight: '400',
})

export default function MenuOverlay({ onClose }) {
  const [hoveredId, setHoveredId] = useState(null)

  const leftItems = menuItems.slice(0, 4)
  const rightItems = menuItems.slice(4, 8)

  const activeImage = useMemo(() => {
    return menuItems.find(item => item.id === hoveredId)?.image || null
  }, [hoveredId])

  const overlayFade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const panelSlide = {
    hidden: { y: '-100%' },
    visible: { y: 0 },
    exit: { y: '100%' },
  }

  function MenuItem({ item, index }) {
    const isActive = hoveredId === item.id

    const firstChar = item.label.charAt(0)
    const restText = item.label.slice(1)

    const slantOffset = index * 6

    return (
      <li className="leading-none" style={{ marginLeft: slantOffset }}>
        <Link href={item.href} onClick={onClose}>
          <motion.span
            className={`
              ${purplePurse.className}
              relative inline-flex items-baseline
              cursor-pointer select-none
              text-black
              tracking-[0.04em]
              text-[20px] md:text-[22px] lg:text-[24px]
            `}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            animate={{ x: isActive ? 10 : 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            {/* First letter */}
            <span className="text-[28px] md:text-[32px] lg:text-[34px] leading-none mr-[1.5px]">
              {firstChar}
            </span>

            {/* Remaining text */}
            <span className="text-[26px] md:text-[28px] lg:text-[30px] leading-none mr-px">
              {restText}
            </span>

            {/* underline */}
            <span
              className={`
                absolute -bottom-1.5 left-0 h-px bg-black/40
                transition-all duration-300
                ${isActive ? 'w-full' : 'w-0'}
              `}
            />
          </motion.span>
        </Link>
      </li>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 z-999 flex"
      variants={overlayFade}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* ================= LEFT PANEL ================= */}
      <motion.div
        className="
          w-full md:w-1/2 h-full
          bg-linear-to-br 
          from-[#d2d0c9] 
          via-[#dad8d1] 
          to-[#e3e1da]
        "
        variants={panelSlide}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="h-full px-14 lg:px-24 py-24 flex items-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <ul className="space-y-7">
              {leftItems.map((item, index) => (
                <MenuItem key={item.id} item={item} index={index} />
              ))}
            </ul>

            <ul className="space-y-7">
              {rightItems.map((item, index) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  index={index + 2}
                />
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* ================= RIGHT PANEL ================= */}
      <motion.div
        className="
          hidden md:flex w-1/2 h-full
          bg-white/40
          backdrop-blur-xl
          items-center justify-center
          relative overflow-hidden
        "
        variants={panelSlide}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
      >
        <div className="absolute inset-0 bg-linear-to-br from-white/40 via-white/10 to-transparent pointer-events-none" />
        <div className="absolute left-0 top-0 h-full w-px bg-black/10" />

        <AnimatePresence mode="wait">
          {activeImage && (
            <motion.div
              key={activeImage}
              className="
                relative w-full h-[90%]
                overflow-hidden
                shadow-2xl translate-y-6
                bg-white/40 backdrop-blur-md
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* 🔥 Faster, more realistic zoom */}
              <motion.div
                className="absolute inset-0"
                initial={{ scale: 1 }}
                animate={{ scale: 1.06 }}
                transition={{
                  duration: 6,   // ⬅️ speed increased
                  ease: 'linear',
                }}
              >
                <Image
                  src={activeImage}
                  alt="Menu Preview"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
