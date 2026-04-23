'use client'

import { motion } from 'framer-motion'

interface RunningBearProps {
  color?: string
  width?: number
}

export function RunningBear({ color = '#F4EFE2', width = 180 }: RunningBearProps) {
  const height = width * (120 / 180)

  // Alternating leg swing — pairs swing opposite to each other
  const swing = (phase: 0 | 1) => ({
    animate: { rotate: phase === 0 ? [30, -30] : [-30, 30] },
    transition: {
      duration: 0.48,
      repeat: Infinity,
      repeatType: 'mirror' as const,
      ease: 'easeInOut' as const,
    },
    style: { transformOrigin: '0px 0px' as const },
  })

  return (
    <svg viewBox="0 0 185 125" width={width} height={height} fill="none">

      {/* ── Back far leg ── */}
      <g transform="translate(50, 82)">
        <motion.g {...swing(0)}>
          <ellipse cx="0" cy="15" rx="7" ry="16" fill={color} opacity="0.5"/>
          {/* paw */}
          <ellipse cx="0" cy="31" rx="9" ry="5" fill={color} opacity="0.5"/>
        </motion.g>
      </g>

      {/* ── Back near leg ── */}
      <g transform="translate(66, 85)">
        <motion.g {...swing(1)}>
          <ellipse cx="0" cy="15" rx="7" ry="16" fill={color} opacity="0.75"/>
          <ellipse cx="0" cy="31" rx="9" ry="5" fill={color} opacity="0.75"/>
        </motion.g>
      </g>

      {/* ── Tail ── */}
      <ellipse cx="24" cy="62" rx="15" ry="13" fill={color} opacity="0.7"/>

      {/* ── Body ── */}
      <ellipse cx="83" cy="70" rx="58" ry="40" fill={color}/>

      {/* ── Front far leg ── */}
      <g transform="translate(120, 88)">
        <motion.g {...swing(1)}>
          <ellipse cx="0" cy="15" rx="7" ry="16" fill={color} opacity="0.5"/>
          <ellipse cx="0" cy="31" rx="9" ry="5" fill={color} opacity="0.5"/>
        </motion.g>
      </g>

      {/* ── Front near leg ── */}
      <g transform="translate(135, 91)">
        <motion.g {...swing(0)}>
          <ellipse cx="0" cy="15" rx="7" ry="16" fill={color} opacity="0.9"/>
          <ellipse cx="0" cy="31" rx="9" ry="5" fill={color} opacity="0.9"/>
        </motion.g>
      </g>

      {/* ── Neck ── */}
      <ellipse cx="127" cy="54" rx="20" ry="24" fill={color}/>

      {/* ── Head ── */}
      <circle cx="144" cy="40" r="32" fill={color}/>

      {/* ── Ears ── */}
      <circle cx="126" cy="13" r="13" fill={color}/>
      <circle cx="126" cy="13" r="7" fill={color} opacity="0.5"/>
      <circle cx="159" cy="11" r="12" fill={color}/>
      <circle cx="159" cy="11" r="6.5" fill={color} opacity="0.5"/>

      {/* ── Muzzle ── */}
      <ellipse cx="169" cy="50" rx="16" ry="13" fill={color} opacity="0.68"/>

      {/* ── Eye ── */}
      <circle cx="157" cy="34" r="5" fill="#2B2218"/>
      <circle cx="159" cy="32" r="1.8" fill="white" opacity="0.75"/>

      {/* ── Nose ── */}
      <ellipse cx="176" cy="48" rx="5.5" ry="3.8" fill="#2B2218"/>

      {/* ── Smile ── */}
      <path
        d="M171 53 Q176 58 181 53"
        stroke="#2B2218"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  )
}
