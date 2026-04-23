'use client'

import { useEffect, useRef } from 'react'

const TO_RAD = Math.PI / 180

const HUBS: [number, number][] = ([
  [ 37.77, -122.42],  // San Francisco
  [ 40.71,  -74.01],  // New York
  [ 45.52, -122.68],  // Portland
  [ 47.61, -122.33],  // Seattle
  [ 30.27,  -97.74],  // Austin
  [ 42.36,  -71.06],  // Boston
  [ 44.98,  -93.27],  // Minneapolis
  [ 39.74, -104.99],  // Denver
  [ 43.65,  -79.38],  // Toronto
  [ 49.25, -123.12],  // Vancouver
  [ 51.51,   -0.13],  // London
  [ 52.37,    4.90],  // Amsterdam
  [ 55.68,   12.57],  // Copenhagen
  [ 59.33,   18.07],  // Stockholm
  [ 52.52,   13.40],  // Berlin
  [ 47.38,    8.54],  // Zurich
  [ 48.86,    2.35],  // Paris
  [ 35.69,  139.69],  // Tokyo
  [  1.35,  103.82],  // Singapore
  [-33.87,  151.21],  // Sydney
  [-37.81,  144.96],  // Melbourne
] as [number, number][]).map(([lat, lng]) => [lat * TO_RAD, lng * TO_RAD] as [number, number])

function generateLand(): [number, number][] {
  const dots: [number, number][] = []
  const region = (latMin: number, latMax: number, lngMin: number, lngMax: number, n: number) => {
    for (let i = 0; i < n; i++) {
      dots.push([
        (latMin + Math.random() * (latMax - latMin)) * TO_RAD,
        (lngMin + Math.random() * (lngMax - lngMin)) * TO_RAD,
      ])
    }
  }
  region( 25,  72, -168,  -52, 480)
  region( 25,  50, -125,  -65, 200)
  region(-55,  12,  -82,  -34, 350)
  region( 36,  71,  -10,   40, 400)
  region( 50,  71,   -5,   30, 120)
  region(-35,  37,  -18,   52, 500)
  region(  5,  75,   42,  148, 700)
  region( 18,  55,   68,  105, 200)
  region( -8,  20,   95,  140, 180)
  region(-44, -12,  113,  154, 150)
  region( 30,  46,  128,  145,  80)
  region( 50,  60,  -10,    2,  55)
  region( 12,  38,   32,   65, 120)
  return dots
}

export function Globe({ style }: { style?: React.CSSProperties }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const landRef   = useRef<[number, number][] | null>(null)
  const stRef     = useRef({
    rotX: -0.28, rotY: 0.5,
    targetRotX: -0.28, targetRotY: 0.5,
    dragging: false, lastMX: 0, lastMY: 0,
    autoSpeed: 0.0008, animId: 0,
    W: 0, H: 0, R: 0, cx: 0, cy: 0,
  })

  useEffect(() => {
    if (!landRef.current) landRef.current = generateLand()

    const canvas = canvasRef.current as HTMLCanvasElement
    const ctx    = canvas?.getContext('2d') as CanvasRenderingContext2D
    if (!canvas || !ctx) return

    const dpr = window.devicePixelRatio || 1
    const s   = stRef.current

    function resize() {
      const parent = canvas.parentElement
      if (!parent) return
      const size = Math.max(parent.clientWidth, 160)
      canvas.width  = size * dpr
      canvas.height = size * dpr
      canvas.style.width  = size + 'px'
      canvas.style.height = size + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      s.W = size; s.H = size
      s.R  = size * 0.44
      s.cx = size / 2
      s.cy = size / 2
    }

    function project(lat: number, lng: number): [number, number, number] | null {
      const x = Math.cos(lat) * Math.sin(lng - s.rotY)
      const y = Math.sin(lat) * Math.cos(s.rotX) - Math.cos(lat) * Math.sin(s.rotX) * Math.cos(lng - s.rotY)
      const z = Math.sin(lat) * Math.sin(s.rotX) + Math.cos(lat) * Math.cos(s.rotX) * Math.cos(lng - s.rotY)
      return z > 0 ? [s.cx + x * s.R, s.cy - y * s.R, z] : null
    }

    function draw() {
      const { W, H, R, cx, cy } = s
      ctx.clearRect(0, 0, W, H)

      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.fillStyle = '#EBE8E0'
      ctx.fill()
      ctx.strokeStyle = 'rgba(44,74,62,0.16)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      ctx.lineWidth = 0.5
      ctx.strokeStyle = 'rgba(44,74,62,0.055)'
      for (let lng = -180; lng <= 180; lng += 30) {
        let go = false
        for (let lat = -88; lat <= 88; lat += 2) {
          const p = project(lat * TO_RAD, lng * TO_RAD)
          if (p) { if (!go) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); go = true } else ctx.lineTo(p[0], p[1]) }
          else if (go) { ctx.stroke(); go = false }
        }
        if (go) ctx.stroke()
      }
      for (let lat = -60; lat <= 60; lat += 30) {
        let go = false
        for (let lng = -180; lng <= 180; lng += 2) {
          const p = project(lat * TO_RAD, lng * TO_RAD)
          if (p) { if (!go) { ctx.beginPath(); ctx.moveTo(p[0], p[1]); go = true } else ctx.lineTo(p[0], p[1]) }
          else if (go) { ctx.stroke(); go = false }
        }
        if (go) ctx.stroke()
      }

      const land = landRef.current!
      ctx.strokeStyle = 'rgba(44,74,62,0.07)'
      ctx.lineWidth = 0.6
      for (let i = 0; i + 1 < land.length; i += 3) {
        const p1 = project(land[i][0], land[i][1])
        if (!p1) continue
        const p2 = project(land[i + 1][0], land[i + 1][1])
        if (!p2) continue
        const dx = p2[0] - p1[0], dy = p2[1] - p1[1]
        if (dx * dx + dy * dy < 400) {
          ctx.beginPath(); ctx.moveTo(p1[0], p1[1]); ctx.lineTo(p2[0], p2[1]); ctx.stroke()
        }
      }

      for (const [lat, lng] of land) {
        const p = project(lat, lng)
        if (!p) continue
        ctx.beginPath()
        ctx.arc(p[0], p[1], 1.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(44,74,62,${(0.15 + p[2] * 0.26).toFixed(2)})`
        ctx.fill()
      }

      for (const [lat, lng] of HUBS) {
        const p = project(lat, lng)
        if (!p) continue
        const d = p[2]
        ctx.beginPath(); ctx.arc(p[0], p[1], 12,  0, Math.PI * 2)
        ctx.fillStyle = `rgba(176,96,32,${(0.04 + d * 0.07).toFixed(3)})`; ctx.fill()
        ctx.beginPath(); ctx.arc(p[0], p[1], 7,   0, Math.PI * 2)
        ctx.fillStyle = `rgba(176,96,32,${(0.09 + d * 0.12).toFixed(3)})`; ctx.fill()
        ctx.beginPath(); ctx.arc(p[0], p[1], 3.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(176,96,32,${(0.48 + d * 0.42).toFixed(3)})`; ctx.fill()
        ctx.beginPath(); ctx.arc(p[0], p[1], 1.6, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220,140,70,${(0.5 + d * 0.46).toFixed(3)})`; ctx.fill()
      }
    }

    function loop() {
      if (!s.dragging) s.targetRotY += s.autoSpeed
      s.rotY += (s.targetRotY - s.rotY) * 0.06
      s.rotX += (s.targetRotX - s.rotX) * 0.06
      draw()
      s.animId = requestAnimationFrame(loop)
    }

    const onMouseDown = (e: MouseEvent) => {
      s.dragging = true; s.lastMX = e.clientX; s.lastMY = e.clientY; s.autoSpeed = 0
    }
    const onMouseMove = (e: MouseEvent) => {
      if (s.dragging) {
        s.targetRotY += (e.clientX - s.lastMX) * 0.005
        s.targetRotX  = Math.max(-1.2, Math.min(1.2, s.targetRotX + (e.clientY - s.lastMY) * 0.003))
        s.lastMX = e.clientX; s.lastMY = e.clientY
      } else {
        const rect = canvas.getBoundingClientRect()
        const mx = (e.clientX - rect.left)  / rect.width  - 0.5
        const my = (e.clientY - rect.top)   / rect.height - 0.5
        if (Math.abs(mx) < 0.6 && Math.abs(my) < 0.6) {
          s.targetRotY += mx * 0.0003
          s.targetRotX  = Math.max(-1.2, Math.min(1.2, -0.28 + my * 0.3))
        }
      }
    }
    const onMouseUp   = () => { if (s.dragging) { s.dragging = false; s.autoSpeed = 0.0008 } }
    const onTouchStart = (e: TouchEvent) => {
      s.dragging = true; s.lastMX = e.touches[0].clientX; s.lastMY = e.touches[0].clientY; s.autoSpeed = 0
    }
    const onTouchMove  = (e: TouchEvent) => {
      if (!s.dragging) return
      s.targetRotY += (e.touches[0].clientX - s.lastMX) * 0.005
      s.targetRotX  = Math.max(-1.2, Math.min(1.2, s.targetRotX + (e.touches[0].clientY - s.lastMY) * 0.003))
      s.lastMX = e.touches[0].clientX; s.lastMY = e.touches[0].clientY
    }
    const onTouchEnd = () => { s.dragging = false; s.autoSpeed = 0.0008 }

    resize()
    loop()

    canvas.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup',   onMouseUp)
    canvas.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove',  onTouchMove as EventListener, { passive: true })
    window.addEventListener('touchend',   onTouchEnd)

    const ro = new ResizeObserver(resize)
    if (canvas.parentElement) ro.observe(canvas.parentElement)

    return () => {
      cancelAnimationFrame(s.animId)
      canvas.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup',   onMouseUp)
      canvas.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove',  onTouchMove as EventListener)
      window.removeEventListener('touchend',   onTouchEnd)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', cursor: 'grab', userSelect: 'none', ...style }}
    />
  )
}
