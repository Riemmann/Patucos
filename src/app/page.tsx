import Link from "next/link"
import Image from "next/image"
import { Baby, GraduationCap, Shield, ChevronRight } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAF8] p-6">
      {/* Logo + branding */}
      <div className="mb-10 text-center">
        <div className="w-24 h-24 mx-auto mb-5 relative">
          <Image
            src="/logo-patuco.jpg"
            alt="Patuco"
            fill
            className="object-contain rounded-2xl shadow-md"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Escuela Infantil Patuco
        </h1>
        <p className="text-sm text-muted-foreground mt-1.5 tracking-wide">
          Agenda Digital
        </p>
      </div>

      {/* Role cards */}
      <div className="w-full max-w-sm space-y-3">
        <Link
          href="/padre"
          className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
            <Baby className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15px] font-semibold text-foreground">Acceso Familias</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Ver el dia a dia de tu hijo/a</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
        </Link>

        <Link
          href="/profesora"
          className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-100 transition-colors">
            <GraduationCap className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15px] font-semibold text-foreground">Acceso Profesoras</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Gestionar aula y registro diario</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
        </Link>

        <Link
          href="/direccion"
          className="group flex items-center gap-4 p-5 rounded-2xl bg-white border border-border/60 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center flex-shrink-0 group-hover:bg-indigo-100 transition-colors">
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-[15px] font-semibold text-foreground">Acceso Direccion</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Gestion del centro y administracion</p>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
        </Link>
      </div>

      <div className="mt-14 text-center">
        <p className="text-[11px] text-muted-foreground/60 tracking-wide uppercase">
          C/ Castillejos, 24-26 · 28039 Madrid
        </p>
        <p className="text-[11px] text-muted-foreground/40 mt-1">914 50 67 42</p>
      </div>
    </div>
  )
}
