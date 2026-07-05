import type { RespuestaDetalle } from '../../../types/sesionCeo'

export interface ModalRespuestasJugadorProps {
  nombre: string
  respuestas: RespuestaDetalle[]
  onCerrar: () => void
}
