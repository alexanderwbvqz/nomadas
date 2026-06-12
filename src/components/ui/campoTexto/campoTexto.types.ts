export interface CampoTextoProps {
  label: string
  placeholder?: string
  tipo?: 'text' | 'email' | 'password'
  requerido?: boolean
  enlaceDerecha?: {
    texto: string
    href?: string
    onClick?: () => void
  }
  value?: string
  onChange?: (valor: string) => void
}
