'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface EmailCaptureProps {
  className?: string
  placeholder?: string
  buttonLabel?: string
  dark?: boolean
}

export function EmailCapture({
  className,
  placeholder = 'Your email address',
  buttonLabel = 'Notify Me',
  dark = false,
}: EmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [touched, setTouched] = useState(false)

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const showError = touched && email.length > 0 && !isValid

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) { setTouched(true); return }
    setStatus('loading')
    // Simulate API call — replace with actual integration
    await new Promise((r) => setTimeout(r, 800))
    setStatus('success')
  }

  return (
    <div className={cn('w-full', className)}>
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
            className={cn(
              'flex items-center gap-3 py-4 px-5 rounded-sm border',
              dark
                ? 'border-cream/20 bg-cream/10 text-cream'
                : 'border-forest/20 bg-sage-pale text-forest'
            )}
          >
            <div className={cn(
              'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
              dark ? 'bg-cream/20' : 'bg-sage-light/40'
            )}>
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="font-sans text-sm font-medium">You're on the list.</p>
              <p className={cn('font-sans text-xs mt-0.5', dark ? 'text-cream/60' : 'text-charcoal-light/70')}>
                We'll reach out when the first bears are ready.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
            noValidate
          >
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setTouched(false) }}
                onBlur={() => setTouched(true)}
                placeholder={placeholder}
                aria-label="Email address"
                className={cn(
                  'w-full font-sans text-sm px-4 py-3.5 rounded-sm border outline-none transition-all duration-200',
                  'placeholder:text-charcoal/40',
                  dark
                    ? 'bg-cream/10 border-cream/20 text-cream placeholder:text-cream/40 focus:border-cream/60 focus:bg-cream/15'
                    : 'bg-white border-cream-darker text-charcoal focus:border-amber focus:ring-2 focus:ring-amber/15',
                  showError && 'border-terracotta focus:border-terracotta focus:ring-terracotta/15'
                )}
              />
              {showError && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -bottom-5 left-0 font-sans text-xs text-terracotta"
                >
                  Please enter a valid email.
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className={cn(
                'flex items-center justify-center gap-2 px-6 py-3.5 rounded-sm font-sans text-sm font-medium transition-all duration-250 flex-shrink-0',
                dark
                  ? 'bg-cream text-forest hover:bg-amber-pale disabled:opacity-60'
                  : 'btn-solid disabled:opacity-60',
                status === 'loading' && 'cursor-wait'
              )}
            >
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Sending…
                </span>
              ) : (
                <>
                  {buttonLabel}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>

    </div>
  )
}
