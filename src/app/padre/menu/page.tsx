'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { menuSemanal } from "@/lib/data"
import { DIA_LABELS } from "@/lib/constants"
import type { DiaSemana } from "@/lib/types"

const diasOrden: DiaSemana[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes']
const hoyDia = new Date().getDay() // 0=dom, 1=lun...
const diaMap: Record<number, DiaSemana> = { 1: 'lunes', 2: 'martes', 3: 'miercoles', 4: 'jueves', 5: 'viernes' }
const hoyDiaSemana = diaMap[hoyDia]

export default function PadreMenuPage() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">🍽️ Menu Semanal</h2>
        <p className="text-sm text-muted-foreground">Comedor Escuela Infantil Patuco</p>
      </div>

      <div className="space-y-3">
        {diasOrden.map(dia => {
          const menuDia = menuSemanal.dias.find(d => d.dia === dia)
          if (!menuDia) return null
          const isHoy = dia === hoyDiaSemana

          return (
            <Card key={dia} className={isHoy ? 'border-primary/40 bg-patuco-yellow-light/30' : ''}>
              <CardHeader className="pb-2 px-4 pt-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold">{DIA_LABELS[dia]}</CardTitle>
                  {isHoy && <Badge className="bg-primary text-primary-foreground text-[10px]">Hoy</Badge>}
                </div>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <div className="space-y-1.5 text-sm">
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-20 flex-shrink-0">🥛 Desayuno</span>
                    <span>{menuDia.desayuno}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-20 flex-shrink-0">🥣 1er plato</span>
                    <span>{menuDia.primerPlato}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-20 flex-shrink-0">🍖 2o plato</span>
                    <span>{menuDia.segundoPlato}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-20 flex-shrink-0">🍎 Postre</span>
                    <span>{menuDia.postre}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-muted-foreground w-20 flex-shrink-0">🧁 Merienda</span>
                    <span>{menuDia.merienda}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
