'use client'

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, CheckCircle, Clock, Camera, Bell, ClipboardList, MessageCircle } from "lucide-react"
import { aulas, getAlumnosByAula } from "@/lib/data"
import { useRegistros, useAsistencias } from "@/lib/use-demo-store"
import { ESTADO_ANIMO_EMOJI } from "@/lib/constants"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"

const hoyStr = new Date().toISOString().split('T')[0]

export default function ProfesoraPanelPage() {
  const [aulaId, setAulaId] = useState('aula-2')
  const registros = useRegistros()
  const asistencias = useAsistencias()

  const aula = aulas.find(a => a.id === aulaId)!
  const alumnosAula = getAlumnosByAula(aulaId)

  const presentes = alumnosAula.filter(a => asistencias.find(as => as.alumnoId === a.id && as.fecha === hoyStr && as.horaEntrada))
  const conRegistro = alumnosAula.filter(a => {
    const reg = registros.find(r => r.alumnoId === a.id && r.fecha === hoyStr)
    return reg && reg.comentarioGeneral
  })
  const pendientes = alumnosAula.length - conRegistro.length

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Panel del Aula</h1>
        <p className="text-sm text-muted-foreground capitalize">
          {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Classroom tabs */}
      <Tabs value={aulaId} onValueChange={setAulaId}>
        <TabsList className="grid w-full grid-cols-3 h-10">
          {aulas.map(a => (
            <TabsTrigger key={a.id} value={a.id} className="text-xs gap-1.5">
              <span>{a.emoji}</span> {a.nombre}
              <span className="text-muted-foreground">({a.grupoEdad})</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="border-border/40">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center mx-auto">
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-2xl font-bold mt-2 tabular-nums">{presentes.length}<span className="text-muted-foreground text-sm font-normal">/{alumnosAula.length}</span></p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Presentes</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center mx-auto">
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <p className="text-2xl font-bold mt-2 tabular-nums">{pendientes}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Pendientes</p>
          </CardContent>
        </Card>
        <Card className="border-border/40">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center mx-auto">
              <CheckCircle className="w-4 h-4 text-sky-600" />
            </div>
            <p className="text-2xl font-bold mt-2 tabular-nums">{conRegistro.length}</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Completados</p>
          </CardContent>
        </Card>
      </div>

      {/* Student grid */}
      <div>
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Alumnos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {alumnosAula.map(alumno => {
            const asis = asistencias.find(a => a.alumnoId === alumno.id && a.fecha === hoyStr)
            const reg = registros.find(r => r.alumnoId === alumno.id && r.fecha === hoyStr)
            const presente = asis && asis.horaEntrada
            const completado = reg && reg.comentarioGeneral
            const ultimoAnimo = reg?.estadosAnimo[reg.estadosAnimo.length - 1]

            return (
              <Link key={alumno.id} href={`/profesora/registro?alumno=${alumno.id}`}>
                <Card className="hover:shadow-md transition-all cursor-pointer border-border/40 hover:border-border">
                  <CardContent className="p-3.5 text-center">
                    <AvatarIniciales nombre={alumno.nombre} apellidos={alumno.apellidos} size="lg" className="mx-auto" />
                    <p className="text-[13px] font-medium mt-2.5 truncate">{alumno.nombre}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{alumno.apellidos.split(' ')[0]}</p>
                    <div className="flex items-center justify-center gap-1.5 mt-2">
                      {presente ? (
                        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 text-[10px] font-medium border-0">Presente</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-50 text-gray-400 text-[10px] border-0">Ausente</Badge>
                      )}
                    </div>
                    {reg && (
                      <div className="flex items-center justify-center gap-1 mt-1.5 text-[11px] text-muted-foreground">
                        {reg.comidas.length > 0 && <span>🍽️{reg.comidas.length}/3</span>}
                        {reg.siestas.length > 0 && <span>😴</span>}
                        {ultimoAnimo && <span>{ESTADO_ANIMO_EMOJI[ultimoAnimo.estado]}</span>}
                      </div>
                    )}
                    <div className="mt-1.5">
                      {completado ? (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mx-auto" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 text-amber-400 mx-auto" />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Acciones rapidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
          {[
            { href: '/profesora/asistencia', icon: ClipboardList, label: 'Asistencia', color: 'text-emerald-600 bg-emerald-50' },
            { href: '/profesora/fotos', icon: Camera, label: 'Subir fotos', color: 'text-sky-600 bg-sky-50' },
            { href: '/profesora/notificaciones', icon: Bell, label: 'Enviar aviso', color: 'text-amber-600 bg-amber-50' },
            { href: '/profesora/mensajes', icon: MessageCircle, label: 'Mensajes', color: 'text-violet-600 bg-violet-50' },
          ].map(action => (
            <Link key={action.href} href={action.href}>
              <Button variant="outline" className="w-full h-auto py-3.5 flex-col gap-1.5 border-border/40 hover:border-border">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${action.color}`}>
                  <action.icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
