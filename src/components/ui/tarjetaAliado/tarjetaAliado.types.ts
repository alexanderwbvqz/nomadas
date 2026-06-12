export type TipoAliado = 'Mentores' | 'Universidad' | 'Empresas'

export interface TarjetaAliadoProps {
  logo: string
  nombre: string
  descripcion: string
  tipo: TipoAliado
  onConocerMas?: () => void
}
