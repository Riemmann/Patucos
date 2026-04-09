'use client'

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, CheckCircle, Clock, Camera, Bell, ClipboardList, MessageCircle } from "lucide-react"
import { aulas, alumnos, getAlumnosByAula } from "@/lib/data"
import { useRegistros, useAsistencias } from "@/lib/use-demo-store"
import { ESTADO_ANIMO_EMOJI } from "@/lib/constants"

const hoyStr = new Date().toISOString().split('T')[0]

export default function ProfesoraPanelPage() {
  const [aulaId, setAulaId] = useState('aula-2') // Default: Patitos
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
        <h1 className="text-xl font-bold">Panel del Aula</h1>
        <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </div>

      {/* Classroom tabs */}
      <Tabs value={aulaId} onValueChange={setAulaId}>
        <TabsList className="grid w-full grid-cols-3">
          {aulas.map(a => (
            <TabsTrigger key={a.id} value={a.id} className="text-xs">
              {a.emoji} {a.nombre} ({a.grupoEdad})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="w-5 h-5 mx-auto text-patuco-green" />
            <p className="text-2xl font-bold mt-1">{presentes.length}/{alumnosAula.length}</p>
            <p className="text-xs text-muted-foreground">Presentes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="w-5 h-5 mx-auto text-patuco-orange" />
            <p className="text-2xl font-bold mt-1">{pendientes}</p>
            <p className="text-xs text-muted-foreground">Pendientes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <CheckCircle className="w-5 h-5 mx-auto text-patuco-blue" />
            <p className="text-2xl font-bold mt-1">{conRegistro.length}</p>
            <p className="text-xs text-muted-foreground">Completados</p>
          </CardContent>
        </Card>
      </div>

      {/* Student grid */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Alumnos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {alumnosAula.map(alumno => {
            const asis = asistencias.find(a => a.alumnoId === alumno.id && a.fecha === hoyStr)
            const reg = registros.find(r => r.alumnoId === alumno.id && r.fecha === hoyStr)
            const presente = asis && asis.horaEntrada
            const completado = reg && reg.comentarioGeneral
            const ultimoAnimo = reg?.estadosAnimo[reg.estadosAnimo.length - 1]

            return (
              <Link key={alumno.id} href={`/profesora/registro?alumno=${alumno.id}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-3 text-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mx-auto mb-2 border-2 border-border">
                      <Image src={alumno.fotoUrl} alt={alumno.nombre} fill className="object-cover" />
                    </div>
                    <p className="text-xs font-medium truncate">{alumno.nombre} {alumno.apellidos.split(' ')[0]}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      {presente ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-[10px]">Presente</Badge>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-500 text-[10px]">Ausente</Badge>
                      )}
                    </div>
                    {reg && (
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {reg.comidas.length > 0 && <span className="text-[10px]">🍽️{reg.comidas.length}/3</span>}
                        {reg.siestas.length > 0 && <span className="text-[10px]">😴</span>}
                        {ultimoAnimo && <span className="text-sm">{ESTADO_ANIMO_EMOJI[ultimoAnimo.estado]}</span>}
                      </div>
                    )}
                    {completado ? (
                      <CheckCircle className="w-3 h-3 text-green-500 mx-auto mt-1" />
                    ) : (
                      <Clock className="w-3 h-3 text-orange-400 mx-auto mt-1" />
                    )}
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Acciones rapidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link href="/profesora/asistencia">
            <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
              <ClipboardList className="w-5 h-5" />
              <span className="text-xs">Asistencia</span>
            </Button>
          </Link>
          <Link href="/profesora/fotos">
            <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
              <Camera className="w-5 h-5" />
              <span className="text-xs">Subir fotos</span>
            </Button>
          </Link>
          <Link href="/profesora/notificaciones">
            <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
              <Bell className="w-5 h-5" />
              <span className="text-xs">Enviar aviso</span>
            </Button>
          </Link>
          <Link href="/profesora/mensajes">
            <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1">
              <MessageCircle className="w-5 h-5" />
              <span className="text-xs">Mensajes</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
