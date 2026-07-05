import { Zap, HelpCircle, Pencil, Trash2 } from 'lucide-react'
import BotonIcono from '../botonIcono/botonIcono'
import type { TarjetaDinamicaProps } from './tarjetaDinamica.types'
import './tarjetaDinamica.css'

export default function TarjetaDinamica({ dinamica, onEditar, onEliminar }: TarjetaDinamicaProps) {
  return (
    <div className="tarjeta-dinamica">
      <div className="tarjeta-dinamica__info">
        <div className="tarjeta-dinamica__icono">
          <Zap size={18} />
        </div>
        <div>
          <p className="tarjeta-dinamica__nombre">{dinamica.nombre}</p>
          <p className="tarjeta-dinamica__meta">
            <HelpCircle size={12} />
            {dinamica.preguntas.length} {dinamica.preguntas.length === 1 ? 'pregunta' : 'preguntas'}
          </p>
        </div>
      </div>

      <div className="tarjeta-dinamica__acciones">
        <BotonIcono
          icono={<Pencil size={15} />}
          onClick={(e) => { e.stopPropagation(); onEditar() }}
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
