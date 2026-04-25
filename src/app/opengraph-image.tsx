import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export const alt = 'Little Pines Studio — An open-source toy studio that helps young children notice and name what they feel.'

export default async function OgImage() {
  const globeBuf = readFileSync(join(process.cwd(), 'public', 'og-globe.png'))
  const globeSrc = `data:image/png;base64,${globeBuf.toString('base64')}`

  const logoBuf = readFileSync(join(process.cwd(), 'public', 'logo.png'))
  const logoSrc = `data:image/png;base64,${logoBuf.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#1C3826',
        }}
      >
        {/* Globe — full bleed */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={globeSrc}
          alt=""
          width={1200}
          height={630}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />

        {/* Logo — centered horizontally, placed in the upper globe area (above the quote text) */}
        <div
          style={{
            position: 'absolute',
            top: '96px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            alt="Little Pines Studio"
            width={196}
            height={174}
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
