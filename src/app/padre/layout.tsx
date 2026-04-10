'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Home, CalendarDays, Camera, BarChart3, CalendarHeart, MessageCircle, Bell, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNotificaciones } from "@/lib/use-demo-store"
import { alumnos, getAula } from "@/lib/data"
import { LegalFooter } from "@/components/shared/legal-footer"

const DEMO_ALUMNO = alumnos.find(a => a.id === 'alumno-4')!
const DEMO_AULA = getAula(DEMO_ALUMNO.aulaId)!

const navItems = [
  { href: '/padre/inicio', label: 'Inicio', icon: Home },
  { href: '/padre/dia', label: 'Dia', icon: CalendarDays },
  { href: '/padre/estadisticas', label: 'Stats', icon: BarChart3 },
  { href: '/padre/fotos', label: 'Fotos', icon: Camera },
  { href: '/padre/calendario', label: 'Agenda', icon: CalendarHeart },
  { href: '/padre/mensajes', label: 'Chat', icon: MessageCircle },
]

export default function PadreLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const notificaciones = useNotificaciones()
  const unread = notificaciones.filter(n => !n.leida).length

  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAF8]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/40 px-4 py-2.5">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <Link href="/" className="w-8 h-8 relative flex-shrink-0">
            <Image src="/logo-patuco.jpg" alt="Patuco" fill className="object-contain rounded-lg" />
          </Link>
          <div className="text-center flex-1 min-w-0 mx-3">
            <h1 className="text-sm font-semibold leading-tight truncate">{DEMO_ALUMNO.nombre} {DEMO_ALUMNO.apellidos}</h1>
            <p className="text-[11px] text-muted-foreground">{DEMO_AULA.emoji} Aula {DEMO_AULA.nombre} · {DEMO_AULA.grupoEdad} anos</p>
          </div>
          <div className="flex items-center gap-1">
            <Link href="/padre/notificaciones" className="relative p-1.5">
              <Bell className="w-5 h-5 text-muted-foreground" />
              {unread > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unread}
                </span>
              )}
            </Link>
            <Link href="/padre/perfil" className="p-1.5">
              <User className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-5">
        {children}
        <LegalFooter />
      </main>

      {/* Bottom navigation */}
      <nav className="sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-border/40 px-2 pb-[env(safe-area-inset-bottom)]">
        <div className="max-w-lg mx-auto flex justify-around">
          {navItems.map(item => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-2.5 text-[11px] transition-colors",
                  isActive ? "text-amber-600 font-medium" : "text-muted-foreground/70"
                )}
              >
                <item.icon className={cn("w-[22px] h-[22px]", isActive ? "text-amber-600" : "text-muted-foreground/50")} strokeWidth={isActive ? 2.2 : 1.6} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
