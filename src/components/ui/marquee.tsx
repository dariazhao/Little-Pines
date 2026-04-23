'use client'

import { cn } from '@/lib/utils'

interface MarqueeProps {
  items: string[]
  className?: string
  itemClassName?: string
  speed?: number
  separator?: React.ReactNode
}

export function Marquee({ items, className, itemClassName, speed = 35, separator }: MarqueeProps) {
  const doubled = [...items, ...items]
  return (
    <div className={cn('overflow-hidden whitespace-nowrap select-none', className)}>
      <div
        className="inline-flex"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {doubled.map((item, i) => (
          <span key={i} className={cn('inline-flex items-center', itemClassName)}>
            {item}
            {separator ?? (
              <span className="mx-5 w-1 h-1 rounded-full bg-current opacity-40 inline-block flex-shrink-0" />
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
