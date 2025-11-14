"use client"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import type React from "react"
import { useEffect, useRef } from "react"

type DottedSurfaceProps = Omit<React.ComponentProps<"div">, "ref">

export function DottedSurface({ className, ...props }: DottedSurfaceProps) {
  const { theme } = useTheme()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()

    // Particle configuration
    const SEPARATION = 80
    const AMOUNTX = Math.floor(window.innerWidth / SEPARATION) + 5
    const AMOUNTY = Math.floor(window.innerHeight / SEPARATION) + 5

    // Create particles
    const particles: { x: number; y: number; baseY: number; ix: number; iy: number }[] = []

    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        const x = ix * SEPARATION - SEPARATION * 2
        const y = iy * SEPARATION - SEPARATION * 2

        particles.push({
          x,
          y,
          baseY: y,
          ix,
          iy,
        })
      }
    }

    let count = 0

    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set particle color based on theme
      const particleColor = theme === "dark" ? "rgba(200, 200, 255, 0.4)" : "rgba(100, 100, 120, 0.3)"

      // Draw particles
      particles.forEach((particle) => {
        // Calculate wave animation
        const waveY = Math.sin((particle.ix + count) * 0.3) * 30 + Math.sin((particle.iy + count) * 0.5) * 30

        const finalY = particle.baseY + waveY

        // Draw particle
        ctx.fillStyle = particleColor
        ctx.beginPath()
        ctx.arc(particle.x, finalY, 3, 0, Math.PI * 2)
        ctx.fill()
      })

      count += 0.05
      animationRef.current = requestAnimationFrame(animate)
    }

    // Start animation
    animate()

    // Handle window resize
    const handleResize = () => {
      updateSize()
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [theme])

  return (
    <div className={cn("pointer-events-none fixed inset-0 z-0", className)} {...props}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
