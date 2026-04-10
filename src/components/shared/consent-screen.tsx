'use client'

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, FileText, Camera, Bell, Check } from "lucide-react"
import { useConsentimientos, useDemoActions } from "@/lib/use-demo-store"

const PADRE_ID = 'padre-2'
const ALUMNO_ID = 'alumno-4'

const CONSENT_ITEMS = [
  {
    tipo: 'datos_personales' as const,
    icon: FileText,
    titulo: 'Tratamiento de datos personales',
    descripcion: 'Autorizo el tratamiento de los datos personales de mi hijo/a (nombre, fecha de nacimiento, datos de salud, alergias) para la gestion de la actividad educativa y asistencial del centro.',
    obligatorio: true,
  },
  {
    tipo: 'imagenes' as const,
    icon: Camera,
    titulo: 'Captacion y difusion de imagenes',
    descripcion: 'Autorizo la captacion de fotografias y videos de mi hijo/a durante las actividades del centro, y su difusion exclusivamente a traves de esta aplicacion a las familias del aula.',
    obligatorio: false,
  },
  {
    tipo: 'comunicaciones' as const,
    icon: Bell,
    titulo: 'Comunicaciones electronicas',
    descripcion: 'Autorizo el envio de notificaciones push, mensajes y avisos relacionados con la actividad del centro y el seguimiento diario de mi hijo/a.',
    obligatorio: false,
  },
]

interface ConsentScreenProps {
  onComplete: () => void
}

export function ConsentScreen({ onComplete }: ConsentScreenProps) {
  const consentimientos = useConsentimientos()
  const { addConsentimiento } = useDemoActions()
  const [accepted, setAccepted] = useState<Record<string, boolean>>({
    datos_personales: false,
    imagenes: false,
    comunicaciones: false,
  })

  const datosAceptado = accepted.datos_personales

  function handleSave() {
    const now = new Date().toISOString().split('T')[0]
    Object.entries(accepted).forEach(([tipo, aceptado]) => {
      addConsentimiento({
        id: `cons-new-${tipo}-${Date.now()}`,
        padreId: PADRE_ID,
        alumnoId: ALUMNO_ID,
        tipo: tipo as 'datos_personales' | 'imagenes' | 'comunicaciones',
        aceptado,
        fecha: now,
      })
    })
    onComplete()
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-5">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-xl font-bold">Proteccion de datos</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Antes de continuar, necesitamos tu consentimiento
          </p>
        </div>

        <Alert className="border-indigo-200 bg-indigo-50/50">
          <AlertDescription className="text-xs text-indigo-700">
            Conforme al RGPD y la LOPDGDD, el tratamiento de datos de menores de 14 anos
            requiere el consentimiento de los padres o tutores legales.
          </AlertDescription>
        </Alert>

        <div className="space-y-3">
          {CONSENT_ITEMS.map(item => (
            <Card key={item.tipo} className="border-border/40">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <Label className="text-[13px] font-medium leading-tight">{item.titulo}</Label>
                        {item.obligatorio && (
                          <span className="text-[10px] text-red-500 font-medium ml-1.5">Obligatorio</span>
                        )}
                      </div>
                      <Switch
                        checked={accepted[item.tipo]}
                        onCheckedChange={v => setAccepted(prev => ({ ...prev, [item.tipo]: v }))}
                      />
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mt-1.5">{item.descripcion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-2">
          <Button
            onClick={handleSave}
            disabled={!datosAceptado}
            className="w-full bg-indigo-600 hover:bg-indigo-700 gap-2"
          >
            <Check className="w-4 h-4" /> Confirmar y continuar
          </Button>
          {!datosAceptado && (
            <p className="text-[11px] text-center text-red-500">
              El consentimiento de datos personales es obligatorio para usar la aplicacion.
            </p>
          )}
        </div>

        <p className="text-[10px] text-center text-muted-foreground/60 leading-relaxed">
          Puedes modificar estos consentimientos en cualquier momento desde tu perfil.
          Consulta nuestra{' '}
          <Link href="/legal/privacidad" className="underline">Politica de Privacidad</Link>
          {' '}y{' '}
          <Link href="/legal/aviso-legal" className="underline">Aviso Legal</Link>.
        </p>
      </div>
    </div>
  )
}
