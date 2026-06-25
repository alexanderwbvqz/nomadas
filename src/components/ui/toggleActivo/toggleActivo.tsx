import './toggleActivo.css'

interface ToggleActivoProps {
  activo: boolean
  disabled?: boolean
  onChange: () => void
}

export default function ToggleActivo({ activo, disabled = false, onChange }: ToggleActivoProps) {
  return (
    <button
      className={`toggle-activo${activo ? ' toggle-activo--activo' : ''}`}
      onClick={onChange}
      disabled={disabled}
      title={disabled ? 'Solo aliados aprobados pueden activarse' : activo ? 'Desactivar' : 'Activar'}
    >
      <span className="toggle-activo__thumb" />
      <span className="toggle-activo__label">{activo ? 'Activo' : 'Inactivo'}</span>
    </button>
  )
}
