import type { Dinamica, DinamicaForm } from '../../../types/dinamicas'

export interface ModalDinamicaProps {
  dinamica?: Dinamica
  onCerrar: () => void
  onGuardar: (form: DinamicaForm) => Promise<void>
}
