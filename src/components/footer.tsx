import Link from 'next/link'
import Image from 'next/image'

const nav = [
  {
    heading: 'Explore',
    links: [
      { href: '/promise', label: 'Our Promise' },
      { href: '/research', label: 'Our Research' },
      { href: '/build-with-us', label: 'The Studio' },
    ],
  },
  {
    heading: 'Open Source',
    links: [
      { href: 'https://github.com/dariazhao/Little-Pines', label: 'GitHub', external: true },
      { href: '/research', label: 'Research & Safety' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { href: '/#notify', label: 'Early Access' },
      { href: 'mailto:hello@littlepinesstudio.com', label: 'Press Enquiries', external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-forest text-cream/80">
      {/* Top rule */}
      <div className="h-px bg-gradient-to-r from-transparent via-cream/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-1 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group w-fit" aria-label="Home">
              <div className="relative w-10 h-10 opacity-90 group-hover:opacity-100 transition-opacity">
                <Image
                  src="/logo.png"
                  alt="Little Pines Studio bear"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
              <div>
                <span className="block font-serif text-cream text-base font-semibold leading-tight">
                  Little Pines
                </span>
                <span className="block font-sans text-[0.6rem] text-cream/50 tracking-[0.14em] uppercase">
                  Studio
                </span>
              </div>
            </Link>
            <p className="font-sans text-sm leading-relaxed text-cream/60 max-w-[220px]">
              An open-source toy studio that helps young children notice and name what they feel.
            </p>
            <p className="font-sans text-xs text-cream/40 leading-relaxed">
              Patterns released under CC&nbsp;BY‑SA&nbsp;4.0.
              <br />
              Handcrafted from fine alpaca fiber.
            </p>
          </div>

          {/* Nav columns */}
          {nav.map((col) => (
            <div key={col.heading} className="flex flex-col gap-4">
              <h3 className="font-sans text-xs tracking-[0.14em] uppercase text-cream/40 font-medium">
                {col.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      target={l.external ? '_blank' : undefined}
                      rel={l.external ? 'noopener noreferrer' : undefined}
                      className="font-sans text-sm text-cream/70 hover:text-cream transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cream/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="font-sans text-xs text-cream/35">
            &copy; {new Date().getFullYear()} Little Pines Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/promise" className="font-sans text-xs text-cream/35 hover:text-cream/60 transition-colors">
              Privacy
            </Link>
            <Link href="/promise" className="font-sans text-xs text-cream/35 hover:text-cream/60 transition-colors">
              Safety
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
