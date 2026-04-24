'use client'

import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FileText, GitFork, MessageCircle, Github } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { StarField, ForestSilhouette, ShootingStars, TwinklingStars } from '@/app/_homepage-after'
import { PineBranch } from '@/components/illustrations/pine-branch'

/* ─── Data (kept intact) ────────────────────────────────────────── */
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
    title: "We don’t measure minutes.",
    body: "When a child is ready to stop, that’s good. Success looks like a child with more words for what they feel — and humans in their life who know them a little better.",
  },
  {
    num: '04',
    title: "The bear listens. It doesn’t lead.",
    body: "It won’t instruct, correct, or advise. It reflects and steps back. The work of raising a child belongs to the humans who love them.",
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
        paddingBottom: '10rem',
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

      {/* Concentric rings */}
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        {([560, 400, 270] as const).map((size, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: size, height: size,
            borderRadius: '50%',
            border: `1px solid rgba(196,149,75,${0.06 - i * 0.015})`,
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
          }} />
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

      <div className="relative z-10 px-6" style={{ maxWidth: 'min(780px, 90vw)' }}>

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

        {/* Amber rule draw-in */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ height: '1px', width: '3rem', background: 'rgba(196,149,75,0.5)', transformOrigin: 'left center', margin: '0 auto 2.5rem' }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.0 }}
          className="flex items-center justify-center gap-2.5"
          style={{ color: 'rgba(196,149,75,0.35)' }}
        >
          <div style={{ width: '24px', height: '1px', background: 'rgba(196,149,75,0.35)' }} />
          <span className="font-sans" style={{ fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase' }}>
            Read them
          </span>
          <div style={{ width: '24px', height: '1px', background: 'rgba(196,149,75,0.35)' }} />
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Commitment block ──────────────────────────────────────────── */
function CommitmentItem({ num, title, body, index }: { num: string; title: string; body: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.18 })

  return (
    <div
      ref={ref}
      className="relative"
      style={{
        borderBottom: index < 5 ? '1px solid rgba(42,74,48,0.07)' : 'none',
        paddingTop: 'clamp(3.5rem, 6vw, 5rem)',
        paddingBottom: 'clamp(3.5rem, 6vw, 5rem)',
        overflow: 'hidden',
      }}
    >
      {/* Ghost ordinal */}
      <span
        className="absolute pointer-events-none select-none font-serif font-black"
        aria-hidden="true"
        style={{
          fontSize: 'clamp(7rem, 18vw, 14rem)',
          lineHeight: 1,
          letterSpacing: '-0.06em',
          color: 'rgba(42,74,48,0.04)',
          top: '50%',
          right: '-0.5%',
          transform: 'translateY(-50%)',
        }}
      >
        {num}
      </span>

      {/* Amber rule draw-in */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, delay: 0.05, ease: [0.19, 1, 0.22, 1] }}
        style={{
          height: '1.5px',
          width: 'clamp(2rem, 5vw, 3rem)',
          background: 'rgba(196,149,75,0.6)',
          transformOrigin: 'left center',
          marginBottom: '1.5rem',
        }}
      />

      {/* Eyebrow ordinal */}
      <motion.p
        className="font-sans"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.1 }}
        style={{ fontSize: '0.5rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.45)', marginBottom: '1.25rem' }}
      >
        {num}
      </motion.p>

      {/* Title */}
      <motion.h2
        className="font-serif"
        initial={{ opacity: 0, y: 12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.19, 1, 0.22, 1] }}
        style={{
          fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
          fontWeight: 600,
          fontStyle: 'italic',
          lineHeight: 1.08,
          letterSpacing: '-0.035em',
          color: 'var(--forest)',
          marginBottom: '1.5rem',
          maxWidth: '20ch',
        }}
      >
        {title}
      </motion.h2>

      {/* Body */}
      <motion.p
        className="font-sans"
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.19, 1, 0.22, 1] }}
        style={{
          fontSize: 'clamp(0.9rem, 1.4vw, 1.0rem)',
          lineHeight: 1.85,
          color: 'rgba(40,40,40,0.50)',
          maxWidth: '52ch',
        }}
      >
        {body}
      </motion.p>
    </div>
  )
}

/* ─── CTA Bridge ────────────────────────────────────────────────── */
function CtaBridge() {
  return (
    <section
      style={{
        background: 'var(--forest-dark)',
        borderRadius: '2rem 2rem 0 0',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 3,
        overflow: 'hidden',
        padding: 'clamp(4.5rem, 9vw, 8rem) 1.5rem',
        textAlign: 'center',
      }}
    >
      <div className="absolute inset-0 bg-grain opacity-45 pointer-events-none" aria-hidden="true" />

      <div className="absolute inset-x-0 pointer-events-none" aria-hidden="true" style={{
        top: '10%', height: '80%',
        background: 'radial-gradient(ellipse at 50% 50%, rgba(196,149,75,0.08) 0%, transparent 62%)',
      }} />

      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        {HERO_STARS.slice(0, 20).map(([x, y, r], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r * 0.85} fill="rgba(244,239,226,1)" opacity={0.07 + (i % 5) * 0.035} />
        ))}
      </svg>

      <div className="relative z-10" style={{ maxWidth: 'min(580px, 90vw)', marginInline: 'auto' }}>
        <Reveal>
          <p className="font-sans uppercase" style={{ fontSize: '0.52rem', letterSpacing: '0.26em', color: 'rgba(196,149,75,0.38)', marginBottom: '2.5rem' }}>
            Early access
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div style={{ marginBottom: '2.75rem' }}>
            <span className="font-serif block" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', fontWeight: 300, lineHeight: 1.05, letterSpacing: '-0.04em', color: 'rgba(244,239,226,0.65)' }}>
              Hold a place
            </span>
            <span className="font-serif block" style={{ fontSize: 'clamp(2.6rem, 6vw, 4.8rem)', fontWeight: 700, fontStyle: 'italic', lineHeight: 1.05, letterSpacing: '-0.04em', color: 'var(--cream)' }}>
              for your child.
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.16}>
          <a
            href="/#notify"
            className="inline-flex items-center gap-2.5 font-sans font-medium transition-opacity hover:opacity-85"
            style={{
              background: 'rgba(196,149,75,0.88)',
              color: '#1D2E20',
              padding: '0.9rem 2.25rem',
              borderRadius: '4px',
              fontSize: '0.82rem',
              letterSpacing: '0.04em',
            }}
          >
            Reserve early access
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* ─── Open Source ───────────────────────────────────────────────── */
function OpenSourceSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [28, -28])

  return (
    <section ref={ref} style={{ background: 'var(--forest-dark)', padding: '5rem 0 6rem', position: 'relative', zIndex: 6, overflow: 'hidden' }}>
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"><StarField /></div>
      <TwinklingStars />
      <ShootingStars />
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"><ForestSilhouette /></div>

      <motion.div className="relative z-10 mx-auto max-w-6xl px-6 md:px-12 lg:px-20" style={{ y: contentY }}>

        <Reveal>
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', marginBottom: '3.5rem', paddingBottom: '3.5rem', borderBottom: '1px solid rgba(240,232,210,0.1)' }}>
            <div style={{ color: 'var(--amber)', flexShrink: 0, marginTop: '0.1rem' }}>
              <FileText size={22} />
            </div>
            <div>
              <p className="font-sans font-semibold text-cream" style={{ fontSize: '0.9rem', letterSpacing: '0.02em', marginBottom: '0.6rem' }}>CC BY-SA 4.0</p>
              <p className="font-sans leading-relaxed" style={{ fontSize: '0.875rem', maxWidth: '64ch', color: 'rgba(240,232,210,0.5)' }}>
                Use, copy, modify, and distribute anything we publish &mdash; including commercially &mdash; as long as you credit Little Pines Studio and share modifications under the same license. A Waldorf school in Vermont and a parent in Nairobi have identical access. That is the point.
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
              className="inline-flex items-center gap-2.5 font-sans font-medium text-sm transition-opacity duration-200 hover:opacity-80"
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

      <section style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}>
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: 0, right: 0, width: '50%', height: '40%',
            background: 'radial-gradient(ellipse 80% 70% at 95% 5%, rgba(196,149,75,0.05) 0%, transparent 70%)',
          }}
        />
        <div style={{ maxWidth: '760px', marginInline: 'auto', padding: '0 clamp(1.5rem, 5vw, 3rem)' }}>
          {PROMISES.map((p, i) => (
            <CommitmentItem key={p.num} {...p} index={i} />
          ))}
        </div>
      </section>

      <CtaBridge />
      <OpenSourceSection />
    </>
  )
}
