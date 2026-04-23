import { cn } from '@/lib/utils'

const strokeProps = {
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
}

interface IconProps {
  className?: string
  color?: string
}

/** Sensory exploration — texture/touch ripples */
export function SensoryIcon({ className, color = 'currentColor' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={cn(className)} aria-hidden="true">
      <circle cx="32" cy="32" r="10" stroke={color} strokeWidth="2.5" {...strokeProps}/>
      {/* Ripple rings */}
      <circle cx="32" cy="32" r="17" stroke={color} strokeWidth="1.8" strokeDasharray="4 3" {...strokeProps} opacity="0.65"/>
      <circle cx="32" cy="32" r="24" stroke={color} strokeWidth="1.4" strokeDasharray="3 4" {...strokeProps} opacity="0.4"/>
      {/* Central hand touch */}
      <path d="M28 32 Q30 28 32 32 Q34 28 36 32" stroke={color} strokeWidth="2" {...strokeProps}/>
      {/* Texture hash marks on center circle */}
      <path d="M27 30 L29 34" stroke={color} strokeWidth="1.5" {...strokeProps} opacity="0.5"/>
      <path d="M31 29 L31 35" stroke={color} strokeWidth="1.5" {...strokeProps} opacity="0.5"/>
      <path d="M35 30 L33 34" stroke={color} strokeWidth="1.5" {...strokeProps} opacity="0.5"/>
    </svg>
  )
}

/** Quiet imaginative play — moon + stars */
export function QuietPlayIcon({ className, color = 'currentColor' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={cn(className)} aria-hidden="true">
      {/* Crescent moon */}
      <path
        d="M36 14 A16 16 0 1 0 36 50 A12 12 0 1 1 36 14Z"
        fill={color}
        opacity="0.9"
      />
      {/* Stars */}
      <path d="M48 16 L49.5 20 L53 20 L50.2 22.3 L51.3 26 L48 23.8 L44.7 26 L45.8 22.3 L43 20 L46.5 20 Z" fill={color} opacity="0.6"/>
      <path d="M52 30 L53 32.8 L56 32.8 L53.7 34.5 L54.5 37 L52 35.5 L49.5 37 L50.3 34.5 L48 32.8 L51 32.8 Z" fill={color} opacity="0.45"/>
      <circle cx="50" cy="22" r="1.5" fill={color} opacity="0.0"/>
    </svg>
  )
}

/** Seasonal nature rhythm — leaf + sun arc */
export function SeasonalIcon({ className, color = 'currentColor' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={cn(className)} aria-hidden="true">
      {/* Sun arc */}
      <path d="M12 44 A22 22 0 0 1 52 44" stroke={color} strokeWidth="2.2" {...strokeProps} opacity="0.7"/>
      {/* Sun rays */}
      {[0, 30, 60, 90, 120, 150, 180].map((deg, i) => {
        const r = Math.PI * deg / 180
        const cx = 32, cy = 44, inner = 24, outer = 30
        return (
          <line
            key={i}
            x1={cx + inner * Math.cos(r - Math.PI)}
            y1={cy + inner * Math.sin(r - Math.PI)}
            x2={cx + outer * Math.cos(r - Math.PI)}
            y2={cy + outer * Math.sin(r - Math.PI)}
            stroke={color}
            strokeWidth="1.8"
            strokeLinecap="round"
            opacity="0.5"
          />
        )
      })}
      {/* Leaf */}
      <path
        d="M32 42 Q20 28 28 16 Q44 20 36 36 Q34 39 32 42Z"
        fill={color}
        opacity="0.85"
      />
      <path d="M32 42 Q30 28 28 16" stroke="var(--cream)" strokeWidth="1.2" {...strokeProps} opacity="0.5"/>
      {/* Stem */}
      <path d="M32 42 L32 52" stroke={color} strokeWidth="2" {...strokeProps}/>
    </svg>
  )
}

/** Guided story & language — open book */
export function StoryIcon({ className, color = 'currentColor' }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className={cn(className)} aria-hidden="true">
      {/* Book left page */}
      <path
        d="M32 18 Q22 16 12 20 L12 50 Q22 46 32 48 Z"
        fill={color}
        opacity="0.8"
      />
      {/* Book right page */}
      <path
        d="M32 18 Q42 16 52 20 L52 50 Q42 46 32 48 Z"
        fill={color}
        opacity="0.65"
      />
      {/* Spine */}
      <line x1="32" y1="18" x2="32" y2="48" stroke="var(--cream)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      {/* Text lines left */}
      <line x1="16" y1="28" x2="28" y2="26.5" stroke="var(--cream)" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      <line x1="16" y1="33" x2="28" y2="31.5" stroke="var(--cream)" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      <line x1="16" y1="38" x2="25" y2="37" stroke="var(--cream)" strokeWidth="1.3" strokeLinecap="round" opacity="0.5"/>
      {/* Text lines right */}
      <line x1="36" y1="26.5" x2="48" y2="28" stroke="var(--cream)" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
      <line x1="36" y1="31.5" x2="48" y2="33" stroke="var(--cream)" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
      <line x1="36" y1="37" x2="44" y2="38" stroke="var(--cream)" strokeWidth="1.3" strokeLinecap="round" opacity="0.4"/>
    </svg>
  )
}
