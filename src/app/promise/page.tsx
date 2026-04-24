'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence, useInView, useScroll, useTransform } from 'framer-motion'
import { FileText, GitFork, MessageCircle, Github } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { StarField, ForestSilhouette, ShootingStars, TwinklingStars } from '@/app/_homepage-after'
import { PineBranch } from '@/components/illustrations/pine-branch'
import { Globe } from '@/components/globe'

/* ─── Data ──────────────────────────────────────────────────────── */
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
  { name: 'little-pines-research', status: 'DRAFTING',    statusStyle: { background: 'rgba(42,74,48,0.07)',  color: 'rgba(42,74,48,0.50)' },  desc: 'Fine-tuned model weights for emotional literacy, trained on curated child-appropriate datasets.' },
]

const CONTRIBUTE = [
  { Icon: GitFork,       title: 'Fork & adapt',   desc: 'Take any pattern. Change the fiber, rescale it, make it yours. Share what you learn.' },
  { Icon: FileText,      title: 'Translate',       desc: 'A family in São Paulo should not need to read English to use these sessions. Open a pull request.' },
  { Icon: MessageCircle, title: 'Ask in public',   desc: 'Found something wrong? Have a question about the pedagogy? Say it publicly — we answer publicly.' },
]

/* ─── Static star field ─────────────────────────────────────────── */
const HERO_STARS: [number, number, number][] = [
  [8,12,1.2],[15,7,0.9],[23,18,1.4],[32,5,0.8],[41,14,1.1],
  [55,9,1.3],[63,20,0.9],[72,6,1.5],[80,15,1.0],[91,8,1.2],
  [5,35,0.8],[18,42,1.1],[28,78,0.9],[37,88,1.3],[48,82,0.8],
  [58,92,1.1],[67,75,1.4],[76,85,0.9],[88,70,1.2],[94,90,0.8],
  [12,60,1.0],[87,45,1.1],[3,80,0.9],[96,30,1.3],[45,3,0.8],
  [70,95,1.0],[25,95,1.2],[85,25,0.9],[52,50,0.7],[33,65,1.0],
]

/* ─── Hero ──────────────────────────────────────────────────────── */
const HERO_LINES = [
  { text: 'Before we wrote', italic: false, amber: false, weight: 300 },
  { text: 'a single line of code,', italic: true, amber: true, weight: 400 },
  { text: 'we made', italic: false, amber: false, weight: 300 },
  { text: 'six commitments.', italic: false, amber: false, weight: 700 },
]
const HERO_DELAYS = [0.3, 0.52, 0.72, 0.92]

function PromiseHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: 'var(--forest-dark)',
        paddingTop: '11rem',
        paddingBottom: '4rem',
        textAlign: 'center',
        minHeight: '100svh',
      }}
    >
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden="true" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        {HERO_STARS.map(([x, y, r], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="rgba(244,239,226,1)" opacity={0.12 + (i % 8) * 0.06} />
        ))}
      </svg>

      {/* Radiating rings — same as studio hero */}
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
      <div className="absolute inset-x-0 pointer-events-none" aria-hidden="true" style={{
        top: '20%', height: '60%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(196,149,75,0.07) 0%, transparent 60%)',
      }} />

      <div className="absolute top-0 left-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{ width: 'min(200px, 24vw)', transform: 'rotate(-12deg) translateX(-14%)' }}>
        <PineBranch color="var(--cream)" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{ width: 'min(200px, 24vw)', transform: 'rotate(12deg) translateX(14%)' }}>
        <PineBranch color="var(--cream)" flip />
      </div>

      {/* Globe — top arc only */}
      <motion.div
        className="absolute pointer-events-none"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, delay: 1.2 }}
        style={{
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(680px, 90vw)',
          height: 'min(240px, 24vh)',
          overflow: 'hidden',
          zIndex: 1,
        }}
      >
        <div style={{ width: '100%', aspectRatio: '1' }}>
          <Globe style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </motion.div>

      {/* Content */}
      <div className="relative px-6" style={{ maxWidth: 'min(780px, 90vw)', zIndex: 10 }}>

        <motion.p
          className="font-sans"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.50)', marginBottom: '3rem' }}
        >
          Little Pines Studio &middot; The Promise
        </motion.p>

        <div style={{ marginBottom: '3.5rem' }}>
          {HERO_LINES.map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.span
                className="font-serif block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.95, delay: HERO_DELAYS[i], ease: [0.19, 1, 0.22, 1] }}
                style={{
                  fontSize: 'clamp(2rem, 4.5vw, 3.5rem)',
                  fontStyle: line.italic ? 'italic' : 'normal',
                  fontWeight: line.weight,
                  lineHeight: 1.22,
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
          transition={{ duration: 1.2, delay: 1.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ height: '1px', width: '3rem', background: 'rgba(196,149,75,0.5)', transformOrigin: 'left center', margin: '0 auto 2.5rem' }}
        />

        {/* Floating down arrow */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.0 }} className="flex justify-center" style={{ paddingBottom: '2rem' }}>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ color: 'rgba(196,149,75,0.40)' }}
          >
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
              <path d="M7 2 V18 M2 13 L7 18 L12 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Commitment slide ───────────────────────────────────────────── */
function CommitmentSlide({ num, title, body, index }: { num: string; title: string; body: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0 })

  return (
    <motion.div
      ref={ref}
      className="flex-shrink-0 relative"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.07, ease: [0.19, 1, 0.22, 1] }}
      style={{
        width: 'clamp(260px, 36vw, 300px)',
        padding: '2.5rem 2.25rem 2.75rem 2.25rem',
        borderRight: '1px solid rgba(42,74,48,0.07)',
        overflow: 'hidden',
        scrollSnapAlign: 'start',
      }}
    >
      {/* Ghost ordinal */}
      <span
        className="absolute pointer-events-none select-none font-serif font-black"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(5rem, 10vw, 8rem)',
          lineHeight: 1,
          letterSpacing: '-0.06em',
          color: 'rgba(42,74,48,0.04)',
          bottom: '-0.12em',
          right: '-0.04em',
        }}
      >
        {num}
      </span>

      {/* Amber rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        style={{ height: '1.5px', width: '2rem', background: 'rgba(196,149,75,0.6)', transformOrigin: 'left center', marginBottom: '1.1rem' }}
      />

      {/* Ordinal eyebrow */}
      <p className="font-sans" style={{ fontSize: '0.5rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.45)', marginBottom: '0.85rem' }}>
        {num}
      </p>

      {/* Title */}
      <h2 className="font-serif" style={{ fontSize: 'clamp(1.25rem, 2.4vw, 1.75rem)', fontWeight: 600, fontStyle: 'italic', lineHeight: 1.1, letterSpacing: '-0.03em', color: 'var(--forest)', marginBottom: '0.85rem' }}>
        {title}
      </h2>

      {/* Body */}
      <p className="font-sans" style={{ fontSize: 'clamp(0.82rem, 1.1vw, 0.88rem)', lineHeight: 1.8, color: 'rgba(40,40,40,0.48)' }}>
        {body}
      </p>
    </motion.div>
  )
}

/* ─── Smooth scroll helper (sine ease-in-out) ────────────────────── */
function smoothScrollTo(el: HTMLElement, to: number, duration: number) {
  const start = el.scrollLeft
  const diff = to - start
  let startTime: number | null = null
  const ease = (t: number) => -(Math.cos(Math.PI * t) - 1) / 2
  const step = (ts: number) => {
    if (!startTime) startTime = ts
    const t = Math.min((ts - startTime) / duration, 1)
    el.scrollLeft = start + diff * ease(t)
    if (t < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

/* ─── Commitments carousel section ──────────────────────────────── */
function CommitmentsSection() {
  const [active, setActive] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Smooth-scroll to active card (eased)
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const card = el.children[active] as HTMLElement
    if (!card) return
    const pl = parseFloat(getComputedStyle(el).paddingLeft) || 0
    smoothScrollTo(el, card.offsetLeft - pl, 1800)
  }, [active])

  const goTo = (i: number) => setActive(Math.max(0, Math.min(PROMISES.length - 1, i)))

  return (
    <section style={{
      background: 'var(--cream)',
      borderRadius: '2rem',
      marginTop: '-2rem',
      paddingTop: 'clamp(3.5rem, 7vw, 5.5rem)',
      paddingBottom: 'clamp(2.5rem, 5vw, 4rem)',
      overflow: 'hidden',
      position: 'relative',
      zIndex: 2,
    }}>
      <style>{`.promise-scroll::-webkit-scrollbar { display: none; }`}</style>
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: 0, right: 0, width: '50%', height: '40%',
          background: 'radial-gradient(ellipse 80% 70% at 95% 5%, rgba(196,149,75,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="promise-scroll flex overflow-x-auto"
        style={{
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          paddingLeft: 'clamp(1.5rem, 7vw, 5rem)',
        }}
      >
        {PROMISES.map((p, i) => (
          <CommitmentSlide key={p.num} {...p} index={i} />
        ))}
        <div style={{ flexShrink: 0, width: 'clamp(1.5rem, 7vw, 5rem)' }} />
      </div>

      {/* Navigation — prev arrow · dots · next arrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.75rem', marginTop: '2.5rem' }}>
        {/* Left arrow — floats when at last card */}
        <button
          onClick={() => goTo(active - 1)}
          aria-label="Previous commitment"
          style={{ background: 'none', border: 'none', cursor: active === 0 ? 'default' : 'pointer', padding: '0.4rem', color: active === 0 ? 'rgba(42,74,48,0.14)' : 'rgba(42,74,48,0.40)', transition: 'color 0.3s ease' }}
        >
          <motion.div
            animate={active === PROMISES.length - 1 ? { x: [0, -5, 0] } : { x: 0 }}
            transition={active === PROMISES.length - 1 ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <path d="M6 1 L1 6 L6 11 M1 6 H15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </button>

        <div style={{ display: 'flex', gap: '0.55rem', alignItems: 'center' }}>
          {PROMISES.map((_, i) => (
            <button key={i} onClick={() => setActive(i)} aria-label={`Commitment ${i + 1}`} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}>
              <span style={{ display: 'block', width: active === i ? 20 : 6, height: 6, borderRadius: 3, background: active === i ? 'rgba(196,149,75,0.75)' : 'rgba(42,74,48,0.22)', transition: 'all 0.4s ease' }} />
            </button>
          ))}
        </div>

        {/* Right arrow — floats when at first card */}
        <button
          onClick={() => goTo(active + 1)}
          aria-label="Next commitment"
          style={{ background: 'none', border: 'none', cursor: active === PROMISES.length - 1 ? 'default' : 'pointer', padding: '0.4rem', color: active === PROMISES.length - 1 ? 'rgba(42,74,48,0.14)' : 'rgba(42,74,48,0.40)', transition: 'color 0.3s ease' }}
        >
          <motion.div
            animate={active === 0 ? { x: [0, 5, 0] } : { x: 0 }}
            transition={active === 0 ? { duration: 1.4, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
          >
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <path d="M10 1 L15 6 L10 11 M15 6 H1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </button>
      </div>
    </section>
  )
}

/* ─── Open Source ───────────────────────────────────────────────── */
function OpenSourceSection() {
  const ref = useRef<HTMLElement>(null)
  const [revealed, setRevealed] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [28, -28])

  return (
    <section ref={ref} style={{ background: 'var(--forest-dark)', borderRadius: '2rem 2rem 0 0', marginTop: '-2rem', padding: '5rem 0 6rem', position: 'relative', zIndex: 6, overflow: 'hidden' }}>
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"><StarField /></div>
      <TwinklingStars />
      <ShootingStars />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"><ForestSilhouette /></div>

      <motion.div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12 lg:px-20" style={{ y: contentY }}>

        {/* Eyebrow — top, with dark highlight so stars don't obscure */}
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <p className="font-sans uppercase" style={{
              display: 'inline-block',
              fontSize: '0.52rem',
              letterSpacing: '0.28em',
              color: 'rgba(196,149,75,0.75)',
              background: 'var(--forest-dark)',
              padding: '0.35rem 1rem',
              borderRadius: '3px',
            }}>
              Our commitment to open source
            </p>
          </div>
        </Reveal>

        {/* CC BY-SA — centered */}
        <Reveal>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '1rem', marginBottom: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(240,232,210,0.1)' }}>
            <div style={{ color: 'var(--amber)' }}>
              <FileText size={22} />
            </div>
            <div>
              <p className="font-sans font-semibold text-cream" style={{ fontSize: '0.9rem', letterSpacing: '0.02em', marginBottom: '0.6rem' }}>CC BY-SA 4.0</p>
              <p className="font-sans leading-relaxed" style={{ fontSize: '0.875rem', maxWidth: '52ch', color: 'rgba(240,232,210,0.5)' }}>
                Use, copy, modify, and distribute anything we publish &mdash; including commercially &mdash; as long as you credit Little Pines Studio and share modifications under the same license. A Waldorf school in Vermont and a parent in Nairobi have identical access. That is the point.
              </p>
            </div>
          </div>
        </Reveal>

        {/* Show me toggle */}
        {!revealed && (
          <Reveal>
            <div style={{ textAlign: 'center', marginTop: '0.5rem' }}>
              <button
                onClick={() => setRevealed(true)}
                className="font-sans transition-opacity hover:opacity-70"
                style={{
                  background: 'none',
                  border: '1px solid rgba(240,232,210,0.18)',
                  borderRadius: '4px',
                  padding: '0.6rem 1.75rem',
                  fontSize: '0.52rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,232,210,0.45)',
                  cursor: 'pointer',
                }}
              >
                show me
              </button>
            </div>
          </Reveal>
        )}

        {/* Revealed content */}
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.6, ease: 'easeInOut' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
                <div>
                  <h2 className="font-serif font-semibold text-cream" style={{ fontSize: 'clamp(1.3rem, 2vw, 1.65rem)', marginBottom: '1.5rem' }}>
                    What&rsquo;s published
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
                </div>

                <div>
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
                    className="inline-flex items-center gap-2.5 font-sans font-medium text-sm transition-opacity duration-200 hover:opacity-80"
                    style={{ background: 'rgba(240,232,210,0.1)', border: '1px solid rgba(240,232,210,0.2)', color: 'var(--cream)', padding: '0.75rem 1.5rem', borderRadius: '4px' }}
                  >
                    <Github size={15} />
                    Start on GitHub
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </motion.div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function PromisePage() {
  return (
    <>
      <PromiseHero />
      <CommitmentsSection />
      <OpenSourceSection />
    </>
  )
}
