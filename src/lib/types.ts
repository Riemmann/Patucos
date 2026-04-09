// === Enums ===
export type GrupoEdad = '0-1' | '1-2' | '2-3'
export type TipoComida = 'desayuno' | 'almuerzo' | 'merienda'
export type CantidadComida = 'nada' | 'poco' | 'normal' | 'mucho' | 'todo'
export type CalidadSiesta = 'bien' | 'regular' | 'mal'
export type TipoPanal = 'pipi' | 'caca' | 'ambos'
export type TipoActividad = 'psicomotricidad' | 'arte' | 'musica' | 'lectura' | 'juego_libre' | 'exterior' | 'ingles' | 'otro'
export type MomentoAnimo = 'manana' | 'mediodia' | 'tarde'
export type EstadoAnimo = 'muy_contento' | 'contento' | 'neutral' | 'triste' | 'irritable'
export type TipoNotificacion = 'alerta_salud' | 'recordatorio' | 'anuncio' | 'mensaje'
export type Prioridad = 'baja' | 'normal' | 'alta' | 'urgente'
export type RolProfesor = 'profesor' | 'admin' | 'director'
export type Relacion = 'padre' | 'madre' | 'tutor'
export type DiaSemana = 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes'

// === Core entities ===
export interface Centro {
  id: string
  nombre: string
  direccion: string
  telefono: string
  email: string
}

export interface Aula {
  id: string
  centroId: string
  nombre: string
  grupoEdad: GrupoEdad
  capacidad: number
  color: string
  emoji: string
}

export interface Profesor {
  id: string
  centroId: string
  aulaId: string | null
  nombre: string
  apellidos: string
  email: string
  telefono: string
  fotoUrl: string
  rol: RolProfesor
}

export interface Padre {
  id: string
  nombre: string
  apellidos: string
  email: string
  telefono: string
  fotoUrl: string
  relacion: Relacion
}

export interface Alumno {
  id: string
  aulaId: string
  nombre: string
  apellidos: string
  fechaNacimiento: string
  fotoUrl: string
  alergias: string[]
  notasMedicas: string
  activo: boolean
  padreIds: string[]
}

// === Daily report sub-entries ===
export interface Comida {
  id: string
  tipo: TipoComida
  cantidad: CantidadComida
  notas: string
  hora: string
}

export interface Siesta {
  id: string
  horaInicio: string
  horaFin: string | null
  calidad: CalidadSiesta
  notas: string
}

export interface Panal {
  id: string
  hora: string
  tipo: TipoPanal
  notas: string
}

export interface Actividad {
  id: string
  tipo: TipoActividad
  descripcion: string
  hora: string
}

export interface EstadoAnimoEntry {
  id: string
  momento: MomentoAnimo
  estado: EstadoAnimo
  notas: string
}

export interface RegistroDiario {
  id: string
  alumnoId: string
  fecha: string
  profesorId: string
  comentarioGeneral: string
  comidas: Comida[]
  siestas: Siesta[]
  panales: Panal[]
  actividades: Actividad[]
  estadosAnimo: EstadoAnimoEntry[]
}

// === Supporting entities ===
export interface Asistencia {
  id: string
  alumnoId: string
  fecha: string
  horaEntrada: string | null
  horaSalida: string | null
  recogidoPor: string
  notas: string
}

export interface Foto {
  id: string
  url: string
  descripcion: string
  fecha: string
  alumnoIds: string[]
  subidaPor: string
  aulaId: string
}

export interface Notificacion {
  id: string
  tipo: TipoNotificacion
  titulo: string
  contenido: string
  prioridad: Prioridad
  createdAt: string
  leida: boolean
  alumnoId?: string
  aulaId?: string
}

export interface Mensaje {
  id: string
  alumnoId: string
  remitenteTipo: 'padre' | 'profesor'
  remitenteId: string
  contenido: string
  leido: boolean
  createdAt: string
}

export interface MenuDia {
  dia: DiaSemana
  desayuno: string
  primerPlato: string
  segundoPlato: string
  postre: string
  merienda: string
}

export interface MenuSemanal {
  id: string
  semanaInicio: string
  dias: MenuDia[]
}

// === Timeline event (for parent view) ===
export type TimelineEventType = 'entrada' | 'comida' | 'siesta' | 'panal' | 'actividad' | 'estado_animo' | 'foto' | 'salida' | 'comentario'

export interface TimelineEvent {
  id: string
  tipo: TimelineEventType
  hora: string
  datos: Comida | Siesta | Panal | Actividad | EstadoAnimoEntry | Foto | Asistencia | { comentario: string } | null
}
