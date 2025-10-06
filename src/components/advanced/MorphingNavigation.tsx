'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { BSMLogo } from '@/components/ui/bsm-logo'

interface MagneticButtonProps {
  onClick: () => void
  children: React.ReactNode
  className?: string
}

function MagneticButton({ onClick, children, className = '' }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const deltaX = (x - centerX) * 0.1
    const deltaY = (y - centerY) * 0.1
    
    buttonRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`
  }

  const handleMouseLeave = () => {
    if (buttonRef.current) {
      buttonRef.current.style.transform = 'translate(0px, 0px)'
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease-out' }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

export function MorphingNavigation() {
  const navRef = useRef<HTMLElement>(null)
  
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 100], [0, -10])
  const opacity = useTransform(scrollY, [0, 100], [1, 0.95])
  const scale = useTransform(scrollY, [0, 100], [1, 0.98])

  return (
    <motion.nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-[#1C1F2D]/95 backdrop-blur-xl border-b border-gray-200/50 dark:border-[#2A2E39] shadow-md shadow-gray-200/30 dark:shadow-[#0F1421]/50 transition-all duration-500"
      style={{ y, opacity, scale }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div 
              whileHover={{ 
                rotate: [0, 360],
                scale: 1.1
              }}
              transition={{ duration: 0.8 }}
            >
              <BSMLogo size={40} className="shadow-lg" />
            </motion.div>
            <motion.span
              className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300"
            >
              BSM Platform
            </motion.span>
          </motion.div>

          {/* Theme Toggle & Login */}
          <div className="flex items-center space-x-4">
            <MagneticButton
              onClick={() => window.location.href = '/auth/login'}
              className="px-4 py-2 text-sm font-medium text-gray-600 dark:text-[#848E9C] hover:text-gray-900 dark:hover:text-[#F5F5F7] transition-colors duration-300"
            >
              Login
            </MagneticButton>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  )
}