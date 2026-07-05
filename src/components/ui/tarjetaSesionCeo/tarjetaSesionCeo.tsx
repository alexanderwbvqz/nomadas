import { Crown, Zap, CalendarDays, ExternalLink, Trash2 } from 'lucide-react'
import BotonIcono from '../botonIcono/botonIcono'
import type { TarjetaSesionCeoProps } from './tarjetaSesionCeo.types'
import './tarjetaSesionCeo.css'

const ETIQUETAS_ESTADO: Record<string, string> = {
  espera:      'En espera',
  en_curso:    'En curso',
  finalizando: 'Finalizando',
  finalizado:  'Finalizado',
}

export default function TarjetaSesionCeo({ sesion, onAbrir, onEliminar }: TarjetaSesionCeoProps) {
  return (
    <div className="tarjeta-sesion-ceo">
      <div className="tarjeta-sesion-ceo__info">
        <div className="tarjeta-sesion-ceo__icono">
          <Crown size={18} />
        </div>
        <div>
          <p className="tarjeta-sesion-ceo__nombre">{sesion.dinamicaNombre}</p>
          <div className="tarjeta-sesion-ceo__meta">
            <span><CalendarDays size={12} />{sesion.eventoNombre}</span>
            <span><Zap size={12} /></span>
          </div>
        </div>
      </div>

      <div className="tarjeta-sesion-ceo__acciones">
        <span className={`tarjeta-sesion-ceo__estado tarjeta-sesion-ceo__estado--${sesion.estado}`}>
          {ETIQUETAS_ESTADO[sesion.estado]}
        </span>
        <BotonIcono
          icono={<ExternalLink size={15} />}
          onClick={(e) => { e.stopPropagation(); onAbrir() }}
        />
        <BotonIcono
          icono={<Trash2 size={15} />}
          variante="peligro"
          onClick={(e) => { e.stopPropagation(); onEliminar() }}
        />
      </div>
    </div>
  )
}
