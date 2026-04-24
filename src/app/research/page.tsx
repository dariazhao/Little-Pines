'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Reveal } from '@/components/ui/reveal'
import { PineBranch } from '@/components/illustrations/pine-branch'
import { Globe } from '@/components/globe'
import { AfterBearSection, ShootingStars } from '@/app/_homepage-after'

/* ─── Static stars ───────────────────────────────────────────────── */
const RESEARCH_STARS: [number, number, number][] = [
  [8,12,1.2],[15,7,0.9],[23,18,1.4],[32,5,0.8],[41,14,1.1],
  [55,9,1.3],[63,20,0.9],[72,6,1.5],[80,15,1.0],[91,8,1.2],
  [5,35,0.8],[18,42,1.1],[28,78,0.9],[37,88,1.3],[48,82,0.8],
  [58,92,1.1],[67,75,1.4],[76,85,0.9],[88,70,1.2],[94,90,0.8],
  [12,60,1.0],[87,45,1.1],[3,80,0.9],[96,30,1.3],[45,3,0.8],
  [70,95,1.0],[25,95,1.2],[85,25,0.9],[52,50,0.7],[33,65,1.0],
]

/* ─── Hero ──────────────────────────────────────────────────────── */
const HERO_LINES = [
  { text: 'The feeling',      italic: false, amber: false, weight: 300 },
  { text: 'comes before',     italic: false, amber: false, weight: 300 },
  { text: 'the word for it.', italic: true,  amber: true,  weight: 400 },
  { text: 'We study both.',   italic: false, amber: false, weight: 700 },
]
const HERO_DELAYS = [0.3, 0.52, 0.72, 0.92]

function ResearchHero() {
  return (
    <section
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--forest-dark)', paddingTop: '11rem', paddingBottom: '4rem', textAlign: 'center', minHeight: '100svh' }}
    >
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" aria-hidden="true" />

      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        {RESEARCH_STARS.map(([x, y, r], i) => (
          <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="rgba(244,239,226,1)" opacity={0.12 + (i % 8) * 0.06} />
        ))}
      </svg>

      {/* Radiating rings */}
      <div className="absolute pointer-events-none" aria-hidden="true" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
        {([200, 310, 440, 580] as const).map((size, i) => (
          <motion.div key={i}
            style={{ position: 'absolute', width: size, height: size, borderRadius: '50%', border: '1px solid rgba(196,149,75,1)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
            animate={{ opacity: [0.05, 0.55 - i * 0.10, 0.05] }}
            transition={{ duration: 2.8, delay: i * 0.45, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <ShootingStars />

      <div className="absolute inset-x-0 pointer-events-none" aria-hidden="true" style={{ top: '20%', height: '60%', background: 'radial-gradient(ellipse at 50% 50%, rgba(196,149,75,0.07) 0%, transparent 60%)' }} />

      <div className="absolute top-0 left-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{ width: 'min(200px, 24vw)', transform: 'rotate(-12deg) translateX(-14%)' }}>
        <PineBranch color="var(--cream)" />
      </div>
      <div className="absolute bottom-0 right-0 pointer-events-none opacity-[0.04]" aria-hidden="true" style={{ width: 'min(200px, 24vw)', transform: 'rotate(12deg) translateX(14%)' }}>
        <PineBranch color="var(--cream)" flip />
      </div>

      {/* Globe — top arc at bottom */}
      <motion.div
        className="absolute pointer-events-none" aria-hidden="true"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.8, delay: 1.2 }}
        style={{ bottom: 0, left: '50%', transform: 'translateX(-50%)', width: 'min(680px, 90vw)', height: 'min(240px, 24vh)', overflow: 'hidden', zIndex: 1 }}
      >
        <div style={{ width: '100%', aspectRatio: '1' }}>
          <Globe style={{ width: '100%', height: '100%', display: 'block' }} />
        </div>
      </motion.div>

      <div className="relative px-6" style={{ maxWidth: 'min(780px, 90vw)', zIndex: 10 }}>
        <motion.p className="font-sans" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.1 }}
          style={{ fontSize: '0.52rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.50)', marginBottom: '3rem' }}>
          Little Pines Studio &middot; The Research
        </motion.p>

        <div style={{ marginBottom: '3.5rem' }}>
          {HERO_LINES.map((line, i) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <motion.span className="font-serif block"
                initial={{ y: '110%' }} animate={{ y: '0%' }}
                transition={{ duration: 0.95, delay: HERO_DELAYS[i], ease: [0.19, 1, 0.22, 1] }}
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)', fontStyle: line.italic ? 'italic' : 'normal', fontWeight: line.weight, lineHeight: 1.22, letterSpacing: '-0.03em', color: line.amber ? 'var(--amber)' : 'rgba(244,239,226,0.85)', paddingBottom: '0.06em' }}
              >
                {line.text}
              </motion.span>
            </div>
          ))}
        </div>

        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 1.6, ease: [0.19, 1, 0.22, 1] }}
          style={{ height: '1px', width: '3rem', background: 'rgba(196,149,75,0.5)', transformOrigin: 'left center', margin: '0 auto 2.5rem' }}
        />

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 2.0 }} className="flex justify-center" style={{ paddingBottom: '2rem' }}>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} style={{ color: 'rgba(196,149,75,0.40)' }}>
            <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
              <path d="M7 2 V18 M2 13 L7 18 L12 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Pillars data ───────────────────────────────────────────────── */
const PILLARS = [
  {
    n: '01',
    name: 'Affective Labeling',
    research: 'Lieberman et al. (2007) demonstrated that naming an emotional state reduces amygdala activation — the brain\'s threat response. Putting feelings into words is not a soft-skills exercise. It is a direct neurological intervention that moves emotion from the body\'s alarm system into the prefrontal cortex, where it becomes workable.',
    sessions: 'Sessions always invite naming before anything else. "Where do you feel it? What do you want to call it?" The bear waits.',
  },
  {
    n: '02',
    name: 'Somatic Awareness',
    research: 'Porges\'s Polyvagal Theory and van der Kolk\'s body-based research establish that emotion is first experienced in the body — as tension, heat, expansion, or contraction — before it becomes accessible as language. Abstract emotional concepts are only reachable after somatic recognition.',
    sessions: 'Sessions begin with the body. "Does it feel tight or loose? Heavy or light?" Language follows sensation, not the other way around.',
  },
  {
    n: '03',
    name: 'Co-Regulation Without Fixing',
    research: 'Siegel and Hartzell\'s attachment research shows that a regulated external presence — one that sits alongside without rushing toward resolution — is the primary mechanism by which children internalize self-regulation. The goal is not to fix the feeling. The goal is to not be alone in it.',
    sessions: 'The bear is trained to reflect and witness, not advise. It does not redirect. It does not offer silver linings. It asks one more question, and then it stays.',
  },
  {
    n: '04',
    name: 'Restorative Transition',
    research: 'MBSR adaptations for children and sleep science on pre-bed cognitive winding establish that structured transition rituals — breath, naming, gratitude — measurably reduce cortisol and improve emotional consolidation during sleep.',
    sessions: 'The wind-down session follows a fixed structure: three things noticed, three slow breaths, one thing held lightly for tomorrow. Ritual is the point.',
  },
]

/* ─── Study metrics ──────────────────────────────────────────────── */
const METRICS = [
  { label: 'Primary',   measure: 'Emotional vocabulary growth',             tool: 'ACES-Y scale',     window: '16 weeks' },
  { label: 'Secondary', measure: 'Parent-reported co-regulation frequency', tool: 'Weekly diary',     window: '16 weeks' },
  { label: 'Tertiary',  measure: 'Child-initiated session count',           tool: 'Device telemetry', window: '16 weeks' },
]

/* ─── Tab: The Case ──────────────────────────────────────────────── */
function CaseTabContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
      <Reveal>
        <div className="font-sans" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.88, color: 'rgba(40,40,40,0.58)' }}>
          <p style={{ marginBottom: '1.25rem' }}>
            In the first years of life, children are born with an almost unbounded capacity to feel. Research from Gottman to Siegel establishes that the ability to name and process emotional states is not a soft skill: it is the substrate on which learning, connection, and resilience are built.
          </p>
          <p>
            Modern childhood systematically erodes this capacity. Overstimulation, screens, and adults who resolve discomfort before a child can sit with it: these are not edge cases. By the time a child is eight, most have been taught to suppress or avoid the feelings that were once their most natural mode of expression.
          </p>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="font-sans" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.88, color: 'rgba(40,40,40,0.58)' }}>
          <p style={{ marginBottom: '1.25rem' }}>
            Little Pines exists because the tools parents have been given are almost all delivered through the same screens that caused the problem. Therapy apps and SEL curricula cannot co-regulate. They cannot wait. A screen has nowhere to be next.
          </p>
          <p>
            The form factor matters as much as the content. A quiet, unhurried, screen-free companion that has nowhere to be and nothing to sell is a fundamentally different kind of tool. The research supports it. No one has yet built it well.
          </p>
        </div>
      </Reveal>
    </div>
  )
}

/* ─── Tab: The Study ─────────────────────────────────────────────── */
function StudyTabContent() {
  return (
    <div>
      <p className="font-sans" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', color: 'rgba(42,74,48,0.42)', marginBottom: '3rem', maxWidth: '52ch', lineHeight: 1.7 }}>
        A pre-registered randomized controlled trial. 120 families. Ages 3&ndash;7. 16-week intervention with waitlist-control design. Enrollment opens Q1 2027.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3" style={{ background: 'rgba(42,74,48,0.07)', borderRadius: '8px', overflow: 'hidden', marginBottom: '3.5rem', gap: '1px' }}>
        {METRICS.map((m) => (
          <div key={m.label} style={{ background: 'var(--cream)', padding: '1.75rem 2rem' }}>
            <p className="font-sans" style={{ fontSize: '0.48rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.55)', marginBottom: '0.6rem' }}>{m.label}</p>
            <p className="font-serif" style={{ fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)', fontWeight: 600, color: 'var(--forest)', lineHeight: 1.3, marginBottom: '0.5rem' }}>{m.measure}</p>
            <p className="font-sans" style={{ fontSize: '0.76rem', color: 'rgba(42,74,48,0.36)' }}>{m.tool} &middot; {m.window}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <div>
          <h3 className="font-serif" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', fontWeight: 600, color: 'var(--forest)', marginBottom: '0.75rem' }}>Study design</h3>
          <p className="font-sans" style={{ fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)', lineHeight: 1.82, color: 'rgba(40,40,40,0.52)' }}>
            120 families with children aged 3&ndash;7, recruited through Montessori and Waldorf networks. Half receive the bear at enrollment; half join a waitlist and receive it after the 16-week observation period ends. Both groups participate in structured parent-report surveys at weeks 4, 8, 12, and 16. All data is stored locally. Nothing leaves the household.
          </p>
        </div>
        <div>
          <h3 className="font-serif" style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', fontWeight: 600, color: 'var(--forest)', marginBottom: '0.75rem' }}>On pre-registration</h3>
          <p className="font-sans" style={{ fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)', lineHeight: 1.82, color: 'rgba(40,40,40,0.52)' }}>
            We are pre-registering hypotheses, methods, and analysis plans on the Open Science Framework before any data collection begins. If the results don&rsquo;t support the design, we will publish that too. This research belongs to the field, not to our marketing department.
          </p>
        </div>
      </div>
    </div>
  )
}

/* ─── Tab: How it works ──────────────────────────────────────────── */
function HowItWorksTabContent() {
  return (
    <div>
      <p className="font-sans" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 0.95rem)', lineHeight: 1.75, color: 'rgba(40,40,40,0.5)', maxWidth: '54ch', marginBottom: '3rem' }}>
        Every session follows the same arc: arrive in the body, name what is there, sit with it, and return to solid ground. The bear waits for the child, not the other way around.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {PILLARS.map((p) => (
          <div key={p.n}>
            <p className="font-sans uppercase" style={{ fontSize: '0.5rem', letterSpacing: '0.22em', color: 'rgba(196,149,75,0.55)', marginBottom: '0.4rem' }}>{p.n}</p>
            <div style={{ width: '1.5rem', height: '1.5px', background: 'rgba(196,149,75,0.5)', marginBottom: '0.7rem' }} />
            <h3 className="font-serif" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.2rem)', fontWeight: 600, color: 'var(--forest)', lineHeight: 1.2, marginBottom: '0.55rem' }}>{p.name}</h3>
            <p className="font-sans" style={{ fontSize: 'clamp(0.82rem, 1.1vw, 0.9rem)', lineHeight: 1.82, color: 'rgba(40,40,40,0.48)', fontStyle: 'italic' }}>{p.sessions}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Binder tabs + content ──────────────────────────────────────── */
const TABS = ['The Case', 'The Study', 'How it works'] as const
type ResearchTab = typeof TABS[number]

function TabbedSection() {
  const [activeTab, setActiveTab] = useState<ResearchTab>('The Case')

  return (
    <section style={{ background: 'var(--cream)', borderRadius: '2rem 2rem 0 0', marginTop: '-2rem', position: 'relative', zIndex: 2 }}>
      <div className="mx-auto px-6 md:px-12 lg:px-20" style={{ maxWidth: '1100px', paddingTop: '4.5rem' }}>

        <Reveal>
          <p className="font-sans uppercase" style={{ fontSize: '0.52rem', letterSpacing: '0.26em', color: 'rgba(42,74,48,0.32)', marginBottom: '1.2rem' }}>
            The research
          </p>
          <h2 className="font-serif" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--forest)', marginBottom: '3rem', maxWidth: '22ch' }}>
            Emotional literacy is the foundation for a rich interior life.
          </h2>
        </Reveal>

        {/* File-binder tabs */}
        <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end' }}>
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-sans"
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                padding: '0.55rem 1.25rem 0.65rem',
                borderRadius: '5px 5px 0 0',
                border: '1px solid rgba(42,74,48,0.10)',
                borderBottom: activeTab === tab ? '1px solid var(--cream)' : '1px solid rgba(42,74,48,0.10)',
                background: activeTab === tab ? 'var(--cream)' : 'rgba(42,74,48,0.035)',
                color: activeTab === tab ? 'var(--forest)' : 'rgba(42,74,48,0.32)',
                cursor: 'pointer',
                position: 'relative',
                bottom: activeTab === tab ? '-1px' : '0',
                transition: 'color 0.2s ease, background 0.2s ease',
                whiteSpace: 'nowrap',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div style={{ borderTop: '1px solid rgba(42,74,48,0.10)', paddingTop: '3.5rem', paddingBottom: '5.5rem' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              {activeTab === 'The Case' && <CaseTabContent />}
              {activeTab === 'The Study' && <StudyTabContent />}
              {activeTab === 'How it works' && <HowItWorksTabContent />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ─── Four Pillars ───────────────────────────────────────────────── */
function PillarsSection({ onReveal, revealed }: { onReveal: () => void; revealed: boolean }) {
  return (
    <section style={{ background: 'var(--forest-dark)', borderRadius: '2rem 2rem 0 0', marginTop: '-2rem', position: 'relative', zIndex: 3, padding: '5rem 0 5rem', overflow: 'hidden' }}>
      <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden="true" />
      <div className="absolute inset-x-0 pointer-events-none" aria-hidden="true" style={{ top: '10%', height: '50%', background: 'radial-gradient(ellipse at 50% 50%, rgba(196,149,75,0.05) 0%, transparent 60%)' }} />

      <div className="relative z-10 mx-auto px-6 md:px-12 lg:px-20" style={{ maxWidth: '1100px' }}>
        <Reveal>
          <p className="font-sans uppercase" style={{ fontSize: '0.52rem', letterSpacing: '0.26em', color: 'rgba(196,149,75,0.45)', marginBottom: '1rem' }}>
            Four pillars
          </p>
          <h2 className="font-serif text-cream" style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 600, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: '4rem' }}>
            How sessions are designed.
          </h2>
        </Reveal>

        <div>
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={0.06 * i}>
              <div style={{ borderTop: '1px solid rgba(240,232,210,0.08)', paddingTop: 'clamp(2rem, 4vw, 3rem)', paddingBottom: 'clamp(2rem, 4vw, 3rem)' }}>
                <div className="grid grid-cols-1 lg:grid-cols-[3rem_1fr_1.4fr] gap-4 lg:gap-12" style={{ alignItems: 'start' }}>
                  <p className="font-sans" style={{ fontSize: '0.5rem', letterSpacing: '0.22em', color: 'rgba(196,149,75,0.45)', textTransform: 'uppercase', paddingTop: '0.3rem' }}>
                    {p.n}
                  </p>
                  <h3 className="font-serif text-cream" style={{ fontSize: 'clamp(1.15rem, 2vw, 1.45rem)', fontWeight: 600, lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                    {p.name}
                  </h3>
                  <div>
                    <p className="font-sans" style={{ fontSize: 'clamp(0.8rem, 1.1vw, 0.88rem)', lineHeight: 1.82, color: 'rgba(240,232,210,0.42)', marginBottom: '0.9rem' }}>
                      {p.research}
                    </p>
                    <p className="font-sans" style={{ fontSize: 'clamp(0.78rem, 1vw, 0.84rem)', lineHeight: 1.75, color: 'rgba(196,149,75,0.52)', fontStyle: 'italic' }}>
                      {p.sessions}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid rgba(240,232,210,0.08)' }} />
        </div>

        {/* Scene break / Meet the bear CTA */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 0 0.5rem', gap: '0.75rem' }}>
          {revealed ? (
            <div style={{ width: '2.5rem', height: '1px', background: 'rgba(196,149,75,0.28)' }} />
          ) : (
            <>
              <button
                onClick={onReveal}
                className="font-sans"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.52rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.60)', padding: 0 }}
              >
                Meet the bear
              </button>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                style={{ color: 'rgba(196,149,75,0.40)' }}
              >
                <svg width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
                  <path d="M7 2 V18 M2 13 L7 18 L12 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function ResearchPage() {
  const [artifactOpen, setArtifactOpen] = useState(false)
  return (
    <>
      <ResearchHero />
      <TabbedSection />
      <PillarsSection onReveal={() => setArtifactOpen(true)} revealed={artifactOpen} />
      <AnimatePresence>
        {artifactOpen && (
          <motion.div
            key="artifact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <AfterBearSection />
            <div style={{ background: 'var(--forest-dark)', textAlign: 'center', padding: '4rem 1.5rem 5rem', position: 'relative' }}>
              <div className="absolute inset-0 bg-grain opacity-40 pointer-events-none" aria-hidden="true" />
              <p className="font-sans relative z-10" style={{ fontSize: '0.5rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.45)', marginBottom: '1.5rem' }}>
                Little Pines Studio &middot; Q3 2026
              </p>
              <a
                href="/#notify"
                className="font-sans relative z-10 inline-flex items-center gap-2 transition-opacity hover:opacity-80"
                style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(196,149,75,0.85)', border: '1px solid rgba(196,149,75,0.28)', borderRadius: '4px', padding: '0.7rem 1.8rem' }}
              >
                Get early access
                <ArrowRight size={10} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
