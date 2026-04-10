'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users, GraduationCap, UserCheck, Shield } from "lucide-react"
import { cn } from "@/lib/utils"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"

const navItems = [
  { href: '/direccion/panel', label: 'Panel', icon: LayoutDashboard },
  { href: '/direccion/alumnos', label: 'Alumnos', icon: Users },
  { href: '/direccion/profesoras', label: 'Profesoras', icon: GraduationCap },
  { href: '/direccion/familias', label: 'Familias', icon: UserCheck },
]

export default function DireccionLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-[#FAFAF8]">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex w-[220px] flex-col border-r border-border/40 bg-white p-4">
        <Link href="/" className="flex items-center gap-2.5 mb-8 px-2">
          <div className="w-9 h-9 relative flex-shrink-0">
            <Image src="/logo-patuco.jpg" alt="Patuco" fill className="object-contain rounded-lg" />
          </div>
          <div>
            <p className="text-[13px] font-bold leading-tight">Patuco</p>
            <p className="text-[10px] text-muted-foreground">Direccion</p>
          </div>
        </Link>

        <nav className="space-y-0.5 flex-1">
          {navItems.map(item => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors",
                  isActive
                    ? "bg-indigo-50 text-indigo-700 font-medium"
                    : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                )}
              >
                <item.icon className="w-4 h-4" strokeWidth={isActive ? 2.2 : 1.6} />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border/40 pt-3 mt-3">
          <div className="flex items-center gap-2.5 px-2">
            <AvatarIniciales nombre="Ana" apellidos="Perez" size="sm" />
            <div>
              <p className="text-xs font-medium">Ana Perez</p>
              <p className="text-[10px] text-muted-foreground">Directora</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile header */}
        <header className="md:hidden sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-border/40 px-4 py-2.5">
          <div className="flex items-center justify-between">
            <Link href="/" className="w-8 h-8 relative">
              <Image src="/logo-patuco.jpg" alt="Patuco" fill className="object-contain rounded-lg" />
            </Link>
            <span className="text-sm font-semibold">Direccion</span>
            <AvatarIniciales nombre="Ana" apellidos="Perez" size="sm" />
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 max-w-5xl w-full mx-auto">
          {children}
        </main>

        {/* Mobile bottom nav */}
        <nav className="md:hidden sticky bottom-0 bg-white/90 backdrop-blur-md border-t border-border/40 px-1 pb-[env(safe-area-inset-bottom)]">
          <div className="flex justify-around">
            {navItems.map(item => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col items-center gap-0.5 px-3 py-2.5 text-[11px] transition-colors",
                    isActive ? "text-indigo-600 font-medium" : "text-muted-foreground/70"
                  )}
                >
                  <item.icon className={cn("w-[22px] h-[22px]", isActive ? "text-indigo-600" : "text-muted-foreground/50")} strokeWidth={isActive ? 2.2 : 1.6} />
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
