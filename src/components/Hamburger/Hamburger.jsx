'use client'

import { useId } from 'react'
import styles from './Hamburger.module.css'

export default function Hamburger({ isOpen, onClick }) {
  const uid = useId()
  const inputId = `nav-toggle-${uid}`

  const variantClass = isOpen ? styles.checkboxtogglerDark : styles.checkboxtogglerLight

  return (
    <div className={styles.checkboxWrapper}>
      <input
        id={inputId}
        className={styles.navToggle}
        type="checkbox"
        checked={isOpen}
        onChange={onClick}
        aria-label="Toggle menu"
      />

      <label className={styles.toggleLabel} htmlFor={inputId}>
        <div className={`${styles.checkboxtoggler} ${variantClass}`}>
          <div className={`${styles.line} ${styles.line1}`} />
          <div className={`${styles.line} ${styles.line2}`} />
          <div className={`${styles.line} ${styles.line3}`} />
        </div>
      </label>
    </div>
  )
}
