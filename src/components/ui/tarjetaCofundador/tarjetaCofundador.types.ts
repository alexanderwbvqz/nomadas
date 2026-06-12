export interface TarjetaCofundadorProps {
  foto: string
  nombre: string
  rol: string
  habilidades: string[]
  frase: string
  onVerPerfil?: () => void
  onConectar?: () => void
}
