import type { ReactNode } from 'react'
import './botonNav.css'

export interface BotonNavProps {
  label: string
  onClick?: () => void
  disabled?: boolean
  variante?: 'primario' | 'secundario'
  icono?: ReactNode
  iconoPosicion?: 'izquierda' | 'derecha'
}

export default function BotonNav({
  label,
  onClick,
  disabled = false,
  variante = 'primario',
  icono,
  iconoPosicion = 'derecha',
}: BotonNavProps) {
  return (
    <button
      type="button"
      className={`boton-nav boton-nav--${variante}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icono && iconoPosicion === 'izquierda' && (
        <span className="boton-nav__icono">{icono}</span>
      )}
      <span>{label}</span>
      {icono && iconoPosicion === 'derecha' && (
        <span className="boton-nav__icono">{icono}</span>
      )}
    </button>
  )
}
