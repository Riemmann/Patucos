'use client'

import { useSyncExternalStore } from 'react'
import { demoStore } from './demo-store'

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

export function useAlumnos() {
  return useSyncExternalStore(demoStore.subscribe, demoStore.getAlumnos, demoStore.getAlumnos)
}

export function useProfesores() {
  return useSyncExternalStore(demoStore.subscribe, demoStore.getProfesores, demoStore.getProfesores)
}

export function usePadres() {
  return useSyncExternalStore(demoStore.subscribe, demoStore.getPadres, demoStore.getPadres)
}

export function useConsentimientos() {
  return useSyncExternalStore(demoStore.subscribe, demoStore.getConsentimientos, demoStore.getConsentimientos)
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
    updateAlumnoAula: demoStore.updateAlumnoAula,
    updateProfesorAula: demoStore.updateProfesorAula,
    activarAccesoPadre: demoStore.activarAccesoPadre,
    desactivarAccesoPadre: demoStore.desactivarAccesoPadre,
    addConsentimiento: demoStore.addConsentimiento,
    updateConsentimiento: demoStore.updateConsentimiento,
  }
}
