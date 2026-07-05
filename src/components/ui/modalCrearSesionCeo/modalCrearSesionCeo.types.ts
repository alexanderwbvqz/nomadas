import type { Dinamica } from '../../../types/dinamicas'
import type { Evento } from '../../../types/asistencia'

export interface ModalCrearSesionCeoProps {
  dinamicas: Dinamica[]
  eventos: Evento[]
  onCerrar: () => void
  onGuardar: (dinamicaId: string, eventoId: string) => Promise<void>
}
