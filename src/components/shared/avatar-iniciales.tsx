'use client'

import { cn } from "@/lib/utils"

const COLORS = [
  'bg-amber-100 text-amber-700',
  'bg-emerald-100 text-emerald-700',
  'bg-sky-100 text-sky-700',
  'bg-violet-100 text-violet-700',
  'bg-rose-100 text-rose-700',
  'bg-teal-100 text-teal-700',
  'bg-orange-100 text-orange-700',
  'bg-indigo-100 text-indigo-700',
  'bg-pink-100 text-pink-700',
  'bg-cyan-100 text-cyan-700',
]

function getColor(name: string): string {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return COLORS[Math.abs(hash) % COLORS.length]
}

function getInitials(nombre: string, apellidos?: string): string {
  const first = nombre.charAt(0).toUpperCase()
  const last = apellidos ? apellidos.charAt(0).toUpperCase() : ''
  return first + last
}

interface AvatarInicialesProps {
  nombre: string
  apellidos?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
}

const sizeClasses = {
  xs: 'w-6 h-6 text-[10px]',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-base',
  xl: 'w-20 h-20 text-xl',
}

export function AvatarIniciales({ nombre, apellidos, size = 'md', className }: AvatarInicialesProps) {
  const initials = getInitials(nombre, apellidos)
  const color = getColor(nombre + (apellidos || ''))

  return (
    <div className={cn(
      'rounded-full flex items-center justify-center font-semibold flex-shrink-0 ring-2 ring-white shadow-sm',
      sizeClasses[size],
      color,
      className
    )}>
      {initials}
    </div>
  )
}
