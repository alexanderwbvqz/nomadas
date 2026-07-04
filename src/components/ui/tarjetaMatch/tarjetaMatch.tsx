import { useState } from 'react'
import { Briefcase, Zap, MessageSquare } from 'lucide-react'
import type { MatchPerfil } from '../../../hooks/useMatchPerfil'
import BotonExpandir from '../botonExpandir/botonExpandir'
import './tarjetaMatch.css'

const DIMENSIONES = [
  { label: 'Obsesión', valor: 9, max: 10 },
  { label: 'Experiencia', valor: 6, max: 10 },
  { label: 'Impacto', valor: 8, max: 10 },
]

interface TarjetaMatchProps {
  perfil: MatchPerfil
  posicion?: number
}

export default function TarjetaMatch({ perfil, posicion }: TarjetaMatchProps) {
  const [expandido, setExpandido] = useState(false)
  const rompeHielo = perfil.preguntaHielo || perfil.fraseRompeHielo || perfil.sueno

  return (
    <div className="tarjeta-match">
      {/* Banner con afinidad */}
      <div className="tarjeta-match__banner">
        {posicion !== undefined && (
          <span className="tarjeta-match__ranking">#{posicion}</span>
        )}
        <div className="tarjeta-match__afinidad-wrap">
          <span className="tarjeta-match__afinidad-pct">{perfil.afinidad}%</span>
          <span className="tarjeta-match__afinidad-label">de afinidad</span>
        </div>
      </div>

      {/* Foto superpuesta */}
      <div className="tarjeta-match__foto-wrap">
        {perfil.foto
          ? <img src={perfil.foto} alt={perfil.nombre} className="tarjeta-match__foto" />
          : <div className="tarjeta-match__foto tarjeta-match__foto--vacio" />
        }
        <span className="tarjeta-match__dot" />
      </div>

      {/* Info principal */}
      <div className="tarjeta-match__info">
        <h2 className="tarjeta-match__nombre">{perfil.nombre}</h2>
        <div className="tarjeta-match__badges">
          <span className="tarjeta-match__badge">Full time</span>
          {perfil.tieneIdea && <span className="tarjeta-match__badge">Tiene idea</span>}
          {perfil.categoria && <span className="tarjeta-match__badge tarjeta-match__badge--categoria">{perfil.categoria}</span>}
        </div>
        {perfil.ocupacion && (
          <p className="tarjeta-match__ocupacion">
            <Briefcase size={12} />
            {perfil.ocupacion}
          </p>
        )}
      </div>

      {/* Barra de afinidad */}
      <div className="tarjeta-match__barra-wrap">
        <div className="tarjeta-match__barra">
          <div className="tarjeta-match__barra-fill" style={{ width: `${perfil.afinidad}%` }} />
        </div>
      </div>

      {/* Detalle colapsable */}
      <div className={`tarjeta-match__detalle${expandido ? ' tarjeta-match__detalle--visible' : ''}`}>
        {/* Dimensiones */}
        <div className="tarjeta-match__seccion">
          <p className="tarjeta-match__seccion-label">
            <Zap size={12} />
            Dimensiones
          </p>
          <div className="tarjeta-match__dimensiones">
            {DIMENSIONES.map((d) => (
              <div key={d.label} className="tarjeta-match__dimension">
                <span className="tarjeta-match__dimension-nombre">{d.label}</span>
                <div className="tarjeta-match__dimension-barra">
                  <div
                    className="tarjeta-match__dimension-barra-fill"
                    style={{ width: `${(d.valor / d.max) * 100}%` }}
                  />
                </div>
                <span className="tarjeta-match__dimension-valor">{d.valor}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ¿Por qué hacen match? */}
        {perfil.pasiones.length > 0 && (
          <div className="tarjeta-match__seccion">
            <p className="tarjeta-match__seccion-label">
              ✦ ¿Por qué hacen match?
            </p>
            <ul className="tarjeta-match__lista">
              {perfil.pasiones.map((p, i) => (
                <li key={`${p}-${i}`} className="tarjeta-match__lista-item">
                  <span className="tarjeta-match__lista-dot" />
                  {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rompe el hielo */}
        {rompeHielo && (
          <div className="tarjeta-match__hielo">
            <p className="tarjeta-match__hielo-label">
              <MessageSquare size={12} />
              Rompe el hielo
            </p>
            <blockquote className="tarjeta-match__hielo-texto">
              "{rompeHielo}"
            </blockquote>
          </div>
        )}
      </div>

      <BotonExpandir expandido={expandido} onToggle={() => setExpandido(!expandido)} />

      {/* CTA WhatsApp */}
      {perfil.whatsapp && (
        <div className="tarjeta-match__cta-wrap">
          <a
            href={`https://wa.me/${perfil.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="tarjeta-match__cta"
          >
            <svg className="tarjeta-match__cta-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Conectar
          </a>
        </div>
      )}
    </div>
  )
}
