'use client'

import { useState } from "react"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { aulas, alumnos, padres, getAlumnosByAula } from "@/lib/data"
import { AlertCircle, Phone, Mail } from "lucide-react"

function calcEdad(fechaNac: string): string {
  const nacimiento = new Date(fechaNac)
  const hoy = new Date()
  const meses = (hoy.getFullYear() - nacimiento.getFullYear()) * 12 + (hoy.getMonth() - nacimiento.getMonth())
  if (meses < 12) return `${meses} meses`
  const anos = Math.floor(meses / 12)
  const resto = meses % 12
  return resto > 0 ? `${anos}a ${resto}m` : `${anos} años`
}

export default function ProfesoraAlumnosPage() {
  const [aulaId, setAulaId] = useState('aula-2')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const alumnosAula = getAlumnosByAula(aulaId)
  const selected = selectedId ? alumnos.find(a => a.id === selectedId) : null
  const padresAlumno = selected ? padres.filter(p => selected.padreIds.includes(p.id)) : []

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Alumnos</h1>

      <Tabs value={aulaId} onValueChange={v => { setAulaId(v); setSelectedId(null) }}>
        <TabsList className="grid w-full grid-cols-3">
          {aulas.map(a => (
            <TabsTrigger key={a.id} value={a.id} className="text-xs">{a.emoji} {a.nombre} ({getAlumnosByAula(a.id).length})</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* List */}
        <div className="space-y-2">
          {alumnosAula.map(alumno => (
            <Card
              key={alumno.id}
              className={`cursor-pointer transition-all ${selectedId === alumno.id ? 'border-primary shadow-md' : 'hover:shadow-sm'}`}
              onClick={() => setSelectedId(alumno.id)}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <AvatarIniciales nombre={alumno.nombre} apellidos={alumno.apellidos} size="md" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{alumno.nombre} {alumno.apellidos}</p>
                  <p className="text-xs text-muted-foreground">{calcEdad(alumno.fechaNacimiento)}</p>
                </div>
                {alumno.alergias.length > 0 && (
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Detail */}
        {selected ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-4">
                <AvatarIniciales nombre={selected.nombre} apellidos={selected.apellidos} size="xl" className="mx-auto mb-3" />
                <h2 className="text-lg font-bold">{selected.nombre} {selected.apellidos}</h2>
                <p className="text-sm text-muted-foreground">{calcEdad(selected.fechaNacimiento)} · Nacido/a el {new Date(selected.fechaNacimiento).toLocaleDateString('es-ES')}</p>
              </div>

              {selected.alergias.length > 0 && (
                <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
                  <p className="text-sm font-medium text-red-700 mb-1">⚠️ Alergias</p>
                  <div className="flex gap-1 flex-wrap">
                    {selected.alergias.map(a => (
                      <Badge key={a} variant="destructive" className="text-xs">{a}</Badge>
                    ))}
                  </div>
                  {selected.notasMedicas && (
                    <p className="text-xs text-red-600 mt-2">{selected.notasMedicas}</p>
                  )}
                </div>
              )}

              <div className="space-y-3">
                <h3 className="text-sm font-semibold">Contactos</h3>
                {padresAlumno.map(p => (
                  <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                    <AvatarIniciales nombre={p.nombre} apellidos={p.apellidos} size="sm" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{p.nombre} {p.apellidos}</p>
                      <p className="text-xs text-muted-foreground capitalize">{p.relacion}</p>
                    </div>
                    <div className="flex gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <Mail className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="hidden md:flex items-center justify-center text-muted-foreground text-sm">
            Selecciona un alumno para ver su perfil
          </div>
        )}
      </div>
    </div>
  )
}
