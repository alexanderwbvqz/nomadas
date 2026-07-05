import { ArrowLeft } from 'lucide-react'
import type { BotonVolverProps } from './botonVolver.types'
import './botonVolver.css'

export default function BotonVolver({ label, onClick }: BotonVolverProps) {
  return (
    <button className="boton-volver" onClick={onClick}>
      <ArrowLeft size={16} />
      {label}
    </button>
  )
}
