'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNotificaciones, useDemoActions } from "@/lib/use-demo-store"
import { TIPO_NOTIFICACION_EMOJI, PRIORIDAD_COLORS, PRIORIDAD_LABELS } from "@/lib/constants"
import { cn } from "@/lib/utils"

export default function PadreNotificacionesPage() {
  const notificaciones = useNotificaciones()
  const { markNotificacionLeida } = useDemoActions()

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">🔔 Notificaciones</h2>
      </div>

      {notificaciones.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">✅</p>
          <p className="text-muted-foreground">No hay notificaciones</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notificaciones.map(n => {
            const hora = new Date(n.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
            return (
              <Card
                key={n.id}
                className={cn("cursor-pointer transition-colors", !n.leida && "border-primary/30 bg-patuco-yellow-light/30")}
                onClick={() => !n.leida && markNotificacionLeida(n.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{TIPO_NOTIFICACION_EMOJI[n.tipo]}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm font-semibold">{n.titulo}</p>
                        {!n.leida && <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                      </div>
                      <p className="text-sm text-muted-foreground">{n.contenido}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className={cn("text-[10px]", PRIORIDAD_COLORS[n.prioridad])}>
                          {PRIORIDAD_LABELS[n.prioridad]}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{hora}</span>
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
  )
}
