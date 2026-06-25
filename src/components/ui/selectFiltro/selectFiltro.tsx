import type { ReactNode } from 'react'
import './selectFiltro.css'

interface OpcionFiltro {
  valor: string
  label: string
}

interface SelectFiltroProps {
  icono: ReactNode
  valor: string
  opciones: OpcionFiltro[]
  onChange: (valor: string) => void
}

export default function SelectFiltro({ icono, valor, opciones, onChange }: SelectFiltroProps) {
  return (
    <div className="select-filtro">
      <span className="select-filtro__icono">{icono}</span>
      <select
        className="select-filtro__select"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      >
        {opciones.map((o) => (
          <option key={o.valor} value={o.valor}>{o.label}</option>
        ))}
      </select>
    </div>
  )
}
