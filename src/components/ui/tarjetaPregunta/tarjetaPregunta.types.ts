import type { PreguntaForm } from '../../../types/dinamicas'

export interface TarjetaPreguntaProps {
  index: number
  pregunta: PreguntaForm
  onChange: (pregunta: PreguntaForm) => void
  onEliminar: () => void
}
