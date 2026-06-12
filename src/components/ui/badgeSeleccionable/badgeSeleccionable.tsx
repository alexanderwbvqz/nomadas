import type { BadgeSeleccionableProps } from './badgeSeleccionable.types'
import './badgeSeleccionable.css'

export default function BadgeSeleccionable({
  label,
  seleccionado,
  onClick,
  deshabilitado = false,
}: BadgeSeleccionableProps) {
  return (
    <button
      type="button"
      className={`badge-sel${seleccionado ? ' badge-sel--activo' : ''}${deshabilitado ? ' badge-sel--deshabilitado' : ''}`}
      onClick={onClick}
      disabled={deshabilitado && !seleccionado}
    >
      {label}
    </button>
  )
}
