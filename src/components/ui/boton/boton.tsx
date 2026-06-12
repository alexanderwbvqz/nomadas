import { Button } from 'antd'
import type { AppButtonProps } from './boton.types'
import './boton.css'

export default function AppButton({ label, icon, variante = 'primario', onClick, disabled }: AppButtonProps) {
  const modificador: Record<string, string> = {
    outline: 'app-btn--outline',
    naranja: 'app-btn--naranja',
    texto: 'app-btn--texto',
  }
  const clase = `app-btn${variante && modificador[variante] ? ` ${modificador[variante]}` : ''}`
  return (
    <Button
      className={clase}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="app-btn__icon">{icon}</span>}
      {label}
    </Button>
  )
}
