'use client'

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { getFotosAlumno } from "@/lib/data"
import { FotoDisplay } from "@/components/shared/foto-placeholder"
import type { Foto } from "@/lib/types"

const ALUMNO_ID = 'alumno-4'
const hoyStr = new Date().toISOString().split('T')[0]

export default function PadreFotosPage() {
  const fotos = getFotosAlumno(ALUMNO_ID, hoyStr)
  const [selected, setSelected] = useState<Foto | null>(null)

  const hoyFormatted = new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-base font-semibold">Fotos</h2>
        <p className="text-xs text-muted-foreground capitalize">{hoyFormatted}</p>
      </div>

      {fotos.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">📷</p>
          <p className="text-muted-foreground text-sm">No hay fotos de hoy todavia</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2.5">
          {fotos.map(foto => (
            <button
              key={foto.id}
              onClick={() => setSelected(foto)}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer bg-muted/30"
            >
              <FotoDisplay src={foto.url} alt={foto.descripcion} />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/40 to-transparent">
                <p className="text-[11px] text-white font-medium truncate">{foto.descripcion}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg p-0 overflow-hidden">
          {selected && (
            <div>
              <div className="relative w-full aspect-video bg-muted">
                <FotoDisplay src={selected.url} alt={selected.descripcion} />
              </div>
              <div className="p-4">
                <p className="text-sm font-medium">{selected.descripcion}</p>
                <p className="text-xs text-muted-foreground mt-1">{selected.fecha}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
