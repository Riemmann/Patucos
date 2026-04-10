'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { ArrowRightLeft, Mail, Phone } from "lucide-react"
import { aulas } from "@/lib/data"
import { useProfesores, useAlumnos, useDemoActions } from "@/lib/use-demo-store"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"

export default function DireccionProfesorasPage() {
  const profesores = useProfesores()
  const alumnos = useAlumnos()
  const { updateProfesorAula } = useDemoActions()
  const [assignDialog, setAssignDialog] = useState<{ profesorId: string; currentAula: string | null } | null>(null)
  const [newAula, setNewAula] = useState('')

  function handleAssign() {
    if (assignDialog) {
      updateProfesorAula(assignDialog.profesorId, newAula || null)
      setAssignDialog(null)
      setNewAula('')
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold tracking-tight">Profesoras</h1>
        <p className="text-sm text-muted-foreground">{profesores.length} profesionales</p>
      </div>

      <div className="space-y-2">
        {profesores.map(prof => {
          const aula = prof.aulaId ? aulas.find(a => a.id === prof.aulaId) : null
          const alumnosAula = prof.aulaId ? alumnos.filter(a => a.activo && a.aulaId === prof.aulaId).length : 0
          return (
            <Card key={prof.id} className="border-border/40">
              <CardContent className="p-4 flex items-center gap-4">
                <AvatarIniciales nombre={prof.nombre} apellidos={prof.apellidos} size="lg" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[15px] font-medium">{prof.nombre} {prof.apellidos}</p>
                    <Badge variant="secondary" className={`text-[10px] border-0 ${prof.rol === 'director' ? 'bg-indigo-50 text-indigo-700' : 'bg-emerald-50 text-emerald-700'}`}>
                      {prof.rol === 'director' ? 'Directora' : 'Profesora'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    {aula ? (
                      <span className="text-xs text-muted-foreground">{aula.emoji} {aula.nombre} · {alumnosAula} alumnos</span>
                    ) : (
                      <Badge variant="secondary" className="text-[10px] bg-amber-50 text-amber-700 border-0">Sin aula asignada</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Mail className="w-3 h-3" /> {prof.email}</span>
                    <span className="text-[11px] text-muted-foreground flex items-center gap-1"><Phone className="w-3 h-3" /> {prof.telefono}</span>
                  </div>
                </div>
                {prof.rol !== 'director' && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs gap-1 flex-shrink-0 border-border/40"
                    onClick={() => { setAssignDialog({ profesorId: prof.id, currentAula: prof.aulaId }); setNewAula(prof.aulaId || '') }}
                  >
                    <ArrowRightLeft className="w-3 h-3" /> Asignar
                  </Button>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Dialog asignar aula */}
      <Dialog open={!!assignDialog} onOpenChange={() => setAssignDialog(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Asignar a aula</DialogTitle>
          </DialogHeader>
          {assignDialog && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AvatarIniciales
                  nombre={profesores.find(p => p.id === assignDialog.profesorId)?.nombre || ''}
                  apellidos={profesores.find(p => p.id === assignDialog.profesorId)?.apellidos}
                  size="md"
                />
                <div>
                  <p className="text-sm font-medium">
                    {profesores.find(p => p.id === assignDialog.profesorId)?.nombre} {profesores.find(p => p.id === assignDialog.profesorId)?.apellidos}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {assignDialog.currentAula
                      ? `Aula actual: ${aulas.find(a => a.id === assignDialog.currentAula)?.emoji} ${aulas.find(a => a.id === assignDialog.currentAula)?.nombre}`
                      : 'Sin aula asignada'}
                  </p>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Aula</Label>
                <Select value={newAula} onValueChange={v => setNewAula(v || '')}>
                  <SelectTrigger className="text-sm">
                    <SelectValue placeholder="Seleccionar aula..." />
                  </SelectTrigger>
                  <SelectContent>
                    {aulas.map(a => (
                      <SelectItem key={a.id} value={a.id} className="text-sm">
                        {a.emoji} {a.nombre} ({a.grupoEdad} anos) - {alumnos.filter(al => al.activo && al.aulaId === a.id).length} alumnos
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleAssign} className="w-full bg-indigo-600 hover:bg-indigo-700">
                Asignar a aula
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
