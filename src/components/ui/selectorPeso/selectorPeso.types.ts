import type { PesoOpcion } from '../../../types/dinamicas'

export interface SelectorPesoProps {
  valor: PesoOpcion
  onChange: (peso: PesoOpcion) => void
}
