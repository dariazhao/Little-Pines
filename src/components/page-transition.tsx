'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

/* ─── Star field (used for twinkling + constellation edges) ──── */
const STARS = [
  { x: 7,  y: 6,  r: 1.0, d: 0.0 }, { x: 14, y: 12, r: 0.7, d: 0.4 },
  { x: 23, y: 5,  r: 1.2, d: 0.8 }, { x: 31, y: 15, r: 0.6, d: 1.2 },
  { x: 40, y: 8,  r: 0.9, d: 0.3 }, { x: 48, y: 3,  r: 1.1, d: 0.7 },
  { x: 55, y: 11, r: 0.7, d: 1.5 }, { x: 63, y: 7,  r: 1.0, d: 0.2 },
  { x: 70, y: 14, r: 0.8, d: 0.9 }, { x: 78, y: 4,  r: 1.3, d: 0.5 },
  { x: 85, y: 10, r: 0.6, d: 1.3 }, { x: 92, y: 6,  r: 1.0, d: 0.1 },
  { x: 97, y: 16, r: 0.7, d: 0.6 }, { x: 10, y: 22, r: 0.8, d: 1.1 },
  { x: 26, y: 26, r: 0.6, d: 0.4 }, { x: 44, y: 20, r: 1.0, d: 0.8 },
  { x: 58, y: 24, r: 0.7, d: 0.2 }, { x: 73, y: 19, r: 1.1, d: 1.0 },
  { x: 88, y: 27, r: 0.6, d: 0.5 }, { x: 3,  y: 18, r: 0.9, d: 1.4 },
  { x: 52, y: 30, r: 0.7, d: 0.3 }, { x: 80, y: 32, r: 1.0, d: 0.9 },
  { x: 18, y: 35, r: 0.6, d: 0.7 }, { x: 36, y: 33, r: 0.8, d: 1.6 },
]

// Pairs of STARS indices that form constellation edges
const CONSTELLATION_EDGES = [
  [0, 1], [1, 2], [2, 3],          // top-left arm
  [4, 5], [5, 6],                  // middle top
  [7, 8], [8, 9],                  // mid-right
  [10, 11], [11, 12],              // far right
  [19, 13], [13, 14], [14, 15],   // lower left
]

/* ─── Falling pine needles ───────────────────────────────────── */
const NEEDLE_CONFIGS = [
  { x:  8, delay: 0.0, dur:  9.0, rot:  15 },
  { x: 27, delay: 2.1, dur: 10.8, rot: -10 },
  { x: 47, delay: 4.2, dur:  9.8, rot:  20 },
  { x: 63, delay: 1.0, dur: 10.5, rot: -15 },
  { x: 79, delay: 3.2, dur:  9.5, rot:  12 },
  { x: 93, delay: 5.3, dur: 10.2, rot: -18 },
]

/* ─── SVG paths (all in 32×32 viewBox) ──────────────────────── */
const PINE_PATH       = 'M16,4 L10.5,13 L12.5,13 L7,20 L10,20 L5.5,27 L13.5,27 L13.5,30 L18.5,30 L18.5,27 L26.5,27 L22,20 L25,20 L21.5,13 L23.5,13 Z'
const STAR_PATH       = 'M16,3 L19.5,12 L29,12 L22,18 L25,28 L16,22 L7,28 L10,18 L3,12 L12.5,12 Z'
const LEAF_PATH       = 'M16,1 Q26,6 25,15 Q24,24 16,31 Q8,24 7,15 Q6,6 16,1 Z'
const ACORN_BODY      = 'M7,15 Q5,24 11,28 Q16,31 21,28 Q27,24 25,15 Z'
const ACORN_CAP       = 'M7,15 Q7,6 16,6 Q25,6 25,15 Z'
const MOON_PATH       = 'M16,2 Q28,2 28,16 Q28,30 16,30 Q9,30 4,24 Q14,22 14,16 Q14,10 4,8 Q9,2 16,2 Z'
const PINECONE_BODY   = 'M16,3 L15,5 L13,6 Q8,11 8,18 Q8,27 16,31 Q24,27 24,18 Q24,11 19,6 L17,5 Z'
const PINECONE_SCALES = 'M8,13 Q16,10.5 24,13 M8,17 Q16,14.5 24,17 M8.5,21 Q16,18.5 23.5,21 M9.5,25 Q16,22.5 22.5,25'

/* ─── Themes ─────────────────────────────────────────────────── */
type ThemeName = 'pine' | 'seedling' | 'star' | 'leaf' | 'acorn' | 'moon' | 'pinecone'

const THEMES: Record<ThemeName, {
  bg: string; glow: string; glowPos: string
  accentBar: string; accentPct: string
  watermarkColor: string; silColor: string
  label: string
}> = {
  pine:     { bg: '#0C0804', glow: 'rgba(200,144,74,0.26)',  glowPos: '50% 62%', accentBar: 'rgba(200,144,74,0.85)',  accentPct: 'rgba(200,144,74,0.50)',  watermarkColor: '#C8904A', silColor: '#1E3622', label: 'Stepping through the pines'  },
  seedling: { bg: '#050E06', glow: 'rgba(78,158,72,0.24)',   glowPos: '50% 55%', accentBar: 'rgba(100,178,90,0.85)',  accentPct: 'rgba(100,178,90,0.50)',  watermarkColor: '#6CBF60', silColor: '#2A5820', label: 'Planting the seed...'         },
  star:     { bg: '#04070F', glow: 'rgba(180,190,230,0.18)', glowPos: '65% 35%', accentBar: 'rgba(200,210,240,0.85)', accentPct: 'rgba(200,210,240,0.50)', watermarkColor: '#B8C8E8', silColor: '#181C30', label: 'Following the stars...'      },
  leaf:     { bg: '#0C0600', glow: 'rgba(190,115,40,0.24)',  glowPos: '50% 58%', accentBar: 'rgba(192,128,56,0.85)',  accentPct: 'rgba(192,128,56,0.50)',  watermarkColor: '#C08040', silColor: '#2A1505', label: 'Turning the page...'         },
  acorn:    { bg: '#070D05', glow: 'rgba(88,138,70,0.20)',   glowPos: '50% 55%', accentBar: 'rgba(122,158,104,0.85)', accentPct: 'rgba(122,158,104,0.50)', watermarkColor: '#7AAF68', silColor: '#122010', label: 'One small seed...'           },
  moon:     { bg: '#07060C', glow: 'rgba(210,178,72,0.22)',  glowPos: '55% 38%', accentBar: 'rgba(215,182,90,0.85)',  accentPct: 'rgba(215,182,90,0.50)',  watermarkColor: '#C8A845', silColor: '#C8A845', label: 'Under the quiet moon...'     },
  pinecone: { bg: '#08060A', glow: 'rgba(162,108,42,0.30)',  glowPos: '50% 52%', accentBar: 'rgba(188,138,62,0.85)',  accentPct: 'rgba(188,138,62,0.50)',  watermarkColor: '#B08040', silColor: '#3D2510', label: 'Opening the pages...'        },
}

function getThemeName(path: string): ThemeName {
  if (path.startsWith('/promise'))       return 'moon'
  if (path.startsWith('/research'))      return 'star'
  if (path.startsWith('/studio'))        return 'seedling'
return 'pine'
}

/* ─── SVG graphic components ─────────────────────────────────── */
function PineGraphic({ fill }: { fill: string }) {
  return <svg viewBox="0 0 32 32" width="100%" height="100%"><path d={PINE_PATH} fill={fill} /></svg>
}
function SeedlingGraphic({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      {/* Stem */}
      <path d="M14,30 L14,18 Q14,12 16,8 Q18,12 18,18 L18,30 Z" fill={fill} />
      {/* Left leaf */}
      <path d="M16,15 Q6,14 4,6 Q10,4 16,13 Z" fill={fill} />
      {/* Right leaf */}
      <path d="M16,15 Q26,14 28,6 Q22,4 16,13 Z" fill={fill} />
    </svg>
  )
}
function StarGraphic({ fill }: { fill: string }) {
  return <svg viewBox="0 0 32 32" width="100%" height="100%"><path d={STAR_PATH} fill={fill} /></svg>
}
function LeafGraphic({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <path d={LEAF_PATH} fill={fill} />
      <path d="M16,1 L16,31 M16,11 Q10,14 7,16 M16,11 Q22,14 25,16 M16,20 Q11,22 8,24 M16,20 Q21,22 24,24"
        stroke="rgba(0,0,0,0.22)" strokeWidth="0.7" fill="none" />
    </svg>
  )
}
function AcornGraphic({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <path d={ACORN_BODY} fill={fill} />
      <path d={ACORN_CAP}  fill={fill} />
      <line x1="16" y1="6" x2="16" y2="2" stroke={fill} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M9,10 L23,10 M10,12.5 L22,12.5" stroke="rgba(0,0,0,0.22)" strokeWidth="0.8" fill="none" />
    </svg>
  )
}
function MoonGraphic({ fill }: { fill: string }) {
  return <svg viewBox="0 0 32 32" width="100%" height="100%"><path d={MOON_PATH} fill={fill} /></svg>
}
function PineconeGraphic({ fill }: { fill: string }) {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <path d={PINECONE_BODY} fill={fill} />
      <path d={PINECONE_SCALES} stroke="rgba(0,0,0,0.25)" strokeWidth="0.7" fill="none" />
    </svg>
  )
}

/* ─── Constellation overlay ──────────────────────────────────── */
function ConstellationOverlay() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {CONSTELLATION_EDGES.map(([a, b], i) => {
        const s = STARS[a], e = STARS[b]
        return (
          <line key={i}
            x1={`${s.x}%`} y1={`${s.y}%`}
            x2={`${e.x}%`} y2={`${e.y}%`}
            stroke="rgba(244,239,226,0.20)" strokeWidth="0.6"
          />
        )
      })}
    </svg>
  )
}

/* ─── Falling pine needles ───────────────────────────────────── */
function FallingNeedles() {
  return (
    <>
      {NEEDLE_CONFIGS.map(({ x, delay, dur, rot }, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${x}%`, top: 0, rotate: rot, transformOrigin: 'top center' }}
          initial={{ y: '-10vh', opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 0.40, 0.40, 0.40, 0] }}
          transition={{ duration: dur, delay, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          <svg viewBox="0 0 6 24" width="6" height="24" style={{ display: 'block' }}>
            <path
              d="M3,0 L3,22 M3,5 L1,9 M3,5 L5,9 M3,11 L1,15 M3,11 L5,15 M3,17 L1,20 M3,17 L5,20"
              stroke="rgba(180,230,150,0.50)" strokeWidth="0.8" strokeLinecap="round" fill="none"
            />
          </svg>
        </motion.div>
      ))}
    </>
  )
}

/* ─── Silhouette layer ───────────────────────────────────────── */
function Silhouettes({ theme, silColor }: { theme: ThemeName; silColor: string }) {
  if (theme === 'pine') return (
    <>
      {([
        { left: '-2%',  bottom: '0', width: '38vh', height: '38vh', opacity: 0.18 },
        { left:  '6%',  bottom: '0', width: '28vh', height: '28vh', opacity: 0.12 },
        { right: '-2%', bottom: '0', width: '40vh', height: '40vh', opacity: 0.18 },
        { right:  '7%', bottom: '0', width: '26vh', height: '26vh', opacity: 0.11 },
      ] as const).map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={s} aria-hidden="true">
          <PineGraphic fill={silColor} />
        </div>
      ))}
    </>
  )

  if (theme === 'seedling') return (
    <>
      {([
        { left:  '3%',  bottom: '0', width: '24vh', height: '24vh', opacity: 0.18 },
        { left:  '16%', bottom: '0', width: '16vh', height: '16vh', opacity: 0.11 },
        { right: '5%',  bottom: '0', width: '22vh', height: '22vh', opacity: 0.16 },
        { right: '18%', bottom: '0', width: '14vh', height: '14vh', opacity: 0.10 },
      ] as const).map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={s} aria-hidden="true">
          <SeedlingGraphic fill={silColor} />
        </div>
      ))}
    </>
  )

  if (theme === 'star') return (
    <>
      {/* Animated shooting streak */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <motion.path
          d="M 8 90 L 92 8"
          stroke="rgba(200,215,255,0.65)"
          strokeWidth="0.55"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: [0, 0.9, 0.6, 0] }}
          transition={{ duration: 1.65, ease: 'easeOut', delay: 0.42 }}
        />
      </svg>
      {([
        { left: '10%', top: '12%', width: '12vh', height: '12vh', opacity: 0.10 },
        { left: '72%', top:  '7%', width:  '9vh', height:  '9vh', opacity: 0.08 },
        { right: '4%', top: '52%', width: '11vh', height: '11vh', opacity: 0.09 },
        { left: '20%', top: '65%', width:  '7vh', height:  '7vh', opacity: 0.07 },
      ] as const).map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={s} aria-hidden="true">
          <StarGraphic fill={silColor} />
        </div>
      ))}
    </>
  )

  if (theme === 'leaf') return (
    <>
      <div className="absolute pointer-events-none" style={{ left: '3%', bottom: '5%', width: '24vh', height: '24vh', opacity: 0.14, transform: 'rotate(40deg)' }} aria-hidden="true">
        <LeafGraphic fill={silColor} />
      </div>
      <div className="absolute pointer-events-none" style={{ right: '5%', top: '10%', width: '18vh', height: '18vh', opacity: 0.10, transform: 'rotate(-55deg)' }} aria-hidden="true">
        <LeafGraphic fill={silColor} />
      </div>
      <div className="absolute pointer-events-none" style={{ right: '8%', bottom: '8%', width: '13vh', height: '13vh', opacity: 0.08, transform: 'rotate(125deg)' }} aria-hidden="true">
        <LeafGraphic fill={silColor} />
      </div>
    </>
  )

  if (theme === 'acorn') return (
    <>
      <div className="absolute pointer-events-none" style={{ left: '2%', bottom: '0', width: '26vh', height: '26vh', opacity: 0.15 }} aria-hidden="true">
        <AcornGraphic fill={silColor} />
      </div>
      <div className="absolute pointer-events-none" style={{ right: '4%', bottom: '0', width: '19vh', height: '19vh', opacity: 0.10 }} aria-hidden="true">
        <AcornGraphic fill={silColor} />
      </div>
    </>
  )

  if (theme === 'moon') return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" style={{ opacity: 0.09 }}>
      <ellipse cx="50%" cy="44%" rx="44%" ry="27%" fill="none" stroke={silColor} strokeWidth="0.6" />
      <ellipse cx="50%" cy="44%" rx="33%" ry="19%" fill="none" stroke={silColor} strokeWidth="0.5" />
      <ellipse cx="50%" cy="44%" rx="55%" ry="35%" fill="none" stroke={silColor} strokeWidth="0.4" />
    </svg>
  )

  if (theme === 'pinecone') return (
    <>
      {([
        { left: '-1%',  bottom: '0', width: '22vh', height: '22vh', opacity: 0.16 },
        { left:  '8%',  bottom: '0', width: '15vh', height: '15vh', opacity: 0.10 },
        { right: '0%',  bottom: '0', width: '24vh', height: '24vh', opacity: 0.15 },
        { right: '10%', bottom: '0', width: '14vh', height: '14vh', opacity: 0.09 },
      ] as const).map((s, i) => (
        <div key={i} className="absolute pointer-events-none" style={s} aria-hidden="true">
          <PineconeGraphic fill={silColor} />
        </div>
      ))}
    </>
  )

  return null
}

/* ─── Ghost watermark (centre icon) ─────────────────────────── */
function Watermark({ theme, color }: { theme: ThemeName; color: string }) {
  const centred = theme === 'star' || theme === 'moon'
  const style = {
    position: 'absolute' as const,
    width:  'min(60vh, 60vw)',
    height: 'min(60vh, 60vw)',
    opacity: 0.09,
    pointerEvents: 'none' as const,
    ...(centred
      ? { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }
      : { bottom: '-2%', left: '50%', transform: 'translateX(-50%)' }),
  }
  return (
    <div style={style} aria-hidden="true">
      {theme === 'pine'     && <PineGraphic     fill={color} />}
      {theme === 'seedling' && <SeedlingGraphic fill={color} />}
      {theme === 'star'     && <StarGraphic     fill={color} />}
      {theme === 'leaf'     && <LeafGraphic     fill={color} />}
      {theme === 'acorn'    && <AcornGraphic    fill={color} />}
      {theme === 'moon'     && <MoonGraphic     fill={color} />}
      {theme === 'pinecone' && <PineconeGraphic fill={color} />}
    </div>
  )
}

/* ─── Main component ─────────────────────────────────────────── */
export function PageTransition() {
  const pathname = usePathname()
  const [visible,  setVisible]  = useState(false)
  const [progress, setProgress] = useState(0)
  const [destPath, setDestPath] = useState('/')

  const intervalRef     = useRef<ReturnType<typeof setInterval> | null>(null)
  const hideRef         = useRef<ReturnType<typeof setTimeout>  | null>(null)
  const killRef         = useRef<ReturnType<typeof setTimeout>  | null>(null)
  const prevPathnameRef = useRef(pathname)
  const visibleRef      = useRef(false)

  useEffect(() => { visibleRef.current = visible }, [visible])

  const forceHide = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (hideRef.current)     clearTimeout(hideRef.current)
    if (killRef.current)     clearTimeout(killRef.current)
    setVisible(false)
    setProgress(0)
  }, [])

  const startProgress = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (killRef.current)     clearTimeout(killRef.current)
    setProgress(0)
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 82) { clearInterval(intervalRef.current!); return prev }
        const inc = (Math.random() * 14 + 2) * Math.pow(1 - prev / 100, 2.2)
        return Math.min(prev + inc, 82)
      })
    }, 240)
    // Safety valve: force-dismiss after 10 seconds no matter what
    killRef.current = setTimeout(forceHide, 10_000)
  }, [forceHide])

  const completeProgress = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (killRef.current)     clearTimeout(killRef.current)
    setProgress(100)
    if (hideRef.current) clearTimeout(hideRef.current)
    hideRef.current = setTimeout(() => { setVisible(false); setProgress(0) }, 570)
  }, [])

  useEffect(() => {
    if (pathname !== prevPathnameRef.current) {
      prevPathnameRef.current = pathname
      if (visibleRef.current) completeProgress()
    }
  }, [pathname, completeProgress])

  // Handle browser back/forward (bfcache restore) — page may reappear with loading screen stuck
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted && visibleRef.current) forceHide()
    }
    window.addEventListener('pageshow', handlePageShow)
    return () => window.removeEventListener('pageshow', handlePageShow)
  }, [forceHide])

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest('a')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel') || href.startsWith('#')) return
      const hrefPath = href.split('#')[0]
      if (hrefPath === '' || hrefPath === pathname) return
      setDestPath(href)
      setVisible(true)
      startProgress()
    }
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [pathname, startProgress])

  useEffect(() => () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    if (hideRef.current)     clearTimeout(hideRef.current)
    if (killRef.current)     clearTimeout(killRef.current)
  }, [])

  const theme = getThemeName(destPath)
  const { bg, glow, glowPos, accentBar, accentPct, watermarkColor, silColor, label } = THEMES[theme]

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="curtain"
          className="fixed inset-0 z-[999] overflow-hidden"
          style={{ background: bg }}
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.66, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: `radial-gradient(ellipse 65% 55% at ${glowPos}, ${glow} 0%, transparent 100%)`,
          }} />

          {/* Woodcut hatch */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.055 }} aria-hidden="true">
            <defs>
              <pattern id="hatch-curtain" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
                <line x1="0" y1="0" x2="0" y2="12" stroke="#C8904A" strokeWidth="0.9" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hatch-curtain)" />
          </svg>

          {/* Constellation lines */}
          <ConstellationOverlay />

          {/* Falling pine needles */}
          <FallingNeedles />

          {/* Static stars */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
            {STARS.map(({ x, y, r }, i) => (
              <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r * 1.25} fill="#F4EFE2" opacity={0.35 + (i % 5) * 0.09} />
            ))}
          </svg>

          {/* Theme silhouettes */}
          <Silhouettes theme={theme} silColor={silColor} />

          {/* Ghost watermark */}
          <Watermark theme={theme} color={watermarkColor} />

          {/* Bear + progress bar */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 pointer-events-none">
            <motion.div className="relative w-36 h-36"
              initial={{ opacity: 0, scale: 0.78 }}
              animate={{ opacity: 1, scale: [0.78, 1, 1.05, 1] }}
              transition={{ delay: 0.3, duration: 1.05, ease: [0.19, 1, 0.22, 1] }}
            >
              <Image src="/logo.png" alt="" fill className="object-contain brightness-0 invert" style={{ opacity: 0.82 }} priority />
            </motion.div>

            <motion.div className="flex flex-col items-center gap-2.5" style={{ width: '240px' }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.42, duration: 0.52 }}
            >
              <div className="w-full overflow-hidden" style={{ height: '2px', borderRadius: '999px', background: 'rgba(244,239,226,0.08)' }}>
                <motion.div
                  style={{ height: '100%', borderRadius: '999px', background: accentBar, transformOrigin: 'left', scaleX: progress / 100 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.42, ease: 'easeOut' }}
                />
              </div>
              <div className="flex items-center justify-between w-full">
                <span className="font-sans" style={{ fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(244,239,226,0.22)' }}>
                  {label}
                </span>
                <span className="font-sans tabular-nums" style={{ fontSize: '0.48rem', letterSpacing: '0.06em', color: accentPct }}>
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
