'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { KeyRound, Copy, Check, Mail } from "lucide-react"
import { usePadres, useAlumnos, useDemoActions } from "@/lib/use-demo-store"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"

export default function DireccionFamiliasPage() {
  const padres = usePadres()
  const alumnos = useAlumnos()
  const { activarAccesoPadre } = useDemoActions()
  const [credencialesDialog, setCredencialesDialog] = useState<{ padreId: string; nombre: string; email: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const padresConHijos = padres.map(p => ({
    ...p,
    hijos: alumnos.filter(a => a.padreIds.includes(p.id) && a.activo),
  }))

  function handleGenerarAcceso(padre: typeof padres[0]) {
    activarAccesoPadre(padre.id)
    setCredencialesDialog({ padreId: padre.id, nombre: `${padre.nombre} ${padre.apellidos}`, email: padre.email })
  }

  function handleCopy() {
    if (!credencialesDialog) return
    const text = `Usuario: ${credencialesDialog.email}\nContrasena temporal: Patuco2026!\n\nAccede en: app.escuelapatuco.com`
    navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const conAcceso = padresConHijos.filter(p => p.accesoActivo)
  const sinAcceso = padresConHijos.filter(p => !p.accesoActivo)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Familias</h1>
        <p className="text-sm text-muted-foreground">{padres.length} contactos · {conAcceso.length} con acceso</p>
      </div>

      {/* Sin acceso */}
      {sinAcceso.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Pendientes de acceso ({sinAcceso.length})</h2>
          {sinAcceso.map(padre => (
            <Card key={padre.id} className="border-amber-200/60 bg-amber-50/20">
              <CardContent className="p-3.5 flex items-center gap-3">
                <AvatarIniciales nombre={padre.nombre} apellidos={padre.apellidos} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium">{padre.nombre} {padre.apellidos}</p>
                  <p className="text-[11px] text-muted-foreground capitalize">{padre.relacion}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {padre.hijos.length > 0 ? `Hijos: ${padre.hijos.map(h => h.nombre).join(', ')}` : 'Sin hijos vinculados'}
                  </p>
                </div>
                <Button
                  size="sm"
                  className="text-xs gap-1.5 bg-indigo-600 hover:bg-indigo-700 flex-shrink-0"
                  onClick={() => handleGenerarAcceso(padre)}
                >
                  <KeyRound className="w-3 h-3" /> Dar acceso
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Con acceso */}
      {conAcceso.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Con acceso activo ({conAcceso.length})</h2>
          {conAcceso.map(padre => (
            <Card key={padre.id} className="border-border/40">
              <CardContent className="p-3.5 flex items-center gap-3">
                <AvatarIniciales nombre={padre.nombre} apellidos={padre.apellidos} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium">{padre.nombre} {padre.apellidos}</p>
                    <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-0">Activo</Badge>
                  </div>
                  <p className="text-[11px] text-muted-foreground">{padre.email}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {padre.hijos.map(h => h.nombre).join(', ')}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog credenciales */}
      <Dialog open={!!credencialesDialog} onOpenChange={() => setCredencialesDialog(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-500" /> Acceso generado
            </DialogTitle>
          </DialogHeader>
          {credencialesDialog && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Acceso creado para <span className="font-medium text-foreground">{credencialesDialog.nombre}</span>.
                Comparte estas credenciales:
              </p>
              <Card className="bg-muted/30 border-border/40">
                <CardContent className="p-4 space-y-2 font-mono text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Usuario:</span>
                    <span className="font-medium">{credencialesDialog.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contrasena:</span>
                    <span className="font-medium">Patuco2026!</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">URL:</span>
                    <span className="font-medium">app.escuelapatuco.com</span>
                  </div>
                </CardContent>
              </Card>
              <Alert className="border-amber-200 bg-amber-50">
                <AlertDescription className="text-xs text-amber-700">
                  La contrasena es temporal. El usuario debera cambiarla en su primer acceso.
                </AlertDescription>
              </Alert>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 gap-1.5 text-xs" onClick={handleCopy}>
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copiado' : 'Copiar credenciales'}
                </Button>
                <Button variant="outline" className="flex-1 gap-1.5 text-xs">
                  <Mail className="w-3 h-3" /> Enviar por email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
