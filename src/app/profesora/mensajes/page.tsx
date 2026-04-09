'use client'

import { useState } from "react"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, ArrowLeft } from "lucide-react"
import { alumnos, padres, getProfesor, getPadre } from "@/lib/data"
import { useMensajes, useDemoActions } from "@/lib/use-demo-store"
import { cn } from "@/lib/utils"

const PROF_ID = 'prof-2'

export default function ProfesoraMensajesPage() {
  const mensajes = useMensajes()
  const { addMensaje } = useDemoActions()
  const [selectedAlumnoId, setSelectedAlumnoId] = useState<string | null>(null)
  const [texto, setTexto] = useState('')

  // Get all conversations (grouped by alumno)
  const conversaciones = alumnos
    .filter(a => mensajes.some(m => m.alumnoId === a.id))
    .map(a => {
      const msgs = mensajes.filter(m => m.alumnoId === a.id)
      const ultimo = msgs[msgs.length - 1]
      const unread = msgs.filter(m => !m.leido && m.remitenteTipo === 'padre').length
      return { alumno: a, ultimoMensaje: ultimo, unread }
    })

  const hiloMensajes = selectedAlumnoId
    ? mensajes.filter(m => m.alumnoId === selectedAlumnoId).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    : []

  function enviar() {
    if (!texto.trim() || !selectedAlumnoId) return
    addMensaje({
      id: `msg-new-${Date.now()}`,
      alumnoId: selectedAlumnoId,
      remitenteTipo: 'profesor',
      remitenteId: PROF_ID,
      contenido: texto.trim(),
      leido: false,
      createdAt: new Date().toISOString(),
    })
    setTexto('')
  }

  if (selectedAlumnoId) {
    const alumno = alumnos.find(a => a.id === selectedAlumnoId)!
    return (
      <div className="flex flex-col h-[calc(100vh-160px)]">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedAlumnoId(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <AvatarIniciales nombre={alumno.nombre} apellidos={alumno.apellidos} size="sm" />
          <div>
            <p className="text-sm font-medium">Familia de {alumno.nombre}</p>
            <p className="text-xs text-muted-foreground">{padres.filter(p => alumno.padreIds.includes(p.id)).map(p => p.nombre).join(', ')}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 mb-4">
          {hiloMensajes.map(msg => {
            const esProf = msg.remitenteTipo === 'profesor'
            const remitente = esProf ? getProfesor(msg.remitenteId) : getPadre(msg.remitenteId)
            const hora = new Date(msg.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

            return (
              <div key={msg.id} className={cn("flex gap-2", esProf && "flex-row-reverse")}>
                <AvatarIniciales nombre={remitente?.nombre || '?'} apellidos={remitente?.apellidos} size="xs" />
                <div className={cn(
                  "max-w-[75%] rounded-2xl px-3 py-2",
                  esProf ? "bg-patuco-green-light rounded-tr-sm" : "bg-muted rounded-tl-sm"
                )}>
                  <p className="text-sm">{msg.contenido}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{hora}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-2">
          <Input
            value={texto}
            onChange={e => setTexto(e.target.value)}
            placeholder="Escribe un mensaje..."
            onKeyDown={e => e.key === 'Enter' && enviar()}
            className="flex-1"
          />
          <Button size="icon" onClick={enviar} disabled={!texto.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Mensajes</h1>

      {conversaciones.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-muted-foreground">No hay conversaciones</p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversaciones.map(({ alumno, ultimoMensaje, unread }) => (
            <Card key={alumno.id} className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => setSelectedAlumnoId(alumno.id)}>
              <CardContent className="p-3 flex items-center gap-3">
                <AvatarIniciales nombre={alumno.nombre} apellidos={alumno.apellidos} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">Familia de {alumno.nombre}</p>
                  <p className="text-xs text-muted-foreground truncate">{ultimoMensaje.contenido}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(ultimoMensaje.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground text-[10px] w-5 h-5 p-0 flex items-center justify-center rounded-full">
                      {unread}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
