import { Search } from 'lucide-react'
import './campoBusqueda.css'

interface CampoBusquedaProps {
  value: string
  onChange: (valor: string) => void
  placeholder?: string
}

export default function CampoBusqueda({ value, onChange, placeholder = 'Buscar...' }: CampoBusquedaProps) {
  return (
    <div className="campo-busqueda">
      <Search size={16} className="campo-busqueda__icono" />
      <input
        type="text"
        className="campo-busqueda__input"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
