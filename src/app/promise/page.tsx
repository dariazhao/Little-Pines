'use client'

import React, { useRef } from 'react'
import Image from 'next/image'
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

/* ─── Static star field data (no useEffect needed) ─────────────── */
const HERO_DOTS = Array.from({ length: 40 }, (_, i) => ({
  x:  ((Math.sin(i * 137.5 * Math.PI / 180 + 0.5) + 1) / 2) * 100,
  y:  ((Math.cos(i *  97.3 * Math.PI / 180 + 1.2) + 1) / 2) * 100,
  r:  0.7 + ((Math.sin(i * 7.4) + 1) / 2) * 1.8,
  op: 0.07 + ((Math.cos(i * 5.1) + 1) / 2) * 0.18,
}))

/* ─── Sparkle star (4-pointed) ──────────────────────────────────── */
function Sparkle({ x, y, size, delay }: { x: number; y: number; size: number; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{ opacity: [0.15, 0.85, 0.15], scale: [0.9, 1.3, 0.9] }}
      transition={{ duration: 2.8 + delay * 0.6, delay, repeat: Infinity, ease: 'easeInOut' }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 12 12" width={size} height={size} style={{ transform: 'translate(-50%,-50%)' }}>
        <path d="M6,0 L7,5 L12,6 L7,7 L6,12 L5,7 L0,6 L5,5 Z" fill="var(--amber)" />
      </svg>
    </motion.div>
  )
}

/* ─── Nature icon per promise ───────────────────────────────────── */
function PromiseIcon({ index, color }: { index: number; color: string }) {
  const icons = [
    /* 01 paw */ <svg key={0} viewBox="0 0 60 60" width="18" height="18" fill={color}><ellipse cx="30" cy="39" rx="14" ry="11"/><circle cx="15" cy="23" r="5.5"/><circle cx="26" cy="18" r="6"/><circle cx="37" cy="18" r="6"/><circle cx="47" cy="23" r="5.5"/></svg>,
    /* 02 moon */ <svg key={1} viewBox="0 0 32 32" width="16" height="16" fill={color}><path d="M16,2 Q28,2 28,16 Q28,30 16,30 Q9,30 4,24 Q14,22 14,16 Q14,10 4,8 Q9,2 16,2 Z"/></svg>,
    /* 03 leaf */ <svg key={2} viewBox="0 0 32 32" width="16" height="16" fill={color}><path d="M16,1 Q26,6 25,15 Q24,24 16,31 Q8,24 7,15 Q6,6 16,1 Z"/></svg>,
    /* 04 ear  */ <svg key={3} viewBox="0 0 32 32" width="16" height="16" fill={color}><path d="M16,2 Q28,7 28,18 Q28,27 20,30 Q16,28 16,24 Q20,22 20,18 Q20,12 16,8 Q12,4 16,2 Z"/><circle cx="13" cy="26" r="3"/></svg>,
    /* 05 seed */ <svg key={4} viewBox="0 0 32 32" width="16" height="16" fill={color}><rect x="14" y="16" width="4" height="14" rx="2"/><path d="M16,15 Q6,14 4,6 Q10,4 16,13 Z"/><path d="M16,15 Q26,14 28,6 Q22,4 16,13 Z"/></svg>,
    /* 06 star */ <svg key={5} viewBox="0 0 32 32" width="16" height="16" fill={color}><path d="M16,3 L19.5,12 L29,12 L22,18 L25,28 L16,22 L7,28 L10,18 L3,12 L12.5,12 Z"/></svg>,
  ]
  return icons[index] ?? null
}

/* ─── Hero ──────────────────────────────────────────────────────── */
function PromiseHero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--forest-dark)', minHeight: '92vh', paddingTop: '6rem', paddingBottom: '0' }}
    >
      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-45 pointer-events-none" aria-hidden="true" />

      {/* Warm amber glow — lower right where bear sits */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          right: '-5%', bottom: 0, width: '70%', height: '75%',
          background: 'radial-gradient(ellipse 65% 70% at 85% 95%, rgba(196,149,75,0.18) 0%, rgba(196,149,75,0.05) 55%, transparent 78%)',
        }}
      />

      {/* Pine branches */}
      <div className="absolute top-0 left-0 pointer-events-none opacity-[0.045]" style={{ width: 'min(260px, 28vw)', transform: 'scaleX(-1) rotate(10deg)' }} aria-hidden="true">
        <PineBranch color="var(--cream)" />
      </div>

      {/* Static star field */}
      <svg className="absolute inset-0 pointer-events-none" width="100%" height="100%" aria-hidden="true">
        {HERO_DOTS.map((d, i) => (
          <circle key={i} cx={`${d.x}%`} cy={`${d.y}%`} r={d.r} fill="var(--cream)" opacity={d.op} />
        ))}
      </svg>

      {/* Sparkle stars near bear */}
      <Sparkle x={60} y={14} size={14} delay={0.0} />
      <Sparkle x={67} y={34} size={10} delay={0.8} />
      <Sparkle x={76} y={20} size={16} delay={1.5} />
      <Sparkle x={84} y={10} size={11} delay={0.4} />
      <Sparkle x={89} y={38} size={13} delay={1.1} />
      <Sparkle x={73} y={48} size={9}  delay={0.6} />

      {/* Content grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-14 lg:px-20 w-full" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 w-full items-end" style={{ paddingBottom: '2rem' }}>

          {/* Left — text */}
          <div className="flex flex-col justify-center order-2 lg:order-1 pb-16 lg:pb-24 lg:pr-8">

            <Reveal>
              <p className="font-sans uppercase mb-8" style={{ fontSize: '0.56rem', letterSpacing: '0.28em', color: 'rgba(196,149,75,0.6)' }}>
                Little Pines Studio · The Promise
              </p>
            </Reveal>

            <div style={{ marginBottom: '1.5rem' }}>
              <Reveal delay={0.1}>
                <span className="font-serif text-cream block" style={{ fontSize: 'clamp(3.4rem, 7.5vw, 7rem)', fontWeight: 700, lineHeight: 0.90, letterSpacing: '-0.04em' }}>
                  Six things
                </span>
              </Reveal>
              <Reveal delay={0.2}>
                <span className="font-serif block" style={{ fontSize: 'clamp(3.4rem, 7.5vw, 7rem)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.02, letterSpacing: '-0.035em', color: 'var(--amber)' }}>
                  we promise
                </span>
              </Reveal>
              <Reveal delay={0.3}>
                <span className="font-serif text-cream/50 block" style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-0.025em', marginTop: '0.3rem' }}>
                  to you + your child.
                </span>
              </Reveal>
            </div>

            <Reveal delay={0.44}>
              <p className="font-sans text-cream/38 leading-relaxed mb-8" style={{ fontSize: '0.875rem', maxWidth: '44ch' }}>
                Three decisions and six commitments — written down before a single line of code, and kept in public.
              </p>
            </Reveal>

            <Reveal delay={0.56}>
              <div className="flex items-center gap-3" style={{ color: 'rgba(196,149,75,0.45)' }}>
                <div style={{ width: '28px', height: '1px', background: 'rgba(196,149,75,0.4)' }} />
                <span className="font-sans" style={{ fontSize: '0.58rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
                  Scroll to read them
                </span>
              </div>
            </Reveal>
          </div>

          {/* Right — bear */}
          <div className="flex items-end justify-center lg:justify-end order-1 lg:order-2 pt-6 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
            >
              <motion.div
                animate={{ y: [0, -16, 0] }}
                transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
              >
                <Image
                  src="/bear_eats.png"
                  alt="The Little Pines bear"
                  width={500}
                  height={500}
                  priority
                  style={{
                    width: 'min(420px, 78vw)',
                    height: 'auto',
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.62,
                    display: 'block',
                  }}
                />
              </motion.div>
            </motion.div>
          </div>

        </div>
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
      className="group relative"
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.07, ease: [0.19, 1, 0.22, 1] }}
    >
      {/* Subtle warm hover fill */}
      <motion.div
        className="absolute inset-0 rounded-xl pointer-events-none"
        style={{ background: 'rgba(196,149,75,0.04)' }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="relative border-b border-forest/8 last:border-b-0 py-9 md:py-11 px-1 flex gap-7 md:gap-10 items-start">

        {/* Icon + number */}
        <div className="shrink-0 flex flex-col items-center gap-2.5 pt-0.5" style={{ width: '2.5rem' }}>
          <div style={{ color: 'var(--amber)', opacity: 0.7 }}>
            <PromiseIcon index={index} color="currentColor" />
          </div>
          <span className="font-sans text-[0.48rem] tracking-[0.22em] uppercase font-semibold" style={{ color: 'rgba(196,149,75,0.45)' }}>
            {num}
          </span>
        </div>

        {/* Text */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-[minmax(auto,18rem)_1fr] gap-2.5 md:gap-14 items-start">
          <h3 className="font-serif font-semibold text-forest leading-[1.18]" style={{ fontSize: 'clamp(1.1rem, 2vw, 1.5rem)' }}>
            {title}
          </h3>
          <p className="font-sans text-sm text-charcoal/55 leading-relaxed">{body}</p>
        </div>

        {/* Ghost number watermark */}
        <span
          className="absolute right-2 top-1/2 -translate-y-1/2 font-serif font-bold select-none pointer-events-none opacity-[0.025] group-hover:opacity-[0.07] transition-opacity duration-500"
          style={{ fontSize: 'clamp(4rem, 8vw, 6.5rem)', color: 'var(--forest)', lineHeight: 1, letterSpacing: '-0.06em' }}
          aria-hidden="true"
        >
          {num}
        </span>
      </div>
    </motion.div>
  )
}

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

      {/* Six commitments ─────────────────────────────────────────── */}
      <section style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>

        {/* Soft warm tint in corner */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: 0, right: 0, width: '40%', height: '50%',
            background: 'radial-gradient(ellipse 80% 70% at 95% 5%, rgba(196,149,75,0.06) 0%, transparent 70%)',
          }}
        />

        <div style={{ maxWidth: '920px', marginInline: 'auto', padding: '5.5rem 2rem 6rem' }}>

          {/* Section header */}
          <Reveal>
            <div className="flex items-center gap-4 mb-10 pb-8 border-b border-forest/8">
              <svg viewBox="0 0 60 60" width="22" height="22" fill="var(--amber)" opacity="0.55" aria-hidden="true">
                <ellipse cx="30" cy="39" rx="14" ry="11"/>
                <circle cx="15" cy="23" r="5.5"/>
                <circle cx="26" cy="18" r="6"/>
                <circle cx="37" cy="18" r="6"/>
                <circle cx="47" cy="23" r="5.5"/>
              </svg>
              <p className="font-sans text-[0.58rem] tracking-[0.22em] uppercase text-forest/35">
                Six commitments
              </p>
            </div>
          </Reveal>

          {PROMISES.map((p, i) => (
            <PromiseItem key={p.num} {...p} index={i} />
          ))}
        </div>
      </section>

      {/* Materials / Alpaca ──────────────────────────────────────── */}
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
        <div className="absolute inset-0" style={{ backgroundColor: 'rgba(48,30,10,0.82)' }} aria-hidden="true" />

        {/* Bear silhouette in corner */}
        <div
          className="absolute right-0 bottom-0 pointer-events-none select-none"
          aria-hidden="true"
          style={{ width: 'min(280px, 35vw)', opacity: 0.06 }}
        >
          <Image src="/bear_sits.png" alt="" width={400} height={400} style={{ width: '100%', height: 'auto', filter: 'brightness(0) invert(1)' }} />
        </div>

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
