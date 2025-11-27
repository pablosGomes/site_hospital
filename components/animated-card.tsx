"use client"

import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  delay?: number
  hover?: "lift" | "glow" | "scale" | "border"
  onClick?: () => void
}

export function AnimatedCard({ children, className, delay = 0, hover = "lift", onClick }: AnimatedCardProps) {
  const hoverClasses = {
    lift: "hover:-translate-y-1 hover:shadow-lg",
    glow: "hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]",
    scale: "hover:scale-[1.02]",
    border: "hover:border-blue-300",
  }

  return (
    <Card
      onClick={onClick}
      className={cn(
        "opacity-0 animate-fade-in-up fill-both transition-all duration-300 cursor-pointer",
        hoverClasses[hover],
        className,
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </Card>
  )
}
