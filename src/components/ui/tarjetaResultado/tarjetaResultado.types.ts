import type { ResultadoPerfil } from '../../../types/onboarding'

export interface TarjetaResultadoProps {
  resultado: ResultadoPerfil
  nombre: string
  foto: string
  superpoderes: string[]
  fraseRepresenta: string
  onEntrar: () => void
}
