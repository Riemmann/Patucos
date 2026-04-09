'use client'

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, ChevronRight, CalendarDays, MessageSquare } from "lucide-react"
import { alumnos, getAula, getFotosAlumno, getProfesor } from "@/lib/data"
import { useRegistro, useAsistencia, useNotificaciones } from "@/lib/use-demo-store"
import { CANTIDAD_LABELS, CANTIDAD_EMOJI, TIPO_COMIDA_LABELS, ESTADO_ANIMO_EMOJI, ESTADO_ANIMO_LABELS, TIPO_NOTIFICACION_EMOJI } from "@/lib/constants"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"
import { FotoDisplay } from "@/components/shared/foto-placeholder"

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
  return resto > 0 ? `${anos} ano${anos > 1 ? 's' : ''} y ${resto} mes${resto > 1 ? 'es' : ''}` : `${anos} ano${anos > 1 ? 's' : ''}`
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
    <div className="space-y-5">
      {/* Child profile */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-border/40">
        <AvatarIniciales nombre={ALUMNO.nombre} apellidos={ALUMNO.apellidos} size="lg" />
        <div className="flex-1 min-w-0">
          <h2 className="font-semibold text-[17px] leading-tight">{ALUMNO.nombre} {ALUMNO.apellidos}</h2>
          <p className="text-sm text-muted-foreground mt-0.5">{calcEdad(ALUMNO.fechaNacimiento)}</p>
          {asistencia?.horaEntrada && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-emerald-600 font-medium">En el centro desde las {asistencia.horaEntrada}</span>
            </div>
          )}
        </div>
      </div>

      {/* Date pill */}
      <p className="text-xs text-muted-foreground text-center capitalize tracking-wide">{hoyFormatted}</p>

      {/* Meals */}
      {registro && registro.comidas.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">Comidas</h3>
          <div className="grid grid-cols-3 gap-2.5">
            {registro.comidas.map(comida => (
              <Card key={comida.id} className="border-border/40">
                <CardContent className="p-3 text-center">
                  <p className="text-xs text-muted-foreground font-medium">{TIPO_COMIDA_LABELS[comida.tipo]}</p>
                  <p className="text-2xl mt-1.5 mb-1">{CANTIDAD_EMOJI[comida.cantidad]}</p>
                  <Badge variant="secondary" className="text-[10px] font-medium">
                    {CANTIDAD_LABELS[comida.cantidad]}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Nap + Mood */}
      {registro && (
        <div className="grid grid-cols-2 gap-2.5">
          {registro.siestas.length > 0 && (
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-medium">Siesta</p>
                <p className="text-[15px] font-semibold mt-2 tabular-nums">
                  {registro.siestas[0].horaInicio} – {registro.siestas[0].horaFin || '...'}
                </p>
                {registro.siestas[0].horaFin && (
                  <p className="text-xs text-muted-foreground mt-0.5">
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
            <Card className="border-border/40">
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground font-medium">Estado de animo</p>
                <p className="text-2xl mt-2">{ESTADO_ANIMO_EMOJI[registro.estadosAnimo[registro.estadosAnimo.length - 1].estado]}</p>
                <p className="text-xs font-medium mt-0.5">
                  {ESTADO_ANIMO_LABELS[registro.estadosAnimo[registro.estadosAnimo.length - 1].estado]}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Teacher comment */}
      {registro?.comentarioGeneral && (
        <Card className="border-border/40 bg-amber-50/40">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {profesor && (
                <AvatarIniciales nombre={profesor.nombre} apellidos={profesor.apellidos} size="sm" />
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                  <p className="text-xs font-semibold">{profesor ? `${profesor.nombre} ${profesor.apellidos}` : 'Profesora'}</p>
                  <span className="text-[10px] text-muted-foreground">Profesora</span>
                </div>
                <p className="text-[13px] leading-relaxed text-foreground/80">{registro.comentarioGeneral}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Photos */}
      {fotos.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Fotos de hoy</h3>
            <Link href="/padre/fotos" className="text-xs text-amber-600 font-medium flex items-center gap-0.5">
              Ver todas <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {fotos.slice(0, 3).map(foto => (
              <div key={foto.id} className="relative aspect-square rounded-xl overflow-hidden bg-muted">
                <FotoDisplay src={foto.url} alt={foto.descripcion} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notifications */}
      {unreadNotifs.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Avisos</h3>
            <Link href="/padre/notificaciones" className="text-xs text-amber-600 font-medium flex items-center gap-0.5">
              Ver todos <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="space-y-2">
            {unreadNotifs.map(n => (
              <Card key={n.id} className="border-border/40">
                <CardContent className="p-3 flex items-start gap-3">
                  <span className="text-base mt-0.5">{TIPO_NOTIFICACION_EMOJI[n.tipo]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium leading-tight">{n.titulo}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{n.contenido}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* CTA: Full timeline */}
      <Link href="/padre/dia">
        <Card className="border-amber-200/60 bg-amber-50/30 hover:bg-amber-50/50 transition-colors cursor-pointer">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarDays className="w-5 h-5 text-amber-600" />
              <span className="text-[13px] font-medium">Ver timeline completo del dia</span>
            </div>
            <ChevronRight className="w-4 h-4 text-amber-400" />
          </CardContent>
        </Card>
      </Link>
    </div>
  )
}
