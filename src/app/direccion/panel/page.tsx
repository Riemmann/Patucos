'use client'

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Users, GraduationCap, UserCheck, Baby, Plus, ArrowRight } from "lucide-react"
import { aulas } from "@/lib/data"
import { useAlumnos, useProfesores, usePadres, useAsistencias } from "@/lib/use-demo-store"

const hoyStr = new Date().toISOString().split('T')[0]
const CAPACIDADES: Record<string, number> = { 'aula-1': 8, 'aula-2': 14, 'aula-3': 20 }

export default function DireccionPanelPage() {
  const alumnos = useAlumnos()
  const profesores = useProfesores()
  const padres = usePadres()
  const asistencias = useAsistencias()

  const alumnosActivos = alumnos.filter(a => a.activo)
  const totalCapacidad = Object.values(CAPACIDADES).reduce((a, b) => a + b, 0)
  const profesorasAsignadas = profesores.filter(p => p.aulaId && p.rol === 'profesor')
  const padresConAcceso = padres.filter(p => p.accesoActivo)
  const presentesHoy = asistencias.filter(a => a.fecha === hoyStr && a.horaEntrada).length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Panel de Direccion</h1>
        <p className="text-sm text-muted-foreground capitalize">
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center">
                <Baby className="w-4 h-4 text-indigo-600" />
              </div>
              <Badge variant="secondary" className="text-[10px]">{Math.round(alumnosActivos.length / totalCapacidad * 100)}%</Badge>
            </div>
            <p className="text-2xl font-bold tabular-nums">{alumnosActivos.length}<span className="text-sm font-normal text-muted-foreground">/{totalCapacidad}</span></p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Alumnos matriculados</p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-emerald-600" />
              </div>
            </div>
            <p className="text-2xl font-bold tabular-nums">{profesorasAsignadas.length}<span className="text-sm font-normal text-muted-foreground">/{profesores.filter(p => p.rol === 'profesor').length}</span></p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Profesoras asignadas</p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
                <UserCheck className="w-4 h-4 text-amber-600" />
              </div>
            </div>
            <p className="text-2xl font-bold tabular-nums">{padresConAcceso.length}<span className="text-sm font-normal text-muted-foreground">/{padres.length}</span></p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Familias con acceso</p>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center">
                <Users className="w-4 h-4 text-sky-600" />
              </div>
            </div>
            <p className="text-2xl font-bold tabular-nums">{presentesHoy}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Presentes hoy</p>
          </CardContent>
        </Card>
      </div>

      {/* Ocupacion por aula */}
      <Card className="border-border/40">
        <CardContent className="p-5">
          <h2 className="text-sm font-semibold mb-4">Ocupacion por aula</h2>
          <div className="space-y-4">
            {aulas.map(aula => {
              const enrolled = alumnosActivos.filter(a => a.aulaId === aula.id).length
              const cap = CAPACIDADES[aula.id] || 20
              const pct = Math.round(enrolled / cap * 100)
              const profAsignadas = profesores.filter(p => p.aulaId === aula.id)
              return (
                <div key={aula.id}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span>{aula.emoji}</span>
                      <span className="text-sm font-medium">{aula.nombre}</span>
                      <span className="text-xs text-muted-foreground">({aula.grupoEdad} anos)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold tabular-nums">{enrolled}/{cap}</span>
                      {profAsignadas.length > 0 ? (
                        <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-0">
                          {profAsignadas.map(p => p.nombre).join(', ')}
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px] bg-red-50 text-red-600 border-0">Sin profesora</Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <div>
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Acciones rapidas</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
          <Link href="/direccion/alumnos">
            <Card className="border-border/40 hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Users className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium">Gestionar alumnos</p>
                    <p className="text-[11px] text-muted-foreground">Asignar aulas, ver perfiles</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-indigo-500 transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/direccion/profesoras">
            <Card className="border-border/40 hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium">Gestionar profesoras</p>
                    <p className="text-[11px] text-muted-foreground">Asignar a aulas</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-emerald-500 transition-colors" />
              </CardContent>
            </Card>
          </Link>

          <Link href="/direccion/familias">
            <Card className="border-border/40 hover:shadow-md transition-all cursor-pointer group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium">Gestionar familias</p>
                    <p className="text-[11px] text-muted-foreground">Dar accesos a la app</p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover:text-amber-500 transition-colors" />
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
