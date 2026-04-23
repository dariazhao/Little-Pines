import { cn } from '@/lib/utils'

interface PineBranchProps {
  className?: string
  color?: string
  flip?: boolean
}

export function PineBranch({ className, color = 'currentColor', flip }: PineBranchProps) {
  return (
    <svg
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, flip && 'scale-x-[-1]')}
      aria-hidden="true"
    >
      {/* Main branch stem — woodcut style thick line */}
      <path
        d="M 10 100 Q 60 80 120 60 Q 160 45 190 30"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Needle clusters — stacked hatched lines evocative of linocut */}
      {/* Cluster 1 */}
      <g transform="translate(45,85)">
        <path d="M0,0 L-18,-28" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L-8,-32" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L6,-30" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L18,-24" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L24,-14" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L-24,-18" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      </g>
      {/* Cluster 2 */}
      <g transform="translate(85,68)">
        <path d="M0,0 L-20,-26" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L-10,-30" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L4,-32" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L16,-26" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L22,-16" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      </g>
      {/* Cluster 3 */}
      <g transform="translate(125,50)">
        <path d="M0,0 L-18,-24" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L-6,-28" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L6,-28" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
        <path d="M0,0 L18,-22" stroke={color} strokeWidth="1.8" strokeLinecap="round"/>
      </g>
      {/* Cluster 4 */}
      <g transform="translate(158,37)">
        <path d="M0,0 L-14,-20" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M0,0 L-4,-24" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M0,0 L8,-22" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M0,0 L16,-16" stroke={color} strokeWidth="1.6" strokeLinecap="round"/>
      </g>
      {/* Small pine cones */}
      <ellipse cx="42" cy="92" rx="4" ry="5.5" fill={color} opacity="0.7" transform="rotate(-20,42,92)"/>
      <ellipse cx="86" cy="74" rx="3.5" ry="5" fill={color} opacity="0.65" transform="rotate(-15,86,74)"/>
    </svg>
  )
}

export function PineSprig({ className, color = 'currentColor' }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M40 70 L40 30" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      {/* Triangle tiers */}
      <path d="M40 52 L20 70 L60 70 Z" fill={color} opacity="0.85"/>
      <path d="M40 36 L24 56 L56 56 Z" fill={color} opacity="0.80"/>
      <path d="M40 22 L28 42 L52 42 Z" fill={color} opacity="0.75"/>
      <path d="M40 10 L32 28 L48 28 Z" fill={color} opacity="0.70"/>
    </svg>
  )
}
