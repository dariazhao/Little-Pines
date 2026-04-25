import { ImageResponse } from 'next/og'
import { readFileSync } from 'fs'
import { join } from 'path'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export const alt = 'Little Pines Studio — An open-source toy studio that helps young children notice and name what they feel.'

export default async function OgImage() {
  /* Load globe image as base64 */
  const globeBuf = readFileSync(join(process.cwd(), 'public', 'og-globe.png'))
  const globeSrc = `data:image/png;base64,${globeBuf.toString('base64')}`

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
        {/* Globe — full bleed background, cropped to 1200×630 */}
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

        {/* Gradient veil — darkens left ⅔ for text legibility */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(90deg, rgba(18,38,24,0.97) 0%, rgba(18,38,24,0.94) 28%, rgba(18,38,24,0.78) 52%, rgba(18,38,24,0.25) 75%, rgba(18,38,24,0.00) 100%)',
            display: 'flex',
          }}
        />

        {/* Text panel — left-aligned */}
        <div
          style={{
            position: 'absolute',
            left: '84px',
            top: 0,
            bottom: 0,
            width: '540px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          {/* Eyebrow — studio name */}
          <p
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '12px',
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: 'rgba(196,149,75,0.78)',
              margin: '0 0 16px',
            }}
          >
            Little Pines Studio
          </p>

          {/* Amber rule */}
          <div
            style={{
              width: '44px',
              height: '1px',
              background: 'rgba(196,149,75,0.52)',
              margin: '0 0 28px',
            }}
          />

          {/* Main headline */}
          <p
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '38px',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.40,
              color: 'rgba(242,236,220,0.95)',
              margin: '0 0 34px',
              letterSpacing: '-0.01em',
            }}
          >
            An open-source toy studio that helps young children notice and name what they feel.
          </p>

          {/* URL */}
          <p
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: '11px',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(196,149,75,0.46)',
              margin: 0,
            }}
          >
            littlepines.studio
          </p>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
