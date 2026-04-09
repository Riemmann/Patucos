'use client'

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send } from "lucide-react"
import { getProfesor, getPadre } from "@/lib/data"
import { useMensajes, useDemoActions } from "@/lib/use-demo-store"
import { cn } from "@/lib/utils"

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
        <h2 className="text-lg font-semibold">💬 Mensajes</h2>
        <p className="text-sm text-muted-foreground">Conversacion con la profesora</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-4">
        {hiloMensajes.map(msg => {
          const esPadre = msg.remitenteTipo === 'padre'
          const remitente = esPadre ? getPadre(msg.remitenteId) : getProfesor(msg.remitenteId)
          const hora = new Date(msg.createdAt).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })

          return (
            <div key={msg.id} className={cn("flex gap-2", esPadre && "flex-row-reverse")}>
              <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0">
                <Image src={remitente?.fotoUrl || ''} alt="" fill className="object-cover" />
              </div>
              <div className={cn(
                "max-w-[75%] rounded-2xl px-3 py-2",
                esPadre ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-muted rounded-tl-sm"
              )}>
                <p className="text-sm">{msg.contenido}</p>
                <p className={cn("text-[10px] mt-1", esPadre ? "text-primary-foreground/70" : "text-muted-foreground")}>{hora}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
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
