import Link from "next/link"
import { Baby, GraduationCap } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-patuco-yellow-light to-white p-6">
      <div className="mb-8 text-center">
        <div className="text-6xl mb-4">🐥</div>
        <h1 className="text-3xl font-bold text-foreground">Patuco App</h1>
        <p className="text-muted-foreground mt-2">Escuela Infantil Patuco</p>
        <p className="text-sm text-muted-foreground mt-1">Calle Castillejos, 24-26 · Madrid</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-lg mt-4">
        <Link
          href="/padre"
          className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-white border-2 border-patuco-yellow/30 shadow-sm hover:shadow-lg hover:border-patuco-yellow transition-all duration-200 hover:-translate-y-1"
        >
          <div className="w-16 h-16 rounded-full bg-patuco-yellow-light flex items-center justify-center group-hover:bg-patuco-yellow/20 transition-colors">
            <Baby className="w-8 h-8 text-patuco-orange" />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-foreground">Soy Familia</h2>
            <p className="text-sm text-muted-foreground mt-1">Ver el dia a dia de mi hijo/a</p>
          </div>
        </Link>

        <Link
          href="/profesora"
          className="group flex flex-col items-center gap-4 p-8 rounded-2xl bg-white border-2 border-patuco-green/30 shadow-sm hover:shadow-lg hover:border-patuco-green transition-all duration-200 hover:-translate-y-1"
        >
          <div className="w-16 h-16 rounded-full bg-patuco-green-light flex items-center justify-center group-hover:bg-patuco-green/20 transition-colors">
            <GraduationCap className="w-8 h-8 text-patuco-green" />
          </div>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-foreground">Soy Profesora</h2>
            <p className="text-sm text-muted-foreground mt-1">Gestionar el aula y alumnos</p>
          </div>
        </Link>
      </div>

      <p className="mt-12 text-xs text-muted-foreground">Demo MVP · Patuco App v0.1</p>
    </div>
  )
}
