import type { SelectorPesoProps } from './selectorPeso.types'
import type { PesoOpcion } from '../../../types/dinamicas'
import './selectorPeso.css'

const PESOS: PesoOpcion[] = [2.0, 1.5, 1.0, 0.5]

const ETIQUETAS_PESO: Record<string, string> = {
  '2':   'Mejor respuesta',
  '1.5': 'Buena respuesta',
  '1':   'Respuesta regular',
  '0.5': 'Respuesta débil',
}

export default function SelectorPeso({ valor, onChange }: SelectorPesoProps) {
  return (
    <div className="selector-peso">
      <label className="selector-peso__label">Peso</label>
      <div className="selector-peso__opciones">
        {PESOS.map((p) => (
          <button
            key={p}
            type="button"
            className={`selector-peso__btn${valor === p ? ' selector-peso__btn--activo' : ''}`}
            onClick={() => onChange(p as PesoOpcion)}
          >
            {p}
          </button>
        ))}
      </div>
      <span className="selector-peso__hint">{ETIQUETAS_PESO[String(valor)]}</span>
    </div>
  )
}
