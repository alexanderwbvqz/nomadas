import type { TarjetaAliadoProps } from './tarjetaAliado.types'
import './tarjetaAliado.css'

const BADGE_CLASE: Record<string, string> = {
  'Mentores': 'tarjeta-aliado__badge--mentoria',
  'Universidad': 'tarjeta-aliado__badge--educacion',
  'Empresas': 'tarjeta-aliado__badge--financiamiento',
}

export default function TarjetaAliado({
  logo,
  nombre,
  descripcion,
  tipo,
  onConocerMas,
}: TarjetaAliadoProps) {
  return (
    <div className="tarjeta-aliado">
      <div className="tarjeta-aliado__logo-wrapper">
        <img src={logo} alt={nombre} className="tarjeta-aliado__logo" />
      </div>

      <h3 className="tarjeta-aliado__nombre">{nombre}</h3>
      <p className="tarjeta-aliado__descripcion">{descripcion}</p>

      <span className={`tarjeta-aliado__badge ${BADGE_CLASE[tipo]}`}>
        {tipo}
      </span>

      <button className="tarjeta-aliado__link" onClick={onConocerMas}>
        Conocer más
      </button>
    </div>
  )
}
