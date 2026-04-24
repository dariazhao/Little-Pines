'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const ADVANCE_MS = 8000

/* ─── Botanical motifs ───────────────────────────────────────── */

function IconLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 84" fill="none" aria-hidden="true" className={className}>
      <path d="M28 80C28 80 4 56 4 34c0-18 10-28 24-26 14-2 24 8 24 26C52 56 28 80 28 80Z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M28 80V8M28 58l-18-16M28 58l18-16M28 44L13 32M28 44l15-12M28 30l-11-8M28 30l11-8" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  )
}

function IconFeather({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 84" fill="none" aria-hidden="true" className={className}>
      <path d="M23 80C23 80 2 58 4 32c1-18 10-26 22-24 10 2 14 14 10 26C32 50 23 80 23 80Z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M23 80l3-72M24 64L8 50M24 64l12-12M25 54L10 40M25 54l13-10M25 44L13 30M26 34l-10-12" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round"/>
    </svg>
  )
}

function IconSprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 84" fill="none" aria-hidden="true" className={className}>
      <path d="M24 80V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M24 58C24 58 8 48 8 30c0-12 7-18 16-14 9-4 16 2 16 14C40 48 24 58 24 58Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M24 38V16M16 30l8 6 8-6M12 38l12 6 12-6" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconAcorn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 52 84" fill="none" aria-hidden="true" className={className}>
      <ellipse cx="26" cy="56" rx="17" ry="21" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M9 44c0-8 8-14 17-14s17 6 17 14Z" fill="currentColor" opacity="0.18"/>
      <path d="M9 44Q26 37 43 44M26 30V18M20 24c0 0 1-10 6-6 5-4 6 6 6 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 42l3 10M21 42l1 12M31 42l-1 12M36 42l-3 10" stroke="currentColor" strokeWidth="0.7" strokeLinecap="round"/>
    </svg>
  )
}

function IconPinecone({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 84" fill="none" aria-hidden="true" className={className}>
      <path d="M24 76C24 76 4 58 4 40c0-18 9-26 20-26s20 8 20 26C44 58 24 76 24 76Z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M7 36Q24 28 41 36M6 44Q24 35 42 44M8 52Q24 44 40 52M12 60Q24 54 36 60M17 67Q24 63 31 67M24 14V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function IconWillow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 46 84" fill="none" aria-hidden="true" className={className}>
      <path d="M23 78C23 78 2 56 6 28c2-14 10-20 18-20s15 8 15 20C41 54 23 78 23 78Z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M23 78l1-70M23 62L8 48M23 52L9 38M24 42L11 28M24 32L15 20" stroke="currentColor" strokeWidth="0.85" strokeLinecap="round"/>
    </svg>
  )
}

function IconOakLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 58 84" fill="none" aria-hidden="true" className={className}>
      <path d="M29 78C29 78 5 58 5 38c0-20 11-30 24-28 13-2 24 8 24 28C53 58 29 78 29 78Z" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M29 78V10M29 58L11 44M29 58l18-14M29 44L14 32M29 44l15-12M5 38C1 28 6 18 12 15M53 38c4-10-1-20-7-23" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  )
}

function IconSeed({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 84" fill="none" aria-hidden="true" className={className}>
      <path d="M24 78V32" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M24 58C24 58 8 46 10 28c1-14 8-18 14-16 6-2 13 2 14 16C39 46 24 58 24 58Z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M18 38c0 0 2 8 6 10M30 38c0 0-2 8-6 10" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round"/>
    </svg>
  )
}

/* ─── Card data ──────────────────────────────────────────────── */

type CardCTA = { label: string; href: string; note?: string }

type CardData = {
  n: string
  id: string
  role: string
  label: string
  Motif: React.ComponentType<{ className?: string }>
  headline: string
  body: string
  ask: string
  ctas: CardCTA[]
  isParents?: boolean
}

export const CARDS: CardData[] = [
  {
    n: '01',
    id: 'engineer',
    role: 'Engineer',
    label: 'For the engineer in edge AI, embedded systems, or hardware',
    Motif: IconLeaf,
    headline: `The hardest design problem in this product is the one nobody sees.`,
    body: `We are running a frontier small model on-device, on a sealed hardware pod, inside a nine-inch plush. Gemma 4 on Synaptics Astra-class silicon. Whisper for child-voice STT. A physical microphone kill-switch at the circuit level. No cloud, ever. The hardest problems are child-voice recognition, sub-second latency on a quantized model, and the thermal and power envelope inside a plush that's trusted by four-year-olds.`,
    ask: `If you've shipped something that had to be invisible, efficient, and right, and you want to do that for something that matters: I'd like to find a time to talk. Part-time or full-time. Based anywhere.`,
    ctas: [{ label: 'Write to build@littlepinesstudio.com', href: 'mailto:build@littlepinesstudio.com' }],
  },
  {
    n: '02',
    id: 'researcher',
    role: 'Researcher',
    label: 'For the child psychologist or developmental researcher',
    Motif: IconFeather,
    headline: `We need your worst objection, not your encouragement.`,
    body: `The pedagogy is grounded in Siegel, Delahooke, Greene, Gerber, Montessori's spiritual embryo, and the CASEL framework. The full 38-page concept paper includes the four session types, the disclosure protocol, and the efficacy design. I want it torn apart. Any clinical objection I haven't anticipated. Anywhere the developmental claims are wrong or overreaching. Anywhere the product is naïve about what children aged 3–7 can actually do.`,
    ask: `Would you read the concept paper and come back with the one thing that would give you pause? That's the conversation I'm looking for.`,
    ctas: [
      { label: 'Read the concept paper', href: 'https://drive.google.com/file/d/1-WiaTL6BBVJkqct1ArMjt0H0gR_CCj6e/view?usp=drive_link' },
      { label: 'Book a thirty-minute call', href: 'mailto:research@littlepinesstudio.com?subject=Reaction%20call' },
    ],
  },
  {
    n: '03',
    id: 'educator',
    role: 'Educator',
    label: 'For the Montessori or Waldorf educator',
    Motif: IconSprig,
    headline: `Tell us where this breaks the tradition. We need that conversation.`,
    body: `The brand claims Montessori- and Waldorf-inspired, and that claim is only worth making if credentialed educators agree with it. I want to know where this is genuinely aligned with the tradition: grace and courtesy, the prepared environment, the child's interior life. And where it isn't. I also want to pilot with ten to fifteen families in a real classroom community this fall.`,
    ask: `Would you sit with the curriculum and tell me honestly where this earns the Montessori and Waldorf traditions, and where it borrows without understanding? I'd rather hear that now, not after we've printed something on the box.`,
    ctas: [{ label: 'Write to educators@littlepinesstudio.com', href: 'mailto:educators@littlepinesstudio.com' }],
  },
  {
    n: '04',
    id: 'voice',
    role: 'Voice',
    label: "For the children's voice director or audiobook producer",
    Motif: IconWillow,
    headline: `The voice is the most important design decision in this product. It doesn't exist yet.`,
    body: `The voice is the product. A single voice character, performed by a real actor from the children's audiobook world, converted to an on-device TTS model. The bar to beat is the founder's own voice reading to her daughter at bedtime. This is the most important design decision in the product and the one I know least about.`,
    ask: `Would you help me understand what world-class children's voice performance actually requires, before I write the brief? I'm not ready to cast yet. I'm still learning what to ask for.`,
    ctas: [{ label: 'Write to voice@littlepinesstudio.com', href: 'mailto:voice@littlepinesstudio.com' }],
  },
  {
    n: '05',
    id: 'grantmaker',
    role: 'Grantmaker',
    label: 'For the foundation or grantmaker in early childhood or youth mental health',
    Motif: IconAcorn,
    headline: `We need a clinical partner and a research design you can fund.`,
    body: `The efficacy work is the spine of the brand. A two-arm RCT with 120 families over 12 weeks, co-designed with a leading child-development research lab, measuring emotional vocabulary, self-regulation (BRIEF-P), tantrum frequency, sleep quality, and child anxiety (Spence Preschool). All instruments preregistered. All data open. All results published, regardless of direction.`,
    ask: `Before the formal application, I'd welcome thirty minutes to hear what a rigorous study design would need to look like from your program's perspective. I am preparing a $200–400K efficacy-study request for the pilot RCT.`,
    ctas: [
      { label: 'Read the research brief', href: '/research' },
      { label: 'Write to research@littlepinesstudio.com', href: 'mailto:research@littlepinesstudio.com' },
    ],
  },
  {
    n: '06',
    id: 'investor',
    role: 'Investor',
    label: 'For the mission-aligned investor (friends and family)',
    Motif: IconPinecone,
    headline: `We are looking to raise a friends and family round to fund the prototype, research pilot, and platform IP.`,
    body: `I am not raising yet. The current capital plan is non-dilutive: in-kind R&D from NVIDIA Inception and Synaptics, foundation funding for the RCT, an academic research partnership, and a friends-and-family SAFE to cover the first six months. A pre-seed conversation opens in roughly ninety days, after the pedagogy team and efficacy design are locked.`,
    ask: `If this is a mission you share, I'd like to tell you more. The round is small. I'm being careful about who's in it.`,
    ctas: [{ label: 'Join the investor notice list', href: 'mailto:build@littlepinesstudio.com?subject=Investor%20notice%20list', note: 'one email per quarter' }],
  },
  {
    n: '07',
    id: 'retail',
    role: 'Retail',
    label: 'For the specialty retail buyer (Maisonette, MindWare, Bella Luna, Fat Brain, independents)',
    Motif: IconOakLeaf,
    headline: `We are not pitching a Holiday 2026 product. We are starting a 2027+ conversation.`,
    body: `The target retail debut is holiday 2027. The plush would sit on the shelf next to Tonies, Yoto, and Lovevery, on a different pedagogical shelf: emotional literacy rather than audio content or developmental play. Retail MSRP is in line with Tonies and Yoto. The story parents can tell each other is screen-free, on-device, and built around the developmental literature.`,
    ask: `If the story is one you'd want to tell your buyers: when should we first talk? What would you need to see before the Q4 2027 assortment meeting?`,
    ctas: [{ label: 'Write to retail@littlepinesstudio.com', href: 'mailto:retail@littlepinesstudio.com' }],
  },
  {
    n: '08',
    id: 'parents',
    role: 'Parents',
    label: '08 · For parents',
    Motif: IconSeed,
    headline: `And if you're here as a parent, you're the reason all of this exists.`,
    body: `You've noticed that most technology for children is designed to hold attention, not to build character. The Little Pines bear is designed to be the opposite: screen-free, child-initiated, and entirely focused on helping your child find words for what they feel. It won't teach phonics or play songs. It will listen, reflect, and step back. The work of raising your child stays with you.`,
    ask: `We're building toward a holiday 2027 debut. One quiet note when the bear is ready, and nothing before that.`,
    ctas: [{ label: 'Read the concept brief', href: '/#read-the-brief' }, { label: 'Join the early access list', href: '/#notify' }],
    isParents: true,
  },
]

/* ─── Component ──────────────────────────────────────────────── */

export function BuildWithUsCards() {
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    if (hovering) return
    const t = setTimeout(() => setActive((p) => (p + 1) % CARDS.length), ADVANCE_MS)
    return () => clearTimeout(t)
  }, [active, hovering])

  const card = CARDS[active]
  const { Motif } = card

  return (
    <section
      style={{ background: 'var(--cream)', position: 'relative', zIndex: 2 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div
        className="mx-auto px-5 sm:px-8 md:px-12"
        style={{ maxWidth: '820px', paddingTop: '3rem', paddingBottom: '6rem' }}
      >
        {/* Eyebrow */}
        <p
          className="font-sans uppercase text-center"
          style={{ fontSize: '0.52rem', letterSpacing: '0.22em', color: 'rgba(42,74,48,0.32)', marginBottom: '1.25rem' }}
        >
          Eight invitations
        </p>

        {/* Pill navigation — centered above card */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            justifyContent: 'center',
            marginBottom: '1.75rem',
          }}
        >
          {CARDS.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className="font-sans"
              style={{
                fontSize: '0.58rem',
                letterSpacing: '0.10em',
                textTransform: 'uppercase',
                padding: '0.32rem 0.85rem',
                borderRadius: '100px',
                border: `1px solid ${active === i ? 'var(--forest)' : 'rgba(42,74,48,0.20)'}`,
                background: active === i ? 'var(--forest)' : 'transparent',
                color: active === i ? 'var(--cream)' : 'var(--forest)',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              {c.role}
            </button>
          ))}
        </div>

        {/* Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.34, ease: [0.19, 1, 0.22, 1] }}
          >
            <div
              className="relative overflow-hidden"
              style={{
                background: '#EDE5D4',
                border: '1px solid rgba(42,74,48,0.07)',
                borderRadius: '12px',
                padding: 'clamp(1.75rem, 5vw, 2.75rem)',
                minHeight: '420px',
              }}
            >
              {/* Botanical motif */}
              <motion.div
                key={`motif-${active}`}
                initial={{ opacity: 0, scale: 0.82, x: 10, y: -6 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{ duration: 0.55, ease: [0.19, 1, 0.22, 1], delay: 0.12 }}
                className="absolute pointer-events-none"
                style={{
                  top: '1.75rem',
                  right: '1.75rem',
                  width: '64px',
                  height: '86px',
                  color: 'var(--forest)',
                  opacity: 0.1,
                }}
              >
                <Motif className="w-full h-full" />
              </motion.div>

              {/* Ghost number */}
              <span
                aria-hidden="true"
                className="absolute pointer-events-none select-none font-serif font-bold"
                style={{
                  top: '-1rem',
                  left: '0.75rem',
                  fontSize: 'clamp(5.5rem, 11vw, 8.5rem)',
                  color: 'var(--forest)',
                  opacity: 0.03,
                  lineHeight: 1,
                  letterSpacing: '-0.05em',
                }}
              >
                {card.n}
              </span>

              <div className="relative" style={{ maxWidth: '56ch' }}>
                {/* Label */}
                <p
                  className="font-sans uppercase mb-3"
                  style={{ fontSize: '0.55rem', letterSpacing: '0.18em', lineHeight: 1.5, color: 'rgba(196,149,75,0.85)' }}
                >
                  {card.label}
                </p>

                {/* Headline */}
                <p
                  className="font-serif text-forest/88 mb-5"
                  style={{
                    fontSize: 'clamp(1.05rem, 2.2vw, 1.28rem)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    lineHeight: 1.38,
                  }}
                >
                  {card.headline}
                </p>

                {/* Body */}
                <p
                  className="font-sans text-charcoal/55 mb-6"
                  style={{ fontSize: '0.9rem', lineHeight: 1.82 }}
                >
                  {card.body}
                </p>

                {/* Ask */}
                <div
                  style={{
                    borderLeft: '2px solid var(--amber)',
                    paddingLeft: '1rem',
                    marginBottom: '1.75rem',
                  }}
                >
                  <p
                    className="font-serif text-forest/80"
                    style={{
                      fontSize: 'clamp(0.9rem, 1.8vw, 1.02rem)',
                      fontStyle: 'italic',
                      fontWeight: 400,
                      lineHeight: 1.62,
                    }}
                  >
                    {card.ask}
                  </p>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-x-7 gap-y-3">
                  {card.ctas.map((cta) => (
                    <a
                      key={cta.label}
                      href={cta.href}
                      className="inline-flex items-center gap-2 font-sans text-amber hover:text-amber-light transition-colors group"
                      style={{ fontSize: '0.78rem' }}
                    >
                      <ArrowRight className="w-3.5 h-3.5 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                      {cta.label}
                      {cta.note && (
                        <span className="text-charcoal/28 ml-0.5" style={{ fontSize: '0.67rem' }}>
                          {cta.note}
                        </span>
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Progress dashes */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                marginTop: '1.25rem',
              }}
            >
              {CARDS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to card ${i + 1}`}
                  style={{
                    width: active === i ? '1.5rem' : '0.35rem',
                    height: '2px',
                    background: active === i ? 'var(--amber)' : 'rgba(42,74,48,0.18)',
                    borderRadius: '1px',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
