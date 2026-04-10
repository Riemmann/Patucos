'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { AlertCircle, ArrowRightLeft } from "lucide-react"
import { aulas, padres } from "@/lib/data"
import { useAlumnos, useDemoActions } from "@/lib/use-demo-store"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"

function calcEdad(fechaNac: string): string {
  const nacimiento = new Date(fechaNac)
  const hoy = new Date()
  const meses = (hoy.getFullYear() - nacimiento.getFullYear()) * 12 + (hoy.getMonth() - nacimiento.getMonth())
  if (meses < 12) return `${meses}m`
  const anos = Math.floor(meses / 12)
  const resto = meses % 12
  return resto > 0 ? `${anos}a ${resto}m` : `${anos}a`
}

export default function DireccionAlumnosPage() {
  const alumnos = useAlumnos()
  const { updateAlumnoAula } = useDemoActions()
  const [aulaFilter, setAulaFilter] = useState('todos')
  const [changeDialog, setChangeDialog] = useState<{ alumnoId: string; currentAula: string } | null>(null)
  const [newAula, setNewAula] = useState('')

  const alumnosFiltrados = aulaFilter === 'todos'
    ? alumnos.filter(a => a.activo)
    : alumnos.filter(a => a.activo && a.aulaId === aulaFilter)

  function handleChangeAula() {
    if (changeDialog && newAula) {
      updateAlumnoAula(changeDialog.alumnoId, newAula)
      setChangeDialog(null)
      setNewAula('')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight">Alumnos</h1>
          <p className="text-sm text-muted-foreground">{alumnosFiltrados.length} alumno{alumnosFiltrados.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <Tabs value={aulaFilter} onValueChange={setAulaFilter}>
        <TabsList className="grid w-full grid-cols-4 h-10">
          <TabsTrigger value="todos" className="text-xs">Todos ({alumnos.filter(a => a.activo).length})</TabsTrigger>
          {aulas.map(a => (
            <TabsTrigger key={a.id} value={a.id} className="text-xs">
              {a.emoji} {a.nombre} ({alumnos.filter(al => al.activo && al.aulaId === a.id).length})
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="space-y-2">
        {alumnosFiltrados.map(alumno => {
          const aula = aulas.find(a => a.id === alumno.aulaId)
          const padresAlumno = padres.filter(p => alumno.padreIds.includes(p.id))
          return (
            <Card key={alumno.id} className="border-border/40">
              <CardContent className="p-3.5 flex items-center gap-3">
                <AvatarIniciales nombre={alumno.nombre} apellidos={alumno.apellidos} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-[13px] font-medium">{alumno.nombre} {alumno.apellidos}</p>
                    {alumno.alergias.length > 0 && (
                      <AlertCircle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] text-muted-foreground">{calcEdad(alumno.fechaNacimiento)}</span>
                    <Badge variant="secondary" className="text-[10px] border-0">{aula?.emoji} {aula?.nombre}</Badge>
                    {alumno.alergias.map(a => (
                      <Badge key={a} variant="destructive" className="text-[10px]">{a}</Badge>
                    ))}
                  </div>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {padresAlumno.map(p => `${p.nombre} (${p.relacion})`).join(', ')}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1 flex-shrink-0 border-border/40"
                  onClick={() => { setChangeDialog({ alumnoId: alumno.id, currentAula: alumno.aulaId }); setNewAula(alumno.aulaId) }}
                >
                  <ArrowRightLeft className="w-3 h-3" /> Aula
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Dialog cambiar aula */}
      <Dialog open={!!changeDialog} onOpenChange={() => setChangeDialog(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Cambiar de aula</DialogTitle>
          </DialogHeader>
          {changeDialog && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <AvatarIniciales
                  nombre={alumnos.find(a => a.id === changeDialog.alumnoId)?.nombre || ''}
                  apellidos={alumnos.find(a => a.id === changeDialog.alumnoId)?.apellidos}
                  size="md"
                />
                <div>
                  <p className="text-sm font-medium">{alumnos.find(a => a.id === changeDialog.alumnoId)?.nombre} {alumnos.find(a => a.id === changeDialog.alumnoId)?.apellidos}</p>
                  <p className="text-xs text-muted-foreground">Aula actual: {aulas.find(a => a.id === changeDialog.currentAula)?.emoji} {aulas.find(a => a.id === changeDialog.currentAula)?.nombre}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Nueva aula</Label>
                <Select value={newAula} onValueChange={v => setNewAula(v || '')}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aulas.map(a => (
                      <SelectItem key={a.id} value={a.id} className="text-sm">
                        {a.emoji} {a.nombre} ({a.grupoEdad} anos)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleChangeAula} className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={newAula === changeDialog.currentAula}>
                Cambiar de aula
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
