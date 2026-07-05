import type { SesionCeo } from '../../../types/sesionCeo'

export interface TarjetaSesionCeoProps {
  sesion: SesionCeo
  onAbrir: () => void
  onEliminar: () => void
}
