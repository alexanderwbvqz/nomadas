export type EstadoSesion = 'espera' | 'en_curso' | 'finalizando' | 'finalizado'

export interface SesionCeo {
  id: string
  dinamicaId: string
  eventoId: string
  estado: EstadoSesion
  preguntaActual: number
  createdAt: string
  dinamicaNombre?: string
  eventoNombre?: string
}

export interface JugadorCeo {
  perfilId: string
  nombre: string
  categoria: string
  puntaje: number
}

export interface ResultadoJugador {
  perfilId: string
  nombre: string
  categoria: string
  puntaje: number
  confirmado: boolean | null
}

export interface RespuestaDetalle {
  preguntaTexto: string
  opcionTexto: string
}

export type EstadoJugador =
  | 'idle'
  | 'cargando'
  | 'no_encontrado'
  | 'no_aprobado'
  | 'no_asistio'
  | 'ya_unido'
  | 'espera'
  | 'en_curso'
  | 'finalizando'
  | 'finalizado'
  | 'sesion_no_existe'
  | 'error'
