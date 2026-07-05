import type { SesionCeo } from '../../../types/sesionCeo'

export interface TarjetaSesionCeoProps {
  sesion: SesionCeo
  jugadorUrl: string
  enviando: boolean
  onAbrir: () => void
  onEliminar: () => void
  onEnviarCorreos: () => void
  onVerResultados: () => void
}
