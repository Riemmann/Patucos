import type {
  Centro, Aula, Profesor, Padre, Alumno, RegistroDiario, Foto,
  Notificacion, Mensaje, MenuSemanal, Asistencia, Comida, Siesta,
  Panal, Actividad, EstadoAnimoEntry, TimelineEvent
} from '../types'

// ============= CENTRO =============
export const centro: Centro = {
  id: 'centro-1',
  nombre: 'Escuela Infantil Patuco',
  direccion: 'Calle Castillejos, 24-26, 28039 Madrid',
  telefono: '914 50 67 42',
  email: 'patucoe@gmail.com',
}

// ============= AULAS =============
export const aulas: Aula[] = [
  { id: 'aula-1', centroId: 'centro-1', nombre: 'Pollitos', grupoEdad: '0-1', capacidad: 8, color: '#FFF3E0', emoji: '🐣' },
  { id: 'aula-2', centroId: 'centro-1', nombre: 'Patitos', grupoEdad: '1-2', capacidad: 13, color: '#E8F5E9', emoji: '🐥' },
  { id: 'aula-3', centroId: 'centro-1', nombre: 'Cisnes', grupoEdad: '2-3', capacidad: 16, color: '#E3F2FD', emoji: '🦢' },
]

// ============= PROFESORES =============
export const profesores: Profesor[] = [
  { id: 'prof-1', centroId: 'centro-1', aulaId: 'aula-1', nombre: 'Carmen', apellidos: 'Ruiz Fernández', email: 'carmen@patuco.es', telefono: '600111222', fotoUrl: 'https://i.pravatar.cc/150?img=47', rol: 'profesor' },
  { id: 'prof-2', centroId: 'centro-1', aulaId: 'aula-2', nombre: 'María', apellidos: 'García López', email: 'maria@patuco.es', telefono: '600333444', fotoUrl: 'https://i.pravatar.cc/150?img=44', rol: 'profesor' },
  { id: 'prof-3', centroId: 'centro-1', aulaId: 'aula-3', nombre: 'Laura', apellidos: 'Martínez Sánchez', email: 'laura@patuco.es', telefono: '600555666', fotoUrl: 'https://i.pravatar.cc/150?img=45', rol: 'profesor' },
  { id: 'prof-4', centroId: 'centro-1', aulaId: null, nombre: 'Ana', apellidos: 'Pérez Rodríguez', email: 'ana@patuco.es', telefono: '600777888', fotoUrl: 'https://i.pravatar.cc/150?img=48', rol: 'director' },
]

// ============= PADRES =============
export const padres: Padre[] = [
  { id: 'padre-1', nombre: 'Carlos', apellidos: 'Hernández Díaz', email: 'carlos@email.com', telefono: '611222333', fotoUrl: 'https://i.pravatar.cc/150?img=11', relacion: 'padre' },
  { id: 'padre-2', nombre: 'Elena', apellidos: 'Torres Molina', email: 'elena@email.com', telefono: '611444555', fotoUrl: 'https://i.pravatar.cc/150?img=26', relacion: 'madre' },
  { id: 'padre-3', nombre: 'Miguel', apellidos: 'Navarro Gil', email: 'miguel@email.com', telefono: '611666777', fotoUrl: 'https://i.pravatar.cc/150?img=12', relacion: 'padre' },
  { id: 'padre-4', nombre: 'Sofía', apellidos: 'Romero Blanco', email: 'sofia@email.com', telefono: '611888999', fotoUrl: 'https://i.pravatar.cc/150?img=32', relacion: 'madre' },
  { id: 'padre-5', nombre: 'Javier', apellidos: 'Serrano Ruiz', email: 'javier@email.com', telefono: '612111222', fotoUrl: 'https://i.pravatar.cc/150?img=14', relacion: 'padre' },
  { id: 'padre-6', nombre: 'Laura', apellidos: 'Moreno Castro', email: 'laura.m@email.com', telefono: '612333444', fotoUrl: 'https://i.pravatar.cc/150?img=25', relacion: 'madre' },
  { id: 'padre-7', nombre: 'Roberto', apellidos: 'Jiménez Vega', email: 'roberto@email.com', telefono: '612555666', fotoUrl: 'https://i.pravatar.cc/150?img=15', relacion: 'padre' },
  { id: 'padre-8', nombre: 'Marta', apellidos: 'Álvarez Prieto', email: 'marta@email.com', telefono: '612777888', fotoUrl: 'https://i.pravatar.cc/150?img=29', relacion: 'madre' },
]

// ============= ALUMNOS =============
export const alumnos: Alumno[] = [
  // Aula Pollitos (0-1)
  { id: 'alumno-1', aulaId: 'aula-1', nombre: 'Emma', apellidos: 'Hernández Torres', fechaNacimiento: '2025-06-15', fotoUrl: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=200&h=200&fit=crop&crop=face', alergias: [], notasMedicas: '', activo: true, padreIds: ['padre-1', 'padre-2'] },
  { id: 'alumno-2', aulaId: 'aula-1', nombre: 'Leo', apellidos: 'Navarro Romero', fechaNacimiento: '2025-08-22', fotoUrl: 'https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=200&h=200&fit=crop&crop=face', alergias: ['lactosa'], notasMedicas: 'Intolerancia a la lactosa. Leche de soja.', activo: true, padreIds: ['padre-3', 'padre-4'] },
  { id: 'alumno-3', aulaId: 'aula-1', nombre: 'Olivia', apellidos: 'Serrano Moreno', fechaNacimiento: '2025-09-10', fotoUrl: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=200&h=200&fit=crop&crop=face', alergias: [], notasMedicas: '', activo: true, padreIds: ['padre-5', 'padre-6'] },
  // Aula Patitos (1-2)
  { id: 'alumno-4', aulaId: 'aula-2', nombre: 'Lucía', apellidos: 'García Pérez', fechaNacimiento: '2024-11-03', fotoUrl: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=200&h=200&fit=crop&crop=face', alergias: [], notasMedicas: '', activo: true, padreIds: ['padre-2'] },
  { id: 'alumno-5', aulaId: 'aula-2', nombre: 'Mateo', apellidos: 'Jiménez Álvarez', fechaNacimiento: '2024-09-18', fotoUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=200&h=200&fit=crop&crop=face', alergias: ['huevo'], notasMedicas: 'Alergia al huevo. Menú adaptado.', activo: true, padreIds: ['padre-7', 'padre-8'] },
  { id: 'alumno-6', aulaId: 'aula-2', nombre: 'Sofía', apellidos: 'Moreno Castro', fechaNacimiento: '2024-12-25', fotoUrl: 'https://images.unsplash.com/photo-1566004100477-7b1e3e7e88fb?w=200&h=200&fit=crop&crop=face', alergias: [], notasMedicas: '', activo: true, padreIds: ['padre-6'] },
  { id: 'alumno-7', aulaId: 'aula-2', nombre: 'Pablo', apellidos: 'Torres Hernández', fechaNacimiento: '2025-01-14', fotoUrl: 'https://images.unsplash.com/photo-1607748862156-7c548e7e98f4?w=200&h=200&fit=crop&crop=face', alergias: [], notasMedicas: '', activo: true, padreIds: ['padre-1'] },
  // Aula Cisnes (2-3)
  { id: 'alumno-8', aulaId: 'aula-3', nombre: 'Martín', apellidos: 'Romero Navarro', fechaNacimiento: '2023-07-20', fotoUrl: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=200&h=200&fit=crop&crop=face', alergias: [], notasMedicas: '', activo: true, padreIds: ['padre-4', 'padre-3'] },
  { id: 'alumno-9', aulaId: 'aula-3', nombre: 'Valentina', apellidos: 'Álvarez Jiménez', fechaNacimiento: '2023-10-05', fotoUrl: 'https://images.unsplash.com/photo-1502781252888-9143f9486e44?w=200&h=200&fit=crop&crop=face', alergias: ['gluten'], notasMedicas: 'Celiaquía diagnosticada. Menú sin gluten.', activo: true, padreIds: ['padre-8', 'padre-7'] },
  { id: 'alumno-10', aulaId: 'aula-3', nombre: 'Daniel', apellidos: 'Serrano Pérez', fechaNacimiento: '2023-05-30', fotoUrl: 'https://images.unsplash.com/photo-1542652694-40abf526446e?w=200&h=200&fit=crop&crop=face', alergias: [], notasMedicas: '', activo: true, padreIds: ['padre-5'] },
]

// ============= HOY (para datos dinámicos) =============
const hoy = new Date()
const hoyStr = hoy.toISOString().split('T')[0]

// ============= REGISTROS DIARIOS (hoy) =============
export const registrosDiarios: RegistroDiario[] = [
  // Lucía - Aula Patitos (el alumno "estrella" del demo para la vista padre)
  {
    id: 'reg-1',
    alumnoId: 'alumno-4',
    fecha: hoyStr,
    profesorId: 'prof-2',
    comentarioGeneral: 'Lucía ha tenido un día estupendo. Ha disfrutado mucho en el taller de pintura con los dedos y ha compartido los materiales con sus compañeros. En el patio ha jugado con la pelota y ha practicado sus primeros pasos con mucha seguridad. ¡Cada día más independiente!',
    comidas: [
      { id: 'com-1', tipo: 'desayuno', cantidad: 'todo', notas: 'Se ha comido toda la galleta y la leche', hora: '09:30' },
      { id: 'com-2', tipo: 'almuerzo', cantidad: 'mucho', notas: 'Le ha gustado mucho la pasta. No quiso el postre.', hora: '12:15' },
      { id: 'com-3', tipo: 'merienda', cantidad: 'normal', notas: '', hora: '16:00' },
    ],
    siestas: [
      { id: 'sie-1', horaInicio: '12:45', horaFin: '14:30', calidad: 'bien', notas: 'Ha dormido muy tranquila' },
    ],
    panales: [
      { id: 'pan-1', hora: '10:00', tipo: 'pipi', notas: '' },
      { id: 'pan-2', hora: '12:00', tipo: 'ambos', notas: '' },
      { id: 'pan-3', hora: '15:00', tipo: 'pipi', notas: '' },
    ],
    actividades: [
      { id: 'act-1', tipo: 'arte', descripcion: 'Taller de pintura con los dedos. Hemos pintado un arcoíris.', hora: '10:30' },
      { id: 'act-2', tipo: 'exterior', descripcion: 'Juego libre en el patio con pelotas y triciclos.', hora: '11:15' },
      { id: 'act-3', tipo: 'musica', descripcion: 'Canciones y ritmo con instrumentos de percusión.', hora: '15:30' },
    ],
    estadosAnimo: [
      { id: 'ea-1', momento: 'manana', estado: 'muy_contento', notas: 'Ha llegado con muchas ganas' },
      { id: 'ea-2', momento: 'mediodia', estado: 'contento', notas: '' },
      { id: 'ea-3', momento: 'tarde', estado: 'contento', notas: 'Un poco cansada pero contenta' },
    ],
  },
  // Mateo - Aula Patitos
  {
    id: 'reg-2',
    alumnoId: 'alumno-5',
    fecha: hoyStr,
    profesorId: 'prof-2',
    comentarioGeneral: 'Mateo ha estado muy activo hoy. Le ha encantado el juego en el patio y ha empezado a decir nuevas palabras. Ha comido bien el almuerzo adaptado.',
    comidas: [
      { id: 'com-4', tipo: 'desayuno', cantidad: 'normal', notas: '', hora: '09:30' },
      { id: 'com-5', tipo: 'almuerzo', cantidad: 'todo', notas: 'Menú adaptado sin huevo. Se lo ha comido todo.', hora: '12:15' },
      { id: 'com-6', tipo: 'merienda', cantidad: 'poco', notas: 'No tenía mucha hambre', hora: '16:00' },
    ],
    siestas: [
      { id: 'sie-2', horaInicio: '13:00', horaFin: '14:15', calidad: 'regular', notas: 'Le ha costado dormirse' },
    ],
    panales: [
      { id: 'pan-4', hora: '10:15', tipo: 'pipi', notas: '' },
      { id: 'pan-5', hora: '12:30', tipo: 'caca', notas: '' },
      { id: 'pan-6', hora: '15:30', tipo: 'pipi', notas: '' },
    ],
    actividades: [
      { id: 'act-4', tipo: 'psicomotricidad', descripcion: 'Circuito de gateo y primeros pasos con colchonetas.', hora: '10:00' },
      { id: 'act-5', tipo: 'exterior', descripcion: 'Juego libre en el patio.', hora: '11:15' },
      { id: 'act-6', tipo: 'lectura', descripcion: 'Cuento: "El pollo Pepe".', hora: '15:30' },
    ],
    estadosAnimo: [
      { id: 'ea-4', momento: 'manana', estado: 'contento', notas: '' },
      { id: 'ea-5', momento: 'mediodia', estado: 'muy_contento', notas: 'Muy contento en el patio' },
      { id: 'ea-6', momento: 'tarde', estado: 'neutral', notas: 'Un poco cansado' },
    ],
  },
  // Sofía - Aula Patitos
  {
    id: 'reg-3',
    alumnoId: 'alumno-6',
    fecha: hoyStr,
    profesorId: 'prof-2',
    comentarioGeneral: 'Sofía ha estado tranquila y cariñosa. Ha disfrutado especialmente de la música y del cuento.',
    comidas: [
      { id: 'com-7', tipo: 'desayuno', cantidad: 'mucho', notas: '', hora: '09:30' },
      { id: 'com-8', tipo: 'almuerzo', cantidad: 'normal', notas: '', hora: '12:15' },
      { id: 'com-9', tipo: 'merienda', cantidad: 'todo', notas: '', hora: '16:00' },
    ],
    siestas: [
      { id: 'sie-3', horaInicio: '12:50', horaFin: '14:45', calidad: 'bien', notas: '' },
    ],
    panales: [
      { id: 'pan-7', hora: '10:30', tipo: 'pipi', notas: '' },
      { id: 'pan-8', hora: '13:00', tipo: 'ambos', notas: '' },
    ],
    actividades: [
      { id: 'act-7', tipo: 'arte', descripcion: 'Pintura con los dedos.', hora: '10:30' },
      { id: 'act-8', tipo: 'musica', descripcion: 'Canciones y percusión.', hora: '15:30' },
    ],
    estadosAnimo: [
      { id: 'ea-7', momento: 'manana', estado: 'contento', notas: '' },
      { id: 'ea-8', momento: 'mediodia', estado: 'contento', notas: '' },
      { id: 'ea-9', momento: 'tarde', estado: 'muy_contento', notas: '' },
    ],
  },
  // Pablo - Aula Patitos (sin completar para demostrar el "pendiente")
  {
    id: 'reg-4',
    alumnoId: 'alumno-7',
    fecha: hoyStr,
    profesorId: 'prof-2',
    comentarioGeneral: '',
    comidas: [
      { id: 'com-10', tipo: 'desayuno', cantidad: 'todo', notas: '', hora: '09:30' },
    ],
    siestas: [],
    panales: [
      { id: 'pan-9', hora: '10:00', tipo: 'pipi', notas: '' },
    ],
    actividades: [],
    estadosAnimo: [
      { id: 'ea-10', momento: 'manana', estado: 'contento', notas: '' },
    ],
  },
  // Martín - Aula Cisnes
  {
    id: 'reg-5',
    alumnoId: 'alumno-8',
    fecha: hoyStr,
    profesorId: 'prof-3',
    comentarioGeneral: 'Martín ha participado muy bien en la clase de inglés. Ha aprendido los colores en inglés y los repite con entusiasmo.',
    comidas: [
      { id: 'com-11', tipo: 'desayuno', cantidad: 'todo', notas: '', hora: '09:30' },
      { id: 'com-12', tipo: 'almuerzo', cantidad: 'mucho', notas: '', hora: '12:15' },
      { id: 'com-13', tipo: 'merienda', cantidad: 'normal', notas: '', hora: '16:00' },
    ],
    siestas: [
      { id: 'sie-4', horaInicio: '13:00', horaFin: '14:00', calidad: 'bien', notas: '' },
    ],
    panales: [],
    actividades: [
      { id: 'act-9', tipo: 'ingles', descripcion: 'Clase de inglés: los colores. Red, blue, green, yellow.', hora: '10:00' },
      { id: 'act-10', tipo: 'exterior', descripcion: 'Juego libre en el patio con circuito de obstáculos.', hora: '11:00' },
      { id: 'act-11', tipo: 'arte', descripcion: 'Manualidad: collage con papeles de colores.', hora: '15:30' },
    ],
    estadosAnimo: [
      { id: 'ea-11', momento: 'manana', estado: 'muy_contento', notas: '' },
      { id: 'ea-12', momento: 'mediodia', estado: 'contento', notas: '' },
      { id: 'ea-13', momento: 'tarde', estado: 'contento', notas: '' },
    ],
  },
]

// ============= ASISTENCIA (hoy) =============
export const asistencias: Asistencia[] = [
  { id: 'asis-1', alumnoId: 'alumno-1', fecha: hoyStr, horaEntrada: '08:45', horaSalida: null, recogidoPor: '', notas: '' },
  { id: 'asis-2', alumnoId: 'alumno-2', fecha: hoyStr, horaEntrada: '09:00', horaSalida: null, recogidoPor: '', notas: '' },
  { id: 'asis-3', alumnoId: 'alumno-3', fecha: hoyStr, horaEntrada: '08:30', horaSalida: null, recogidoPor: '', notas: '' },
  { id: 'asis-4', alumnoId: 'alumno-4', fecha: hoyStr, horaEntrada: '08:50', horaSalida: null, recogidoPor: '', notas: '' },
  { id: 'asis-5', alumnoId: 'alumno-5', fecha: hoyStr, horaEntrada: '09:10', horaSalida: null, recogidoPor: '', notas: '' },
  { id: 'asis-6', alumnoId: 'alumno-6', fecha: hoyStr, horaEntrada: '08:40', horaSalida: null, recogidoPor: '', notas: '' },
  { id: 'asis-7', alumnoId: 'alumno-7', fecha: hoyStr, horaEntrada: '09:05', horaSalida: null, recogidoPor: '', notas: '' },
  { id: 'asis-8', alumnoId: 'alumno-8', fecha: hoyStr, horaEntrada: '08:55', horaSalida: null, recogidoPor: '', notas: '' },
  { id: 'asis-9', alumnoId: 'alumno-9', fecha: hoyStr, horaEntrada: '08:35', horaSalida: null, recogidoPor: '', notas: '' },
  // alumno-10 ausente hoy
]

// ============= FOTOS =============
export const fotos: Foto[] = [
  { id: 'foto-1', url: 'https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=600&h=400&fit=crop', descripcion: 'Taller de pintura con los dedos - ¡Creando arcoíris!', fecha: hoyStr, alumnoIds: ['alumno-4', 'alumno-5', 'alumno-6'], subidaPor: 'prof-2', aulaId: 'aula-2' },
  { id: 'foto-2', url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=600&h=400&fit=crop', descripcion: 'Jugando en el patio exterior', fecha: hoyStr, alumnoIds: ['alumno-4', 'alumno-7'], subidaPor: 'prof-2', aulaId: 'aula-2' },
  { id: 'foto-3', url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=600&h=400&fit=crop', descripcion: 'Clase de música con instrumentos', fecha: hoyStr, alumnoIds: ['alumno-4', 'alumno-5', 'alumno-6', 'alumno-7'], subidaPor: 'prof-2', aulaId: 'aula-2' },
  { id: 'foto-4', url: 'https://images.unsplash.com/photo-1484820540004-14229fe36ca4?w=600&h=400&fit=crop', descripcion: 'Hora del cuento en el aula', fecha: hoyStr, alumnoIds: ['alumno-8', 'alumno-9', 'alumno-10'], subidaPor: 'prof-3', aulaId: 'aula-3' },
  { id: 'foto-5', url: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=600&h=400&fit=crop', descripcion: 'Manualidades con papel de colores', fecha: hoyStr, alumnoIds: ['alumno-8', 'alumno-9'], subidaPor: 'prof-3', aulaId: 'aula-3' },
  { id: 'foto-6', url: 'https://images.unsplash.com/photo-1576349206613-01f44fd5fd6f?w=600&h=400&fit=crop', descripcion: 'Estimulación sensorial en el aula de bebés', fecha: hoyStr, alumnoIds: ['alumno-1', 'alumno-2', 'alumno-3'], subidaPor: 'prof-1', aulaId: 'aula-1' },
]

// ============= NOTIFICACIONES =============
export const notificaciones: Notificacion[] = [
  { id: 'notif-1', tipo: 'alerta_salud', titulo: 'Mateo tiene algo de fiebre', contenido: 'Mateo tiene 37.8°C de temperatura. De momento está bien pero le estamos vigilando. Si sube más os llamamos.', prioridad: 'alta', createdAt: `${hoyStr}T11:30:00`, leida: false, alumnoId: 'alumno-5' },
  { id: 'notif-2', tipo: 'recordatorio', titulo: 'Traer bata para mañana', contenido: 'Recordamos que mañana es día de pintura. Por favor traed la bata.', prioridad: 'normal', createdAt: `${hoyStr}T09:00:00`, leida: true, aulaId: 'aula-2' },
  { id: 'notif-3', tipo: 'anuncio', titulo: 'Fiesta de primavera - 18 de abril', contenido: 'El próximo 18 de abril celebraremos la fiesta de primavera. Habrá actuaciones de los niños, talleres para familias y merienda compartida. ¡Os esperamos a las 16:30!', prioridad: 'normal', createdAt: `${hoyStr}T08:00:00`, leida: false },
  { id: 'notif-4', tipo: 'recordatorio', titulo: 'Pago mensualidad abril', contenido: 'Os recordamos que el plazo para el pago de la mensualidad de abril finaliza el día 10.', prioridad: 'normal', createdAt: `${hoyStr}T08:00:00`, leida: true },
  { id: 'notif-5', tipo: 'anuncio', titulo: 'Nuevos horarios de recogida', contenido: 'A partir del lunes, el horario de recogida será de 16:00 a 17:00. Rogamos puntualidad.', prioridad: 'alta', createdAt: `${hoyStr}T07:30:00`, leida: false },
]

// ============= MENSAJES =============
export const mensajes: Mensaje[] = [
  // Conversación Elena (madre de Lucía) con María (profesora Patitos)
  { id: 'msg-1', alumnoId: 'alumno-4', remitenteTipo: 'padre', remitenteId: 'padre-2', contenido: 'Buenos días María, ¿cómo ha pasado Lucía la mañana? Ayer tenía un poco de mocos.', leido: true, createdAt: `${hoyStr}T10:00:00` },
  { id: 'msg-2', alumnoId: 'alumno-4', remitenteTipo: 'profesor', remitenteId: 'prof-2', contenido: '¡Buenos días Elena! Lucía está perfecta, los mocos han mejorado mucho. Ha desayunado todo y está jugando muy contenta. No te preocupes 😊', leido: true, createdAt: `${hoyStr}T10:15:00` },
  { id: 'msg-3', alumnoId: 'alumno-4', remitenteTipo: 'padre', remitenteId: 'padre-2', contenido: '¡Genial! Muchas gracias por avisarme. ¿Necesita algo?', leido: true, createdAt: `${hoyStr}T10:20:00` },
  { id: 'msg-4', alumnoId: 'alumno-4', remitenteTipo: 'profesor', remitenteId: 'prof-2', contenido: 'De nada. Solo recordarte que se le están acabando los pañales del casillero, si puedes traer un paquete mañana sería genial.', leido: false, createdAt: `${hoyStr}T10:25:00` },
  // Conversación Roberto (padre de Mateo) con María
  { id: 'msg-5', alumnoId: 'alumno-5', remitenteTipo: 'profesor', remitenteId: 'prof-2', contenido: 'Hola Roberto, Mateo tiene un poco de temperatura (37.8°C). Está tranquilo y jugando pero le seguimos vigilando.', leido: true, createdAt: `${hoyStr}T11:30:00` },
  { id: 'msg-6', alumnoId: 'alumno-5', remitenteTipo: 'padre', remitenteId: 'padre-7', contenido: 'Gracias por avisar, María. ¿Le habéis dado Apiretal?', leido: true, createdAt: `${hoyStr}T11:35:00` },
  { id: 'msg-7', alumnoId: 'alumno-5', remitenteTipo: 'profesor', remitenteId: 'prof-2', contenido: 'No, no le podemos dar medicación sin la autorización firmada. Si quieres puedes traerla con el Apiretal y la firmamos.', leido: false, createdAt: `${hoyStr}T11:40:00` },
]

// ============= MENÚ SEMANAL =============
export const menuSemanal: MenuSemanal = {
  id: 'menu-1',
  semanaInicio: hoyStr,
  dias: [
    { dia: 'lunes', desayuno: 'Galletas con leche', primerPlato: 'Crema de verduras', segundoPlato: 'Pollo a la plancha con arroz', postre: 'Plátano', merienda: 'Yogur natural' },
    { dia: 'martes', desayuno: 'Tostada con aceite', primerPlato: 'Lentejas con verduras', segundoPlato: 'Tortilla francesa con ensalada', postre: 'Mandarina', merienda: 'Galletas María' },
    { dia: 'miercoles', desayuno: 'Cereales con leche', primerPlato: 'Pasta con tomate', segundoPlato: 'Merluza al horno con patatas', postre: 'Manzana', merienda: 'Pan con chocolate' },
    { dia: 'jueves', desayuno: 'Galletas con leche', primerPlato: 'Sopa de fideos', segundoPlato: 'Albóndigas de ternera con puré', postre: 'Pera', merienda: 'Fruta variada' },
    { dia: 'viernes', desayuno: 'Tostada con tomate', primerPlato: 'Arroz con verduras', segundoPlato: 'Filete de pavo con ensalada', postre: 'Yogur', merienda: 'Bizcocho casero' },
  ],
}

// ============= HELPERS =============

export function getAlumnosByAula(aulaId: string): Alumno[] {
  return alumnos.filter(a => a.aulaId === aulaId && a.activo)
}

export function getRegistro(alumnoId: string, fecha: string): RegistroDiario | undefined {
  return registrosDiarios.find(r => r.alumnoId === alumnoId && r.fecha === fecha)
}

export function getAsistencia(alumnoId: string, fecha: string): Asistencia | undefined {
  return asistencias.find(a => a.alumnoId === alumnoId && a.fecha === fecha)
}

export function getFotosAlumno(alumnoId: string, fecha?: string): Foto[] {
  return fotos.filter(f => f.alumnoIds.includes(alumnoId) && (!fecha || f.fecha === fecha))
}

export function getFotosAula(aulaId: string, fecha?: string): Foto[] {
  return fotos.filter(f => f.aulaId === aulaId && (!fecha || f.fecha === fecha))
}

export function getMensajesAlumno(alumnoId: string): Mensaje[] {
  return mensajes.filter(m => m.alumnoId === alumnoId).sort((a, b) => a.createdAt.localeCompare(b.createdAt))
}

export function getNotificacionesPadre(padreId: string): Notificacion[] {
  const padre = padres.find(p => p.id === padreId)
  if (!padre) return []
  const hijosIds = alumnos.filter(a => a.padreIds.includes(padreId)).map(a => a.id)
  const aulasIds = alumnos.filter(a => a.padreIds.includes(padreId)).map(a => a.aulaId)
  return notificaciones.filter(n =>
    !n.alumnoId && !n.aulaId || // General
    (n.alumnoId && hijosIds.includes(n.alumnoId)) ||
    (n.aulaId && aulasIds.includes(n.aulaId))
  ).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export function getProfesor(id: string): Profesor | undefined {
  return profesores.find(p => p.id === id)
}

export function getAlumno(id: string): Alumno | undefined {
  return alumnos.find(a => a.id === id)
}

export function getAula(id: string): Aula | undefined {
  return aulas.find(a => a.id === id)
}

export function getPadre(id: string): Padre | undefined {
  return padres.find(p => p.id === id)
}

export function buildTimeline(registro: RegistroDiario, asistencia?: Asistencia, fotosAlumno?: Foto[]): TimelineEvent[] {
  const events: TimelineEvent[] = []

  if (asistencia?.horaEntrada) {
    events.push({ id: `tl-entrada-${asistencia.id}`, tipo: 'entrada', hora: asistencia.horaEntrada, datos: asistencia })
  }

  registro.comidas.forEach(c => {
    events.push({ id: `tl-comida-${c.id}`, tipo: 'comida', hora: c.hora, datos: c })
  })

  registro.siestas.forEach(s => {
    events.push({ id: `tl-siesta-${s.id}`, tipo: 'siesta', hora: s.horaInicio, datos: s })
  })

  registro.panales.forEach(p => {
    events.push({ id: `tl-panal-${p.id}`, tipo: 'panal', hora: p.hora, datos: p })
  })

  registro.actividades.forEach(a => {
    events.push({ id: `tl-act-${a.id}`, tipo: 'actividad', hora: a.hora, datos: a })
  })

  registro.estadosAnimo.forEach(ea => {
    const horaMap: Record<string, string> = { manana: '09:00', mediodia: '12:00', tarde: '15:00' }
    events.push({ id: `tl-ea-${ea.id}`, tipo: 'estado_animo', hora: horaMap[ea.momento] || '09:00', datos: ea })
  })

  if (fotosAlumno) {
    fotosAlumno.forEach(f => {
      events.push({ id: `tl-foto-${f.id}`, tipo: 'foto', hora: '11:00', datos: f })
    })
  }

  if (asistencia?.horaSalida) {
    events.push({ id: `tl-salida-${asistencia.id}`, tipo: 'salida', hora: asistencia.horaSalida, datos: asistencia })
  }

  return events.sort((a, b) => a.hora.localeCompare(b.hora))
}
