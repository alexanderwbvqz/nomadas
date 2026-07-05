import type { TipoAliado } from '../../../types/admin'

export interface TarjetaAliadoProps {
  logo: string
  nombre: string
  descripcion: string
  tipo: TipoAliado
  linkedin?: string
  instagram?: string
  web?: string
  onConocerMas?: () => void
}
