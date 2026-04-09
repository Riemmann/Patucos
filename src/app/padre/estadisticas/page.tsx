'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { alumnos } from "@/lib/data"
import { registrosHistoricos } from "@/lib/data"
import { useRegistro } from "@/lib/use-demo-store"
import { CANTIDAD_LABELS, ESTADO_ANIMO_EMOJI, ESTADO_ANIMO_LABELS } from "@/lib/constants"
import type { CantidadComida, EstadoAnimo } from "@/lib/types"
import { cn } from "@/lib/utils"

const ALUMNO = alumnos.find(a => a.id === 'alumno-4')!
const hoyStr = new Date().toISOString().split('T')[0]

const cantidadValue: Record<CantidadComida, number> = { nada: 0, poco: 1, normal: 2, mucho: 3, todo: 4 }
const animoValue: Record<EstadoAnimo, number> = { irritable: 0, triste: 1, neutral: 2, contento: 3, muy_contento: 4 }

const barColors = ['bg-amber-300', 'bg-amber-400', 'bg-amber-500', 'bg-emerald-400', 'bg-emerald-500']

function formatDate(fecha: string): string {
  const d = new Date(fecha + 'T12:00:00')
  return d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric' })
}

function calcDuracion(inicio: string, fin: string | null): number {
  if (!fin) return 0
  const [h1, m1] = inicio.split(':').map(Number)
  const [h2, m2] = fin.split(':').map(Number)
  return (h2 * 60 + m2) - (h1 * 60 + m1)
}

export default function PadreEstadisticasPage() {
  const registroHoy = useRegistro(ALUMNO.id, hoyStr)

  // Combine historical + today
  const allRegistros = [...registrosHistoricos, ...(registroHoy ? [registroHoy] : [])].sort((a, b) => a.fecha.localeCompare(b.fecha))

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-base font-semibold">Estadisticas</h2>
        <p className="text-xs text-muted-foreground">Evolucion semanal de {ALUMNO.nombre}</p>
      </div>

      {/* Alimentacion */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Alimentacion</h3>
          <div className="space-y-3">
            {['desayuno', 'almuerzo', 'merienda'].map(tipo => (
              <div key={tipo}>
                <p className="text-xs font-medium capitalize mb-1.5">{tipo}</p>
                <div className="flex items-end gap-1.5 h-16">
                  {allRegistros.map(reg => {
                    const comida = reg.comidas.find(c => c.tipo === tipo)
                    const val = comida ? cantidadValue[comida.cantidad] : 0
                    const pct = (val / 4) * 100
                    const isHoy = reg.fecha === hoyStr
                    return (
                      <div key={reg.fecha} className="flex-1 flex flex-col items-center gap-0.5">
                        <div className="w-full relative" style={{ height: '48px' }}>
                          <div
                            className={cn(
                              "absolute bottom-0 w-full rounded-t-sm transition-all",
                              barColors[val],
                              isHoy && "ring-2 ring-amber-500/30"
                            )}
                            style={{ height: `${Math.max(pct, 8)}%` }}
                          />
                        </div>
                        <span className="text-[9px] text-muted-foreground">
                          {formatDate(reg.fecha)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 mt-2 pt-2 border-t border-border/40">
              {(['nada', 'poco', 'normal', 'mucho', 'todo'] as CantidadComida[]).map((c, i) => (
                <div key={c} className="flex items-center gap-1">
                  <div className={cn("w-2 h-2 rounded-sm", barColors[i])} />
                  <span className="text-[9px] text-muted-foreground">{CANTIDAD_LABELS[c]}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sueno */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Sueno</h3>
          <div className="flex items-end gap-1.5 h-24">
            {allRegistros.map(reg => {
              const siesta = reg.siestas[0]
              const mins = siesta ? calcDuracion(siesta.horaInicio, siesta.horaFin) : 0
              const pct = Math.min((mins / 150) * 100, 100) // Max 2.5h
              const isHoy = reg.fecha === hoyStr
              return (
                <div key={reg.fecha} className="flex-1 flex flex-col items-center gap-0.5">
                  <span className="text-[10px] font-medium tabular-nums">
                    {mins > 0 ? `${Math.floor(mins / 60)}h${mins % 60 > 0 ? `${mins % 60}` : ''}` : '-'}
                  </span>
                  <div className="w-full relative" style={{ height: '64px' }}>
                    <div
                      className={cn(
                        "absolute bottom-0 w-full rounded-t-sm bg-sky-400 transition-all",
                        isHoy && "ring-2 ring-sky-500/30"
                      )}
                      style={{ height: `${Math.max(pct, 5)}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-muted-foreground">
                    {formatDate(reg.fecha)}
                  </span>
                </div>
              )
            })}
          </div>
          <p className="text-[10px] text-muted-foreground mt-2 text-center">
            Media: {(() => {
              const duraciones = allRegistros.map(r => r.siestas[0] ? calcDuracion(r.siestas[0].horaInicio, r.siestas[0].horaFin) : 0).filter(d => d > 0)
              const avg = duraciones.length > 0 ? Math.round(duraciones.reduce((a, b) => a + b, 0) / duraciones.length) : 0
              return `${Math.floor(avg / 60)}h ${avg % 60}min`
            })()}
          </p>
        </CardContent>
      </Card>

      {/* Estado de animo */}
      <Card className="border-border/40">
        <CardContent className="p-4">
          <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">Estado de animo</h3>
          <div className="space-y-3">
            {['manana', 'mediodia', 'tarde'].map(momento => (
              <div key={momento}>
                <p className="text-xs font-medium capitalize mb-2">
                  {momento === 'manana' ? 'Manana' : momento === 'mediodia' ? 'Mediodia' : 'Tarde'}
                </p>
                <div className="flex items-center gap-2">
                  {allRegistros.map(reg => {
                    const ea = reg.estadosAnimo.find(e => e.momento === momento)
                    const isHoy = reg.fecha === hoyStr
                    return (
                      <div key={reg.fecha} className={cn(
                        "flex-1 text-center p-1.5 rounded-lg",
                        isHoy ? "bg-amber-50 ring-1 ring-amber-200" : "bg-muted/30"
                      )}>
                        <p className="text-lg">{ea ? ESTADO_ANIMO_EMOJI[ea.estado] : '–'}</p>
                        <p className="text-[8px] text-muted-foreground mt-0.5">{formatDate(reg.fecha)}</p>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
