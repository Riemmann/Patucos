'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, ClipboardList, Users, Camera, ClipboardCheck, Bell, MessageCircle, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

const navItems = [
  { href: '/profesora/panel', label: 'Panel', icon: LayoutDashboard },
  { href: '/profesora/registro', label: 'Registro', icon: ClipboardList },
  { href: '/profesora/alumnos', label: 'Alumnos', icon: Users },
  { href: '/profesora/asistencia', label: 'Asistencia', icon: ClipboardCheck },
  { href: '/profesora/fotos', label: 'Fotos', icon: Camera },
  { href: '/profesora/notificaciones', label: 'Avisos', icon: Bell },
  { href: '/profesora/mensajes', label: 'Mensajes', icon: MessageCircle },
]

export default function ProfesoraLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex w-56 flex-col border-r border-border bg-white p-4">
        <Link href="/" className="flex items-center gap-2 mb-6 px-2">
          <span className="text-2xl">🐥</span>
          <div>
            <p className="text-sm font-bold leading-tight">Patuco App</p>
            <p className="text-[10px] text-muted-foreground">Panel Profesora</p>
          </div>
        </Link>

        <nav className="space-y-1 flex-1">
          {navItems.map(item => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                  isActive
                    ? "bg-patuco-green-light text-patuco-green font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t pt-3 mt-3">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-full bg-patuco-green-light flex items-center justify-center text-sm">MG</div>
            <div>
              <p className="text-xs font-medium">Maria Garcia</p>
              <p className="text-[10px] text-muted-foreground">Profesora · Patitos</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-50 bg-white border-b border-border px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-muted-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-xl">🐥</span>
              <span className="text-sm font-bold">Patuco · Profesora</span>
            </div>
            <div className="w-5" />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden sticky bottom-0 bg-white border-t border-border px-1 py-1">
          <div className="flex justify-around">
            {navItems.slice(0, 5).map(item => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-2 py-2 rounded-lg text-[10px] transition-colors",
                    isActive ? "text-patuco-green font-medium" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
