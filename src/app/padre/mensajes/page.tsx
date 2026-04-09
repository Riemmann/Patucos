'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { getProfesor, getPadre } from "@/lib/data"
import { useMensajes, useDemoActions } from "@/lib/use-demo-store"
import { cn } from "@/lib/utils"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"

const ALUMNO_ID = 'alumno-4'
const PADRE_ID = 'padre-2'

export default function PadreMensajesPage() {
  const mensajes = useMensajes()
  const { addMensaje } = useDemoActions()
  const [texto, setTexto] = useState('')

  const hiloMensajes = mensajes.filter(m => m.alumnoId === ALUMNO_ID).sort((a, b) => a.createdAt.localeCompare(b.createdAt))

  function enviar() {
    if (!texto.trim()) return
    addMensaje({
      id: `msg-new-${Date.now()}`,
      alumnoId: ALUMNO_ID,
      remitenteTipo: 'padre',
      remitenteId: PADRE_ID,
      contenido: texto.trim(),
      leido: false,
      createdAt: new Date().toISOString(),
    })
    setTexto('')
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      <div className="text-center mb-4">
        <h2 className="text-base font-semibold">Mensajes</h2>
        <p className="text-xs text-muted-foreground">Conversacion con la profesora</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {hiloMensajes.map(msg => {
          const esPadre = msg.remitenteTipo === 'padre'
          const remitente = esPadre ? getPadre(msg.remitenteId) : getProfesor(msg.remitenteId)
          const hora = new Date(msg.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

          return (
            <div key={msg.id} className={cn("flex gap-2", esPadre && "flex-row-reverse")}>
              <AvatarIniciales nombre={remitente?.nombre || '?'} apellidos={remitente?.apellidos} size="xs" />
              <div className={cn(
                "max-w-[75%] rounded-2xl px-3.5 py-2.5",
                esPadre ? "bg-amber-500 text-white rounded-tr-sm" : "bg-white border border-border/40 rounded-tl-sm"
              )}>
                <p className="text-[13px] leading-relaxed">{msg.contenido}</p>
                <p className={cn("text-[10px] mt-1", esPadre ? "text-amber-100" : "text-muted-foreground")}>{hora}</p>
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
          className="flex-1 border-border/40"
        />
        <Button size="icon" onClick={enviar} disabled={!texto.trim()} className="bg-amber-500 hover:bg-amber-600">
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
