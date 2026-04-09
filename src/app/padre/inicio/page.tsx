'use client'

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Camera, ChevronRight, Moon, MessageSquare, CalendarDays } from "lucide-react"
import { alumnos, getAula, getFotosAlumno, getProfesor } from "@/lib/data"
import { useRegistro, useAsistencia, useNotificaciones } from "@/lib/use-demo-store"
import { CANTIDAD_LABELS, CANTIDAD_EMOJI, TIPO_COMIDA_ICONS, TIPO_COMIDA_LABELS, ESTADO_ANIMO_EMOJI, ESTADO_ANIMO_LABELS, TIPO_NOTIFICACION_EMOJI, PRIORIDAD_COLORS } from "@/lib/constants"

const ALUMNO = alumnos.find(a => a.id === 'alumno-4')!
const AULA = getAula(ALUMNO.aulaId)!
const hoyStr = new Date().toISOString().split('T')[0]

function calcEdad(fechaNac: string): string {
  const nacimiento = new Date(fechaNac)
  const hoy = new Date()
  const meses = (hoy.getFullYear() - nacimiento.getFullYear()) * 12 + (hoy.getMonth() - nacimiento.getMonth())
  if (meses < 12) return `${meses} meses`
  const anos = Math.floor(meses / 12)
  const resto = meses % 12
  return resto > 0 ? `${anos} año${anos > 1 ? 's' : ''} y ${resto} mes${resto > 1 ? 'es' : ''}` : `${anos} año${anos > 1 ? 's' : ''}`
}

export default function PadreInicioPage() {
  const registro = useRegistro(ALUMNO.id, hoyStr)
  const asistencia = useAsistencia(ALUMNO.id, hoyStr)
  const notificaciones = useNotificaciones()
  const fotos = getFotosAlumno(ALUMNO.id, hoyStr)
  const profesor = registro ? getProfesor(registro.profesorId) : null
  const unreadNotifs = notificaciones.filter(n => !n.leida).slice(0, 3)

  const hoyFormatted = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="space-y-4">
      {/* Child profile header */}
      <Card className="border-0 shadow-none bg-gradient-to-r from-patuco-yellow-light to-patuco-green-light">
        <CardContent className="p-4 flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md flex-shrink-0">
            <Image src={ALUMNO.fotoUrl} alt={ALUMNO.nombre} fill className="object-cover" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">{ALUMNO.nombre} {ALUMNO.apellidos}</h2>
            <p className="text-sm text-muted-foreground">{calcEdad(ALUMNO.fechaNacimiento)} · {AULA.emoji} Aula {AULA.nombre}</p>
            {asistencia?.horaEntrada && (
              <p className="text-xs text-patuco-green mt-1">Entrada a las {asistencia.horaEntrada}h</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Date */}
      <p className="text-sm text-muted-foreground capitalize text-center">{hoyFormatted}</p>

      {/* Meals summary */}
      {registro && registro.comidas.length > 0 && (
        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <CardTitle className="text-sm font-medium flex items-center gap-2">🍽️ Comidas de hoy</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-3 gap-3">
              {registro.comidas.map(comida => (
                <div key={comida.id} className="text-center p-3 rounded-xl bg-muted/50">
                  <p className="text-lg">{TIPO_COMIDA_ICONS[comida.tipo]}</p>
                  <p className="text-xs font-medium mt-1">{TIPO_COMIDA_LABELS[comida.tipo]}</p>
                  <p className="text-lg mt-1">{CANTIDAD_EMOJI[comida.cantidad]}</p>
                  <Badge variant="secondary" className="mt-1 text-[10px]">
                    {CANTIDAD_LABELS[comida.cantidad]}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Nap + Mood row */}
      {registro && (
        <div className="grid grid-cols-2 gap-3">
          {registro.siestas.length > 0 && (
            <Card>
              <CardContent className="p-4 text-center">
                <Moon className="w-5 h-5 mx-auto text-patuco-blue" />
                <p className="text-xs font-medium mt-2">Siesta</p>
                <p className="text-sm font-semibold mt-1">
                  {registro.siestas[0].horaInicio} - {registro.siestas[0].horaFin || '...'}
                </p>
                {registro.siestas[0].horaFin && (
                  <p className="text-xs text-muted-foreground">
                    {(() => {
                      const [h1, m1] = registro.siestas[0].horaInicio.split(':').map(Number)
                      const [h2, m2] = (registro.siestas[0].horaFin || '').split(':').map(Number)
                      const mins = (h2 * 60 + m2) - (h1 * 60 + m1)
                      return `${Math.floor(mins / 60)}h ${mins % 60}min`
                    })()}
                  </p>
                )}
              </CardContent>
            </Card>
          )}
          {registro.estadosAnimo.length > 0 && (
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-2xl">{ESTADO_ANIMO_EMOJI[registro.estadosAnimo[registro.estadosAnimo.length - 1].estado]}</p>
                <p className="text-xs font-medium mt-2">Estado de animo</p>
                <p className="text-sm font-semibold mt-1">
                  {ESTADO_ANIMO_LABELS[registro.estadosAnimo[registro.estadosAnimo.length - 1].estado]}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Teacher comment */}
      {registro?.comentarioGeneral && (
        <Card className="border-patuco-yellow/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {profesor && (
                <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={profesor.fotoUrl} alt={profesor.nombre} fill className="object-cover" />
                </div>
              )}
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-1">
                  <MessageSquare className="w-3 h-3 inline mr-1" />
                  {profesor ? `${profesor.nombre} ${profesor.apellidos}` : 'Profesora'}
                </p>
                <p className="text-sm leading-relaxed">{registro.comentarioGeneral}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photos */}
      {fotos.length > 0 && (
        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Camera className="w-4 h-4" /> Fotos de hoy
              </CardTitle>
              <Link href="/padre/fotos" className="text-xs text-primary flex items-center">
                Ver todas <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="grid grid-cols-3 gap-2">
              {fotos.slice(0, 3).map(foto => (
                <div key={foto.id} className="relative aspect-square rounded-lg overflow-hidden">
                  <Image src={foto.url} alt={foto.descripcion} fill className="object-cover" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Notifications */}
      {unreadNotifs.length > 0 && (
        <Card>
          <CardHeader className="pb-2 px-4 pt-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">🔔 Avisos</CardTitle>
              <Link href="/padre/notificaciones" className="text-xs text-primary flex items-center">
                Ver todos <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="px-4 pb-4 space-y-2">
            {unreadNotifs.map(n => (
              <div key={n.id} className="flex items-start gap-2 p-2 rounded-lg bg-muted/50">
                <span className="text-sm">{TIPO_NOTIFICACION_EMOJI[n.tipo]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{n.titulo}</p>
                  <p className="text-xs text-muted-foreground truncate">{n.contenido}</p>
                </div>
                <Badge variant="secondary" className={`text-[10px] flex-shrink-0 ${PRIORIDAD_COLORS[n.prioridad]}`}>
                  {n.prioridad === 'urgente' ? '!' : ''}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Link to timeline */}
      <Link href="/padre/dia" className="block">
        <Card className="hover:shadow-md transition-shadow cursor-pointer border-primary/20">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Ver timeline completo del dia</span>
            </div>
            <ChevronRight className="w-4 h-4 text-muted-foreground" />
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
