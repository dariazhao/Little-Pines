'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, GitFork, FileText, MessageCircle, Github } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { MethodSection, StarField, ForestSilhouette, ShootingStars, TwinklingStars } from '@/app/_homepage-after'
import { PineBranch } from '@/components/illustrations/pine-branch'

/* ─── Data ─────────────────────────────────────────────────────── */
const PROMISES = [
  {
    num: '01',
    title: 'The bear waits.',
    body: 'Child-initiated, always. The paw is the only on-switch, and only the child holds it. Patience is not a limitation. It is the design.',
  },
  {
    num: '02',
    title: 'Voice stays on the plush.',
    body: 'Nothing leaves the device. No cloud, no data asset. A hardware mute switch ships on the bear: not a privacy policy, a physical fact.',
  },
  {
    num: '03',
    title: "We don't measure minutes.",
    body: "When a child is ready to stop, that's good. Success looks like a child with more words for what they feel — and humans in their life who know them a little better.",
  },
  {
    num: '04',
    title: "The bear listens. It doesn't lead.",
    body: "It won't instruct, correct, or advise. It reflects and steps back. The work of raising a child belongs to the humans who love them.",
  },
  {
    num: '05',
    title: 'The work belongs to everyone.',
    body: 'Sewing patterns, session guides, model fine-tuning, safety protocols. Published as we build. A parent, a school, another studio — anyone can adapt what we make.',
  },
  {
    num: '06',
    title: 'We are a toy studio.',
    body: 'Not an AI company with a toy. The bear is the product. We chose modern tools because they help us make better things, not because they are the point.',
  },
]


type RepoStatus = { background: string; color: string }
const REPOS: { name: string; status: string; statusStyle: RepoStatus; desc: string }[] = [
  { name: 'little-pines-patterns', status: 'IN PROGRESS', statusStyle: { background: 'rgba(196,149,75,0.14)', color: 'rgba(140,100,40,0.9)' }, desc: 'Every pattern, cut guide, and stuffing template for the bear. Three sizes. Printable.' },
  { name: 'little-pines-sessions', status: 'DRAFTING',    statusStyle: { background: 'rgba(42,74,48,0.07)',  color: 'rgba(42,74,48,0.50)' },  desc: 'Structured play sessions for all four emotional frameworks, written for the seasons a child moves through.' },
  { name: 'little-pines-studio',   status: 'PUBLIC',      statusStyle: { background: 'rgba(42,74,48,0.12)', color: 'rgba(42,74,48,0.72)' },  desc: 'The source for this website. Fork it, make it yours.' },
]

const CONTRIBUTE = [
  { Icon: GitFork,       title: 'Fork & adapt',   desc: 'Take any pattern. Change the fiber, rescale it, make it yours. Share what you learn.' },
  { Icon: FileText,      title: 'Translate',       desc: "A family in São Paulo should not need to read English to use these sessions. Open a pull request." },
  { Icon: MessageCircle, title: 'Ask in public',   desc: "Found something wrong? Have a question about the pedagogy? Say it publicly — we answer publicly." },
]

const fiberStats = [
  { value: '≤23μm',           label: 'Fine alpaca grade',           sub: 'Below the prickle threshold for most sensitive skin' },
  { value: 'Family\nFarms',   label: 'Peruvian Andes',              sub: 'Small-herd, multigenerational alpaca husbandry' },
  { value: 'RAS\nCertified',  label: 'Responsible Alpaca Standard', sub: 'Third-party audited — Textile Exchange registry' },
]

/* ─── Bear paw ─────────────────────────────────────────────────── */
function BearPaw({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" fill="currentColor" aria-hidden="true" className={className}>
      <ellipse cx="30" cy="39" rx="14" ry="11" />
      <circle cx="15" cy="23" r="5.5" />
      <circle cx="26" cy="18" r="6" />
      <circle cx="37" cy="18" r="6" />
      <circle cx="47" cy="23" r="5.5" />
    </svg>
  )
}

/* ─── Hero ──────────────────────────────────────────────────────── */
function PromiseHero() {
  const [dots, setDots] = useState<{ x: number; y: number; r: number; op: number }[]>([])

  useEffect(() => {
    setDots(
      Array.from({ length: 36 }, (_, i) => ({
        x:  ((Math.sin(i * 137.5 * Math.PI / 180) + 1) / 2) * 100,
        y:  ((Math.cos(i *  97.3 * Math.PI / 180) + 1) / 2) * 100,
        r:  0.8 + ((Math.sin(i * 7.4) + 1) / 2) * 2.2,
        op: 0.10 + ((Math.cos(i * 5.1) + 1) / 2) * 0.22,
      }))
    )
  }, [])

  const promiseStars = [
    { x: 11, y: 26 }, { x: 22, y: 67 }, { x: 72, y: 16 },
    { x: 83, y: 54 }, { x: 58, y: 74 }, { x: 41, y: 39 },
  ]

  return (
    <section
      className="relative overflow-hidden flex items-center"
      style={{ background: 'var(--forest-dark)', minHeight: '88vh', paddingTop: '9rem', paddingBottom: '6rem' }}
    >
      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-45 pointer-events-none" aria-hidden="true" />

      {/* Pine branches */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-[0.055]" style={{ width: 'min(300px, 36vw)' }} aria-hidden="true">
        <PineBranch color="var(--cream)" />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-[0.05]" style={{ width: 'min(260px, 30vw)', transform: 'rotate(180deg)' }} aria-hidden="true">
        <PineBranch color="var(--cream)" flip />
      </div>

      {/* Star field */}
      {dots.length > 0 && (
        <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" aria-hidden="true">
          {dots.map((d, i) => (
            <circle key={i} cx={`${d.x}%`} cy={`${d.y}%`} r={d.r} fill="var(--cream)" opacity={d.op} />
          ))}
        </svg>
      )}

      {/* 6 amber promise-stars — one per commitment, floating */}
      {promiseStars.map(({ x, y }, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: `${x}%`, top: `${y}%`, width: 5, height: 5, background: 'var(--amber)', opacity: 0.55 }}
          animate={{ y: [0, -16, 0], opacity: [0.55, 0.95, 0.55], scale: [1, 1.35, 1] }}
          transition={{ duration: 3.5 + i * 0.7, delay: i * 0.55, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Ghost word */}
      <span
        aria-hidden="true"
        className="absolute pointer-events-none select-none font-serif"
        style={{
          right: '-4%', top: '50%', transform: 'translateY(-50%)',
          fontSize: 'clamp(9rem, 21vw, 19rem)',
          fontWeight: 700, color: 'var(--cream)', opacity: 0.03,
          lineHeight: 1, letterSpacing: '-0.04em',
        }}
      >
        Promise
      </span>

      {/* Bear paw accent */}
      <div className="absolute pointer-events-none" style={{ top: '14%', left: '5%', width: '28px', color: 'var(--amber)', opacity: 0.22 }} aria-hidden="true">
        <BearPaw className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full mx-auto max-w-5xl px-8 md:px-14 lg:px-20">
        <Reveal>
          <p className="font-sans uppercase" style={{ fontSize: '0.56rem', letterSpacing: '0.28em', color: 'rgba(196,149,75,0.6)', marginBottom: '2rem' }}>
            Little Pines Studio · The Promise
          </p>
        </Reveal>

        <div style={{ marginBottom: '1.75rem' }}>
          <Reveal delay={0.12}>
            <h1 className="font-serif text-cream block" style={{ fontSize: 'clamp(3.2rem, 8.5vw, 8rem)', fontWeight: 700, lineHeight: 0.9, letterSpacing: '-0.035em' }}>
              The
            </h1>
          </Reveal>
          <Reveal delay={0.24}>
            <span className="font-serif block" style={{ fontSize: 'clamp(3.2rem, 8.5vw, 8rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.08, letterSpacing: '-0.035em', color: 'var(--amber)' }}>
              Promise.
            </span>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <p className="font-sans text-cream/40 leading-relaxed" style={{ fontSize: '0.875rem', maxWidth: '48ch' }}>
            Three decisions and six commitments before a single line of code.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Promise item ──────────────────────────────────────────────── */
function PromiseItem({ num, title, body, index }: { num: string; title: string; body: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <motion.div
      ref={ref}
      className="group relative border-b border-forest/10 last:border-b-0"
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.07, ease: [0.19, 1, 0.22, 1] }}
    >
      <div className="py-10 md:py-12 flex gap-8 md:gap-10 items-start relative">
        <div className="shrink-0 w-8 flex flex-col items-center gap-2 pt-1">
          <motion.div
            className="bg-amber"
            style={{ width: '1px' }}
            initial={{ height: 0 }}
            animate={isInView ? { height: 20 } : {}}
            transition={{ duration: 0.4, delay: index * 0.07 + 0.12 }}
          />
          <span className="font-sans text-[0.5rem] tracking-[0.24em] uppercase text-amber font-semibold leading-none">
            {num}
          </span>
        </div>
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[minmax(auto,18rem)_1fr] gap-3 md:gap-14 items-start">
          <h3 className="font-serif font-semibold text-forest leading-[1.15]" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.55rem)' }}>
            {title}
          </h3>
          <p className="font-sans text-sm text-charcoal/60 leading-relaxed">{body}</p>
        </div>
        <span
          className="absolute right-2 top-1/2 -translate-y-1/2 font-serif font-bold select-none pointer-events-none transition-opacity duration-500 group-hover:opacity-[0.08]"
          style={{ fontSize: 'clamp(4.5rem, 8vw, 7rem)', color: 'var(--forest)', opacity: 0.03, lineHeight: 1, letterSpacing: '-0.06em' }}
          aria-hidden="true"
        >
          {num}
        </span>
      </div>
    </motion.div>
  )
}

/* ─── Safety + Privacy ──────────────────────────────────────────── */
/* ─── Open Source ───────────────────────────────────────────────── */
function OpenSourceSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [28, -28])

  return (
    <section ref={ref} style={{ background: 'var(--forest-dark)', padding: '5rem 0 6rem', borderRadius: '2.5rem 2.5rem 0 0', marginTop: '-2rem', position: 'relative', zIndex: 6, overflow: 'hidden' }}>
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"><StarField /></div>
      <TwinklingStars />
      <ShootingStars />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"><ForestSilhouette /></div>

      <motion.div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12 lg:px-20" style={{ y: contentY }}>

        {/* CC BY-SA 4.0 */}
        <Reveal>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(240,232,210,0.1)' }}>
            <div style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '0.1rem' }}>
              <FileText size={22} />
            </div>
            <div>
              <p className="font-sans font-semibold text-cream" style={{ fontSize: '0.9rem', letterSpacing: '0.02em', marginBottom: '0.6rem' }}>
                CC BY-SA 4.0
              </p>
              <p className="font-sans leading-relaxed" style={{ fontSize: '0.875rem', maxWidth: '64ch', color: 'rgba(240,232,210,0.5)' }}>
                Use, copy, modify, and distribute anything we publish — including commercially — as long as you credit Little Pines Studio and share modifications under the same license. A Waldorf school in Vermont and a parent in Nairobi have identical access. That is the point.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* What's Published */}
          <Reveal>
            <h2 className="font-serif font-semibold text-cream" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.65rem)', marginBottom: '1.5rem' }}>
              What&rsquo;s Published
            </h2>
            <div className="flex flex-col gap-3">
              {REPOS.map((repo) => (
                <div key={repo.name} style={{ background: 'rgba(240,232,210,0.05)', border: '1px solid rgba(240,232,210,0.08)', borderRadius: '6px', padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.45rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <Github size={13} style={{ color: 'rgba(240,232,210,0.35)' }} />
                      <span className="font-sans font-medium" style={{ fontSize: '0.875rem', color: 'rgba(240,232,210,0.8)' }}>{repo.name}</span>
                    </div>
                    <span className="font-sans" style={{ fontSize: '0.52rem', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0.2rem 0.55rem', borderRadius: '4px', ...repo.statusStyle }}>
                      {repo.status}
                    </span>
                  </div>
                  <p className="font-sans" style={{ fontSize: '0.8rem', lineHeight: 1.6, paddingLeft: '1.45rem', color: 'rgba(240,232,210,0.38)' }}>{repo.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Get Involved */}
          <Reveal delay={0.08}>
            <h2 className="font-serif font-semibold text-cream" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.65rem)', marginBottom: '1.5rem' }}>
              Join the work
            </h2>
            <div className="flex flex-col gap-5 mb-8">
              {CONTRIBUTE.map(({ Icon, title, desc }) => (
                <div key={title} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ color: 'rgba(240,232,210,0.32)', flexShrink: 0, marginTop: '0.1rem' }}>
                    <Icon size={17} />
                  </div>
                  <div>
                    <p className="font-sans font-semibold" style={{ fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--amber)' }}>{title}</p>
                    <p className="font-sans" style={{ fontSize: '0.82rem', lineHeight: 1.65, color: 'rgba(240,232,210,0.45)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://github.com/dariazhao/Little-Pines"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans font-medium text-sm transition-colors duration-200 hover:opacity-90"
              style={{ background: 'rgba(240,232,210,0.1)', border: '1px solid rgba(240,232,210,0.2)', color: 'var(--cream)', padding: '0.75rem 1.5rem', borderRadius: '4px' }}
            >
              <Github size={15} />
              Start on GitHub
            </a>
          </Reveal>
        </div>
      </motion.div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function PromisePage() {
  return (
    <>
      <PromiseHero />

      <MethodSection hideCta />

      {/* Six commitments — always expanded */}
      <section style={{ background: 'var(--cream)' }}>
        <div style={{ maxWidth: '900px', marginInline: 'auto', padding: '5rem 2rem' }}>
          <div className="border-t border-forest/10" />
          <p className="font-sans text-[0.58rem] tracking-[0.22em] uppercase text-forest/35 mt-8 mb-12">
            Six commitments
          </p>
          {PROMISES.map((p, i) => (
            <PromiseItem key={p.num} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* Materials / Alpaca */}
      <section
        className="relative py-20 md:py-28 overflow-hidden"
        style={{
          backgroundColor: '#2a1a0a',
          borderRadius: '2.5rem 2.5rem 0 0',
          marginTop: '-2rem',
          position: 'relative',
          zIndex: 5,
        }}
      >
        <div className="absolute inset-0" style={{ backdropFilter: 'blur(3px)' }} aria-hidden="true" />
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(48,30,10,0.88)' }} aria-hidden="true" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
          <Reveal className="mb-14">
            <p className="font-sans text-[0.64rem] tracking-[0.18em] uppercase text-amber mb-2">Materials</p>
            <h2 className="font-serif text-heading text-cream font-semibold">We know every farm.</h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-cream/8">
            {fiberStats.map(({ value, label, sub }, i) => (
              <Reveal key={label} delay={0.07 * i} className="py-10 md:py-0 md:px-12 first:md:pl-0 last:md:pr-0">
                <p className="font-serif text-5xl md:text-6xl font-semibold text-cream whitespace-pre-line leading-tight mb-3">{value}</p>
                <p className="font-sans text-[0.64rem] tracking-[0.12em] uppercase text-amber/75 mb-2">{label}</p>
                <p className="font-sans text-sm text-cream/35 leading-relaxed">{sub}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-10 pt-10 border-t border-cream/8">
            <Link href="/research#materials" className="font-sans text-xs text-cream/35 hover:text-amber transition-colors flex items-center gap-3">
              <span className="w-8 h-px bg-cream/15 flex-shrink-0" />
              Full material specification <ArrowRight className="w-3 h-3" />
            </Link>
          </Reveal>
        </div>
      </section>

      <OpenSourceSection />
    </>
  )
}
