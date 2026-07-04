import type { Evento } from '../../../types/asistencia'

export interface TarjetaEventoProps {
  evento: Evento
  conteoAsistentes: number
  onClick: () => void
  onVerQR: () => void
  onEliminar: () => void
}
