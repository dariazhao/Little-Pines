'use client'

import React, { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { PineBranch } from '@/components/illustrations/pine-branch'
import { WorkshopSection, ShootingStars } from '../_homepage-after'
import { CARDS } from './_cards'
import { Globe } from '@/components/globe'

/* ─── Static star field ─────────────────────────────────────────── */
const STUDIO_STARS: [number, number, number][] = [
  [8,12,1.2],[15,7,0.9],[23,18,1.4],[32,5,0.8],[41,14,1.1],
  [55,9,1.3],[63,20,0.9],[72,6,1.5],[80,15,1.0],[91,8,1.2],
  [5,35,0.8],[18,42,1.1],[28,78,0.9],[37,88,1.3],[48,82,0.8],
  [58,92,1.1],[67,75,1.4],[76,85,0.9],[88,70,1.2],[94,90,0.8],
  [12,60,1.0],[87,45,1.1],[3,80,0.9],[96,30,1.3],[45,3,0.8],
  [70,95,1.0],[25,95,1.2],[85,25,0.9],[52,50,0.7],[33,65,1.0],
]

/* ─── Hero sentence ─────────────────────────────────────────────── */
const SENTENCE_LINES = [
  { text: 'We are building',    amber: false, italic: false, weight: 300 },
  { text: 'something quiet',    amber: true,  italic: true,  weight: 400 },
  { text: 'in a loud world.',   amber: false, italic: false, weight: 300 },
  { text: 'Join us.',           amber: false, italic: false, weight: 700 },
]
const LINE_DELAYS = [0.3, 0.52, 0.74, 0.96]

/* ─── Letter paragraphs ─────────────────────────────────────────── */
type LetterPara = { text: string; italicSuffix?: string }

const LETTER_P2 = `The screen economy has accelerated this loss. Every minute a child spends on YouTube, TikTok, or a tablet is a minute they're not sitting with their own interior life. The dopamine reward cycle of short-form content trains children to flee from boredom, from discomfort, from the quiet moments where self-awareness actually develops. Jonathan Haidt documented the population-level consequences. But the individual consequence is simpler and sadder: millions of children are growing up without the basic emotional vocabulary and self-regulation skills that we carry with us through a lifetime.`

const LETTER_P3 = `Montessori, Waldorf, and other child-development traditions have always understood that emotional awareness is not separate from learning: it is the foundation of learning. A child who cannot name their frustration cannot work through it. A child who cannot recognize their excitement cannot channel it. Academic skills come later, and they come more easily, when the emotional foundation is strong.`

const LETTER_P4_MAIN = `Little Pines Studio exists because this foundation is being undermined faster than any other part of childhood, and because the tools parents have been given to address it (therapy apps, SEL curricula, meditation videos) are almost all delivered through the same screens that caused the problem. The answer has to come from a different form factor entirely: a quiet, unhurried, screen-free friend that lives in a child's room and helps them notice what they feel, name it, sit with it, and move through it. Not a therapist. Not a teacher.`

const LETTER_P5 = `In 2019, I quit Wall Street to co-found Learn With Mochi, believing the most valuable investment we could make is in our children. Mochi was built on the belief that young children learn best through hands-on play, stories, and away from screens. That company was an honest expression of a thesis about early childhood that I still believe. With recent frontier AI and hardware acceleration, the technical moment to build this particular concept arrived in 2026. We're building it slowly, in public, with experts across the ecosystem. If you've read this far, I'd love to hear from you.`

const LETTER_PARAS: LetterPara[] = [
  { text: LETTER_P2 },
  { text: LETTER_P3 },
  { text: LETTER_P4_MAIN, italicSuffix: ' A friend.' },
  { text: LETTER_P5 },
]

const PARA_DELAYS = [0.3, 1.3, 2.3, 3.3]

/* ─── Letter reveal (paragraph-by-paragraph fade from left) ─────── */
function TypewriterLetter({ onClose }: { onClose: () => void }) {
  return (
    <div className="font-serif text-charcoal" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.05rem)', lineHeight: 1.88 }}>
      {LETTER_PARAS.map((para, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: PARA_DELAYS[i], ease: 'easeOut' }}
          style={{ marginBottom: '1.5rem' }}
        >
          {para.text}
          {para.italicSuffix && <em>{para.italicSuffix}</em>}
        </motion.p>
      ))}

      <motion.p
        className="font-serif italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.52 }}
        transition={{ duration: 1.4, delay: 5.2, ease: 'easeOut' }}
        style={{ color: 'var(--forest)', marginTop: '1.5rem', marginBottom: '2rem' }}
      >
        &mdash;Daria
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6.0, duration: 0.8 }}
        className="flex justify-center"
      >
        <button
          onClick={onClose}
          className="font-sans inline-flex items-center gap-2 transition-opacity hover:opacity-70"
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'rgba(42,74,48,0.42)',
            background: 'none',
            border: '1px solid rgba(42,74,48,0.14)',
            borderRadius: '4px',
            padding: '0.55rem 1.4rem',
            cursor: 'pointer',
          }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5 8 V2 M2 5 L5 2 L8 5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Close letter
        </button>
      </motion.div>
    </div>
  )
}

/* ─── Wax Seal ──────────────────────────────────────────────────── */
function WaxSeal({ onClick, open }: { onClick: () => void; open: boolean }) {
  return (
    <button
      onClick={onClick}
      aria-label={open ? 'Close letter' : 'Open letter'}
      className="relative flex flex-col items-center gap-3"
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
    >
      <motion.div
        animate={open ? { scale: 0.88, opacity: 0.3 } : { scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
      >
        <svg viewBox="0 0 88 88" width="68" height="68" aria-hidden="true">
          <path d="M44 3 C51 1 60 4 67 10 C74 16 80 24 82 33 C85 43 83 54 78 62 C73 70 64 76 54 79 C44 82 33 81 24 77 C15 73 8 65 5 55 C1 45 3 34 8 25 C13 16 21 8 30 5 C36 2 40 4 44 3 Z" fill="var(--amber)" opacity="0.88"/>
          <circle cx="44" cy="44" r="27" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.8"/>
          {/* Bear paw print */}
          <ellipse cx="44" cy="53" rx="10.5" ry="8" fill="rgba(255,255,255,0.80)"/>
          <circle cx="30" cy="38" r="4.5" fill="rgba(255,255,255,0.80)"/>
          <circle cx="38.5" cy="32" r="4.5" fill="rgba(255,255,255,0.80)"/>
          <circle cx="49.5" cy="32" r="4.5" fill="rgba(255,255,255,0.80)"/>
          <circle cx="58" cy="38" r="4.5" fill="rgba(255,255,255,0.80)"/>
        </svg>
      </motion.div>
      <span className="font-sans" style={{ fontSize: '0.54rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: open ? '#7A3C1E' : 'rgba(196,149,75,0.65)', transition: 'color 0.3s ease' }}>
        {open ? 'close' : 'open the letter'}
      </span>
    </button>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────── */
function InvitationHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--forest-dark)', paddingTop: '11rem', paddingBottom: '4rem', textAlign: 'center', minHeight: '100svh' }}
    >
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Static stars */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        {STUDIO_STARS.map(([x, y, r], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="rgba(244,239,226,1)" opacity={0.11 + (i % 8) * 0.055} />
        ))}
      </svg>

      {/* Shooting stars */}
      <ShootingStars />

      {/* Radiating rings — bright inner-to-outer pulse */}
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        {([200, 310, 440, 580] as const).map((size, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute', width: size, height: size,
              borderRadius: '50%', border: '1px solid rgba(196,149,75,1)',
              top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            }}
            animate={{ opacity: [0.05, 0.55 - i * 0.10, 0.05] }}
            transition={{ duration: 2.8, delay: i * 0.45, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* Amber bloom */}
      <div className="absolute inset-x-0 pointer-events-none" aria-hidden="true" style={{ top: '15%', height: '70%', background: 'radial-gradient(ellipse at 50% 50%, rgba(196,149,75,0.09) 0%, transparent 58%)' }} />

      <div className="absolute top-0 left-0 pointer-events-none opacity-[0.038]" aria-hidden="true" style={{ width: 'min(200px, 26vw)', transform: 'rotate(-12deg) translateX(-14%)' }}>
        <PineBranch color="var(--cream)" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-[0.038]" aria-hidden="true" style={{ width: 'min(200px, 26vw)', transform: 'rotate(12deg) translateX(14%)' }}>
        <PineBranch color="var(--cream)" flip />
      </div>

      {/* Globe peeking at bottom — top arc only */}
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.2 }}
        style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 'min(680px, 90vw)', height: 'min(240px, 24vh)', overflow: 'hidden', zIndex: 1 }}
      >
        <div style={{ width: '100%', aspectRatio: '1' }}>
          <Globe style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </motion.div>

      <div className="relative z-10 px-6" style={{ maxWidth: 'min(920px, 92vw)', zIndex: 10 }}>
        {/* Eyebrow */}
        <motion.p className="font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.1 }}
          style={{ fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.50)', marginBottom: '3rem' }}>
          Little Pines Studio &middot; Calls for Collaboration
        </motion.p>

        {/* Hero lines */}
        <div style={{ marginBottom: '3rem' }}>
          {SENTENCE_LINES.map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.span
                className="font-serif block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.95, delay: LINE_DELAYS[i], ease: [0.19, 1, 0.22, 1] }}
                style={{
                  fontSize: 'clamp(2.2rem, 5vw, 4rem)',
                  fontWeight: line.weight,
                  fontStyle: line.italic ? 'italic' : 'normal',
                  lineHeight: 1.2,
                  letterSpacing: '-0.03em',
                  color: line.amber ? 'var(--amber)' : 'rgba(244,239,226,0.85)',
                  paddingBottom: '0.06em',
                }}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Amber rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.5, ease: [0.19, 1, 0.22, 1] }}
          style={{ height: '1px', width: '3.5rem', background: 'rgba(196,149,75,0.5)', transformOrigin: 'left center', margin: '0 auto 2rem' }}
        />

        {/* Down arrow */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.0 }} className="flex justify-center">
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} style={{ color: 'rgba(196,149,75,0.32)' }}>
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
              <path d="M7 2 V18 M2 13 L7 18 L12 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Quote Insert ──────────────────────────────────────────────── */
function QuoteInsert() {
  return (
    <section style={{ background: 'var(--cream)', borderRadius: '2rem 2rem 0 0', marginTop: '-2rem', position: 'relative', zIndex: 2 }}>
      <div className="mx-auto px-6 md:px-10" style={{ maxWidth: '660px', paddingTop: '3.5rem', paddingBottom: '2.5rem' }}>
        <Reveal>
          <blockquote style={{
            background: 'rgba(255,250,238,0.72)',
            border: '1px solid rgba(196,149,75,0.12)',
            borderRadius: '8px',
            padding: 'clamp(1.5rem, 4vw, 2.25rem)',
            boxShadow: '0 2px 20px rgba(196,149,75,0.07)',
            textAlign: 'center',
            margin: 0,
          }}>
            <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to right, transparent, rgba(196,149,75,0.45))' }} />
              <div style={{ fontSize: '1rem', color: 'rgba(196,149,75,0.55)', fontFamily: 'serif' }}>&ldquo;</div>
              <div style={{ height: '1px', width: '2rem', background: 'linear-gradient(to left, transparent, rgba(196,149,75,0.45))' }} />
            </div>
            <p className="font-serif" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.65, color: 'var(--forest)', maxWidth: '38ch', margin: '0 auto' }}>
              Children are born with an extraordinary capacity to feel, notice, and express the full range of human emotion.
            </p>
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Founder Letter ────────────────────────────────────────────── */
function FounderLetter() {
  const [open, setOpen] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 1400)
  }

  return (
    <section ref={sectionRef} id="build-with-us" style={{ background: 'var(--cream)', borderRadius: 0, marginTop: 0, position: 'relative', zIndex: 2, scrollMarginTop: '5rem' }}>
      <div className="mx-auto px-6 md:px-10" style={{ maxWidth: '660px', paddingTop: '3rem', paddingBottom: '5.5rem' }}>

        <Reveal>
          <p className="font-sans uppercase" style={{ fontSize: '0.54rem', letterSpacing: '0.26em', color: 'rgba(42,74,48,0.32)', marginBottom: '1.2rem' }}>
            A letter from the founder
          </p>
          <div style={{ marginBottom: '2.5rem' }}>
            <h1 className="font-serif text-forest block" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em' }}>Build</h1>
            <span className="font-serif block" style={{ fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--amber)' }}>with us.</span>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div style={{ background: 'rgba(255,250,238,0.72)', border: '1px solid rgba(196,149,75,0.12)', borderRadius: '8px', padding: 'clamp(1.75rem, 5vw, 2.75rem)', boxShadow: '0 2px 20px rgba(196,149,75,0.07)' }}>

            <div className="font-serif text-charcoal" style={{ fontSize: 'clamp(0.97rem, 1.4vw, 1.07rem)', lineHeight: 1.88, marginBottom: '2rem' }}>
              <p>
                In the first years of life, children express themselves naturally: they cry when they&rsquo;re
                sad, they laugh when they&rsquo;re delighted, they cling when they&rsquo;re afraid,
                they withdraw when they&rsquo;re overstimulated. Parents, teachers, and cultures then
                spend the next decade of a child&rsquo;s life &mdash; often without meaning to &mdash; teaching them
                to suppress, ignore, and perform these feelings rather than notice, name, and understand
                them. By the time a child is eight, most of them have lost the vocabulary for what&rsquo;s
                happening inside them, even as the feelings themselves are intensifying.
              </p>
            </div>

            <div className="flex flex-col items-center" style={{ margin: '0.5rem 0 1.25rem' }}>
              <WaxSeal open={open} onClick={() => open ? handleClose() : setOpen(true)} />
            </div>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="letter-body"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
                  style={{ overflow: 'hidden', marginTop: '1rem' }}
                >
                  <TypewriterLetter onClose={handleClose} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Programme Row ─────────────────────────────────────────────── */
function ProgrammeRow({ card, isOpen, onToggle, isLast }: {
  card: (typeof CARDS)[number]; isOpen: boolean; onToggle: () => void; isLast: boolean
}) {
  const { Motif } = card
  return (
    <div style={{ borderBottom: isLast ? 'none' : '1px solid rgba(42,74,48,0.08)' }}>
      <button
        onClick={onToggle}
        className="w-full text-left"
        style={{ background: 'none', border: 'none', padding: 'clamp(1.25rem, 3vw, 1.75rem) 0', cursor: 'pointer', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '1.25rem', alignItems: 'center' }}
      >
        <span className="font-sans" style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(196,149,75,0.45)', textTransform: 'uppercase', width: '2rem', flexShrink: 0 }}>
          {card.n}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', minWidth: 0 }}>
          <span className="font-serif" style={{ fontSize: 'clamp(1.05rem, 2.2vw, 1.35rem)', fontWeight: 600, color: 'var(--forest)', lineHeight: 1.15 }}>
            {card.role}
          </span>
          <span className="font-sans" style={{ fontSize: '0.78rem', lineHeight: 1.5, color: 'rgba(42,74,48,0.38)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '46ch', opacity: isOpen ? 0 : 1, transition: 'opacity 0.2s ease' }}>
            {card.headline}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
          style={{ flexShrink: 0, color: isOpen ? 'var(--amber)' : 'rgba(42,74,48,0.3)' }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 4 V16 M4 10 H16" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          </svg>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key={`row-${card.id}`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="relative" style={{ paddingTop: '0.5rem', paddingBottom: 'clamp(2rem, 4vw, 3rem)', paddingLeft: 'clamp(0rem, 2vw, 3.25rem)' }}>
              <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.1, ease: [0.19, 1, 0.22, 1] }}
                style={{ height: '1.5px', width: '2.5rem', background: 'rgba(196,149,75,0.55)', transformOrigin: 'left center', marginBottom: '1.75rem' }} />
              <div className="absolute pointer-events-none" aria-hidden="true" style={{ top: 0, right: 0, width: '52px', height: '72px', color: 'var(--forest)', opacity: 0.08 }}>
                <Motif className="w-full h-full" />
              </div>
              <span aria-hidden="true" className="absolute pointer-events-none select-none font-serif font-black"
                style={{ bottom: '1rem', right: '0.5rem', fontSize: 'clamp(5rem, 12vw, 9rem)', color: 'rgba(42,74,48,0.03)', lineHeight: 1, letterSpacing: '-0.05em' }}>
                {card.n}
              </span>
              <p className="font-sans uppercase mb-4" style={{ fontSize: '0.52rem', letterSpacing: '0.18em', color: 'rgba(196,149,75,0.75)', lineHeight: 1.5 }}>{card.label}</p>
              <p className="font-serif text-forest/85 mb-5" style={{ fontSize: 'clamp(1.05rem, 2vw, 1.22rem)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.42, maxWidth: '52ch' }}>{card.headline}</p>
              <p className="font-sans mb-6" style={{ fontSize: '0.9rem', lineHeight: 1.84, color: 'rgba(40,40,40,0.50)', maxWidth: '60ch' }}>{card.body}</p>
              <div style={{ borderLeft: '2px solid var(--amber)', paddingLeft: '1.1rem', marginBottom: '1.75rem', maxWidth: '54ch' }}>
                <p className="font-serif" style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.02rem)', fontStyle: 'italic', fontWeight: 400, lineHeight: 1.65, color: 'rgba(42,74,48,0.72)' }}>{card.ask}</p>
              </div>
              <div className="flex flex-wrap gap-x-7 gap-y-3">
                {card.ctas.map((cta) => (
                  <a key={cta.label} href={cta.href} className="inline-flex items-center gap-2 font-sans transition-opacity hover:opacity-70 group" style={{ fontSize: '0.78rem', color: 'var(--amber)', textDecoration: 'none' }}>
                    <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                    {cta.label}
                    {cta.note && <span style={{ fontSize: '0.67rem', color: 'rgba(40,40,40,0.28)', marginLeft: '0.25rem' }}>{cta.note}</span>}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─── Programme Column (independent accordion state) ────────────── */
function ProgrammeColumn({ cards }: { cards: typeof CARDS }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const toggle = (i: number) => setOpenIndex(prev => prev === i ? null : i)
  return (
    <>
      {cards.map((card, i) => (
        <ProgrammeRow
          key={card.id}
          card={card}
          isOpen={openIndex === i}
          onToggle={() => toggle(i)}
          isLast={i === cards.length - 1}
        />
      ))}
    </>
  )
}

/* ─── Programme Section (2-col on lg+) ─────────────────────────── */
function ProgrammeSection() {
  return (
    <section style={{ background: 'var(--cream)', position: 'relative', zIndex: 3 }}>
      <style>{`
        @media (min-width: 1024px) {
          .prog-left { border-right: 1px solid rgba(42,74,48,0.07); padding-right: 2.5rem; }
          .prog-right { padding-left: 2.5rem; }
        }
      `}</style>
      <div className="mx-auto px-6 md:px-10" style={{ maxWidth: '1140px', paddingTop: '1rem', paddingBottom: '5rem' }}>
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(42,74,48,0.10)' }}>
            <p className="font-sans uppercase" style={{ fontSize: '0.52rem', letterSpacing: '0.26em', color: 'rgba(42,74,48,0.32)' }}>Eight invitations</p>
            <div style={{ flex: 1, height: '1px', background: 'rgba(42,74,48,0.08)' }} />
          </div>
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="prog-left">
            <ProgrammeColumn cards={CARDS.slice(0, 4)} />
          </div>
          <div className="prog-right">
            <ProgrammeColumn cards={CARDS.slice(4)} />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function BuildWithUsPage() {
  return (
    <>
      <InvitationHero />
      <QuoteInsert />
      <FounderLetter />
      <ProgrammeSection />
      <WorkshopSection />
    </>
  )
}
