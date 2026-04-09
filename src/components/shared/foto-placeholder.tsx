'use client'

import Image from "next/image"
import { ImageIcon } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface FotoDisplayProps {
  src: string
  alt: string
  fill?: boolean
  className?: string
}

export function FotoDisplay({ src, alt, fill = true, className }: FotoDisplayProps) {
  const [error, setError] = useState(false)

  if (error || !src) {
    return (
      <div className={cn("bg-muted/50 flex flex-col items-center justify-center gap-1", fill ? "absolute inset-0" : "w-full h-full", className)}>
        <ImageIcon className="w-8 h-8 text-muted-foreground/30" />
        <span className="text-[10px] text-muted-foreground/40">Foto pendiente</span>
      </div>
    )
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={cn("object-cover", className)}
      onError={() => setError(true)}
    />
  )
}
