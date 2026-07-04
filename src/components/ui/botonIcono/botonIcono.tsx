import type { ReactNode, MouseEvent } from 'react'
import './botonIcono.css'

interface BotonIconoProps {
  icono: ReactNode
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
  variante?: 'default' | 'peligro'
  type?: 'button' | 'submit' | 'reset'
}

export default function BotonIcono({ icono, onClick, variante = 'default', type = 'button' }: BotonIconoProps) {
  return (
    <button
      type={type}
      className={`boton-icono boton-icono--${variante}`}
      onClick={onClick}
    >
      {icono}
    </button>
  )
}
