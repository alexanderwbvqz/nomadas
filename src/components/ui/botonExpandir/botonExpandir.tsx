import { ChevronDown } from 'lucide-react'
import './botonExpandir.css'

interface BotonExpandirProps {
  expandido: boolean
  onToggle: () => void
  labelMas?: string
  labelMenos?: string
}

export default function BotonExpandir({
  expandido,
  onToggle,
  labelMas = 'Ver más',
  labelMenos = 'Ver menos',
}: BotonExpandirProps) {
  return (
    <button className="boton-expandir" onClick={onToggle}>
      <span>{expandido ? labelMenos : labelMas}</span>
      <ChevronDown
        size={16}
        className={`boton-expandir__icono${expandido ? ' boton-expandir__icono--girado' : ''}`}
      />
    </button>
  )
}
