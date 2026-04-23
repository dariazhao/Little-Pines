'use client'

import React, { useRef } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { EmailCapture } from '@/components/email-capture'
import { PineBranch } from '@/components/illustrations/pine-branch'
import { WorkshopSection, AfterBearSection, SessionsSection } from '../_homepage-after'
import { BuildWithUsCards } from './_cards'


/* ══════════════════════════════════════════════════════════════════
   DATA
══════════════════════════════════════════════════════════════════ */
type Invitation = {
  num: string
  id: string
  role: string
  label: string
  headline: string
  body: string
  ask: string
  ctas: { label: string; href: string; note?: string }[]
}

const INVITATIONS: Invitation[] = [
  {
    num: '01',
    id: 'engineer',
    role: 'Engineer',
    label: 'Edge AI · Embedded Systems · Hardware',
    headline: 'The hardest design problem in this product is the one nobody sees.',
    body: 'We are running a frontier small model on-device, on a sealed hardware pod, inside a nine-inch plush. Gemma 4 on Synaptics Astra-class silicon. Whisper for child-voice STT. A physical microphone kill-switch at the circuit level. No cloud, ever. The hardest problems are child-voice recognition, sub-second latency on a quantized model, and the thermal and power envelope inside a toy a four-year-old sleeps with.',
    ask: "If you've shipped something that had to be invisible, efficient, and right — and you want to do that again for something that matters — I'd like to find a time to talk. Equity-and-mission terms. Part-time or full-time. Based anywhere.",
    ctas: [{ label: 'build@littlepinesstudio.com', href: 'mailto:build@littlepinesstudio.com' }],
  },
  {
    num: '02',
    id: 'researcher',
    role: 'Researcher',
    label: 'Child Psychology · Developmental Science',
    headline: 'We need your worst objection, not your encouragement.',
    body: "The pedagogy is grounded in Siegel, Delahooke, Greene, Gerber, Montessori's spiritual embryo, and the CASEL framework. The full 38-page concept paper includes the four session types, the disclosure protocol, and the efficacy design. I want it torn apart. Any clinical objection I haven't anticipated. Anywhere the developmental claims are wrong or overreaching. Anywhere the product is naïve about what children aged 3–7 can actually do.",
    ask: "Would you read the concept paper and come back with the one thing that would give you pause? That's the conversation I'm looking for. Paid consulting or advisor equity, your call.",
    ctas: [
      { label: 'Read the concept paper', href: 'https://drive.google.com/file/d/1qMV7FTpaoKbYQ7feTzYFMXVjav_-GpBf/view' },
      { label: 'research@littlepinesstudio.com', href: 'mailto:research@littlepinesstudio.com?subject=Reaction%20call' },
    ],
  },
  {
    num: '03',
    id: 'educator',
    role: 'Educator',
    label: 'Montessori · Waldorf · Early Childhood',
    headline: 'Tell us where this breaks the tradition. We need that conversation.',
    body: "The brand claims Montessori- and Waldorf-inspired, and that claim is only worth making if credentialed educators agree with it. I want to know where this is genuinely aligned with the tradition: grace and courtesy, the prepared environment, the child's interior life. And where it isn't. I also want to pilot with ten to fifteen families in a real classroom community this fall.",
    ask: "Would you sit with the curriculum and tell me honestly where this earns the Montessori and Waldorf names, and where it borrows without understanding? I'd rather hear that now, not after we've printed something on the box.",
    ctas: [{ label: 'educators@littlepinesstudio.com', href: 'mailto:educators@littlepinesstudio.com' }],
  },
  {
    num: '04',
    id: 'grantmaker',
    role: 'Grantmaker',
    label: 'Early Childhood · Youth Mental Health',
    headline: 'We need a clinical partner and a research design you can fund.',
    body: 'The efficacy work is the spine of the brand. A two-arm RCT with 120 families over 12 weeks, co-designed with a leading child-development research lab, measuring emotional vocabulary, self-regulation (BRIEF-P), tantrum frequency, sleep quality, and child anxiety (Spence Preschool). All instruments preregistered. All data open. All results published, regardless of direction.',
    ask: "Before the formal application, I'd welcome thirty minutes to hear what a rigorous study design would need to look like from your program's perspective. I am preparing a $200–400K efficacy-study request for the pilot RCT.",
    ctas: [
      { label: 'Read the research brief', href: '/research' },
      { label: 'research@littlepinesstudio.com', href: 'mailto:research@littlepinesstudio.com' },
    ],
  },
  {
    num: '05',
    id: 'investor',
    role: 'Investor',
    label: 'Friends & Family · Mission-Aligned Pre-Seed',
    headline: 'We are looking to raise a friends and family round to fund the prototype, research pilot, and platform IP.',
    body: 'I am not raising yet. The current capital plan is non-dilutive: in-kind R&D from NVIDIA Inception and Synaptics, foundation funding for the RCT, an academic research partnership, and a friends-and-family SAFE to cover the first six months. A pre-seed conversation opens in roughly ninety days, after the pedagogy team and efficacy design are locked.',
    ask: "If this is a mission you share, I'd like to tell you more. The round is small. I'm being careful about who's in it.",
    ctas: [
      { label: 'Join the investor notice list', href: 'mailto:build@littlepinesstudio.com?subject=Investor%20notice%20list', note: 'one email per quarter' },
    ],
  },
  {
    num: '06',
    id: 'voice',
    role: 'Voice',
    label: "Children's Audiobook · Voice Direction",
    headline: "The voice is the most important design decision in this product. It doesn't exist yet.",
    body: "The voice is the product. A single character, performed by a real actor from the children's audiobook world, converted to an on-device TTS model. The bar to beat is the founder's own voice reading to her daughter at bedtime. This is the most important design decision in the product and the one I know least about.",
    ask: "Would you help me understand what world-class children's voice performance actually requires, before I write the brief? I'm not ready to cast yet. I'm still learning what to ask for.",
    ctas: [{ label: 'voice@littlepinesstudio.com', href: 'mailto:voice@littlepinesstudio.com' }],
  },
  {
    num: '07',
    id: 'retail',
    role: 'Retail',
    label: 'Maisonette · MindWare · Bella Luna · Independents',
    headline: 'We are not pitching a Holiday 2026 product. We are starting a 2027+ conversation.',
    body: 'The target retail debut is holiday 2027. The plush would sit on the shelf next to Tonies, Yoto, and Lovevery — on a different pedagogical shelf: emotional literacy rather than audio content or developmental play. Retail MSRP is in line with Tonies and Yoto. The story parents can tell each other is screen-free, on-device, and built around the developmental literature.',
    ask: "If the story is one you'd want to tell your buyers: when should we first talk? What would you need to see before the Q4 2027 assortment meeting?",
    ctas: [{ label: 'retail@littlepinesstudio.com', href: 'mailto:retail@littlepinesstudio.com' }],
  },
]

const ANCHORS = [
  { id: 'engineer',   label: 'Engineer' },
  { id: 'researcher', label: 'Researcher' },
  { id: 'educator',   label: 'Educator' },
  { id: 'grantmaker', label: 'Grantmaker' },
  { id: 'investor',   label: 'Investor' },
  { id: 'voice',      label: 'Voice' },
  { id: 'retail',     label: 'Retail' },
  { id: 'parents',    label: 'Parents' },
]

/* ══════════════════════════════════════════════════════════════════
   ANCHOR PILL
══════════════════════════════════════════════════════════════════ */
function AnchorPill({ id, label }: { id: string; label: string }) {
  const [hovered, setHovered] = React.useState(false)
  return (
    <a
      href={`#${id}`}
      className="font-sans transition-all duration-200"
      style={{
        display: 'inline-block',
        fontSize: '0.62rem',
        letterSpacing: '0.10em',
        textTransform: 'uppercase',
        color: hovered ? 'var(--cream)' : 'var(--forest)',
        background: hovered ? 'var(--forest)' : 'transparent',
        border: `1px solid ${hovered ? 'var(--forest)' : 'rgba(42,74,48,0.20)'}`,
        padding: '0.32rem 0.85rem',
        borderRadius: '100px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {label}
    </a>
  )
}

/* ══════════════════════════════════════════════════════════════════
   INVITATION ENTRY
══════════════════════════════════════════════════════════════════ */
function InvitationEntry({ inv }: { inv: Invitation }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <motion.div
      ref={ref}
      id={inv.id}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
      style={{
        borderTop: '1px solid rgba(42,74,48,0.09)',
        paddingTop: '4rem',
        paddingBottom: '4.5rem',
        scrollMarginTop: '5rem',
        position: 'relative',
      }}
    >
      {/* Ghost watermark number */}
      <span
        aria-hidden="true"
        className="font-serif select-none pointer-events-none"
        style={{
          position: 'absolute',
          top: '2.5rem',
          right: 0,
          fontSize: 'clamp(5.5rem, 11vw, 9rem)',
          fontWeight: 700,
          color: 'var(--forest)',
          opacity: 0.038,
          lineHeight: 1,
          letterSpacing: '-0.05em',
        }}
      >
        {inv.num}
      </span>

      {/* Two-column grid: metadata | content */}
      <div className="grid grid-cols-1 lg:grid-cols-[190px_1fr] gap-5 lg:gap-14">

        {/* Left — role metadata */}
        <div style={{ paddingTop: '0.2rem' }}>
          <p
            className="font-sans"
            style={{ fontSize: '0.48rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.75)', marginBottom: '0.55rem' }}
          >
            {inv.num}
          </p>
          <p
            className="font-sans"
            style={{ fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--forest)', lineHeight: 1.35, marginBottom: '0.35rem' }}
          >
            {inv.role}
          </p>
          <p
            className="font-sans"
            style={{ fontSize: '0.62rem', color: 'rgba(42,74,48,0.38)', lineHeight: 1.6 }}
          >
            {inv.label}
          </p>
        </div>

        {/* Right — content */}
        <div>
          {/* Headline */}
          <h3
            className="font-serif"
            style={{
              fontSize: 'clamp(1.3rem, 2.2vw, 1.85rem)',
              fontStyle: 'italic',
              fontWeight: 600,
              color: 'var(--forest)',
              lineHeight: 1.22,
              letterSpacing: '-0.022em',
              marginBottom: '1rem',
              maxWidth: '50ch',
            }}
          >
            {inv.headline}
          </h3>

          {/* Amber rule */}
          <div style={{ width: '1.75rem', height: '1px', background: 'var(--amber)', opacity: 0.55, marginBottom: '1.1rem' }} />

          {/* Body */}
          <p
            className="font-sans"
            style={{ fontSize: '0.875rem', color: 'rgba(44,44,40,0.56)', lineHeight: 1.9, marginBottom: '1.75rem', maxWidth: '56ch' }}
          >
            {inv.body}
          </p>

          {/* The ask — amber left-border callout */}
          <div
            style={{
              borderLeft: '2px solid rgba(196,149,75,0.55)',
              paddingLeft: '1.25rem',
              paddingBlock: '0.65rem',
              marginBottom: '1.75rem',
              background: 'rgba(196,149,75,0.028)',
              borderRadius: '0 6px 6px 0',
            }}
          >
            <p
              className="font-serif"
              style={{ fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)', fontStyle: 'italic', fontWeight: 400, color: 'var(--forest)', lineHeight: 1.68 }}
            >
              {inv.ask}
            </p>
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: '1.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {inv.ctas.map((cta) => (
              <a
                key={cta.href}
                href={cta.href}
                target={cta.href.startsWith('http') ? '_blank' : undefined}
                rel={cta.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="font-sans text-amber hover:text-amber-light transition-colors inline-flex items-center gap-1.5"
                style={{ fontSize: '0.75rem' }}
              >
                <ArrowRight size={11} strokeWidth={2.2} />
                {cta.label}
                {cta.note && (
                  <span style={{ opacity: 0.32, marginLeft: '0.2rem', fontSize: '0.63rem' }}>
                    · {cta.note}
                  </span>
                )}
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   QUOTE HERO
══════════════════════════════════════════════════════════════════ */
function QuoteHero() {
  const phrases = [
    'There is a child somewhere',
    'right now, trying to find',
    'the word for what they feel.',
  ]

  return (
    <section
      className="relative overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'var(--forest-dark)', minHeight: '88vh', paddingTop: '9rem', paddingBottom: '6rem', textAlign: 'center' }}
    >
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Ambient pine decorations */}
      <div
        className="absolute top-0 left-0 pointer-events-none opacity-[0.045]"
        aria-hidden="true"
        style={{ width: 'min(260px, 32vw)', transform: 'rotate(-10deg) translateX(-10%)' }}
      >
        <PineBranch color="var(--cream)" />
      </div>
      <div
        className="absolute bottom-0 right-0 pointer-events-none opacity-[0.045]"
        aria-hidden="true"
        style={{ width: 'min(260px, 32vw)', transform: 'rotate(10deg) translateX(10%)' }}
      >
        <PineBranch color="var(--cream)" flip />
      </div>

      {/* Amber radial glow */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        aria-hidden="true"
        style={{ height: '250px', background: 'radial-gradient(ellipse at 50% -10%, rgba(196,149,75,0.07) 0%, transparent 65%)' }}
      />

      <div className="relative z-10 px-6" style={{ maxWidth: '32ch' }}>
        {/* Studio eyebrow */}
        <Reveal>
          <p
            className="font-sans"
            style={{ fontSize: '0.54rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.60)', marginBottom: '3rem' }}
          >
            Little Pines Studio · Build with us
          </p>
        </Reveal>

        {/* Quote — staggered phrases */}
        <div style={{ marginBottom: '2.75rem' }}>
          {phrases.map((phrase, i) => (
            <Reveal key={i} delay={0.14 + i * 0.20}>
              <span
                className="font-serif block"
                style={{
                  fontSize: 'clamp(1.55rem, 3.8vw, 2.5rem)',
                  fontStyle: 'italic',
                  fontWeight: 300,
                  lineHeight: 1.35,
                  color: 'var(--cream)',
                  letterSpacing: '-0.025em',
                }}
              >
                {phrase}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Amber divider + attribution */}
        <Reveal delay={0.82}>
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.1rem' }}
            aria-hidden="true"
          >
            <div style={{ height: '1px', width: '2.5rem', background: 'linear-gradient(to right, transparent, rgba(196,149,75,0.38))' }} />
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(196,149,75,0.38)' }} />
            <div style={{ height: '1px', width: '2.5rem', background: 'linear-gradient(to left, transparent, rgba(196,149,75,0.38))' }} />
          </div>
          <p className="font-sans" style={{ fontSize: '0.68rem', letterSpacing: '0.06em', color: 'rgba(244,239,226,0.32)' }}>
            — Daria Zhao, Founder
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   FOUNDER LETTER + ANCHOR NAV
══════════════════════════════════════════════════════════════════ */
function FounderLetter() {
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
            <p style={{ marginBottom: '1.5rem' }}>
              Children are born with an extraordinary capacity to feel, notice, and express the full
              range of human emotion. In the first years of life, they do this naturally: they cry when
              they&rsquo;re sad, they laugh when they&rsquo;re delighted, they cling when they&rsquo;re
              afraid. Parents, teachers, and cultures then spend the next decade — often without meaning
              to — teaching them to suppress, ignore, and perform these feelings rather than notice,
              name, and understand them. By the time a child is eight, most of them have lost the
              vocabulary for what&rsquo;s happening inside them, even as the feelings themselves are
              intensifying.
            </p>
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
            <p>
              I spent eight years at Learn With Mochi learning what four-year-olds actually need.
              The technical moment to build this particular friend arrived in 2026. We are going to
              build it slowly, in public, and in partnership with people who care for the whole child.
              If you are one of those people, I&rsquo;d like to meet you.
            </p>
            <p className="mt-10 font-serif italic text-forest-mid">&mdash;Daria</p>
          </div>
        </Reveal>

      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   INVITATIONS LIST
══════════════════════════════════════════════════════════════════ */
function InvitationsSection() {
  return (
    <section style={{ background: 'var(--cream)', position: 'relative', zIndex: 2 }}>
      {/* Subtle left-edge timeline line */}
      <div
        aria-hidden="true"
        className="hidden lg:block"
        style={{
          position: 'absolute',
          left: 'calc(50% - 450px + 20px)',
          top: 0,
          bottom: 0,
          width: '1px',
          background: 'linear-gradient(to bottom, transparent, rgba(42,74,48,0.055) 8%, rgba(42,74,48,0.055) 92%, transparent)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="mx-auto px-6 md:px-10"
        style={{ maxWidth: '900px' }}
      >
        {/* Section header */}
        <div style={{ borderTop: '1px solid rgba(42,74,48,0.09)', paddingTop: '4rem', paddingBottom: '1rem' }}>
          <Reveal>
            <p
              className="font-sans"
              style={{ fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(42,74,48,0.35)', marginBottom: '0.75rem' }}
            >
              01 – 07
            </p>
            <h2
              className="font-serif font-semibold text-forest"
              style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', letterSpacing: '-0.022em', lineHeight: 1.18 }}
            >
              Seven invitations.
            </h2>
          </Reveal>
        </div>

        {/* All invitations */}
        {INVITATIONS.map((inv) => (
          <InvitationEntry key={inv.id} inv={inv} />
        ))}

        {/* Closing note */}
        <div style={{ borderTop: '1px solid rgba(42,74,48,0.09)', paddingTop: '2.5rem', paddingBottom: '4rem' }}>
          <p className="font-sans" style={{ fontSize: '0.78rem', color: 'rgba(42,74,48,0.38)', lineHeight: 1.7 }}>
            None of the seven above?{' '}
            <a href="#parents" className="text-amber hover:text-amber-light transition-colors">
              The eighth invitation is for parents →
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   PARENTS / EARLY ACCESS
══════════════════════════════════════════════════════════════════ */
function ParentsSection() {
  return (
    <section
      id="parents"
      className="relative overflow-hidden"
      style={{
        background: 'var(--forest-dark)',
        borderRadius: '2.5rem 2.5rem 0 0',
        marginTop: '-2.5rem',
        position: 'relative',
        zIndex: 3,
        scrollMarginTop: '5rem',
      }}
    >
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden="true" />

      {/* Pine branch accents */}
      <div
        className="absolute top-0 right-0 pointer-events-none opacity-[0.045]"
        aria-hidden="true"
        style={{ width: 'min(240px, 28vw)' }}
      >
        <PineBranch color="var(--cream)" flip />
      </div>

      <div
        className="relative z-10 mx-auto px-6 md:px-12"
        style={{ maxWidth: '620px', paddingTop: '6rem', paddingBottom: '6.5rem', textAlign: 'center' }}
      >
        {/* Eyebrow */}
        <Reveal>
          <p
            className="font-sans"
            style={{ fontSize: '0.52rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.62)', marginBottom: '1.5rem' }}
          >
            08 · For parents
          </p>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.08}>
          <h2
            className="font-serif font-semibold text-cream"
            style={{ fontSize: 'clamp(1.7rem, 3.8vw, 2.75rem)', lineHeight: 1.16, letterSpacing: '-0.025em', marginBottom: '1.25rem' }}
          >
            And if you&rsquo;re here as a parent —<br />
            you&rsquo;re the reason all of this exists.
          </h2>
        </Reveal>

        {/* Body */}
        <Reveal delay={0.14}>
          <p
            className="font-sans"
            style={{ fontSize: '0.87rem', color: 'rgba(244,239,226,0.44)', lineHeight: 1.82, maxWidth: '42ch', margin: '0 auto 0.75rem' }}
          >
            We write only when there is something worth saying.
            <br />
            When the bear is closer, you&rsquo;ll be the first to know.
          </p>
          <p
            className="font-sans"
            style={{ fontSize: '0.72rem', color: 'rgba(244,239,226,0.22)', lineHeight: 1.6, maxWidth: '36ch', margin: '0 auto 2.75rem' }}
          >
            No pitch deck. No product launch spam. One note,
            when it&rsquo;s ready.
          </p>
        </Reveal>

        {/* Email capture */}
        <Reveal delay={0.20}>
          <EmailCapture dark buttonLabel="Notify Me" />
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
