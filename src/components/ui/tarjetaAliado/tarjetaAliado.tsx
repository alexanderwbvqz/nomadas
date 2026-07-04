import type { TarjetaAliadoProps } from './tarjetaAliado.types'
import './tarjetaAliado.css'

const BADGE_CLASE: Record<string, string> = {
  'Mentores':             'tarjeta-aliado__badge--mentoria',
  'Organizadores':        'tarjeta-aliado__badge--educacion',
  'Aliados Estratégicos': 'tarjeta-aliado__badge--financiamiento',
}

function IconLinkedin() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconWeb() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  )
}

export default function TarjetaAliado({
  logo,
  nombre,
  descripcion,
  tipo,
  linkedin,
  instagram,
  web,
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

      <div className="tarjeta-aliado__footer">
        <button className="tarjeta-aliado__link" onClick={onConocerMas}>
          Conocer más
        </button>

        <div className="tarjeta-aliado__redes">
          {linkedin && (
            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="tarjeta-aliado__red">
              <IconLinkedin />
            </a>
          )}
          {instagram && (
            <a href={instagram} target="_blank" rel="noopener noreferrer" className="tarjeta-aliado__red">
              <IconInstagram />
            </a>
          )}
          {web && (
            <a href={web} target="_blank" rel="noopener noreferrer" className="tarjeta-aliado__red">
              <IconWeb />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
