'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { alumnos, getFotosAlumno, buildTimeline } from "@/lib/data"
import { useRegistro, useAsistencia } from "@/lib/use-demo-store"
import { CANTIDAD_LABELS, CANTIDAD_EMOJI, CANTIDAD_COLORS, TIPO_COMIDA_LABELS, TIPO_COMIDA_ICONS, CALIDAD_SIESTA_EMOJI, TIPO_PANAL_LABELS, TIPO_ACTIVIDAD_LABELS, TIPO_ACTIVIDAD_EMOJI, ESTADO_ANIMO_EMOJI, ESTADO_ANIMO_LABELS, MOMENTO_LABELS } from "@/lib/constants"
import type { Comida, Siesta, Panal, Actividad, EstadoAnimoEntry, Foto, Asistencia, TimelineEvent } from "@/lib/types"
import { LogIn, LogOut, Moon, Baby, Palette, Smile } from "lucide-react"

const ALUMNO = alumnos.find(a => a.id === 'alumno-4')!
const hoyStr = new Date().toISOString().split('T')[0]

function TimelineIcon({ tipo }: { tipo: TimelineEvent['tipo'] }) {
  const iconMap: Record<string, React.ReactNode> = {
    entrada: <LogIn className="w-4 h-4 text-patuco-green" />,
    salida: <LogOut className="w-4 h-4 text-patuco-orange" />,
    comida: <span className="text-sm">🍽️</span>,
    siesta: <Moon className="w-4 h-4 text-patuco-blue" />,
    panal: <Baby className="w-4 h-4 text-patuco-purple" />,
    actividad: <Palette className="w-4 h-4 text-patuco-yellow" />,
    estado_animo: <Smile className="w-4 h-4 text-patuco-pink" />,
    foto: <span className="text-sm">📸</span>,
    comentario: <span className="text-sm">💬</span>,
  }
  return <>{iconMap[tipo] || <span className="text-sm">•</span>}</>
}

function TimelineCard({ event }: { event: TimelineEvent }) {
  const data = event.datos

  if (event.tipo === 'entrada' || event.tipo === 'salida') {
    const asis = data as Asistencia
    return (
      <p className="text-sm">
        {event.tipo === 'entrada' ? 'Entrada al centro' : `Recogido/a por ${asis.recogidoPor || 'familia'}`}
      </p>
    )
  }

  if (event.tipo === 'comida') {
    const comida = data as Comida
    return (
      <div>
        <p className="text-sm font-medium">{TIPO_COMIDA_ICONS[comida.tipo]} {TIPO_COMIDA_LABELS[comida.tipo]}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-lg">{CANTIDAD_EMOJI[comida.cantidad]}</span>
          <Badge variant="secondary" className={CANTIDAD_COLORS[comida.cantidad]}>
            {CANTIDAD_LABELS[comida.cantidad]}
          </Badge>
        </div>
        {comida.notas && <p className="text-xs text-muted-foreground mt-1">{comida.notas}</p>}
      </div>
    )
  }

  if (event.tipo === 'siesta') {
    const siesta = data as Siesta
    const duracion = siesta.horaFin
      ? (() => {
          const [h1, m1] = siesta.horaInicio.split(':').map(Number)
          const [h2, m2] = siesta.horaFin.split(':').map(Number)
          const mins = (h2 * 60 + m2) - (h1 * 60 + m1)
          return `${Math.floor(mins / 60)}h ${mins % 60}min`
        })()
      : 'En curso...'
    return (
      <div>
        <p className="text-sm font-medium">Siesta {CALIDAD_SIESTA_EMOJI[siesta.calidad]}</p>
        <p className="text-xs text-muted-foreground">{siesta.horaInicio} - {siesta.horaFin || '...'} ({duracion})</p>
        {siesta.notas && <p className="text-xs text-muted-foreground mt-1">{siesta.notas}</p>}
      </div>
    )
  }

  if (event.tipo === 'panal') {
    const panal = data as Panal
    return (
      <div>
        <p className="text-sm">Cambio de pañal: <span className="font-medium">{TIPO_PANAL_LABELS[panal.tipo]}</span></p>
        {panal.notas && <p className="text-xs text-muted-foreground">{panal.notas}</p>}
      </div>
    )
  }

  if (event.tipo === 'actividad') {
    const act = data as Actividad
    return (
      <div>
        <p className="text-sm font-medium">{TIPO_ACTIVIDAD_EMOJI[act.tipo]} {TIPO_ACTIVIDAD_LABELS[act.tipo]}</p>
        <p className="text-xs text-muted-foreground mt-1">{act.descripcion}</p>
      </div>
    )
  }

  if (event.tipo === 'estado_animo') {
    const ea = data as EstadoAnimoEntry
    return (
      <div>
        <p className="text-sm">
          {MOMENTO_LABELS[ea.momento]}: <span className="text-lg">{ESTADO_ANIMO_EMOJI[ea.estado]}</span>{' '}
          <span className="font-medium">{ESTADO_ANIMO_LABELS[ea.estado]}</span>
        </p>
        {ea.notas && <p className="text-xs text-muted-foreground">{ea.notas}</p>}
      </div>
    )
  }

  if (event.tipo === 'foto') {
    const foto = data as Foto
    return (
      <div>
        <div className="relative w-full aspect-video rounded-lg overflow-hidden mt-1">
          <Image src={foto.url} alt={foto.descripcion} fill className="object-cover" />
        </div>
        <p className="text-xs text-muted-foreground mt-1">{foto.descripcion}</p>
      </div>
    )
  }

  return null
}

export default function PadreDiaPage() {
  const registro = useRegistro(ALUMNO.id, hoyStr)
  const asistencia = useAsistencia(ALUMNO.id, hoyStr)
  const fotos = getFotosAlumno(ALUMNO.id, hoyStr)

  const hoyFormatted = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })

  if (!registro) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-4xl mb-4">📋</p>
        <p className="text-muted-foreground">No hay registro para hoy todavia.</p>
        <p className="text-sm text-muted-foreground mt-1">La profesora lo completara durante el dia.</p>
      </div>
    )
  }

  const timeline = buildTimeline(registro, asistencia || undefined, fotos)

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold capitalize">{hoyFormatted}</h2>
        <p className="text-sm text-muted-foreground">Timeline del dia de {ALUMNO.nombre}</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[21px] top-4 bottom-4 w-0.5 bg-border" />

        <div className="space-y-4">
          {timeline.map(event => (
            <div key={event.id} className="relative flex gap-3">
              {/* Time + icon */}
              <div className="flex-shrink-0 flex flex-col items-center z-10">
                <span className="text-[10px] text-muted-foreground font-mono w-10 text-right">{event.hora}</span>
                <div className="w-7 h-7 rounded-full bg-white border-2 border-border flex items-center justify-center mt-1">
                  <TimelineIcon tipo={event.tipo} />
                </div>
              </div>
              {/* Content */}
              <Card className="flex-1 mt-3">
                <CardContent className="p-3">
                  <TimelineCard event={event} />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Teacher comment at the bottom */}
      {registro.comentarioGeneral && (
        <Card className="border-patuco-yellow/30 bg-patuco-yellow-light/50">
          <CardContent className="p-4">
            <p className="text-xs font-medium text-muted-foreground mb-2">💬 Comentario de la profesora</p>
            <p className="text-sm leading-relaxed">{registro.comentarioGeneral}</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
