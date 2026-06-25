import type { TipoAliado } from '../tarjetaAliado/tarjetaAliado.types'

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
