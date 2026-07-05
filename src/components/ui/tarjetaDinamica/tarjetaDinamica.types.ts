import type { Dinamica } from '../../../types/dinamicas'

export interface TarjetaDinamicaProps {
  dinamica: Dinamica
  onEditar: () => void
  onEliminar: () => void
}
