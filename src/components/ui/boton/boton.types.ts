export interface AppButtonProps {
  label: string
  icon?: React.ReactNode
  variante?: 'primario' | 'outline' | 'naranja' | 'texto'
  onClick?: () => void
  disabled?: boolean
}
