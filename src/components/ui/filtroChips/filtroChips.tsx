import type { FiltroChipsProps } from './filtroChips.types'
import './filtroChips.css'

export default function FiltroChips({ opciones, activo, onChange }: FiltroChipsProps) {
  return (
    <div className="filtro-chips">
      {opciones.map((op) => (
        <button
          key={op}
          className={`filtro-chips__chip${activo === op ? ' filtro-chips__chip--activo' : ''}`}
          onClick={() => onChange(op)}
        >
          {op}
        </button>
      ))}
    </div>
  )
}
