'use client'

import { useState } from "react"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LogIn, LogOut, UserCheck } from "lucide-react"
import { aulas, getAlumnosByAula, personasAutorizadas } from "@/lib/data"
import { useAsistencias, useDemoActions } from "@/lib/use-demo-store"

const hoyStr = new Date().toISOString().split('T')[0]

export default function ProfesoraAsistenciaPage() {
  const [aulaId, setAulaId] = useState('aula-2')
  const [salidaDialogAlumnoId, setSalidaDialogAlumnoId] = useState<string | null>(null)
  const asistencias = useAsistencias()
  const { toggleAsistenciaEntrada, toggleAsistenciaSalida } = useDemoActions()

  const alumnosAula = getAlumnosByAula(aulaId)

  function handleSalida(alumnoId: string, recogidoPor: string) {
    const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    toggleAsistenciaSalida(alumnoId, hoyStr, hora)
    setSalidaDialogAlumnoId(null)
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold tracking-tight">Asistencia</h1>
      <p className="text-sm text-muted-foreground capitalize">
        {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>

      <Tabs value={aulaId} onValueChange={setAulaId}>
        <TabsList className="grid w-full grid-cols-3">
          {aulas.map(a => (
            <TabsTrigger key={a.id} value={a.id} className="text-xs">{a.emoji} {a.nombre}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {alumnosAula.map(alumno => {
          const asis = asistencias.find(a => a.alumnoId === alumno.id && a.fecha === hoyStr)
          const presente = asis && asis.horaEntrada
          const salido = asis && asis.horaSalida
          const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
          const autorizados = personasAutorizadas[alumno.id] || []

          return (
            <Card key={alumno.id} className="border-border/40">
              <CardContent className="p-3 flex items-center gap-3">
                <AvatarIniciales nombre={alumno.nombre} apellidos={alumno.apellidos} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alumno.nombre} {alumno.apellidos.split(' ')[0]}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {presente && (
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <LogIn className="w-3 h-3" /> {asis.horaEntrada}
                      </span>
                    )}
                    {salido && (
                      <span className="text-[10px] text-muted-foreground flex items-center gap-0.5">
                        <LogOut className="w-3 h-3" /> {asis.horaSalida}
                      </span>
                    )}
                    {salido && asis.recogidoPor && (
                      <span className="text-[10px] text-emerald-600 flex items-center gap-0.5">
                        <UserCheck className="w-3 h-3" /> {asis.recogidoPor}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={presente ? "default" : "outline"}
                    size="sm"
                    className="text-xs gap-1"
                    onClick={() => toggleAsistenciaEntrada(alumno.id, hoyStr, hora)}
                  >
                    <LogIn className="w-3 h-3" />
                    {presente ? '✓' : 'Entrada'}
                  </Button>
                  {presente && !salido && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => setSalidaDialogAlumnoId(alumno.id)}
                    >
                      <LogOut className="w-3 h-3" /> Salida
                    </Button>
                  )}
                  {salido && (
                    <Badge variant="secondary" className="text-[10px] bg-emerald-50 text-emerald-700 border-0">Recogido</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary */}
      <Card className="border-border/40 bg-muted/20">
        <CardContent className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-emerald-600 tabular-nums">
                {alumnosAula.filter(a => asistencias.find(as => as.alumnoId === a.id && as.fecha === hoyStr && as.horaEntrada)).length}
              </p>
              <p className="text-[11px] text-muted-foreground">Presentes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-muted-foreground tabular-nums">
                {alumnosAula.filter(a => !asistencias.find(as => as.alumnoId === a.id && as.fecha === hoyStr && as.horaEntrada)).length}
              </p>
              <p className="text-[11px] text-muted-foreground">Ausentes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-sky-600 tabular-nums">
                {alumnosAula.filter(a => asistencias.find(as => as.alumnoId === a.id && as.fecha === hoyStr && as.horaSalida)).length}
              </p>
              <p className="text-[11px] text-muted-foreground">Recogidos</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dialog: seleccionar persona autorizada */}
      <Dialog open={!!salidaDialogAlumnoId} onOpenChange={() => setSalidaDialogAlumnoId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Quien recoge al nino?</DialogTitle>
          </DialogHeader>
          {salidaDialogAlumnoId && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground mb-3">Selecciona la persona autorizada:</p>
              {(personasAutorizadas[salidaDialogAlumnoId] || []).map((persona, i) => (
                <Button
                  key={i}
                  variant="outline"
                  className="w-full justify-start gap-3 h-auto py-3 border-border/40"
                  onClick={() => handleSalida(salidaDialogAlumnoId, persona.nombre)}
                >
                  <AvatarIniciales nombre={persona.nombre.split(' ')[0]} apellidos={persona.nombre.split(' ')[1]} size="sm" />
                  <div className="text-left">
                    <p className="text-sm font-medium">{persona.nombre}</p>
                    <p className="text-[11px] text-muted-foreground">{persona.relacion} · {persona.telefono}</p>
                  </div>
                </Button>
              ))}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
