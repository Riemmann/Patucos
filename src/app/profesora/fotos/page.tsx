'use client'

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, ImagePlus } from "lucide-react"
import { aulas, fotos, getFotosAula, alumnos, getAlumnosByAula } from "@/lib/data"

export default function ProfesoraFotosPage() {
  const [aulaId, setAulaId] = useState('aula-2')
  const hoyStr = new Date().toISOString().split('T')[0]
  const fotosAula = getFotosAula(aulaId, hoyStr)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Fotos</h1>

      <Tabs value={aulaId} onValueChange={setAulaId}>
        <TabsList className="grid w-full grid-cols-3">
          {aulas.map(a => (
            <TabsTrigger key={a.id} value={a.id} className="text-xs">{a.emoji} {a.nombre}</TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Upload area */}
      <Card className="border-dashed border-2">
        <CardContent className="p-8 text-center">
          <ImagePlus className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
          <p className="text-sm font-medium">Subir fotos</p>
          <p className="text-xs text-muted-foreground mt-1">Arrastra fotos aqui o pulsa para seleccionar</p>
          <Button variant="outline" className="mt-3 gap-2">
            <Upload className="w-4 h-4" /> Seleccionar fotos
          </Button>
        </CardContent>
      </Card>

      {/* Existing photos */}
      <div>
        <h2 className="text-sm font-semibold mb-3">Fotos de hoy ({fotosAula.length})</h2>
        {fotosAula.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-6">No hay fotos subidas hoy</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fotosAula.map(foto => (
              <Card key={foto.id} className="overflow-hidden">
                <div className="relative aspect-square">
                  <Image src={foto.url} alt={foto.descripcion} fill className="object-cover" />
                </div>
                <CardContent className="p-2">
                  <p className="text-xs truncate">{foto.descripcion}</p>
                  <div className="flex gap-1 mt-1 flex-wrap">
                    {foto.alumnoIds.map(aId => {
                      const a = alumnos.find(al => al.id === aId)
                      return a ? (
                        <Badge key={aId} variant="secondary" className="text-[10px]">{a.nombre}</Badge>
                      ) : null
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
