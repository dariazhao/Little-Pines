'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

const links = [
  { href: '/promise', label: 'Promise' },
  { href: '/research', label: 'Research' },
  { href: '/studio', label: 'Studio' },
]

export function Nav() {
  const pathname = usePathname()
  const isHome = pathname === '/'

  // Always visible; homepage starts transparent and gains bg on scroll
  const [scrolled, setScrolled] = useState(!isHome)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY >= window.innerHeight * 0.5)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // When nav overlays the dark homepage hero (not yet scrolled), use light colors
  const isTransparent = isHome && !scrolled

  return (
    <>
      <motion.header
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
          scrolled
            ? 'bg-cream/90 backdrop-blur-md shadow-sm border-b border-cream-darker/40'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group" aria-label="Little Pines Studio home">
              <div className="relative w-9 h-9 md:w-11 md:h-11 transition-transform duration-500 group-hover:scale-105">
                <Image
                  src="/logo.png"
                  alt="Little Pines Studio — woodcut bear"
                  fill
                  className={cn(
                    'object-contain transition-all duration-500',
                    isTransparent ? 'brightness-0 invert' : ''
                  )}
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <span className={cn(
                  'font-serif text-[1.05rem] font-semibold leading-tight tracking-tight transition-colors duration-500',
                  isTransparent ? 'text-cream' : 'text-forest'
                )}>
                  Little Pines
                </span>
                <span className={cn(
                  'block font-sans text-[0.65rem] tracking-[0.14em] uppercase transition-colors duration-500',
                  isTransparent ? 'text-cream/55' : 'text-forest-light'
                )}>
                  Studio
                </span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className={cn('hidden md:flex items-center gap-8 transition-all duration-500', isTransparent ? 'opacity-0 pointer-events-none' : 'opacity-100')} aria-label="Primary navigation">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    'link-underline font-sans text-sm transition-colors duration-200',
                    isTransparent
                      ? 'text-cream/75 hover:text-cream'
                      : 'text-charcoal-light hover:text-forest'
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* CTA + hamburger */}
            <div className="flex items-center gap-4">
              <Link
                href="/studio#build-with-us"
                className={cn(
                  'hidden md:inline-flex text-sm py-2 px-5 transition-all duration-500',
                  isTransparent
                    ? 'border border-cream/40 text-cream/80 hover:border-cream/70 hover:text-cream rounded-sm'
                    : 'btn-solid'
                )}
              >
                Build With Us
              </Link>

              {/* Hamburger */}
              <button
                className={cn(
                  'md:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 rounded-sm transition-colors',
                  isTransparent ? 'hover:bg-cream/10' : 'hover:bg-cream-dark'
                )}
                aria-label={open ? 'Close menu' : 'Open menu'}
                onClick={() => setOpen((v) => !v)}
              >
                <motion.span
                  className={cn('block w-5 h-px origin-center transition-colors duration-500', isTransparent ? 'bg-cream' : 'bg-charcoal')}
                  animate={open ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className={cn('block w-5 h-px origin-center transition-colors duration-500', isTransparent ? 'bg-cream' : 'bg-charcoal')}
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className={cn('block w-5 h-px origin-center transition-colors duration-500', isTransparent ? 'bg-cream' : 'bg-charcoal')}
                  animate={open ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
            className="fixed inset-0 z-40 bg-cream md:hidden flex flex-col"
          >
            <div className="flex-1 flex flex-col px-8 pt-24 pb-12 gap-8">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="font-serif text-3xl text-forest hover:text-forest-mid transition-colors"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className="px-8 pb-12">
              <Link
                href="/studio#build-with-us"
                onClick={() => setOpen(false)}
                className="btn-solid w-full justify-center text-base py-4"
              >
                Build With Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
