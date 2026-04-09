'use client'

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { LogIn, LogOut, Clock } from "lucide-react"
import { aulas, getAlumnosByAula } from "@/lib/data"
import { useAsistencias, useDemoActions } from "@/lib/use-demo-store"

const hoyStr = new Date().toISOString().split('T')[0]

export default function ProfesoraAsistenciaPage() {
  const [aulaId, setAulaId] = useState('aula-2')
  const asistencias = useAsistencias()
  const { toggleAsistenciaEntrada, toggleAsistenciaSalida } = useDemoActions()

  const alumnosAula = getAlumnosByAula(aulaId)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Asistencia</h1>
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

          return (
            <Card key={alumno.id}>
              <CardContent className="p-3 flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-border">
                  <Image src={alumno.fotoUrl} alt={alumno.nombre} fill className="object-cover" />
                </div>
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
                    {presente ? 'Entrada ✓' : 'Entrada'}
                  </Button>
                  {presente && !salido && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs gap-1"
                      onClick={() => toggleAsistenciaSalida(alumno.id, hoyStr, hora)}
                    >
                      <LogOut className="w-3 h-3" /> Salida
                    </Button>
                  )}
                  {salido && (
                    <Badge variant="secondary" className="text-[10px] bg-gray-100">Recogido</Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Summary */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-patuco-green">
                {alumnosAula.filter(a => asistencias.find(as => as.alumnoId === a.id && as.fecha === hoyStr && as.horaEntrada)).length}
              </p>
              <p className="text-xs text-muted-foreground">Presentes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-muted-foreground">
                {alumnosAula.filter(a => !asistencias.find(as => as.alumnoId === a.id && as.fecha === hoyStr && as.horaEntrada)).length}
              </p>
              <p className="text-xs text-muted-foreground">Ausentes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-patuco-blue">
                {alumnosAula.filter(a => asistencias.find(as => as.alumnoId === a.id && as.fecha === hoyStr && as.horaSalida)).length}
              </p>
              <p className="text-xs text-muted-foreground">Recogidos</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
