'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { EmailCapture } from '@/components/email-capture'
import { PineBranch } from '@/components/illustrations/pine-branch'

const Globe = dynamic(() => import('@/components/globe').then(m => ({ default: m.Globe })), { ssr: false })

/* ── Constants ───────────────────────────────────────────────── */
const CONCEPT_PAPER_URL = 'https://drive.google.com/file/d/1-WiaTL6BBVJkqct1ArMjt0H0gR_CCj6e/view?usp=drive_link'

/* ── Shared helpers ───────────────────────────────────────────── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

type Needle = { x: number; delay: number; duration: number; angle: number; len: number }

function PineNeedles({ color = 'var(--sage-light)' }: { color?: string }) {
  const [needles, setNeedles] = useState<Needle[]>([])
  useEffect(() => {
    setNeedles(
      Array.from({ length: 16 }, (_, i) => ({
        x: Math.abs(Math.sin(i * 6.3 + 1.1)) * 100,
        delay: Math.abs(Math.sin(i * 4.7 + 2.3)) * 18,
        duration: 14 + Math.abs(Math.sin(i * 9.1 + 0.7)) * 10,
        angle: -55 + Math.abs(Math.sin(i * 3.2 + 1.4)) * 110,
        len: 8 + Math.abs(Math.sin(i * 11.7 + 0.5)) * 14,
      }))
    )
  }, [])
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {needles.map((n, i) => (
        <div
          key={i}
          className="absolute top-0"
          style={{
            left: `${n.x}%`,
            animation: `needle-drift ${n.duration}s ${n.delay}s linear infinite`,
            ['--r' as string]: `${n.angle}deg`,
          }}
        >
          <svg width={n.len} height="2" style={{ opacity: 0.28 }}>
            <line x1="0" y1="1" x2={n.len} y2="1" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </div>
      ))}
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 1 — HERO / THESIS
══════════════════════════════════════════════════════════════════ */
const AFTER_HERO_CSS = `
  @keyframes after-globe-glow {
    0%, 100% { opacity: 0.45; transform: scale(1); }
    50%       { opacity: 0.75; transform: scale(1.03); }
  }
  @keyframes scroll-dot {
    0%, 100% { transform: translateY(0); opacity: 0.7; }
    50%       { transform: translateY(11px); opacity: 0.1; }
  }
  .after-globe-wrap {
    position: relative;
    width: min(88vw, 480px);
    margin-bottom: 0;
  }
  @media (min-width: 1024px) {
    .after-globe-wrap {
      width: min(52vw, 640px);
      margin-bottom: -180px;
    }
  }
`

const AFTER_QUOTES = [
  {
    city: 'San Francisco, CA',
    quote: `A friend that never speaks first, that waits for the child — that is the deepest kind of respect.`,
    attr: 'K.L. — Montessori educator, 18 years',
  },
  {
    city: 'Boston, MA',
    quote: `The link between emotional vocabulary and self-regulation is one of the most replicated findings we have.`,
    attr: 'Dr. A.T. — Developmental psychologist',
  },
  {
    city: 'Amsterdam',
    quote: `Waldorf has always known that imagination is not a luxury — it is a developmental necessity.`,
    attr: 'H.B. — Waldorf class teacher',
  },
  {
    city: 'New York, NY',
    quote: `It takes real courage to build something whose entire purpose is to give that attention back.`,
    attr: "R.K. — Head of children's content",
  },
  {
    city: 'Copenhagen',
    quote: `The evidence on emotional vocabulary in early childhood is clear. The question is whether a product respects it.`,
    attr: 'S.P. — Pediatric therapist',
  },
]

function AfterQuoteOverlay({ idx, visible }: { idx: number; visible: boolean }) {
  const q = AFTER_QUOTES[idx]
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      paddingInline: '14%',
      pointerEvents: 'none',
    }}>
      <div style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        textAlign: 'center',
        background: 'rgba(235,232,224,0.74)',
        borderRadius: '10px',
        padding: '0.85rem 1.1rem',
      }}>
        <div className="font-sans" style={{
          fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--forest)', fontWeight: 600, marginBottom: '0.45rem',
        }}>
          {q.city}
        </div>
        <p className="font-serif" style={{
          fontStyle: 'italic', fontWeight: 600,
          fontSize: 'clamp(0.85rem, 2.5vw, 1.05rem)',
          lineHeight: 1.48, color: '#1A1A1A',
          margin: '0 auto 0.4rem', maxWidth: '22ch',
        }}>
          &ldquo;{q.quote}&rdquo;
        </p>
        <div className="font-sans" style={{
          fontSize: '0.7rem', letterSpacing: '0.02em',
          color: '#3A3A3A', fontWeight: 400,
        }}>
          {q.attr}
        </div>
        <div style={{ display: 'flex', gap: '0.35rem', alignItems: 'center', justifyContent: 'center', marginTop: '0.5rem' }}>
          {AFTER_QUOTES.map((_, i) => (
            <div key={i} style={{
              width: '5px', height: '5px', borderRadius: '50%',
              background: i === idx ? 'rgba(44,74,62,0.65)' : 'transparent',
              border: `1.5px solid ${i === idx ? 'rgba(44,74,62,0.65)' : 'rgba(44,74,62,0.30)'}`,
              transition: 'background 0.4s ease, border-color 0.4s ease',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ── Constellation canvas — Ursa Minor + Corona Borealis, mouse-parallax ──
   Identical draw logic to the before-hero; mask constrained to top ~33% only. ── */
/* Static SVG star field — replaces canvas rAF loop. Coordinates from original data (xf×100%). */
const HERO_STARS_BG: [number, number, number, number][] = [
  [2,3,0.6,0.08],[9,7,1.0,0.18],[18,2,0.8,0.14],[26,11,0.6,0.10],
  [35,5,1.1,0.20],[43,1,0.9,0.16],[52,8,0.7,0.12],[61,4,1.0,0.18],
  [69,10,0.8,0.14],[77,2,1.3,0.22],[84,7,0.6,0.10],[91,3,1.0,0.16],
  [96,14,0.7,0.12],[13,18,0.8,0.14],[22,22,0.6,0.09],[31,15,1.0,0.17],
  [40,20,0.7,0.11],[49,16,0.9,0.15],[57,24,0.6,0.09],[66,19,1.1,0.19],
  [74,26,0.7,0.12],[82,21,0.8,0.14],[89,28,0.6,0.09],[5,28,0.9,0.13],
  [15,32,0.7,0.10],[28,29,1.0,0.16],[42,34,0.6,0.08],[56,31,0.8,0.12],
  [71,35,0.7,0.10],[85,33,1.0,0.15],
]
const HERO_UMI: [number, number, number, number][] = [
  [76.2,8.2,3.2,0.90],[69.8,16.2,1.9,0.60],[62.8,23.0,1.7,0.54],
  [55.8,19.2,1.9,0.58],[51.2,26.8,1.6,0.50],[47.0,21.0,2.4,0.74],[52.2,14.0,2.1,0.66],
]
const HERO_UMI_L = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,3]]
const HERO_COR: [number, number, number, number][] = [
  [17.2,30.8,1.4,0.42],[19.0,22.8,1.8,0.55],[22.0,16.8,2.7,0.84],
  [26.8,14.8,1.8,0.57],[31.4,16.6,1.7,0.52],[34.4,22.0,1.5,0.46],[35.2,29.8,1.4,0.40],
]
const HERO_COR_L = [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6]]
const HERO_ACC: [number, number, number, number][] = [
  [10.5,6.8,2.2,0.50],[43.0,4.2,2.6,0.60],[61.0,3.8,1.9,0.42],
  [88.2,11.8,2.0,0.45],[14.8,14.0,1.8,0.38],[72.0,5.5,2.1,0.48],
  [78.0,18.0,1.6,0.34],[31.0,8.0,1.7,0.40],[48.8,2.2,2.3,0.52],
]
const HERO_SHOOT_CSS = `@keyframes hero-shoot{0%,88%{opacity:0;stroke-dashoffset:220}91%{opacity:.8;stroke-dashoffset:110}94%{opacity:.5;stroke-dashoffset:0}97%,100%{opacity:0;stroke-dashoffset:-20}}`

function AfterHeroConstellations() {
  return (
    <>
      <style>{HERO_SHOOT_CSS}</style>
      <svg
        aria-hidden="true"
        style={{
          position:'absolute',top:0,left:0,width:'100%',height:'100%',
          pointerEvents:'none',zIndex:2,
          maskImage:'linear-gradient(to bottom,rgba(0,0,0,.92) 0%,rgba(0,0,0,.82) 18%,rgba(0,0,0,.28) 30%,transparent 40%)',
          WebkitMaskImage:'linear-gradient(to bottom,rgba(0,0,0,.92) 0%,rgba(0,0,0,.82) 18%,rgba(0,0,0,.28) 30%,transparent 40%)',
        }}
      >
        {HERO_STARS_BG.map(([x,y,r,op],i) => <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="rgba(244,239,226,1)" opacity={op}/>)}
        {HERO_COR_L.map(([a,b],i) => <line key={i} x1={`${HERO_COR[a][0]}%`} y1={`${HERO_COR[a][1]}%`} x2={`${HERO_COR[b][0]}%`} y2={`${HERO_COR[b][1]}%`} stroke="rgba(244,224,188,.15)" strokeWidth=".6"/>)}
        {HERO_COR.map(([x,y,r,op],i) => <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill={i===2?'rgba(255,242,198,1)':'rgba(215,232,255,1)'} opacity={op}/>)}
        {HERO_UMI_L.map(([a,b],i) => <line key={i} x1={`${HERO_UMI[a][0]}%`} y1={`${HERO_UMI[a][1]}%`} x2={`${HERO_UMI[b][0]}%`} y2={`${HERO_UMI[b][1]}%`} stroke="rgba(200,222,250,.2)" strokeWidth=".9"/>)}
        {HERO_UMI.map(([x,y,r,op],i) => <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill={i===0?'rgba(240,246,255,1)':i===5?'rgba(255,228,195,1)':'rgba(208,228,255,1)'} opacity={op}/>)}
        {HERO_ACC.map(([x,y,r,op],i) => <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="rgba(244,239,226,1)" opacity={op}/>)}
        <line x1="8%" y1="36%" x2="30%" y2="16%" stroke="rgba(200,215,255,.65)" strokeWidth=".6" strokeLinecap="round" strokeDasharray="110" strokeDashoffset="110" style={{animation:'hero-shoot 14s ease-in-out 3s infinite'}}/>
      </svg>
    </>
  )
}

export function AfterHero() {
  const [quoteIdx, setQuoteIdx] = useState(0)
  const [quoteVisible, setQuoteVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)')
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] })

  // Hero left text — fades out early
  const heroOpacity = useTransform(scrollYProgress, [0, 0.20], [1, 0])
  const heroY       = useTransform(scrollYProgress, [0, 0.20], [0, -48])

  // Globe — grows and drifts toward center (sprung for smooth motion)
  const rawGlobeScale = useTransform(scrollYProgress, [0, 0.60], [1, 1.72])
  const rawGlobeX     = useTransform(scrollYProgress, [0, 0.58], [0, -180])
  const rawGlobeY     = useTransform(scrollYProgress, [0, 0.60], [-40, -75])
  const globeScale    = useSpring(rawGlobeScale, { stiffness: 60, damping: 22, restDelta: 0.001 })
  const globeX        = useSpring(rawGlobeX,     { stiffness: 60, damping: 22, restDelta: 0.001 })
  const globeY        = useSpring(rawGlobeY,      { stiffness: 60, damping: 22, restDelta: 0.001 })

  // Inner quote carousel — fades out as globe expands
  const innerQuoteOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0])

  // No overlay — globe stays fully visible, quote uses dark text instead
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0])

  // Mobile top crop — fades in after hero text is gone so it never covers eyebrow
  const mobileCropTopOpacity = useTransform(scrollYProgress, [0.15, 0.28], [0, 1])
  // CTA button fades slower — lingers until globe is near max enlarged size
  const ctaOpacity = useTransform(scrollYProgress, [0.35, 0.62], [1, 0])
  // Bottom globe fade — scroll-activated, invisible at rest
  const globeBottomFadeOpacity = useTransform(scrollYProgress, [0.50, 0.90], [0, 1])

  // Full-bleed quote — fades in over the giant globe, stays at full opacity
  const quoteOpacity = useTransform(scrollYProgress, [0.35, 0.52], [0, 1])
  const quoteY       = useTransform(scrollYProgress, [0.35, 0.52], [36, 0])

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | null = null
    const interval = setInterval(() => {
      setQuoteVisible(false)
      timeout = setTimeout(() => {
        setQuoteIdx(i => (i + 1) % AFTER_QUOTES.length)
        setQuoteVisible(true)
      }, 450)
    }, 5500)
    return () => { clearInterval(interval); if (timeout) clearTimeout(timeout) }
  }, [])

  return (
    <div ref={containerRef} style={{ height: '200vh', position: 'relative', zIndex: 1 }}>
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: '100vh', background: 'var(--forest-dark)' }}
      >
        <style>{AFTER_HERO_CSS}</style>

        {/* Background grain — full bleed */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0 bg-grain opacity-50" />
        </div>

        {/* Constellations — bottom half on mobile (near globe), full bleed on desktop */}
        <div className="absolute inset-x-0 bottom-0 top-1/2 lg:inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <AfterHeroConstellations />
        </div>

        {/* Dark overlay — sits above globe (z:15) so quote is readable */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ opacity: overlayOpacity, background: 'rgba(18,34,22,0.92)', zIndex: 15 }}
          aria-hidden="true"
        />

        {/* Mobile crop fades — hide green gap at top and globe overflow at bottom (z:18, above dark overlay, below quote z:20) */}
        <motion.div className="absolute inset-x-0 top-0 pointer-events-none lg:hidden" aria-hidden="true"
          style={{ height: '30%', background: 'linear-gradient(to bottom, var(--forest-dark) 45%, transparent 100%)', zIndex: 18, opacity: mobileCropTopOpacity }} />
        <motion.div className="absolute inset-x-0 bottom-0 pointer-events-none" aria-hidden="true"
          style={{ height: '24%', background: 'linear-gradient(to top, var(--forest-dark) 45%, transparent 100%)', zIndex: 18, opacity: globeBottomFadeOpacity }} />

        {/* Amber twilight bottom */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none" aria-hidden="true"
          style={{ height: '140px', background: 'linear-gradient(to top, rgba(196,149,75,0.09) 0%, transparent 100%)' }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none" aria-hidden="true"
          style={{ width: '55%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(196,149,75,0.22), transparent)', boxShadow: '0 0 28px 6px rgba(196,149,75,0.07)' }} />

        {/* Grid layout */}
        <div className="relative z-10 w-full h-full flex items-center">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start lg:items-center pt-24 lg:pt-0" style={{ minHeight: '100vh' }}>

              {/* Left column — title/desc fade fast; CTA lingers */}
              <div className="flex flex-col justify-center items-center lg:items-start lg:py-32">
                <motion.div style={{ opacity: heroOpacity, y: heroY }}>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                    className="font-sans text-[0.64rem] tracking-[0.2em] uppercase text-sage-light/55 mb-7 text-center lg:text-left"
                  >
                    For ages 3–7<br className="lg:hidden" />
                    <span className="hidden lg:inline">&nbsp;·&nbsp;</span>Shipping holiday 2027
                  </motion.p>

                  <motion.h1
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.9, ease: [0.19, 1, 0.22, 1] }}
                    className="font-serif font-semibold text-cream leading-[1.04] tracking-tight mb-9 text-center lg:text-left"
                    style={{ fontSize: 'clamp(3rem, 5.5vw, 5rem)' }}
                  >
                    <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
                      <em style={{ color: 'var(--amber-light)', fontStyle: 'inherit' }}>Big feelings</em>
                      <svg aria-hidden="true" viewBox="0 0 100 7" preserveAspectRatio="none"
                        style={{ position: 'absolute', left: '2%', bottom: '-5px', width: '96%', height: '7px', pointerEvents: 'none' }}>
                        <path d="M0,5 C8,1.5 16,6 25,3.5 C34,1 43,6 52,3.5 C61,1 70,6 79,3.5 C88,1 95,5.5 100,4"
                          fill="none" stroke="var(--amber-light)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
                      </svg>
                    </span>
                    {' '}are{' '}<br className="hidden lg:inline" />hard to hold{' '}<br className="hidden lg:inline" />alone.
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.44, duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                    className="font-sans text-sm leading-relaxed text-cream/45 text-center lg:text-left mx-auto lg:mx-0"
                    style={{ maxWidth: '38ch' }}
                  >
                    We are an open-source toy studio that helps kids ages 3–7 notice and name what they feel. Designed in partnership with child psychologists, Montessori educators, and the parents who love them dearly.
                  </motion.p>
                </motion.div>

                {/* CTA — separate fade, lingers until globe near max */}
                <motion.div
                  style={{ opacity: ctaOpacity, y: heroY, marginTop: '2.5rem' }}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.54, duration: 0.7, ease: [0.19, 1, 0.22, 1] }}
                  className="flex flex-col sm:flex-row gap-5 sm:gap-8 items-center lg:items-start"
                >
                  <a
                    href="#why-we-exist"
                    className="font-sans text-sm text-cream/80 hover:text-cream transition-all duration-200 flex items-center gap-2.5 px-5 py-2 border border-cream/40 hover:border-cream/70 rounded-sm"
                  >
                    Read the concept brief{' '}
                    <motion.span
                      aria-hidden="true"
                      style={{ display: 'inline-block', fontSize: '1rem', lineHeight: 1 }}
                      animate={{ y: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
                    >
                      ↓
                    </motion.span>
                  </a>
                </motion.div>
              </div>

              {/* Right column — globe grows + drifts to center */}
              <motion.div
                className="flex items-center justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.45, duration: 1.3, ease: [0.19, 1, 0.22, 1] }}
              >
                <motion.div style={{ y: globeY, scale: globeScale, x: isMobile ? 0 : globeX }}>
                  <div className="after-globe-wrap">
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute', inset: '-8%', borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(44,74,62,0.07) 0%, transparent 65%)',
                        animation: 'after-globe-glow 7s ease-in-out infinite',
                        pointerEvents: 'none', zIndex: 0,
                      }}
                    />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <Globe />
                      <motion.div style={{ opacity: innerQuoteOpacity }}>
                        <AfterQuoteOverlay idx={quoteIdx} visible={quoteVisible} />
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </div>

        {/* Full-bleed quote — emerges over the giant globe */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-8"
          style={{ opacity: quoteOpacity }}
          aria-hidden="true"
        >
          <motion.p
            className="font-serif italic text-center"
            style={{
              y: quoteY,
              color: 'var(--forest)',
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: 1.22,
              letterSpacing: '-0.015em',
              maxWidth: '22ch',
            }}
          >
            <span style={{
              backgroundColor: 'var(--cream)',
              WebkitBoxDecorationBreak: 'clone',
              boxDecorationBreak: 'clone',
              padding: '0.08em 0.35em',
            }}>&ldquo;There is a child somewhere right now, trying to find the word for what they feel.&rdquo;</span>
          </motion.p>
        </motion.div>

      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 2 — METHOD / THREE COMMITMENTS (scroll theater)
══════════════════════════════════════════════════════════════════ */

/* ─── SVG line-art icons ─── */
function BearPawIcon({ active, size = 68 }: { active: boolean; size?: number }) {
  const s = { strokeWidth: 1.4, stroke: 'var(--forest)', fill: 'none', strokeLinecap: 'round' as const }
  const t = (delay: number) => ({ duration: 0.75, delay, ease: 'easeOut' as const })
  return (
    <svg viewBox="0 0 80 80" width={size} height={size}>
      <motion.circle cx="40" cy="54" r="20" {...s}
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={t(0)} />
      {[{ cx:26,cy:32,r:5.5 },{ cx:38,cy:26,r:5.5 },{ cx:52,cy:26,r:5.5 },{ cx:64,cy:32,r:4.5 }].map((c, i) => (
        <motion.circle key={i} cx={c.cx} cy={c.cy} r={c.r} {...s}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.7 : 0 }}
          transition={t(0.22 + i * 0.1)} />
      ))}
    </svg>
  )
}

function ChipIcon({ active, size = 68 }: { active: boolean; size?: number }) {
  const s = { strokeWidth: 1.4, stroke: 'var(--forest)', fill: 'none', strokeLinecap: 'round' as const }
  const t = (delay: number) => ({ duration: 0.6, delay, ease: 'easeOut' as const })
  return (
    <svg viewBox="0 0 80 80" width={size} height={size}>
      <motion.rect x="20" y="20" width="40" height="40" rx="5" {...s}
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
        transition={t(0)} />
      {[28, 40, 52].map((x, i) => [
        <motion.line key={`t${i}`} x1={x} y1={20} x2={x} y2={12} {...s} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.5 : 0 }} transition={t(0.35 + i * 0.06)} />,
        <motion.line key={`b${i}`} x1={x} y1={60} x2={x} y2={68} {...s} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.5 : 0 }} transition={t(0.44 + i * 0.06)} />,
      ])}
      {[30, 40, 52].map((y, i) => [
        <motion.line key={`l${i}`} x1={20} y1={y} x2={12} y2={y} {...s} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.5 : 0 }} transition={t(0.53 + i * 0.06)} />,
        <motion.line key={`r${i}`} x1={60} y1={y} x2={68} y2={y} {...s} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.5 : 0 }} transition={t(0.62 + i * 0.06)} />,
      ])}
      <motion.path d="M40 30 L47 52 H33 Z" {...{ ...s, strokeLinejoin: 'round' as const }}
        initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.85 : 0 }}
        transition={t(0.22)} />
    </svg>
  )
}

function NetworkIcon({ active, size = 68 }: { active: boolean; size?: number }) {
  const s = { strokeWidth: 1.4, stroke: 'var(--forest)', fill: 'none', strokeLinecap: 'round' as const }
  const t = (delay: number) => ({ duration: 0.65, delay, ease: 'easeOut' as const })
  return (
    <svg viewBox="0 0 80 80" width={size} height={size}>
      {[{ cx:40,cy:18 },{ cx:16,cy:62 },{ cx:64,cy:62 }].map((c, i) => (
        <motion.circle key={i} cx={c.cx} cy={c.cy} r={7} {...s}
          initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 1 : 0 }}
          transition={t(i * 0.14)} />
      ))}
      <motion.line x1="35" y1="24" x2="21" y2="56" {...s} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.65 : 0 }} transition={t(0.38)} />
      <motion.line x1="45" y1="24" x2="59" y2="56" {...s} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.65 : 0 }} transition={t(0.48)} />
      <motion.line x1="23" y1="62" x2="57" y2="62" {...s} initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: active ? 1 : 0, opacity: active ? 0.65 : 0 }} transition={t(0.58)} />
    </svg>
  )
}

const METHOD_PANELS = [
  {
    num: '01',
    title: 'Screen-free.',
    body: "A physical plush in the child's room. No screen, no camera, ever. The child initiates every interaction by squeezing the paw.",
    Icon: BearPawIcon,
  },
  {
    num: '02',
    title: 'On-device.',
    body: 'A frontier small model runs entirely inside the plush. Voice data never leaves the toy. Hardware switches cut the microphone and WiFi at the circuit level.',
    Icon: ChipIcon,
  },
  {
    num: '03',
    title: 'Open-source.',
    body: 'Sewing patterns, session guides, model fine-tuning, safety protocols. Published as we build. A parent, a school, another studio — anyone can adapt what we make.',
    Icon: NetworkIcon,
  },
]

type IconComp = (p: { active: boolean; size?: number }) => React.ReactElement

function MethodCard({ num, title, body, Icon, delay }: {
  num: string; title: string; body: string; Icon: IconComp; delay: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.3 })
  const [hovered, setHovered] = React.useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.19, 1, 0.22, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(42,74,48,0.04)' : 'transparent',
        borderTop: '1px solid rgba(42,74,48,0.12)',
        transition: 'background 0.4s ease',
      }}
      className="flex-1 min-w-0 px-8 py-10 cursor-default"
    >
      {/* Icon */}
      <div className="mb-6">
        <Icon active={inView || hovered} size={48} />
      </div>

      {/* Eyebrow */}
      <p className="font-sans text-[0.52rem] tracking-[0.24em] uppercase text-amber mb-3">{num}</p>

      {/* Title */}
      <h3
        className="font-serif font-semibold text-forest mb-1"
        style={{ fontSize: 'clamp(1.35rem, 1.8vw, 1.6rem)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
      >
        {title}
      </h3>

      {/* Animated amber rule */}
      <div className="overflow-hidden mb-4" style={{ height: '1px' }}>
        <motion.div
          animate={{ width: hovered ? '3rem' : '1.5rem' }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          style={{ height: '1px', background: 'var(--amber)', opacity: 0.7 }}
        />
      </div>

      {/* Body */}
      <p
        className="font-sans text-charcoal/50 leading-relaxed"
        style={{ fontSize: '0.875rem', lineHeight: 1.78 }}
      >
        {body}
      </p>
    </motion.div>
  )
}

export function MethodSection({
  hideCta = false,
  footer,
}: {
  hideCta?: boolean
  footer?: React.ReactNode
} = {}) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const headerY = useTransform(scrollYProgress, [0, 1], [24, -24])
  const cardsY  = useTransform(scrollYProgress, [0, 1], [48, -12])

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ background: 'var(--cream-dark)', position: 'relative', zIndex: 3, borderRadius: '2rem 2rem 0 0', marginTop: '-2rem' }}>
      <div className={`mx-auto max-w-7xl px-6 md:px-12 lg:px-20 pt-14 md:pt-16 ${footer ? 'pb-10 md:pb-12' : hideCta ? 'pb-10 md:pb-12' : 'pb-24 md:pb-32'}`}>

        {/* Header */}
        <motion.div style={{ y: headerY }}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <Reveal>
              <div>
                <p className="font-sans text-[0.58rem] tracking-[0.22em] uppercase text-forest/35 mb-2">The Little Pines Promise</p>
                <h2
                  className="font-serif font-semibold text-forest leading-tight"
                  style={{ fontSize: 'clamp(1.5rem, 3vw, 2.4rem)', letterSpacing: '-0.025em' }}
                >
                  The decisions that constrain<br className="hidden lg:inline" /> everything we build.
                </h2>
              </div>
            </Reveal>
            {!hideCta && (
              <Reveal delay={0.15}>
                <Link
                  href="/promise"
                  className="font-sans text-xs text-amber hover:text-amber-light transition-colors inline-flex items-center gap-1.5 shrink-0"
                >
                  The full promise <ArrowRight className="w-3 h-3" />
                </Link>
              </Reveal>
            )}
          </div>
        </motion.div>

        {/* Cards — contained insert block */}
        <motion.div style={{ y: cardsY }}>
          <div style={{ background: 'var(--cream)', border: '1px solid rgba(42,74,48,0.09)', borderRadius: '0.75rem', overflow: 'hidden', boxShadow: '0 2px 24px -4px rgba(42,74,48,0.07)' }}>
            <div className="flex flex-col md:flex-row md:divide-x divide-forest/8">
              {METHOD_PANELS.map(({ num, title, body, Icon }, i) => (
                <MethodCard
                  key={num}
                  num={num}
                  title={title}
                  body={body}
                  Icon={Icon}
                  delay={0.1 + 0.12 * i}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Optional footer slot — used by the promise page for the click-to-reveal button */}
        {footer && (
          <div className="mt-14 md:mt-16 flex justify-center pb-8 md:pb-10">
            {footer}
          </div>
        )}

      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 3 — IN THE STUDIO
══════════════════════════════════════════════════════════════════ */
const WORKSHOP_ENTRIES = [
  {
    date: 'Apr 2026',
    title: 'The four session types, v1.',
    description:
      'The curriculum architecture: daily check-in, big feelings, curiosity, wind-down. Drafted with the pedagogy team. The bear is asleep by default.',
  },
  {
    date: 'May 2026',
    title: 'What the product owes the child.',
    description:
      'An essay on whose memory is it, what the parent can see, and why we are starting from the minimum.',
  },
  {
    date: 'Jun 2026',
    title: 'The disclosure protocol, draft one.',
    description:
      'What the plush does when a child discloses something serious, and the mandated-reporter framework behind it.',
  },
  {
    date: 'Jul 2026',
    title: 'The efficacy study, pre-registered.',
    description:
      'A two-arm RCT with 120 families over 12 weeks, co-designed with a leading child-development research lab.',
  },
]

export function WorkshopSection() {
  return (
    <section style={{ background: 'var(--forest-dark)', borderRadius: '2.5rem 2.5rem 0 0', marginTop: '-2rem', position: 'relative', zIndex: 5 }} className="overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col lg:flex-row lg:items-stretch" style={{ minHeight: 'clamp(520px, 60vh, 680px)' }}>

          {/* ── Photo column ── */}
          <div className="relative lg:w-[42%] shrink-0 overflow-hidden" style={{ minHeight: '380px' }}>
            <Image
              src="/photos/brainstorm.jpg"
              alt="Little Pines team brainstorming in the studio"
              fill
              className="object-cover"
              style={{ filter: 'saturate(0.72) brightness(0.82)' }}
            />
            {/* Right-edge fade into section bg on desktop */}
            <div
              className="hidden lg:block absolute inset-y-0 right-0 pointer-events-none"
              style={{ width: '80px', background: 'linear-gradient(to right, transparent, var(--forest-dark))' }}
            />
            {/* Bottom fade on mobile */}
            <div
              className="lg:hidden absolute inset-x-0 bottom-0 pointer-events-none"
              style={{ height: '80px', background: 'linear-gradient(to bottom, transparent, var(--forest-dark))' }}
            />
          </div>

          {/* ── Entries column ── */}
          <div className="flex-1 px-6 md:px-12 lg:pl-16 lg:pr-20 py-16 lg:py-20 flex flex-col justify-center">

            {/* Header */}
            <Reveal>
              <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-cream/30 mb-2">
                In the studio
              </p>
              <h2
                className="font-serif font-semibold text-cream leading-tight mb-1"
                style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)', letterSpacing: '-0.025em' }}
              >
                What we&rsquo;re working on right now.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-sans text-xs text-cream/35 leading-relaxed mb-10" style={{ maxWidth: '38ch' }}>
                Building toward a target retail debut in holiday 2027. This is the work between now and then.
              </p>
            </Reveal>

            {/* Entry rows */}
            <div>
              {WORKSHOP_ENTRIES.map(({ date, title, description }, i) => (
                <Reveal key={date} delay={0.1 + 0.07 * i}>
                  <WorkshopRow date={date} title={title} description={description} index={i} />
                </Reveal>
              ))}
              <div style={{ borderTop: '1px solid rgba(244,239,226,0.08)' }} />
            </div>

            {/* CTA */}
            <Reveal delay={0.4}>
              <div className="mt-10">
                <Link
                  href="/#notify"
                  className="inline-flex items-center gap-2 font-sans text-sm font-medium px-6 py-3 transition-colors duration-200"
                  style={{ background: 'rgba(240,232,210,0.1)', border: '1px solid rgba(240,232,210,0.22)', color: 'var(--cream)' }}
                >
                  Get Early Access <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Reveal>

          </div>
        </div>
      </div>
    </section>
  )
}

function WorkshopRow({ date, title, description, index }: {
  date: string; title: string; description: string; index: number
}) {
  const [hovered, setHovered] = React.useState(false)

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ borderTop: '1px solid rgba(244,239,226,0.08)', paddingBlock: '1.25rem', cursor: 'default' }}
      animate={{ backgroundColor: hovered ? 'rgba(244,239,226,0.03)' : 'rgba(244,239,226,0)' }}
      transition={{ duration: 0.3 }}
      className="px-2 -mx-2 rounded-sm"
    >
      <div className="flex items-baseline gap-4">
        <span
          className="font-sans shrink-0 tabular-nums"
          style={{ fontSize: '0.5rem', letterSpacing: '0.2em', color: 'rgba(196,149,75,0.7)', minWidth: '4.5rem' }}
        >
          {date}
        </span>
        <div className="flex-1 min-w-0">
          <h3
            className="font-serif font-semibold text-cream"
            style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.05rem)', letterSpacing: '-0.01em', lineHeight: 1.25 }}
          >
            {title}
          </h3>
          <motion.p
            className="font-sans text-cream/40 leading-relaxed overflow-hidden"
            style={{ fontSize: '0.8rem', lineHeight: 1.68 }}
            animate={{ maxHeight: hovered ? '6rem' : '0rem', opacity: hovered ? 1 : 0, marginTop: hovered ? '0.4rem' : '0' }}
            transition={{ duration: 0.38, ease: [0.19, 1, 0.22, 1] }}
          >
            {description}
          </motion.p>
        </div>
        <motion.span
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
          transition={{ duration: 0.25 }}
          className="font-sans text-amber shrink-0"
          style={{ fontSize: '0.7rem' }}
        >
          ↓
        </motion.span>
      </div>
    </motion.div>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 4 — FROM THE FOUNDER
══════════════════════════════════════════════════════════════════ */
export function FounderSection() {
  return (
    <section
      className="px-6 md:px-12 lg:px-20 py-24 md:py-32"
      style={{ background: 'var(--cream)' }}
    >
      <div className="mx-auto max-w-7xl">
        <div style={{ maxWidth: '60ch' }}>
          <Reveal>
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-forest/35 mb-10">
              From the founder
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <div
              className="font-serif text-charcoal leading-relaxed"
              style={{ fontSize: 'clamp(1rem, 1.5vw, 1.1rem)' }}
            >
              <p style={{ marginBottom: '1.5rem' }}>
                In 2019 I left finance to co-found Learn With Mochi, a screen-free coding kit for young
                children that has since shipped to families in 62 countries. I spent eight years
                listening to what four-year-olds actually need, and I kept arriving at the same answer:
                not more academic content, and not another screen. A quiet friend who helps them notice
                what they feel.
              </p>
              <p>
                The technical moment to build that friend arrived in 2026. Little Pines Studio is what
                I would have built the first time, if the models had existed. We are going to build it
                slowly, in public, and in partnership with people who know far more than I do about
                young children. If you are one of those people, I&rsquo;d like to meet you.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-8">
            <p className="font-sans text-sm text-forest/50">
              — Daria Zhao, Founder &nbsp;·&nbsp; Previously co-founder, Learn With Mochi
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-6">
            <a
              href={CONCEPT_PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-amber hover:text-amber-light transition-colors flex items-center gap-2"
            >
              Read the concept brief <ArrowRight className="w-3 h-3" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 5 — BUILD WITH US / SEVEN INVITATIONS TEASED
══════════════════════════════════════════════════════════════════ */
const INVITATIONS = [
  {
    audience: 'Engineer in edge AI, embedded, or hardware',
    ask: 'Help us build the on-device stack.',
  },
  {
    audience: 'Child psychologist or developmental researcher',
    ask: 'Tear the clinical model apart.',
  },
  {
    audience: 'Montessori or Waldorf educator',
    ask: "Tell us where we're aligned and where we're not.",
  },
  {
    audience: 'Foundation or grantmaker',
    ask: 'Consider funding the efficacy RCT.',
  },
  {
    audience: 'Mission-aligned investor',
    ask: 'Join the pre-seed notice list.',
  },
  {
    audience: "Children's voice director or audiobook producer",
    ask: 'Help us shape the voice.',
  },
  {
    audience: 'Specialty retail buyer',
    ask: 'Meet us for the 2027 assortment.',
  },
]

function BuildWithUsTeaserSection() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--cream)', position: 'relative', zIndex: 5, borderRadius: '2.5rem 2.5rem 0 0', marginTop: '-2rem' }}
    >
      <div className="absolute inset-0 bg-grain opacity-[0.018] pointer-events-none" aria-hidden="true" />
      <div className="absolute -bottom-4 -left-8 w-80 opacity-[0.055] pointer-events-none rotate-3" aria-hidden="true">
        <PineBranch color="var(--forest)" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-14 md:py-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-16">

          {/* Left: text */}
          <Reveal>
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber mb-3">
              Build with us
            </p>
            <h2
              className="font-serif font-semibold text-forest leading-tight mb-4"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
            >
              We&rsquo;re building this in public.<br className="hidden lg:inline" /> Here&rsquo;s how to be part of it.
            </h2>
            <p className="font-sans text-sm leading-relaxed" style={{ maxWidth: '46ch', color: 'var(--charcoal)', opacity: 0.52 }}>
              Little Pines is a small workshop with specific asks for specific people. If you are one of them, I&rsquo;d love to hear from you.
            </p>
          </Reveal>

          {/* Right: CTA pill */}
          <Reveal delay={0.1}>
            <Link
              href="/build-with-us"
              className="shrink-0 inline-flex items-center gap-2.5 border border-forest/30 text-forest font-sans font-medium text-sm px-8 py-4 rounded-full hover:bg-forest hover:text-cream transition-colors duration-200 whitespace-nowrap"
            >
              Read the invitations <span aria-hidden="true">↗</span>
            </Link>
          </Reveal>

        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 6 — THE BEAR / NIGHT CLEARING
══════════════════════════════════════════════════════════════════ */

const BEAR_MAGIC_CSS = `
  @keyframes bear-breathe {
    0%, 100% { transform: scale(1) translateY(0px); }
    50%       { transform: scale(1.022) translateY(-4px); }
  }
  @keyframes glow-pulse {
    0%, 100% { opacity: 0.50; transform: scale(1) translate(-50%, -55%); }
    50%       { opacity: 0.82; transform: scale(1.10) translate(-46%, -50%); }
  }
  @keyframes bear-firefly {
    0%   { opacity: 0; transform: translateY(0px) translateX(0px) scale(1); }
    18%  { opacity: 0.95; }
    78%  { opacity: 0.38; }
    100% { opacity: 0; transform: translateY(-95px) translateX(var(--ffx,20px)) scale(0.4); }
  }
`

const FF_DATA = Array.from({ length: 9 }, (_, i) => ({
  left:     `${10 + Math.abs(Math.sin(i * 3.7 + 1.1)) * 80}%`,
  bottom:   `${4  + Math.abs(Math.sin(i * 5.3 + 2.3)) * 34}%`,
  delay:    `${(Math.abs(Math.sin(i * 7.1 + 0.5)) * 10).toFixed(1)}s`,
  duration: `${(5  + Math.abs(Math.sin(i * 4.9 + 1.7)) * 8).toFixed(1)}s`,
  size:     `${(2  + Math.abs(Math.sin(i * 6.3 + 3.1)) * 2.6).toFixed(1)}px`,
  dx:       `${((-26 + Math.abs(Math.sin(i * 2.7 + 0.8)) * 52)).toFixed(0)}px`,
}))

function Fireflies() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {FF_DATA.map((f, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: f.left, bottom: f.bottom,
            width: f.size, height: f.size,
            borderRadius: '50%',
            background: 'rgba(196,149,75,0.95)',
            boxShadow: '0 0 6px 2px rgba(196,149,75,0.45)',
            animation: `bear-firefly ${f.duration} ${f.delay} ease-in-out infinite`,
            ['--ffx' as string]: f.dx,
          }}
        />
      ))}
    </div>
  )
}

function BearNightSky() {
  const VW = 1440, VH = 480
  const stars = Array.from({ length: 90 }, (_, i) => ({
    cx: Math.abs(Math.sin(i * 7.3 + 1.1)) * VW,
    cy: Math.abs(Math.sin(i * 3.7 + 2.4)) * VH * 0.75,
    r:  0.3 + Math.abs(Math.sin(i * 11.1 + 0.5)) * 1.1,
    op: (0.06 + Math.abs(Math.sin(i * 5.9 + 3.2)) * 0.36).toFixed(2),
  }))
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMin slice"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '55%', pointerEvents: 'none' }}
    >
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={`rgba(240,232,210,${s.op})`} />
      ))}
    </svg>
  )
}

function StaggerHeadline() {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })
  const lines: [string[], boolean[]][] = [
    [['Meet', 'the', 'bear'], [false, false, false]],
    [['beneath', 'the', 'pine'], [false, false, true]],
  ]
  return (
    <h2
      ref={ref}
      className="font-serif font-semibold text-cream leading-[1.06] text-center"
      style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)', letterSpacing: '-0.022em' }}
    >
      {lines.map(([words, ambers], li) => (
        <React.Fragment key={li}>
          {words.map((word, wi) => (
            <React.Fragment key={word + wi}>
              <motion.span
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + li * 0.28 + wi * 0.11, duration: 0.75, ease: [0.19, 1, 0.22, 1] }}
                style={{ display: 'inline-block', color: ambers[wi] ? 'var(--amber-light)' : undefined }}
              >
                {word}
              </motion.span>
              {wi < words.length - 1 && '\u00A0'}
            </React.Fragment>
          ))}
          {li === 0 && <br />}
        </React.Fragment>
      ))}
    </h2>
  )
}

const BEAR_SPECS = [
  { label: 'Ages',    value: '3–7 years'      },
  { label: 'Fiber',   value: 'Peruvian alpaca' },
  { label: 'Privacy', value: 'On-device'       },
  { label: 'Retail',  value: 'Holiday 2027'    },
  { label: 'Price',   value: '$129 target'     },
]

function BearSpotlight() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })
  return (
    <div ref={ref} className="relative flex flex-col items-center">
      {/* Amber radial glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 'clamp(280px, 44vw, 500px)',
          height: 'clamp(280px, 44vw, 500px)',
          background: 'radial-gradient(ellipse, rgba(196,149,75,0.20) 0%, transparent 68%)',
          borderRadius: '50%',
          top: '50%', left: '50%',
          animation: 'glow-pulse 6s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      {/* Bear */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
      >
        <div
          className="relative w-52 h-52 md:w-72 md:h-72"
          style={{ animation: 'bear-breathe 5.5s ease-in-out infinite' }}
        >
          <Image
            src="/bear_sits.png"
            alt="The Little Pines bear"
            fill
            className="object-contain brightness-0 invert opacity-[0.80]"
          />
        </div>
      </motion.div>
      {/* Spec pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {BEAR_SPECS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7 + i * 0.12, duration: 0.55, ease: [0.19, 1, 0.22, 1] }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
              padding: '0.3rem 0.85rem', borderRadius: '100px',
              border: '1px solid rgba(196,149,75,0.22)',
              background: 'rgba(18,38,22,0.80)',
            }}
          >
            <span style={{ fontSize: '0.58rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(168,197,172,0.55)', fontFamily: 'var(--font-sans)' }}>
              {s.label}
            </span>
            <span style={{ fontSize: '0.68rem', color: 'rgba(244,239,226,0.82)', fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>
              {s.value}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

const CARD_SCATTER = [
  { tilt: -3.5, yOff: 0   },
  { tilt:  1.4, yOff: 22  },
  { tilt: -2.0, yOff: -12 },
  { tilt:  2.8, yOff: 10  },
] as const

function ScatteredCards() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mt-3">
      {AFTER_SESSION_CARDS.map((card, i) => {
        const { tilt, yOff } = CARD_SCATTER[i]
        const fg     = card.textLight ? 'text-cream'    : 'text-forest-dark'
        const fgMute = card.textLight ? 'text-cream/40' : 'text-forest-dark/40'
        const bdg    = card.textLight ? 'bg-cream/15 text-cream/80' : 'bg-forest/10 text-forest'
        return (
          <Reveal key={card.num} delay={0.07 * i} className="h-full">
            <motion.div
              className="group relative overflow-hidden flex flex-col cursor-default"
              style={{
                rotate: tilt,
                y: yOff,
                borderRadius: '1.5rem',
                minHeight: '360px',
                boxShadow: '0 16px 56px -8px rgba(0,0,0,0.58), 0 3px 10px rgba(0,0,0,0.22)',
                ...card.cardStyle,
              }}
              whileHover={{
                rotate: 0,
                y: yOff - 20,
                boxShadow: '0 36px 88px -12px rgba(0,0,0,0.68), 0 6px 22px rgba(0,0,0,0.25)',
                transition: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
              }}
            >
              <div className={`flex flex-col flex-1 p-7 ${fg}`}>
                <div className="flex items-start justify-between mb-8">
                  <span className="font-serif text-[0.66rem] opacity-30 select-none">{card.num}</span>
                  <span className={`font-sans text-[0.58rem] tracking-[0.12em] uppercase ${fgMute}`}>{card.duration}</span>
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className={`relative ${card.bearSize ?? 'w-28 h-28 md:w-32 md:h-32'}`}>
                    <Image src={card.bear} alt="" fill className={card.bearClass} />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <h3 className="font-serif text-2xl font-semibold">{card.title}</h3>
                    {card.badge && (
                      <span className={`font-sans text-[0.52rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded-sm flex-shrink-0 ${bdg}`}>
                        {card.badge}
                      </span>
                    )}
                  </div>
                  {card.prompt && (
                    <p className="font-serif text-xs italic opacity-45 leading-snug">{card.prompt}</p>
                  )}
                </div>
              </div>
              <div
                className={`absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out flex flex-col justify-center p-7 ${fg}`}
                style={card.overlayStyle}
              >
                <p className="font-serif text-sm font-medium opacity-40 mb-3">{card.title}</p>
                <p className="font-sans text-sm leading-relaxed opacity-90">{card.body}</p>
              </div>
            </motion.div>
          </Reveal>
        )
      })}
    </div>
  )
}

const AFTER_SESSION_CARDS = [
  {
    num: '01',
    title: 'Daily Check-In',
    duration: '5–10 min',
    prompt: '"Where does that feeling live in your body?"',
    body: 'Low-stakes daily practice with emotional vocabulary. A simple question, asked the same way. Ritual is the point.',
    badge: null as string | null,
    bear: '/bear_sits.png',
    cardStyle: { background: 'var(--forest-dark)' } as React.CSSProperties,
    overlayStyle: { background: 'var(--forest-dark)', height: '80%' } as React.CSSProperties,
    textLight: true,
    bearClass: 'object-contain brightness-0 invert opacity-[0.78]',
    bearSize: 'w-[140px] h-[140px] md:w-40 md:h-40',
  },
  {
    num: '02',
    title: 'Big Feelings',
    duration: '10–15 min',
    prompt: '"Do you want to tell me about what happened?"',
    body: "The child squeezes the paw during or after a tantrum. The bear sits with it — without fixing, redirecting, or rushing toward resolution. Co-regulation: body first, language second.",
    badge: 'Signature' as string | null,
    bear: '/bear_eats.png',
    cardStyle: { background: 'var(--forest)' } as React.CSSProperties,
    overlayStyle: { background: 'var(--forest)', height: '80%' } as React.CSSProperties,
    textLight: true,
    bearClass: 'object-contain brightness-0 invert opacity-[0.78]',
    bearSize: undefined as string | undefined,
  },
  {
    num: '03',
    title: 'Curiosity',
    duration: '10–15 min',
    prompt: '"Why do I get scared of thunder?"',
    body: 'Age-appropriate psychoeducation about the body and nervous system. Naming what is happening is the beginning of mastery.',
    badge: null as string | null,
    bear: '/bear_plays.png',
    cardStyle: { background: 'var(--sage-light)' } as React.CSSProperties,
    overlayStyle: { background: 'var(--sage-light)', height: '80%' } as React.CSSProperties,
    textLight: false,
    bearClass: 'object-contain opacity-[0.85]',
    bearSize: undefined as string | undefined,
  },
  {
    num: '04',
    title: 'Wind-Down',
    duration: '10–15 min',
    prompt: '"Let\'s take three slow breaths together."',
    body: 'Three things, named. Three slow breaths, together. A gratitude and breath practice designed for the quiet end of the day.',
    badge: null as string | null,
    bear: '/bear_sleeps.png',
    cardStyle: { background: 'var(--cream)' } as React.CSSProperties,
    overlayStyle: { background: 'var(--cream)', height: '80%' } as React.CSSProperties,
    textLight: false,
    bearClass: 'object-contain opacity-[0.85]',
    bearSize: undefined as string | undefined,
  },
]

/* ══════════════════════════════════════════════════════════════════
   CONCEPT PAPER SECTION
══════════════════════════════════════════════════════════════════ */

const PAPER_CHAPTERS = [
  { title: 'The Opportunity',             tag: 'A Rich Interior Life'  },
  { title: 'Our Design Philosophy',      tag: 'Asleep by Default'     },
  { title: 'Our Research Foundation',    tag: 'Pedagogy'              },
  { title: 'The Little Pines Promise',   tag: 'Open Source'           },
]

function ConceptPaperSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const contentY  = useTransform(scrollYProgress, [0, 1], [-90, 90])
  const sectionY  = useTransform(scrollYProgress, [0, 0.18], [72, 0])

  return (
    <motion.section
      id="why-we-exist"
      ref={sectionRef}
      style={{
        y: sectionY,
        background: 'var(--cream)',
        position: 'relative',
        zIndex: 4,
        borderRadius: '2.5rem',
        marginTop: '-5rem',
        overflow: 'hidden',
      }}
    >
      <div className="absolute inset-0 bg-grain opacity-[0.018] pointer-events-none" aria-hidden="true" />

      <motion.div style={{ y: contentY }} className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-32 md:py-40">

        {/* Two-column: statement left, chapter list right */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-14 md:gap-20">

          {/* Left */}
          <Reveal>
            <p className="font-sans text-[0.58rem] tracking-[0.2em] uppercase text-amber mb-6">
              Read the brief
            </p>
            <h2
              className="font-serif font-semibold text-forest leading-[1.1]"
              style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)', letterSpacing: '-0.02em', marginBottom: '1.25rem' }}
            >
              <strong>What we owe every child:</strong> <em>emotional literacy for a lifetime</em>
            </h2>
            <p className="font-sans text-sm leading-relaxed mb-8" style={{ color: 'var(--charcoal-light)', opacity: 0.65, maxWidth: '34ch' }}>
              A short introduction to the bear, the problem it addresses, and the commitments we made before we started building.
            </p>
            <a
              href={CONCEPT_PAPER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-forest/30 text-forest hover:bg-forest hover:text-cream font-sans font-medium text-sm px-6 py-3 rounded-full transition-colors duration-200"
            >
              Open in Google Drive <span aria-hidden="true">↗</span>
            </a>
          </Reveal>

          {/* Right: chapter list */}
          <div>
            {PAPER_CHAPTERS.map(({ title, tag }, i) => (
              <Reveal key={title} delay={0.06 * i}>
                <div className="flex items-center justify-between gap-6 py-5 border-t border-forest/10 last:border-b last:border-forest/10">
                  <p
                    className="font-serif text-forest/80"
                    style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', fontWeight: 500 }}
                  >
                    {title}
                  </p>
                  <p className="font-sans text-[0.58rem] tracking-[0.18em] uppercase text-charcoal/35 shrink-0">
                    {tag}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Three commitments — hover to reveal, no standalone heading */}
        <div style={{ marginTop: '4rem', paddingBottom: '2rem' }}>
          <div style={{
            width: '56px',
            height: '1px',
            background: 'linear-gradient(to right, rgba(42,74,48,0.25), transparent)',
            marginBottom: '2.75rem',
          }} />
          <div style={{ display: 'flex', gap: 'clamp(0.5rem, 1.2vw, 0.85rem)' }}>
            {METHOD_PANELS.map(({ num, title, body, Icon }, i) => (
              <HoverRevealCard key={num} num={num} title={title} body={body} Icon={Icon} delay={0.06 + i * 0.09} />
            ))}
          </div>
        </div>

      </motion.div>
    </motion.section>
  )
}

export function AfterBearSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const starsY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  return (
    <section
      ref={sectionRef}
      style={{
        background: 'var(--forest-dark)',
        position: 'relative',
        zIndex: 3,
        borderRadius: 0,
        marginTop: '-3rem',
        overflow: 'hidden',
      }}
    >
      <style>{BEAR_MAGIC_CSS}</style>

      {/* Parallax stars */}
      <motion.div style={{ y: starsY }} className="absolute inset-0 pointer-events-none">
        <BearNightSky />
      </motion.div>

      {/* Grain */}
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden="true" />

      {/* Pine branch silhouettes */}
      <div className="absolute -left-14 top-24 w-72 opacity-[0.05] -rotate-12 pointer-events-none" aria-hidden="true">
        <PineBranch color="var(--cream)" />
      </div>
      <div className="absolute -right-14 top-36 w-72 opacity-[0.05] rotate-12 pointer-events-none" aria-hidden="true">
        <PineBranch color="var(--cream)" flip />
      </div>

      <PineNeedles color="var(--sage-light)" />
      <Fireflies />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20 pt-40 pb-14 md:pt-52 md:pb-18">

        {/* ── Headline ── */}
        <div className="text-center mb-8 md:mb-10">
          <Reveal>
            <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber/60 mb-6">
              The artifact
            </p>
          </Reveal>
          <StaggerHeadline />
          <Reveal delay={0.35}>
            <p className="font-sans text-sm text-cream/60 leading-relaxed mt-5 max-w-[46ch] mx-auto">
              Standing nine inches tall and endlessly patient, our flagship plush is made from the softest Peruvian alpaca. Squeeze its paw and the bear wakes, ready to listen.
            </p>
          </Reveal>
        </div>

        {/* ── Bear in the clearing ── */}
        <BearSpotlight />

      </div>
    </section>
  )
}

export function SessionsSection() {
  return (
    <section
      style={{
        background: 'var(--cream-dark)',
        position: 'relative',
        zIndex: 5,
        borderRadius: '2.5rem 2.5rem 0 0',
        marginTop: '-2rem',
        overflow: 'hidden',
      }}
    >
      <div className="absolute inset-0 bg-grain opacity-[0.018] pointer-events-none" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20 pt-20 pb-24 md:pt-24 md:pb-32">
        <Reveal className="text-center mb-14">
          <p className="font-sans text-[0.6rem] tracking-[0.18em] uppercase text-amber mb-4">
            How it works
          </p>
          <h3
            className="font-serif font-semibold text-forest leading-[1.1]"
            style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)' }}
          >
            Four sessions.<br className="hidden sm:inline" /> Child-initiated, every time.
          </h3>
          <p className="font-sans text-sm text-charcoal/45 mt-4 max-w-[42ch] mx-auto leading-relaxed">
            The child is always in control. Squeeze the paw to start. Put the bear down to stop.
          </p>
        </Reveal>
        <ScatteredCards />
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   SECTION 7 — EARLY ACCESS / EMAIL LIST
══════════════════════════════════════════════════════════════════ */
export function StarField() {
  const VW = 1440, VH = 900
  const stars = Array.from({ length: 115 }, (_, i) => ({
    cx: Math.round(Math.abs(Math.sin(i * 7.3 + 1.1)) * VW),
    cy: Math.round(Math.abs(Math.sin(i * 3.7 + 2.4)) * VH * 0.58),
    r: Math.round((0.4 + Math.abs(Math.sin(i * 11.1 + 0.5)) * 1.3) * 10) / 10,
    opacity: Math.round((0.10 + Math.abs(Math.sin(i * 5.9 + 3.2)) * 0.48) * 100) / 100,
  }))
  const constellations: [number, number][][] = [
    [[155, 80], [195, 110], [245, 100], [300, 118], [365, 88], [415, 128], [455, 108]],
    [[640, 140], [685, 95], [725, 148], [640, 140]],
    [[980, 65], [1030, 92], [1075, 84], [1125, 104]],
    [[850, 170], [920, 167], [990, 162]],
  ]
  const accents: [number, number, number][] = [
    [155, 80, 2.2], [415, 128, 2.0], [685, 95, 2.0], [980, 65, 2.2], [850, 170, 1.6],
  ]
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    >
      {constellations.map((pts, ci) =>
        pts.slice(1).map((pt, pi) => (
          <line
            key={`c${ci}-${pi}`}
            x1={pts[pi][0]} y1={pts[pi][1]} x2={pt[0]} y2={pt[1]}
            stroke="rgba(240,232,210,0.14)" strokeWidth="0.9"
          />
        ))
      )}
      {stars.map((s, i) => (
        <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={`rgba(240,232,210,${s.opacity})`} />
      ))}
      {accents.map(([cx, cy, r], i) => (
        <circle key={`a${i}`} cx={cx} cy={cy} r={r} fill="rgba(240,232,210,0.72)" />
      ))}
    </svg>
  )
}

/* Shooting stars — diagonal streaks using Framer Motion (rotate stays fixed while x/y animate) */
export function ShootingStars() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const STARS = Array.from({ length: 5 }, (_, i) => {
    const angleDeg = 28 + Math.abs(Math.sin(i * 2.3 + 0.7)) * 18
    const rad = (angleDeg * Math.PI) / 180
    const len = 100 + Math.abs(Math.sin(i * 1.9)) * 60
    return {
      id: i,
      x: 8 + Math.abs(Math.sin(i * 4.7 + 1.3)) * 78,
      y: 4 + Math.abs(Math.sin(i * 3.1 + 0.8)) * 46,
      angleDeg,
      dx: Math.cos(rad) * len,
      dy: Math.sin(rad) * len,
      delay: i * 6.1 + Math.abs(Math.sin(i * 1.7)) * 9,
      duration: 1.0 + Math.abs(Math.sin(i * 3.3)) * 0.5,
      repeatDelay: 14 + Math.abs(Math.sin(i * 2.7)) * 12,
    }
  })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {STARS.map(s => (
        <motion.div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: '105px',
            height: '1.5px',
            background: 'linear-gradient(to right, transparent 0%, rgba(240,232,210,0.85) 100%)',
            rotate: `${s.angleDeg}deg`,
            transformOrigin: '0% 50%',
          }}
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{ opacity: [0, 0, 0.9, 0.7, 0], x: s.dx, y: s.dy }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: 'easeIn',
            times: [0, 0.04, 0.18, 0.72, 1],
          }}
        />
      ))}
    </div>
  )
}

/* Twinkling stars — subtle Framer Motion pulse */
export function TwinklingStars() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setMounted(true) }, [])
  if (!mounted) return null

  const STARS = Array.from({ length: 16 }, (_, i) => ({
    id: i,
    x: Math.abs(Math.sin(i * 6.1 + 0.5)) * 96,
    y: Math.abs(Math.sin(i * 4.3 + 1.2)) * 82,
    size: 1.2 + Math.abs(Math.sin(i * 8.9)) * 1.6,
    duration: 2.8 + Math.abs(Math.sin(i * 2.1)) * 2.4,
    delay: Math.abs(Math.sin(i * 3.3)) * 5,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      {STARS.map(s => (
        <motion.div
          key={s.id}
          style={{
            position: 'absolute',
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            borderRadius: '50%',
            background: 'rgba(240,232,210,0.8)',
          }}
          animate={{ opacity: [0.12, 0.85, 0.12], scale: [1, 1.5, 1] }}
          transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

export function ForestSilhouette() {
  const VW = 1440, VH = 400
  const makePath = (
    count: number, baseY: number, minH: number, maxH: number,
    minHW: number, maxHW: number, seed: number
  ) => {
    const step = VW / count
    const pts: string[] = [`M0,${VH}`, `L0,${baseY}`]
    for (let i = 0; i < count; i++) {
      const h = minH + Math.abs(Math.sin(i * 3.7 + seed)) * (maxH - minH)
      const hw = minHW + Math.abs(Math.sin(i * 5.3 + seed + 1)) * (maxHW - minHW)
      const cx = (i + 0.5 + Math.abs(Math.sin(i * 2.1 + seed)) * 0.25) * step
      pts.push(
        `L${Math.round(cx - hw)},${baseY}`,
        `L${Math.round(cx)},${Math.round(baseY - h)}`,
        `L${Math.round(cx + hw)},${baseY}`
      )
    }
    pts.push(`L${VW},${baseY}`, `L${VW},${VH}`, 'Z')
    return pts.join(' ')
  }
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${VW} ${VH}`}
      preserveAspectRatio="xMidYMax slice"
      style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '42%', pointerEvents: 'none', zIndex: 1 }}
    >
      <path d={makePath(38, 275, 60, 100, 18, 30, 0)} fill="rgba(4,14,8,0.22)" />
      <path d={makePath(24, 300, 80, 130, 24, 38, 7)} fill="rgba(4,14,8,0.38)" />
      <path d={makePath(15, 325, 100, 160, 30, 50, 13)} fill="rgba(4,14,8,0.55)" />
    </svg>
  )
}

function AfterEarlyAccessSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const contentY = useTransform(scrollYProgress, [0, 1], [32, -32])
  const starsY   = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const forestY  = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  const [isDesktop, setIsDesktop] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    setIsDesktop(mq.matches)
    const h = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  return (
    <section
      ref={ref}
      id="notify"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: 'var(--forest-dark)',
        borderRadius: '2.5rem 2.5rem 0 0',
        marginTop: '-2.5rem',
        position: 'relative',
        zIndex: 6,
      }}
    >
      <div className="absolute inset-0 bg-grain opacity-55 pointer-events-none" aria-hidden="true" />
      <PineNeedles color="var(--sage-light)" />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: isDesktop ? starsY : 0 }}
        aria-hidden="true"
      >
        <StarField />
      </motion.div>
      <TwinklingStars />
      <ShootingStars />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: isDesktop ? forestY : 0 }}
        aria-hidden="true"
      >
        <ForestSilhouette />
      </motion.div>

      <motion.div className="relative z-10 text-center px-6 max-w-md mx-auto" style={{ y: contentY }}>
        <p className="font-sans text-[0.64rem] tracking-[0.2em] uppercase text-sage-light/65 mb-4">
          Early access
        </p>
        <h2 className="font-serif text-display-sm text-cream font-semibold leading-tight mb-4">
          A quiet note when<br />the bear is ready.
        </h2>
        <div
          style={{ width: '160px', height: '125px' }}
          className="relative mx-auto mb-6 pointer-events-none select-none"
          aria-hidden="true"
        >
          <Image
            src="/bear_sleeps.png"
            alt=""
            fill
            className="object-contain brightness-0 invert opacity-[0.45]"
          />
        </div>
        <p className="font-sans text-sm text-cream/40 mb-10 leading-relaxed">
          We write only when there is something worth saying.{' '}<span className="md:block">Unsubscribe anytime.</span>
        </p>
        <EmailCapture dark buttonLabel="Notify Me" />
      </motion.div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   EXPORT
══════════════════════════════════════════════════════════════════ */

function EpigraphSection() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [18, -18])

  return (
    <section
      ref={ref}
      style={{ background: 'var(--cream-dark)', position: 'relative', zIndex: 2, textAlign: 'center' }}
    >
      <div style={{ padding: '4rem 2rem 4.5rem' }}>
        <motion.div style={{ y }} className="max-w-[44ch] mx-auto">
          <div style={{
            border: '1px solid rgba(42,74,48,0.16)',
            borderRadius: '12px',
            padding: '2.5rem 2.5rem',
            boxShadow: '0 8px 40px -8px rgba(42,74,48,0.10)',
          }}>

            <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
              <div style={{ height: '1px', width: '3rem', background: 'linear-gradient(to right, transparent, rgba(196,149,75,0.45))' }} />
              <div style={{ fontSize: '1rem', color: 'rgba(196,149,75,0.55)', lineHeight: 1, fontFamily: 'serif' }}>&ldquo;</div>
              <div style={{ height: '1px', width: '3rem', background: 'linear-gradient(to left, transparent, rgba(196,149,75,0.45))' }} />
            </div>

            <Reveal>
              <p className="font-serif" style={{ fontStyle: 'italic', fontSize: 'clamp(1.15rem, 2.6vw, 1.6rem)', fontWeight: 300, lineHeight: 1.6, color: 'var(--charcoal)', letterSpacing: '-0.01em', margin: 0 }}>
                There is a child somewhere right now, trying to find the word for what they feel.
              </p>
            </Reveal>

            <div aria-hidden="true" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '2rem' }}>
              <div style={{ height: '1px', width: '4rem', background: 'linear-gradient(to right, transparent, rgba(196,149,75,0.3), transparent)' }} />
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════════════════
   COMMITMENTS — HOVER REVEAL CARDS
══════════════════════════════════════════════════════════════════ */
function HoverRevealCard({ num, title, body, Icon, delay }: {
  num: string; title: string; body: string; Icon: IconComp; delay: number
}) {
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.85, delay, ease: [0.19, 1, 0.22, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        flex: 1,
        minWidth: 0,
        position: 'relative',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        cursor: 'default',
        height: 'clamp(260px, 28vw, 380px)',
        background: 'var(--cream)',
        border: '1px solid rgba(42,74,48,0.09)',
      }}
    >
      {/* Giant ghost number watermark */}
      <span
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '-0.15em',
          right: '-0.04em',
          fontSize: 'clamp(7rem, 18vw, 14rem)',
          fontWeight: 800,
          fontFamily: 'Georgia, serif',
          color: 'var(--forest)',
          opacity: 0.042,
          lineHeight: 1,
          userSelect: 'none',
          pointerEvents: 'none',
          letterSpacing: '-0.05em',
        }}
      >
        {num}
      </span>

      {/* Front content */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: 'clamp(1.4rem, 2.5vw, 2.25rem)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
        }}
      >
        <div style={{ marginBottom: '0.9rem' }}>
          <Icon active={inView} size={34} />
        </div>
        <p
          className="font-sans"
          style={{ fontSize: '0.44rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: '0.55rem' }}
        >
          {num}
        </p>
        <h3
          className="font-serif"
          style={{
            fontSize: 'clamp(1.9rem, 4.5vw, 3.8rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 0.95,
            color: 'var(--forest)',
          }}
        >
          {title}
        </h3>
        <motion.div
          animate={{ width: hovered ? '3rem' : '1.25rem' }}
          transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
          style={{ height: '1px', background: 'var(--amber)', opacity: 0.6, marginTop: '0.85rem' }}
        />
      </div>

      {/* Hover reveal — slides up from bottom */}
      <motion.div
        initial={false}
        animate={{ y: hovered ? 0 : '102%' }}
        transition={{ duration: 0.42, ease: [0.19, 1, 0.22, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--forest)',
          padding: 'clamp(1.4rem, 2.5vw, 2.25rem)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <p
          className="font-sans"
          style={{ fontSize: '0.44rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.65)', marginBottom: '1rem' }}
        >
          {num} · {title}
        </p>
        <p
          className="font-serif"
          style={{ fontSize: 'clamp(0.92rem, 1.3vw, 1.06rem)', lineHeight: 1.8, color: 'rgba(244,239,226,0.82)' }}
        >
          {body}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function AfterHomePage() {
  return (
    <>
      <AfterHero />
      <ConceptPaperSection />
      <AfterEarlyAccessSection />
    </>
  )
}
