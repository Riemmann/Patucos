'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Send, Bell } from "lucide-react"
import { useNotificaciones, useDemoActions } from "@/lib/use-demo-store"
import { TIPO_NOTIFICACION_EMOJI, PRIORIDAD_COLORS, PRIORIDAD_LABELS, TIPO_NOTIFICACION_LABELS } from "@/lib/constants"
import type { TipoNotificacion, Prioridad } from "@/lib/types"

export default function ProfesoraNotificacionesPage() {
  const notificaciones = useNotificaciones()
  const { addNotificacion } = useDemoActions()

  const [tipo, setTipo] = useState<TipoNotificacion>('anuncio')
  const [prioridad, setPrioridad] = useState<Prioridad>('normal')
  const [titulo, setTitulo] = useState('')
  const [contenido, setContenido] = useState('')
  const [sent, setSent] = useState(false)

  function enviar() {
    if (!titulo.trim() || !contenido.trim()) return
    addNotificacion({
      id: `notif-new-${Date.now()}`,
      tipo,
      titulo: titulo.trim(),
      contenido: contenido.trim(),
      prioridad,
      createdAt: new Date().toISOString(),
      leida: false,
    })
    setTitulo('')
    setContenido('')
    setSent(true)
    setTimeout(() => setSent(false), 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Notificaciones</h1>

      {/* Create notification */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enviar aviso a familias</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Tipo</Label>
              <Select value={tipo} onValueChange={v => setTipo(v as TipoNotificacion)}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['alerta_salud', 'recordatorio', 'anuncio'] as TipoNotificacion[]).map(t => (
                    <SelectItem key={t} value={t} className="text-sm">
                      {TIPO_NOTIFICACION_EMOJI[t]} {TIPO_NOTIFICACION_LABELS[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Prioridad</Label>
              <Select value={prioridad} onValueChange={v => setPrioridad(v as Prioridad)}>
                <SelectTrigger className="text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(['baja', 'normal', 'alta', 'urgente'] as Prioridad[]).map(p => (
                    <SelectItem key={p} value={p} className="text-sm">{PRIORIDAD_LABELS[p]}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Titulo</Label>
            <Input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Titulo del aviso..." className="text-sm" />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Contenido</Label>
            <Textarea value={contenido} onChange={e => setContenido(e.target.value)} placeholder="Escribe el mensaje..." rows={3} className="text-sm" />
          </div>
          <Button onClick={enviar} disabled={!titulo.trim() || !contenido.trim()} className="w-full gap-2">
            <Send className="w-4 h-4" />
            {sent ? '¡Enviado!' : 'Enviar aviso'}
          </Button>
        </CardContent>
      </Card>

      <Separator />

      {/* History */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Avisos enviados</h2>
        <div className="space-y-2">
          {notificaciones.map(n => (
            <Card key={n.id}>
              <CardContent className="p-3 flex items-start gap-3">
                <span className="text-lg">{TIPO_NOTIFICACION_EMOJI[n.tipo]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{n.titulo}</p>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.contenido}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className={`text-[10px] ${PRIORIDAD_COLORS[n.prioridad]}`}>
                      {PRIORIDAD_LABELS[n.prioridad]}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(n.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
