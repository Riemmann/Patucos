# Changelog

Todos los cambios relevantes del proyecto Patuco App.

## [0.5.0] - 2026-04-10

### PWA: Instalable en pantalla de inicio
- `manifest.json` con `short_name: "Escuela Patuco"` y `display: standalone`
- Iconos del logo de Patuco generados en 192x192, 512x512 y apple-touch-icon 180x180
- Metadata actualizada: titulo corto, apple-web-app capable, theme-color dorado
- Viewport configurado para comportamiento de app movil (sin zoom)
- Al anadir a pantalla de inicio muestra "Escuela Patuco" con el logo del pato

## [0.4.0] - 2026-04-10

### Panel de Direccion
- Nueva seccion `/direccion/` con 4 paginas y layout independiente (color indigo)
- **Dashboard KPIs**: ocupacion por aula, profesoras asignadas, familias con acceso, asistencia del dia
- **Gestion de alumnos**: listado con filtro por aula, cambiar alumno de aula (funcional)
- **Gestion de profesoras**: listado, asignar/reasignar profesora a aula (funcional)
- **Gestion de familias**: generar credenciales de acceso temporales para padres (funcional)
- Landing page actualizada con 3 roles: Familia, Profesora, Directora
- Store ampliado: `updateAlumnoAula`, `updateProfesorAula`, `activarAccesoPadre`
- Hooks reactivos: `useAlumnos`, `useProfesores`, `usePadres`

## [0.3.0] - 2026-04-09

### Nuevas funcionalidades (inspiradas en KinderUp)
- **Estadisticas** (`/padre/estadisticas`): graficas de evolucion semanal de alimentacion, sueno y estado de animo con barras CSS
- **Calendario** (`/padre/calendario`): eventos del centro (fiestas, reuniones, excursiones, festivos) + menu semanal integrado
- **Personas autorizadas**: al marcar salida en asistencia, dialog para seleccionar quien recoge al nino (madre, padre, abuelo...)
- Datos historicos de 5 dias para graficas de Lucia
- 8 eventos de ejemplo con badges de tipo y cuenta atras
- Personas autorizadas por alumno con nombre, relacion y telefono
- Navegacion padre reorganizada: Stats, Agenda, Chat

## [0.2.0] - 2026-04-09

### Rediseno profesional
- Logo real de Patuco (el pato con lapices) en toda la app
- Avatares con iniciales coloreadas (`AvatarIniciales`) en lugar de fotos de Unsplash rotas
- 6 fotos reales de actividades generadas por IA: pintura, patio, musica, cuento, manualidades, bebes
- Componente `FotoDisplay` con fallback elegante para imagenes pendientes
- Landing page rediseñada: estilo app profesional, cards tipo lista
- Headers con backdrop-blur, bordes mas sutiles, tipografia mas fina
- Secciones con headers uppercase y tracking
- Colores de acento diferenciados: amber (familias), emerald (profesoras)

## [0.1.0] - 2026-04-09

### MVP inicial
- **Vista Familia** (6 paginas):
  - Inicio: dashboard con resumen del dia (comidas, siesta, animo, fotos, avisos)
  - Dia: timeline cronologico completo del dia del nino
  - Fotos: galeria con lightbox
  - Menu: menu semanal del comedor
  - Mensajes: chat funcional con la profesora
  - Notificaciones: alertas de salud, recordatorios, anuncios
- **Vista Profesora** (7 paginas):
  - Panel: dashboard de aula con grid de alumnos y estado del dia
  - Registro diario: formulario interactivo (comidas, siesta, panales, actividades, animo, comentario)
  - Alumnos: listado con perfiles, alergias, contactos de padres
  - Asistencia: tablero de entrada/salida por aula
  - Fotos: subida de fotos por aula
  - Notificaciones: crear y enviar avisos a familias
  - Mensajes: bandeja de conversaciones con padres

### Arquitectura
- Next.js 16 App Router + TypeScript
- shadcn/ui + Tailwind CSS
- Datos mock en memoria con estado compartido reactivo (useSyncExternalStore)
- Los cambios de la profesora se reflejan en la vista padre en tiempo real
- 10 alumnos distribuidos en 3 aulas (Pollitos 0-1, Patitos 1-2, Cisnes 2-3)
- Desplegado en Vercel: https://patuco-app.vercel.app
- Repositorio: https://github.com/Riemmann/Patucos
