'use client'

import { useState } from "react"
import { AvatarIniciales } from "@/components/shared/avatar-iniciales"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Save, Plus, X } from "lucide-react"
import { aulas, alumnos, getAlumnosByAula } from "@/lib/data"
import { useRegistros, useDemoActions } from "@/lib/use-demo-store"
import { CANTIDAD_LABELS, CANTIDAD_EMOJI, TIPO_COMIDA_LABELS, TIPO_COMIDA_ICONS, TIPO_COMIDA_HORAS, CALIDAD_SIESTA_LABELS, CALIDAD_SIESTA_EMOJI, TIPO_PANAL_LABELS, TIPO_ACTIVIDAD_LABELS, TIPO_ACTIVIDAD_EMOJI, ESTADO_ANIMO_EMOJI, ESTADO_ANIMO_LABELS, MOMENTO_LABELS } from "@/lib/constants"
import type { RegistroDiario, Comida, Siesta, Panal, Actividad, EstadoAnimoEntry, CantidadComida, CalidadSiesta, TipoPanal, TipoActividad, EstadoAnimo, MomentoAnimo, TipoComida } from "@/lib/types"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

const hoyStr = new Date().toISOString().split('T')[0]
const cantidades: CantidadComida[] = ['nada', 'poco', 'normal', 'mucho', 'todo']
const calidades: CalidadSiesta[] = ['bien', 'regular', 'mal']
const tiposPanal: TipoPanal[] = ['pipi', 'caca', 'ambos']
const tiposActividad: TipoActividad[] = ['psicomotricidad', 'arte', 'musica', 'lectura', 'juego_libre', 'exterior', 'ingles', 'otro']
const estadosAnimo: EstadoAnimo[] = ['muy_contento', 'contento', 'neutral', 'triste', 'irritable']
const momentos: MomentoAnimo[] = ['manana', 'mediodia', 'tarde']
const tiposComida: TipoComida[] = ['desayuno', 'almuerzo', 'merienda']

export default function ProfesoraRegistroPage() {
  return (
    <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Cargando...</div>}>
      <RegistroContent />
    </Suspense>
  )
}

function RegistroContent() {
  const [aulaId, setAulaId] = useState('aula-2')
  const [selectedAlumnoId, setSelectedAlumnoId] = useState<string | null>(null)
  const registros = useRegistros()
  const { updateRegistro, addRegistro } = useDemoActions()
  const [saved, setSaved] = useState(false)

  const alumnosAula = getAlumnosByAula(aulaId)
  const alumno = selectedAlumnoId ? alumnos.find(a => a.id === selectedAlumnoId) : null

  // Get or create registro
  const existingRegistro = selectedAlumnoId ? registros.find(r => r.alumnoId === selectedAlumnoId && r.fecha === hoyStr) : null

  const emptyRegistro: RegistroDiario = {
    id: `reg-new-${Date.now()}`,
    alumnoId: selectedAlumnoId || '',
    fecha: hoyStr,
    profesorId: 'prof-2',
    comentarioGeneral: '',
    comidas: tiposComida.map((tipo, i) => ({ id: `com-new-${i}`, tipo, cantidad: 'normal' as CantidadComida, notas: '', hora: TIPO_COMIDA_HORAS[tipo] })),
    siestas: [],
    panales: [],
    actividades: [],
    estadosAnimo: [],
  }

  const [registro, setRegistro] = useState<RegistroDiario>(existingRegistro || emptyRegistro)

  // Reset when selecting new student
  function selectAlumno(id: string) {
    setSelectedAlumnoId(id)
    const existing = registros.find(r => r.alumnoId === id && r.fecha === hoyStr)
    setRegistro(existing || { ...emptyRegistro, id: `reg-new-${Date.now()}`, alumnoId: id })
    setSaved(false)
  }

  function guardar() {
    if (existingRegistro) {
      updateRegistro(registro)
    } else {
      addRegistro(registro)
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  // Update helpers
  function updateComida(tipo: TipoComida, field: keyof Comida, value: string) {
    setRegistro(prev => ({
      ...prev,
      comidas: prev.comidas.map(c => c.tipo === tipo ? { ...c, [field]: value } : c)
    }))
  }

  function addSiesta() {
    setRegistro(prev => ({
      ...prev,
      siestas: [...prev.siestas, { id: `sie-new-${Date.now()}`, horaInicio: '13:00', horaFin: '14:30', calidad: 'bien' as CalidadSiesta, notas: '' }]
    }))
  }

  function removeSiesta(id: string) {
    setRegistro(prev => ({ ...prev, siestas: prev.siestas.filter(s => s.id !== id) }))
  }

  function updateSiesta(id: string, field: keyof Siesta, value: string | null) {
    setRegistro(prev => ({
      ...prev,
      siestas: prev.siestas.map(s => s.id === id ? { ...s, [field]: value } : s)
    }))
  }

  function addPanal() {
    const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
    setRegistro(prev => ({
      ...prev,
      panales: [...prev.panales, { id: `pan-new-${Date.now()}`, hora, tipo: 'pipi' as TipoPanal, notas: '' }]
    }))
  }

  function removePanal(id: string) {
    setRegistro(prev => ({ ...prev, panales: prev.panales.filter(p => p.id !== id) }))
  }

  function addActividad() {
    setRegistro(prev => ({
      ...prev,
      actividades: [...prev.actividades, { id: `act-new-${Date.now()}`, tipo: 'juego_libre' as TipoActividad, descripcion: '', hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) }]
    }))
  }

  function removeActividad(id: string) {
    setRegistro(prev => ({ ...prev, actividades: prev.actividades.filter(a => a.id !== id) }))
  }

  function setEstadoAnimo(momento: MomentoAnimo, estado: EstadoAnimo) {
    setRegistro(prev => {
      const existing = prev.estadosAnimo.find(ea => ea.momento === momento)
      if (existing) {
        return { ...prev, estadosAnimo: prev.estadosAnimo.map(ea => ea.momento === momento ? { ...ea, estado } : ea) }
      }
      return { ...prev, estadosAnimo: [...prev.estadosAnimo, { id: `ea-new-${Date.now()}`, momento, estado, notas: '' }] }
    })
  }

  // If no student selected, show student picker
  if (!alumno) {
    return (
      <div className="space-y-4">
        <h1 className="text-xl font-bold">Registro Diario</h1>
        <Tabs value={aulaId} onValueChange={setAulaId}>
          <TabsList className="grid w-full grid-cols-3">
            {aulas.map(a => (
              <TabsTrigger key={a.id} value={a.id} className="text-xs">{a.emoji} {a.nombre}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {alumnosAula.map(a => {
            const reg = registros.find(r => r.alumnoId === a.id && r.fecha === hoyStr)
            const completado = reg && reg.comentarioGeneral
            return (
              <Card key={a.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => selectAlumno(a.id)}>
                <CardContent className="p-4 text-center">
                  <AvatarIniciales nombre={a.nombre} apellidos={a.apellidos} size="lg" className="mx-auto mb-2" />
                  <p className="text-sm font-medium">{a.nombre}</p>
                  <p className="text-xs text-muted-foreground">{a.apellidos}</p>
                  {completado ? (
                    <Badge className="mt-2 bg-green-100 text-green-700 text-[10px]">Completado</Badge>
                  ) : reg ? (
                    <Badge className="mt-2 bg-yellow-100 text-yellow-700 text-[10px]">En progreso</Badge>
                  ) : (
                    <Badge variant="secondary" className="mt-2 text-[10px]">Pendiente</Badge>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => setSelectedAlumnoId(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <AvatarIniciales nombre={alumno.nombre} apellidos={alumno.apellidos} size="md" />
          <div>
            <h1 className="text-lg font-bold">{alumno.nombre} {alumno.apellidos}</h1>
            <p className="text-xs text-muted-foreground">{new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </div>
        </div>
        <Button onClick={guardar} className="gap-2">
          <Save className="w-4 h-4" />
          {saved ? '¡Guardado!' : 'Guardar'}
        </Button>
      </div>

      {alumno.alergias.length > 0 && (
        <div className="flex gap-2 items-center">
          <span className="text-xs text-red-600 font-medium">⚠️ Alergias:</span>
          {alumno.alergias.map(a => (
            <Badge key={a} variant="destructive" className="text-xs">{a}</Badge>
          ))}
        </div>
      )}

      {/* COMIDAS */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">🍽️ Comidas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {tiposComida.map(tipo => {
            const comida = registro.comidas.find(c => c.tipo === tipo)
            return (
              <div key={tipo} className="space-y-2">
                <Label className="text-sm font-medium">{TIPO_COMIDA_ICONS[tipo]} {TIPO_COMIDA_LABELS[tipo]} ({TIPO_COMIDA_HORAS[tipo]})</Label>
                <div className="flex gap-1 flex-wrap">
                  {cantidades.map(cant => (
                    <Button
                      key={cant}
                      variant={comida?.cantidad === cant ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => updateComida(tipo, 'cantidad', cant)}
                    >
                      {CANTIDAD_EMOJI[cant]} {CANTIDAD_LABELS[cant]}
                    </Button>
                  ))}
                </div>
                <Input
                  placeholder="Notas..."
                  value={comida?.notas || ''}
                  onChange={e => updateComida(tipo, 'notas', e.target.value)}
                  className="text-sm"
                />
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* SIESTA */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">😴 Siesta</CardTitle>
            <Button variant="outline" size="sm" onClick={addSiesta} className="gap-1">
              <Plus className="w-3 h-3" /> Añadir
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {registro.siestas.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">Sin siesta registrada</p>
          )}
          {registro.siestas.map(siesta => (
            <div key={siesta.id} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
              <div className="flex-1 space-y-2">
                <div className="flex gap-2 items-center">
                  <Label className="text-xs w-12">Inicio</Label>
                  <Input type="time" value={siesta.horaInicio} onChange={e => updateSiesta(siesta.id, 'horaInicio', e.target.value)} className="w-28 text-sm" />
                  <Label className="text-xs w-8">Fin</Label>
                  <Input type="time" value={siesta.horaFin || ''} onChange={e => updateSiesta(siesta.id, 'horaFin', e.target.value || null)} className="w-28 text-sm" />
                </div>
                <div className="flex gap-1">
                  {calidades.map(cal => (
                    <Button key={cal} variant={siesta.calidad === cal ? "default" : "outline"} size="sm" className="text-xs"
                      onClick={() => updateSiesta(siesta.id, 'calidad', cal)}>
                      {CALIDAD_SIESTA_EMOJI[cal]} {CALIDAD_SIESTA_LABELS[cal]}
                    </Button>
                  ))}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeSiesta(siesta.id)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* PAÑALES */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">👶 Pañales</CardTitle>
            <Button variant="outline" size="sm" onClick={addPanal} className="gap-1">
              <Plus className="w-3 h-3" /> Añadir
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {registro.panales.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">Sin cambios registrados</p>
          )}
          <div className="flex flex-wrap gap-2">
            {registro.panales.map(panal => (
              <Badge key={panal.id} variant="secondary" className="text-xs py-1.5 px-3 gap-1">
                {panal.hora} - {TIPO_PANAL_LABELS[panal.tipo]}
                <button onClick={() => removePanal(panal.id)} className="ml-1 hover:text-destructive">
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ACTIVIDADES */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">🎨 Actividades</CardTitle>
            <Button variant="outline" size="sm" onClick={addActividad} className="gap-1">
              <Plus className="w-3 h-3" /> Añadir
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {registro.actividades.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-2">Sin actividades registradas</p>
          )}
          {registro.actividades.map(act => (
            <div key={act.id} className="flex gap-2 p-3 rounded-lg bg-muted/50">
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <Select value={act.tipo} onValueChange={v => setRegistro(prev => ({ ...prev, actividades: prev.actividades.map(a => a.id === act.id ? { ...a, tipo: v as TipoActividad } : a) }))}>
                    <SelectTrigger className="w-44 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {tiposActividad.map(t => (
                        <SelectItem key={t} value={t} className="text-xs">{TIPO_ACTIVIDAD_EMOJI[t]} {TIPO_ACTIVIDAD_LABELS[t]}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input type="time" value={act.hora} onChange={e => setRegistro(prev => ({ ...prev, actividades: prev.actividades.map(a => a.id === act.id ? { ...a, hora: e.target.value } : a) }))} className="w-28 text-sm" />
                </div>
                <Input
                  placeholder="Descripcion de la actividad..."
                  value={act.descripcion}
                  onChange={e => setRegistro(prev => ({ ...prev, actividades: prev.actividades.map(a => a.id === act.id ? { ...a, descripcion: e.target.value } : a) }))}
                  className="text-sm"
                />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeActividad(act.id)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* ESTADO DE ANIMO */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">😊 Estado de animo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {momentos.map(momento => {
            const current = registro.estadosAnimo.find(ea => ea.momento === momento)
            return (
              <div key={momento} className="space-y-1">
                <Label className="text-sm">{MOMENTO_LABELS[momento]}</Label>
                <div className="flex gap-1 flex-wrap">
                  {estadosAnimo.map(estado => (
                    <Button
                      key={estado}
                      variant={current?.estado === estado ? "default" : "outline"}
                      size="sm"
                      className="text-xs"
                      onClick={() => setEstadoAnimo(momento, estado)}
                    >
                      {ESTADO_ANIMO_EMOJI[estado]}
                    </Button>
                  ))}
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* COMENTARIO */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">💬 Comentario del dia</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Escribe el comentario del dia para los padres..."
            value={registro.comentarioGeneral}
            onChange={e => setRegistro(prev => ({ ...prev, comentarioGeneral: e.target.value }))}
            rows={4}
            className="text-sm"
          />
        </CardContent>
      </Card>

      {/* Save button */}
      <Button onClick={guardar} className="w-full gap-2" size="lg">
        <Save className="w-5 h-5" />
        {saved ? '¡Registro guardado!' : 'Guardar registro'}
      </Button>
    </div>
  )
}
