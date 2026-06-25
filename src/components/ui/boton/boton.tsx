import { Button } from 'antd'
import type { AppButtonProps } from './boton.types'
import './boton.css'

export default function AppButton({ label, icon, variante = 'primario', onClick, disabled, className, htmlType = 'button' }: AppButtonProps) {
  const modificador: Record<string, string> = {
    outline: 'app-btn--outline',
    naranja: 'app-btn--naranja',
    texto: 'app-btn--texto',
  }
  const clase = `app-btn${variante && modificador[variante] ? ` ${modificador[variante]}` : ''}${className ? ` ${className}` : ''}`
  return (
    <Button
      className={clase}
      onClick={onClick}
      disabled={disabled}
      htmlType={htmlType}
    >
      {icon && <span className="app-btn__icon">{icon}</span>}
      <span className="app-btn__label">{label}</span>
    </Button>
  )
}
