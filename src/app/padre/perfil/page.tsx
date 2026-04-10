'use client'

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Download, Trash2, FileText, Camera, Bell, Shield, ExternalLink, Check } from "lucide-react"
import { alumnos, getAula, padres } from "@/lib/data"
import { useConsentimientos, useDemoActions } from "@/lib/use-demo-store"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"

const PADRE = padres.find(p => p.id === 'padre-2')!
const ALUMNO = alumnos.find(a => a.id === 'alumno-4')!
const AULA = getAula(ALUMNO.aulaId)!

function calcEdad(fechaNac: string): string {
  const nacimiento = new Date(fechaNac)
  const hoy = new Date()
  const meses = (hoy.getFullYear() - nacimiento.getFullYear()) * 12 + (hoy.getMonth() - nacimiento.getMonth())
  if (meses < 12) return `${meses} meses`
  const anos = Math.floor(meses / 12)
  const resto = meses % 12
  return resto > 0 ? `${anos}a ${resto}m` : `${anos} anos`
}

export default function PadrePerfilPage() {
  const consentimientos = useConsentimientos()
  const { addConsentimiento, updateConsentimiento } = useDemoActions()
  const [exportDialog, setExportDialog] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState(false)
  const [exported, setExported] = useState(false)
  const [deleteRequested, setDeleteRequested] = useState(false)

  const misConsentimientos = consentimientos.filter(c => c.padreId === 'padre-2' && c.alumnoId === 'alumno-4')
  const consDatos = misConsentimientos.find(c => c.tipo === 'datos_personales')
  const consImagenes = misConsentimientos.find(c => c.tipo === 'imagenes')
  const consComunicaciones = misConsentimientos.find(c => c.tipo === 'comunicaciones')

  function handleExport() {
    setExported(true)
    setTimeout(() => setExported(false), 3000)
  }

  function toggleConsent(tipo: 'imagenes' | 'comunicaciones') {
    const existing = misConsentimientos.find(c => c.tipo === tipo)
    if (existing) {
      updateConsentimiento(existing.id, !existing.aceptado)
    } else {
      addConsentimiento({
        id: `cons-toggle-${tipo}-${Date.now()}`,
        padreId: 'padre-2',
        alumnoId: 'alumno-4',
        tipo,
        aceptado: true,
        fecha: new Date().toISOString().split('T')[0],
      })
    }
  }

  return (
    <div className="space-y-5">
      <h2 className="text-base font-semibold">Mi Perfil</h2>

      {/* Parent info */}
      <Card className="border-border/40">
        <CardContent className="p-4 flex items-center gap-4">
          <AvatarIniciales nombre={PADRE.nombre} apellidos={PADRE.apellidos} size="lg" />
          <div>
            <p className="font-semibold">{PADRE.nombre} {PADRE.apellidos}</p>
            <p className="text-xs text-muted-foreground capitalize">{PADRE.relacion} de {ALUMNO.nombre}</p>
            <p className="text-xs text-muted-foreground">{PADRE.email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Child info */}
      <Card className="border-border/40">
        <CardContent className="p-4 flex items-center gap-4">
          <AvatarIniciales nombre={ALUMNO.nombre} apellidos={ALUMNO.apellidos} size="lg" />
          <div>
            <p className="font-semibold">{ALUMNO.nombre} {ALUMNO.apellidos}</p>
            <p className="text-xs text-muted-foreground">{calcEdad(ALUMNO.fechaNacimiento)} · {AULA.emoji} Aula {AULA.nombre}</p>
            {ALUMNO.alergias.length > 0 && (
              <div className="flex gap-1 mt-1">
                {ALUMNO.alergias.map(a => (
                  <Badge key={a} variant="destructive" className="text-[10px]">{a}</Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Consentimientos */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-indigo-600" />
          <h3 className="text-sm font-semibold">Consentimientos LOPD</h3>
        </div>

        <Card className="border-border/40">
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-muted-foreground" />
                <div>
                  <Label className="text-[13px]">Datos personales</Label>
                  <p className="text-[10px] text-muted-foreground">Obligatorio para usar la app</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {consDatos?.aceptado ? (
                  <Badge className="bg-emerald-50 text-emerald-700 border-0 text-[10px]">Aceptado</Badge>
                ) : (
                  <Badge className="bg-gray-100 text-gray-500 border-0 text-[10px]">Pendiente</Badge>
                )}
              </div>
            </div>

            <Separator className="opacity-50" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-muted-foreground" />
                <div>
                  <Label className="text-[13px]">Fotos y videos</Label>
                  <p className="text-[10px] text-muted-foreground">Captacion y difusion de imagenes</p>
                </div>
              </div>
              <Switch
                checked={consImagenes?.aceptado || false}
                onCheckedChange={() => toggleConsent('imagenes')}
              />
            </div>

            <Separator className="opacity-50" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-muted-foreground" />
                <div>
                  <Label className="text-[13px]">Comunicaciones</Label>
                  <p className="text-[10px] text-muted-foreground">Notificaciones y avisos</p>
                </div>
              </div>
              <Switch
                checked={consComunicaciones?.aceptado || false}
                onCheckedChange={() => toggleConsent('comunicaciones')}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Derechos ARSULOP */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold">Tus derechos (RGPD)</h3>
        <p className="text-xs text-muted-foreground">
          Conforme al RGPD, puedes ejercer los siguientes derechos sobre los datos de tu hijo/a.
        </p>

        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" className="justify-start gap-3 h-auto py-3 border-border/40" onClick={() => setExportDialog(true)}>
            <Download className="w-4 h-4 text-indigo-600" />
            <div className="text-left">
              <p className="text-[13px] font-medium">Descargar mis datos</p>
              <p className="text-[10px] text-muted-foreground">Derecho de acceso y portabilidad</p>
            </div>
          </Button>

          <Button variant="outline" className="justify-start gap-3 h-auto py-3 border-border/40" onClick={() => setDeleteDialog(true)}>
            <Trash2 className="w-4 h-4 text-red-500" />
            <div className="text-left">
              <p className="text-[13px] font-medium">Solicitar eliminacion</p>
              <p className="text-[10px] text-muted-foreground">Derecho de supresion (olvido)</p>
            </div>
          </Button>
        </div>
      </div>

      {/* Legal links */}
      <div className="space-y-2 pt-2">
        <Link href="/legal/privacidad" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <ExternalLink className="w-3 h-3" /> Politica de Privacidad
        </Link>
        <Link href="/legal/aviso-legal" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground">
          <ExternalLink className="w-3 h-3" /> Aviso Legal
        </Link>
      </div>

      {/* Export dialog */}
      <Dialog open={exportDialog} onOpenChange={setExportDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Descargar datos</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Se generara un archivo con todos los datos de <strong>{ALUMNO.nombre}</strong> almacenados en la plataforma:
            </p>
            <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-4">
              <li>Datos personales y medicos</li>
              <li>Registros diarios (comidas, siestas, actividades)</li>
              <li>Asistencia historica</li>
              <li>Fotografias</li>
              <li>Mensajes con el profesorado</li>
            </ul>
            <Button onClick={handleExport} className="w-full gap-2 bg-indigo-600 hover:bg-indigo-700">
              {exported ? <><Check className="w-4 h-4" /> Datos exportados</> : <><Download className="w-4 h-4" /> Exportar en JSON</>}
            </Button>
            <p className="text-[10px] text-muted-foreground text-center">
              El archivo se descargara en formato JSON conforme al derecho de portabilidad (art. 20 RGPD).
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Solicitar eliminacion de datos</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-xs text-red-700">
                Esta accion solicitara la eliminacion de todos los datos de {ALUMNO.nombre} de la plataforma.
                El centro tiene 30 dias para procesar la solicitud conforme al art. 17 del RGPD.
              </AlertDescription>
            </Alert>
            <p className="text-xs text-muted-foreground">
              Nota: algunos datos pueden conservarse si existe una obligacion legal (por ejemplo, registros
              educativos que deben conservarse un minimo de 3 anos).
            </p>
            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={() => { setDeleteRequested(true); setDeleteDialog(false) }}
            >
              <Trash2 className="w-4 h-4" /> Confirmar solicitud de eliminacion
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {deleteRequested && (
        <Alert className="border-amber-200 bg-amber-50">
          <AlertDescription className="text-xs text-amber-700">
            Tu solicitud de eliminacion ha sido registrada. El centro procesara la solicitud en un plazo maximo de 30 dias.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
