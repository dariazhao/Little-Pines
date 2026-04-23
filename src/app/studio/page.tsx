'use client'

import React, { useRef, useState } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Reveal } from '@/components/ui/reveal'
import { PineBranch } from '@/components/illustrations/pine-branch'
import { WorkshopSection, AfterBearSection, SessionsSection } from '../_homepage-after'
import { BuildWithUsCards } from './_cards'


/* ══════════════════════════════════════════════════════════════════
   SENTENCE HERO
══════════════════════════════════════════════════════════════════ */

const SENTENCE_STARS: [number, number, number][] = [
  [8, 12, 1.2], [15, 7, 0.9], [23, 18, 1.4], [32, 5, 0.8], [41, 14, 1.1],
  [55, 9, 1.3], [63, 20, 0.9], [72, 6, 1.5], [80, 15, 1.0], [91, 8, 1.2],
  [5, 35, 0.8], [18, 42, 1.1], [28, 78, 0.9], [37, 88, 1.3], [48, 82, 0.8],
  [58, 92, 1.1], [67, 75, 1.4], [76, 85, 0.9], [88, 70, 1.2], [94, 90, 0.8],
  [12, 60, 1.0], [87, 45, 1.1], [3, 80, 0.9], [96, 30, 1.3], [45, 3, 0.8],
  [70, 95, 1.0], [25, 95, 1.2], [85, 25, 0.9], [52, 50, 0.7], [33, 65, 1.0],
]

const SENTENCE_LINES = [
  { text: 'Children are born with', amber: false, weight: 400 },
  { text: 'an extraordinary capacity', amber: false, weight: 400 },
  { text: 'to feel, notice,', amber: true, weight: 600 },
  { text: 'and express', amber: true, weight: 600 },
  { text: 'the full range of', amber: false, weight: 400 },
  { text: 'human emotion.', amber: false, weight: 700 },
]

const LINE_DELAYS = [0.3, 0.52, 0.74, 0.91, 1.1, 1.28]

function SentenceHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'var(--forest-dark)',
        paddingTop: '10rem',
        paddingBottom: '9rem',
        textAlign: 'center',
      }}
    >
      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Static star field */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        {SENTENCE_STARS.map(([x, y, r], i) => (
          <circle
            key={i}
            cx={`${x}%`}
            cy={`${y}%`}
            r={r}
            fill="rgba(244,239,226,1)"
            opacity={0.14 + (i % 8) * 0.07}
          />
        ))}
      </svg>

      {/* Concentric ring motif — depth and warmth */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      >
        {([580, 440, 310] as const).map((size, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              border: `1px solid rgba(196,149,75,${0.055 - i * 0.012})`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Amber radial bloom */}
      <div
        className="absolute inset-x-0 pointer-events-none"
        aria-hidden="true"
        style={{
          top: '15%',
          height: '70%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(196,149,75,0.07) 0%, transparent 58%)',
        }}
      />

      {/* Pine branch corners */}
      <div
        className="absolute top-0 left-0 pointer-events-none opacity-[0.038]"
        aria-hidden="true"
        style={{ width: 'min(200px, 26vw)', transform: 'rotate(-12deg) translateX(-14%)' }}
      >
        <PineBranch color="var(--cream)" />
      </div>
      <div
        className="absolute bottom-0 right-0 pointer-events-none opacity-[0.038]"
        aria-hidden="true"
        style={{ width: 'min(200px, 26vw)', transform: 'rotate(12deg) translateX(14%)' }}
      >
        <PineBranch color="var(--cream)" flip />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6" style={{ maxWidth: 'min(840px, 90vw)' }}>

        {/* Eyebrow */}
        <motion.p
          className="font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{
            fontSize: '0.52rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(196,149,75,0.50)',
            marginBottom: '3rem',
          }}
        >
          Little Pines Studio
        </motion.p>

        {/* Sentence — per-line mask slide-up */}
        <div style={{ marginBottom: '3rem' }}>
          {SENTENCE_LINES.map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.span
                className="font-serif block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.95, delay: LINE_DELAYS[i], ease: [0.19, 1, 0.22, 1] }}
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontStyle: 'italic',
                  fontWeight: line.weight,
                  lineHeight: 1.22,
                  letterSpacing: '-0.03em',
                  color: line.amber
                    ? 'var(--amber)'
                    : i === 5
                    ? 'var(--cream)'
                    : 'rgba(244,239,226,0.8)',
                  paddingBottom: '0.06em',
                }}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
        </div>

        {/* Amber underline draw-in */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.8, ease: [0.19, 1, 0.22, 1] }}
          style={{
            height: '1px',
            width: '3.5rem',
            background: 'rgba(196,149,75,0.50)',
            transformOrigin: 'left center',
            margin: '0 auto',
          }}
        />
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   FOUNDER LETTER
══════════════════════════════════════════════════════════════════ */
function FounderLetter() {
  const [expanded, setExpanded] = useState(false)

  return (
    <section
      id="build-with-us"
      style={{
        background: 'var(--cream)',
        borderRadius: '2rem 2rem 0 0',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 2,
        scrollMarginTop: '5rem',
      }}
    >
      <div
        className="mx-auto px-6 md:px-10"
        style={{ maxWidth: '660px', paddingTop: '4rem', paddingBottom: '4.5rem' }}
      >
        {/* Section heading */}
        <Reveal>
          <p className="font-sans uppercase" style={{ fontSize: '0.54rem', letterSpacing: '0.26em', color: 'rgba(42,74,48,0.32)', marginBottom: '1rem' }}>
            Calls for Collaboration
          </p>
          <div style={{ marginBottom: '2.5rem' }}>
            <h1 className="font-serif text-forest block" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.03em' }}>
              Build
            </h1>
            <span className="font-serif block" style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--amber)' }}>
              with us.
            </span>
          </div>
        </Reveal>

        {/* Letter */}
        <Reveal delay={0.08}>
          <div
            className="font-serif text-charcoal"
            style={{ fontSize: 'clamp(0.97rem, 1.4vw, 1.07rem)', lineHeight: 1.88 }}
          >
            {/* Always-visible first paragraph */}
            <p style={{ marginBottom: '1.5rem' }}>
              In the first years of life, children do this naturally: they cry when they&rsquo;re
              sad, they laugh when they&rsquo;re delighted, they cling when they&rsquo;re afraid,
              they withdraw when they&rsquo;re overstimulated. Parents, teachers, and cultures then
              spend the next decade of a child&rsquo;s life, often without meaning to, teaching them
              to suppress, ignore, and perform these feelings rather than notice, name, and understand
              them. By the time a child is eight, most of them have lost the vocabulary for what&rsquo;s
              happening inside them, even as the feelings themselves are intensifying.
            </p>

            {/* Expandable rest of letter */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  key="letter-body"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <p style={{ marginBottom: '1.5rem' }}>
                    The screen economy has accelerated this loss. Every minute a child spends on YouTube,
                    TikTok, or a tablet is a minute they&rsquo;re not sitting with their own interior life.
                    The dopamine reward cycle of short-form content trains children to flee from boredom,
                    from discomfort, from the quiet moments where self-awareness actually develops. Jonathan
                    Haidt documented the population-level consequences. But the individual consequence is
                    simpler and sadder: millions of children are growing up without the basic emotional
                    vocabulary and self-regulation skills that we carry with us through a lifetime.
                  </p>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Montessori, Waldorf, and other child-development traditions have always understood that
                    emotional awareness is not separate from learning — it is the foundation of learning. A
                    child who cannot name their frustration cannot work through it. A child who cannot
                    recognize their excitement cannot channel it. Academic skills come later, and they come
                    more easily, when the emotional foundation is strong.
                  </p>
                  <p style={{ marginBottom: '1.5rem' }}>
                    Little Pines Studio exists because this foundation is being undermined faster than any
                    other part of childhood — and because the tools parents have been given to address it
                    (therapy apps, SEL curricula, meditation videos) are almost all delivered through the
                    same screens that caused the problem. The answer has to come from a different form factor
                    entirely: a quiet, unhurried, screen-free friend that lives in a child&rsquo;s room and
                    helps them notice what they feel, name it, sit with it, and move through it. Not a
                    therapist. Not a teacher. A friend.
                  </p>
                  <p style={{ marginBottom: '1.5rem' }}>
                    I spent eight years at Learn With Mochi learning what four-year-olds actually need.
                    The technical moment to build this particular friend arrived in 2026. We are going to
                    build it slowly, in public, and in partnership with people who care for the whole child.
                    If you are one of those people, I&rsquo;d like to meet you.
                  </p>
                  <p className="font-serif italic" style={{ color: 'var(--forest)', opacity: 0.6, marginTop: '2rem' }}>
                    &mdash;Daria
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Toggle button */}
            <button
              onClick={() => setExpanded(!expanded)}
              className="font-sans inline-flex items-center gap-2 transition-colors mt-2"
              style={{
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
                color: expanded ? 'rgba(42,74,48,0.38)' : 'var(--amber)',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
              }}
            >
              <span>{expanded ? 'Collapse' : 'Read the full invitation'}</span>
              <motion.svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              >
                <path d="M2 4.5 L6.5 9 L11 4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   PULL-UP SESSIONS WRAPPER
══════════════════════════════════════════════════════════════════ */
function PullUpSessionsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.25'] })
  const y = useTransform(scrollYProgress, [0, 1], [100, 0])
  return (
    <motion.div ref={ref} style={{ y, position: 'relative', zIndex: 5 }}>
      <SessionsSection />
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════════════════ */
export default function BuildWithUsPage() {
  return (
    <>
      <SentenceHero />
      <AfterBearSection />
      <PullUpSessionsSection />
      <FounderLetter />

      {/* Envelope section break */}
      <div className="flex flex-col items-center gap-4 pt-2 pb-6">
        <svg width="56" height="42" viewBox="0 0 56 42" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-30">
          <rect x="1" y="1" width="54" height="40" rx="3" stroke="var(--forest)" strokeWidth="1.5"/>
          <path d="M1 4 L28 24 L55 4" stroke="var(--forest)" strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M1 38 L19 22" stroke="var(--forest)" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M55 38 L37 22" stroke="var(--forest)" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>

      <BuildWithUsCards />
      <WorkshopSection />
    </>
  )
}
