import { CalendarDays, Users, QrCode, Trash2 } from 'lucide-react'
import BotonIcono from '../botonIcono/botonIcono'
import type { TarjetaEventoProps } from './tarjetaEvento.types'
import './tarjetaEvento.css'

export default function TarjetaEvento({ evento, conteoAsistentes, onClick, onVerQR, onEliminar }: TarjetaEventoProps) {
  return (
    <div className="tarjeta-evento" onClick={onClick}>
      <div className="tarjeta-evento__info">
        <div className="tarjeta-evento__icono">
          <CalendarDays size={18} />
        </div>
        <div>
          <p className="tarjeta-evento__nombre">{evento.nombre}</p>
          <p className="tarjeta-evento__fecha">
            {new Date(evento.fecha + 'T00:00:00').toLocaleDateString('es-PE', {
              day: 'numeric', month: 'long', year: 'numeric',
            })}
          </p>
        </div>
      </div>

      <div className="tarjeta-evento__meta">
        <span className={`tarjeta-evento__estado tarjeta-evento__estado--${evento.estado}`}>
          {evento.estado === 'activo' ? 'Activo' : 'Finalizado'}
        </span>
        <span className="tarjeta-evento__conteo">
          <Users size={13} />
          {conteoAsistentes} asistentes
        </span>
        <BotonIcono
          icono={<QrCode size={15} />}
          onClick={(e) => { e.stopPropagation(); onVerQR() }}
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
