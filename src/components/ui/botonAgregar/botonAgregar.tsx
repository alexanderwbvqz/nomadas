import { Plus } from 'lucide-react'
import './botonAgregar.css'

interface BotonAgregarProps {
  label: string
  onClick: () => void
  disabled?: boolean
  fullWidth?: boolean
}

export default function BotonAgregar({ label, onClick, disabled, fullWidth }: BotonAgregarProps) {
  return (
    <button
      type="button"
      className={`boton-agregar${fullWidth ? ' boton-agregar--full' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Plus size={14} />
      {label}
    </button>
  )
}
