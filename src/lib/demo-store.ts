'use client'

import type { RegistroDiario, Asistencia, Notificacion, Mensaje } from './types'
import { registrosDiarios as initialRegistros, asistencias as initialAsistencias, notificaciones as initialNotificaciones, mensajes as initialMensajes } from './data'

interface DemoStore {
  registros: RegistroDiario[]
  asistencias: Asistencia[]
  notificaciones: Notificacion[]
  mensajes: Mensaje[]
  updateRegistro: (registro: RegistroDiario) => void
  addRegistro: (registro: RegistroDiario) => void
  toggleAsistencia: (alumnoId: string, fecha: string) => void
  addNotificacion: (notif: Notificacion) => void
  markNotificacionLeida: (id: string) => void
  addMensaje: (msg: Mensaje) => void
}

// Simple store without zustand dependency - using React context instead
// But we need a global mutable store for the demo to work across routes

let _registros = [...initialRegistros]
let _asistencias = [...initialAsistencias]
let _notificaciones = [...initialNotificaciones]
let _mensajes = [...initialMensajes]
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

  updateRegistro(registro: RegistroDiario) {
    _registros = _registros.map(r => r.id === registro.id ? registro : r)
    notify()
  },
  addRegistro(registro: RegistroDiario) {
    _registros = [..._registros, registro]
    notify()
  },
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
  addNotificacion(notif: Notificacion) {
    _notificaciones = [notif, ..._notificaciones]
    notify()
  },
  markNotificacionLeida(id: string) {
    _notificaciones = _notificaciones.map(n => n.id === id ? { ...n, leida: true } : n)
    notify()
  },
  addMensaje(msg: Mensaje) {
    _mensajes = [..._mensajes, msg]
    notify()
  },

  getRegistro(alumnoId: string, fecha: string): RegistroDiario | undefined {
    return _registros.find(r => r.alumnoId === alumnoId && r.fecha === fecha)
  },
  getAsistencia(alumnoId: string, fecha: string): Asistencia | undefined {
    return _asistencias.find(a => a.alumnoId === alumnoId && a.fecha === fecha)
  },
}
