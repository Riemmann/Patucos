import type { CantidadComida, TipoComida, CalidadSiesta, TipoPanal, TipoActividad, MomentoAnimo, EstadoAnimo, TipoNotificacion, Prioridad, DiaSemana, TipoEvento } from './types'

export const CANTIDAD_LABELS: Record<CantidadComida, string> = {
  nada: 'Nada',
  poco: 'Poco',
  normal: 'Normal',
  mucho: 'Mucho',
  todo: 'Todo',
}

export const CANTIDAD_COLORS: Record<CantidadComida, string> = {
  nada: 'bg-red-100 text-red-700',
  poco: 'bg-orange-100 text-orange-700',
  normal: 'bg-yellow-100 text-yellow-700',
  mucho: 'bg-green-100 text-green-700',
  todo: 'bg-emerald-100 text-emerald-700',
}

export const CANTIDAD_EMOJI: Record<CantidadComida, string> = {
  nada: '😶',
  poco: '🍽️',
  normal: '😊',
  mucho: '😋',
  todo: '🤩',
}

export const TIPO_COMIDA_LABELS: Record<TipoComida, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  merienda: 'Merienda',
}

export const TIPO_COMIDA_ICONS: Record<TipoComida, string> = {
  desayuno: '🥛',
  almuerzo: '🍝',
  merienda: '🍎',
}

export const TIPO_COMIDA_HORAS: Record<TipoComida, string> = {
  desayuno: '09:30',
  almuerzo: '12:00',
  merienda: '16:00',
}

export const CALIDAD_SIESTA_LABELS: Record<CalidadSiesta, string> = {
  bien: 'Bien',
  regular: 'Regular',
  mal: 'Mal',
}

export const CALIDAD_SIESTA_EMOJI: Record<CalidadSiesta, string> = {
  bien: '😴',
  regular: '😐',
  mal: '😣',
}

export const TIPO_PANAL_LABELS: Record<TipoPanal, string> = {
  pipi: 'Pipí',
  caca: 'Caca',
  ambos: 'Ambos',
}

export const TIPO_ACTIVIDAD_LABELS: Record<TipoActividad, string> = {
  psicomotricidad: 'Psicomotricidad',
  arte: 'Arte',
  musica: 'Música',
  lectura: 'Lectura',
  juego_libre: 'Juego libre',
  exterior: 'Patio exterior',
  ingles: 'Inglés',
  otro: 'Otro',
}

export const TIPO_ACTIVIDAD_EMOJI: Record<TipoActividad, string> = {
  psicomotricidad: '🤸',
  arte: '🎨',
  musica: '🎵',
  lectura: '📚',
  juego_libre: '🧸',
  exterior: '☀️',
  ingles: '🇬🇧',
  otro: '✨',
}

export const MOMENTO_LABELS: Record<MomentoAnimo, string> = {
  manana: 'Mañana',
  mediodia: 'Mediodía',
  tarde: 'Tarde',
}

export const ESTADO_ANIMO_LABELS: Record<EstadoAnimo, string> = {
  muy_contento: 'Muy contento',
  contento: 'Contento',
  neutral: 'Normal',
  triste: 'Triste',
  irritable: 'Irritable',
}

export const ESTADO_ANIMO_EMOJI: Record<EstadoAnimo, string> = {
  muy_contento: '🤩',
  contento: '😊',
  neutral: '😐',
  triste: '😢',
  irritable: '😤',
}

export const TIPO_NOTIFICACION_LABELS: Record<TipoNotificacion, string> = {
  alerta_salud: 'Alerta de salud',
  recordatorio: 'Recordatorio',
  anuncio: 'Anuncio',
  mensaje: 'Mensaje',
}

export const TIPO_NOTIFICACION_EMOJI: Record<TipoNotificacion, string> = {
  alerta_salud: '🏥',
  recordatorio: '📋',
  anuncio: '📢',
  mensaje: '💬',
}

export const PRIORIDAD_LABELS: Record<Prioridad, string> = {
  baja: 'Baja',
  normal: 'Normal',
  alta: 'Alta',
  urgente: 'Urgente',
}

export const PRIORIDAD_COLORS: Record<Prioridad, string> = {
  baja: 'bg-gray-100 text-gray-600',
  normal: 'bg-blue-100 text-blue-700',
  alta: 'bg-orange-100 text-orange-700',
  urgente: 'bg-red-100 text-red-700',
}

export const DIA_LABELS: Record<DiaSemana, string> = {
  lunes: 'Lunes',
  martes: 'Martes',
  miercoles: 'Miércoles',
  jueves: 'Jueves',
  viernes: 'Viernes',
}

export const TIPO_EVENTO_LABELS: Record<TipoEvento, string> = {
  fiesta: 'Fiesta',
  reunion: 'Reunion',
  excursion: 'Excursion',
  festivo: 'Festivo',
  taller: 'Taller',
  otro: 'Otro',
}

export const TIPO_EVENTO_EMOJI: Record<TipoEvento, string> = {
  fiesta: '🎉',
  reunion: '👥',
  excursion: '🚌',
  festivo: '📅',
  taller: '🎨',
  otro: '📌',
}

export const TIPO_EVENTO_COLORS: Record<TipoEvento, string> = {
  fiesta: 'bg-pink-100 text-pink-700',
  reunion: 'bg-blue-100 text-blue-700',
  excursion: 'bg-emerald-100 text-emerald-700',
  festivo: 'bg-amber-100 text-amber-700',
  taller: 'bg-violet-100 text-violet-700',
  otro: 'bg-gray-100 text-gray-700',
}
