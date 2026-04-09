'use client'

import { useSyncExternalStore, useCallback } from 'react'
import { demoStore } from './demo-store'
import type { RegistroDiario, Notificacion, Mensaje } from './types'

export function useRegistros() {
  return useSyncExternalStore(demoStore.subscribe, demoStore.getRegistros, demoStore.getRegistros)
}

export function useAsistencias() {
  return useSyncExternalStore(demoStore.subscribe, demoStore.getAsistencias, demoStore.getAsistencias)
}

export function useNotificaciones() {
  return useSyncExternalStore(demoStore.subscribe, demoStore.getNotificaciones, demoStore.getNotificaciones)
}

export function useMensajes() {
  return useSyncExternalStore(demoStore.subscribe, demoStore.getMensajes, demoStore.getMensajes)
}

export function useRegistro(alumnoId: string, fecha: string) {
  const registros = useRegistros()
  return registros.find(r => r.alumnoId === alumnoId && r.fecha === fecha)
}

export function useAsistencia(alumnoId: string, fecha: string) {
  const asistencias = useAsistencias()
  return asistencias.find(a => a.alumnoId === alumnoId && a.fecha === fecha)
}

export function useDemoActions() {
  return {
    updateRegistro: demoStore.updateRegistro,
    addRegistro: demoStore.addRegistro,
    toggleAsistenciaEntrada: demoStore.toggleAsistenciaEntrada,
    toggleAsistenciaSalida: demoStore.toggleAsistenciaSalida,
    addNotificacion: demoStore.addNotificacion,
    markNotificacionLeida: demoStore.markNotificacionLeida,
    addMensaje: demoStore.addMensaje,
  }
}
