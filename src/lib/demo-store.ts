'use client'

import type { RegistroDiario, Asistencia, Notificacion, Mensaje, Alumno, Profesor, Padre } from './types'
import { registrosDiarios as initialRegistros, asistencias as initialAsistencias, notificaciones as initialNotificaciones, mensajes as initialMensajes, alumnos as initialAlumnos, profesores as initialProfesores, padres as initialPadres } from './data'

let _registros = [...initialRegistros]
let _asistencias = [...initialAsistencias]
let _notificaciones = [...initialNotificaciones]
let _mensajes = [...initialMensajes]
let _alumnos = [...initialAlumnos]
let _profesores = [...initialProfesores]
let _padres = [...initialPadres]
let _listeners: (() => void)[] = []

function notify() {
  _listeners.forEach(l => l())
}

export const demoStore = {
  subscribe(listener: () => void) {
    _listeners.push(listener)
    return () => {
      _listeners = _listeners.filter(l => l !== listener)
    }
  },
  getRegistros: () => _registros,
  getAsistencias: () => _asistencias,
  getNotificaciones: () => _notificaciones,
  getMensajes: () => _mensajes,
  getAlumnos: () => _alumnos,
  getProfesores: () => _profesores,
  getPadres: () => _padres,

  // --- Registros ---
  updateRegistro(registro: RegistroDiario) {
    _registros = _registros.map(r => r.id === registro.id ? registro : r)
    notify()
  },
  addRegistro(registro: RegistroDiario) {
    _registros = [..._registros, registro]
    notify()
  },

  // --- Asistencia ---
  toggleAsistenciaEntrada(alumnoId: string, fecha: string, hora: string) {
    const existing = _asistencias.find(a => a.alumnoId === alumnoId && a.fecha === fecha)
    if (existing) {
      _asistencias = _asistencias.map(a =>
        a.id === existing.id ? { ...a, horaEntrada: a.horaEntrada ? null : hora } : a
      )
    } else {
      _asistencias = [..._asistencias, { id: `asis-new-${Date.now()}`, alumnoId, fecha, horaEntrada: hora, horaSalida: null, recogidoPor: '', notas: '' }]
    }
    notify()
  },
  toggleAsistenciaSalida(alumnoId: string, fecha: string, hora: string, recogidoPor?: string) {
    const existing = _asistencias.find(a => a.alumnoId === alumnoId && a.fecha === fecha)
    if (existing) {
      _asistencias = _asistencias.map(a =>
        a.id === existing.id ? { ...a, horaSalida: a.horaSalida ? null : hora, recogidoPor: recogidoPor || a.recogidoPor } : a
      )
    }
    notify()
  },

  // --- Notificaciones ---
  addNotificacion(notif: Notificacion) {
    _notificaciones = [notif, ..._notificaciones]
    notify()
  },
  markNotificacionLeida(id: string) {
    _notificaciones = _notificaciones.map(n => n.id === id ? { ...n, leida: true } : n)
    notify()
  },

  // --- Mensajes ---
  addMensaje(msg: Mensaje) {
    _mensajes = [..._mensajes, msg]
    notify()
  },

  // --- Direccion: Gestion alumnos ---
  updateAlumnoAula(alumnoId: string, aulaId: string) {
    _alumnos = _alumnos.map(a => a.id === alumnoId ? { ...a, aulaId } : a)
    notify()
  },

  // --- Direccion: Gestion profesoras ---
  updateProfesorAula(profesorId: string, aulaId: string | null) {
    _profesores = _profesores.map(p => p.id === profesorId ? { ...p, aulaId } : p)
    notify()
  },

  // --- Direccion: Acceso familias ---
  activarAccesoPadre(padreId: string) {
    _padres = _padres.map(p => p.id === padreId ? { ...p, accesoActivo: true, fechaAcceso: new Date().toISOString() } : p)
    notify()
  },
  desactivarAccesoPadre(padreId: string) {
    _padres = _padres.map(p => p.id === padreId ? { ...p, accesoActivo: false } : p)
    notify()
  },

  // --- Helpers ---
  getRegistro(alumnoId: string, fecha: string): RegistroDiario | undefined {
    return _registros.find(r => r.alumnoId === alumnoId && r.fecha === fecha)
  },
  getAsistencia(alumnoId: string, fecha: string): Asistencia | undefined {
    return _asistencias.find(a => a.alumnoId === alumnoId && a.fecha === fecha)
  },
}
