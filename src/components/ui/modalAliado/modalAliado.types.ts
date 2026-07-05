import type { TipoAliado } from '../../../types/admin'

export interface ModalAliadoProps {
  logo: string
  nombre: string
  descripcion: string
  tipo: TipoAliado
  linkedin?: string
  instagram?: string
  web?: string
  onCerrar: () => void
}
