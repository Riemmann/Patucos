'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { eventos, menuSemanal } from "@/lib/data"
import { TIPO_EVENTO_EMOJI, TIPO_EVENTO_LABELS, TIPO_EVENTO_COLORS, DIA_LABELS } from "@/lib/constants"
import type { DiaSemana } from "@/lib/types"

const diasOrden: DiaSemana[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
const hoyDia = new Date().getDay()
const diaMap: Record<number, DiaSemana> = { 1: 'lunes', 2: 'martes', 3: 'miercoles', 4: 'jueves', 5: 'viernes' }
const hoyDiaSemana = diaMap[hoyDia]

function formatFechaEvento(fecha: string): string {
  const d = new Date(fecha + 'T12:00:00')
  return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })
}

function diasHasta(fecha: string): number {
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const target = new Date(fecha + 'T12:00:00')
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24))
}

export default function PadreCalendarioPage() {
  const eventosFuturos = eventos
    .filter(e => diasHasta(e.fecha) >= 0)
    .sort((a, b) => a.fecha.localeCompare(b.fecha))

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-base font-semibold">Calendario</h2>
        <p className="text-xs text-muted-foreground">Eventos y menu semanal</p>
      </div>

      {/* Proximos eventos */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">Proximos eventos</h3>
        {eventosFuturos.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No hay eventos proximos</p>
        ) : (
          <div className="space-y-2">
            {eventosFuturos.map(evento => {
              const dias = diasHasta(evento.fecha)
              return (
                <Card key={evento.id} className="border-border/40">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-center flex-shrink-0 w-12">
                        <p className="text-2xl">{TIPO_EVENTO_EMOJI[evento.tipo]}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-[13px] font-semibold leading-tight">{evento.titulo}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground capitalize">{formatFechaEvento(evento.fecha)}</p>
                        <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{evento.descripcion}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className={`text-[10px] ${TIPO_EVENTO_COLORS[evento.tipo]}`}>
                            {TIPO_EVENTO_LABELS[evento.tipo]}
                          </Badge>
                          {dias === 0 ? (
                            <Badge className="bg-amber-500 text-white text-[10px]">Hoy</Badge>
                          ) : dias <= 7 ? (
                            <span className="text-[10px] text-amber-600 font-medium">En {dias} dia{dias > 1 ? 's' : ''}</span>
                          ) : (
                            <span className="text-[10px] text-muted-foreground">En {dias} dias</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      <Separator />

      {/* Menu semanal */}
      <div className="space-y-2">
        <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-1">Menu semanal</h3>
        <div className="space-y-2">
          {diasOrden.map(dia => {
            const menuDia = menuSemanal.dias.find(d => d.dia === dia)
            if (!menuDia) return null
            const isHoy = dia === hoyDiaSemana
            return (
              <Card key={dia} className={isHoy ? 'border-amber-200/60 bg-amber-50/30' : 'border-border/40'}>
                <CardContent className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold">{DIA_LABELS[dia]}</span>
                    {isHoy && <Badge className="bg-amber-500 text-white text-[10px]">Hoy</Badge>}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-0.5 text-[12px]">
                    <span className="text-muted-foreground">1er plato</span>
                    <span>{menuDia.primerPlato}</span>
                    <span className="text-muted-foreground">2o plato</span>
                    <span>{menuDia.segundoPlato}</span>
                    <span className="text-muted-foreground">Postre</span>
                    <span>{menuDia.postre}</span>
                    <span className="text-muted-foreground">Merienda</span>
                    <span>{menuDia.merienda}</span>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
