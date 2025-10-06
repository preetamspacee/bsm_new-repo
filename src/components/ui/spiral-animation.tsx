'use client'

import { useEffect, useRef, useState } from "react"

interface SpiralProps {
  totalDots?: number
  dotRadius?: number
  duration?: number
  dotColor?: string
  backgroundColor?: string
  margin?: number
  minOpacity?: number
  maxOpacity?: number
  minScale?: number
  maxScale?: number
  useMultipleColors?: boolean
  colors?: { color: string }[]
  className?: string
  style?: React.CSSProperties
}

export default function SpiralAnimation(props: SpiralProps) {
  const {
    totalDots = 400,
    dotRadius = 1.5,
    duration = 4,
    dotColor = "#00C3FF",
    backgroundColor = "transparent",
    margin = 2,
    minOpacity = 0.2,
    maxOpacity = 0.8,
    minScale = 0.3,
    maxScale = 1.2,
    useMultipleColors = true,
    colors = [
      { color: "#00C3FF" },
      { color: "#3E6FF6" },
      { color: "#8B5CF6" },
      { color: "#06B6D4" },
    ],
    className = "",
    style = {},
  } = props

  const svgRef = useRef<SVGSVGElement>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!svgRef.current || !mounted) return

    const svg = svgRef.current
    const SIZE = 400
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
    const CENTER = SIZE / 2
    const MAX_RADIUS = CENTER - margin - dotRadius

    // Clear existing content
    svg.innerHTML = ""

    // Generate dots
    for (let i = 0; i < totalDots; i++) {
      const idx = i + 0.5
      const frac = idx / totalDots
      const r = Math.sqrt(frac) * MAX_RADIUS
      const theta = idx * GOLDEN_ANGLE
      const x = CENTER + r * Math.cos(theta)
      const y = CENTER + r * Math.sin(theta)

      // Determine dot color
      let currentColor = dotColor
      if (useMultipleColors && colors.length > 0) {
        const colorIndex = Math.floor(frac * colors.length)
        currentColor = colors[Math.min(colorIndex, colors.length - 1)].color
      }

      // Create circle
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
      circle.setAttribute("cx", x.toString())
      circle.setAttribute("cy", y.toString())
      circle.setAttribute("r", dotRadius.toString())
      circle.setAttribute("fill", currentColor)
      circle.setAttribute("opacity", "0")

      // Color animation for multiple colors
      if (useMultipleColors && colors.length > 1) {
        const colorValues = colors.map((c) => c.color).join(";")
        const animColor = document.createElementNS("http://www.w3.org/2000/svg", "animate")
        animColor.setAttribute("attributeName", "fill")
        animColor.setAttribute("values", colorValues)
        animColor.setAttribute("dur", `${duration}s`)
        animColor.setAttribute("begin", `${frac * duration}s`)
        animColor.setAttribute("repeatCount", "indefinite")
        animColor.setAttribute("calcMode", "linear")
        circle.appendChild(animColor)
      }

      // Radius animation
      const animR = document.createElementNS("http://www.w3.org/2000/svg", "animate")
      animR.setAttribute("attributeName", "r")
      animR.setAttribute(
        "values",
        `${dotRadius * minScale};${dotRadius * maxScale};${dotRadius * minScale}`
      )
      animR.setAttribute("dur", `${duration}s`)
      animR.setAttribute("begin", `${frac * duration}s`)
      animR.setAttribute("repeatCount", "indefinite")
      animR.setAttribute("calcMode", "spline")
      animR.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1")
      circle.appendChild(animR)

      // Opacity animation
      const animO = document.createElementNS("http://www.w3.org/2000/svg", "animate")
      animO.setAttribute("attributeName", "opacity")
      animO.setAttribute("values", `${minOpacity};${maxOpacity};${minOpacity}`)
      animO.setAttribute("dur", `${duration}s`)
      animO.setAttribute("begin", `${frac * duration}s`)
      animO.setAttribute("repeatCount", "indefinite")
      animO.setAttribute("calcMode", "spline")
      animO.setAttribute("keySplines", "0.4 0 0.6 1;0.4 0 0.6 1")
      circle.appendChild(animO)

      svg.appendChild(circle)
    }
  }, [
    totalDots,
    dotRadius,
    duration,
    dotColor,
    backgroundColor,
    margin,
    minOpacity,
    maxOpacity,
    minScale,
    maxScale,
    mounted,
    useMultipleColors,
    colors,
  ])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundColor,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      <svg
        ref={svgRef}
        width="400"
        height="400"
        viewBox="0 0 400 400"
        className="w-full h-full max-w-none max-h-none"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          width: "auto",
          height: "auto",
        }}
      />
    </div>
  )
}
