'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CalendarDays, Camera, UtensilsCrossed, MessageCircle, Bell, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useNotificaciones } from "@/lib/use-demo-store"
import { alumnos, padres, getAula } from "@/lib/data"

const DEMO_PADRE_ID = 'padre-2' // Elena - madre de Lucía
const DEMO_ALUMNO = alumnos.find(a => a.id === 'alumno-4')! // Lucía
const DEMO_AULA = getAula(DEMO_ALUMNO.aulaId)!

const navItems = [
  { href: '/padre/inicio', label: 'Inicio', icon: Home },
  { href: '/padre/dia', label: 'Dia', icon: CalendarDays },
  { href: '/padre/fotos', label: 'Fotos', icon: Camera },
  { href: '/padre/menu', label: 'Menu', icon: UtensilsCrossed },
  { href: '/padre/mensajes', label: 'Chat', icon: MessageCircle },
  { href: '/padre/notificaciones', label: 'Avisos', icon: Bell },
]

export default function PadreLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const notificaciones = useNotificaciones()
  const unread = notificaciones.filter(n => !n.leida).length

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-xl">🐥</span>
            <div>
              <h1 className="text-sm font-semibold leading-tight">{DEMO_ALUMNO.nombre} {DEMO_ALUMNO.apellidos}</h1>
              <p className="text-xs text-muted-foreground">{DEMO_AULA.emoji} Aula {DEMO_AULA.nombre}</p>
            </div>
          </div>
          <Link href="/padre/notificaciones" className="relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-4">
        {children}
      </main>

      {/* Bottom navigation */}
      <nav className="sticky bottom-0 bg-white border-t border-border px-2 py-1 safe-area-bottom">
        <div className="max-w-lg mx-auto flex justify-around">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg text-xs transition-colors",
                  isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon className={cn("w-5 h-5", isActive && "text-primary")} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
