import { Briefcase, MessageSquare } from 'lucide-react'
import type { MatchPerfil } from '../../../hooks/useMatchPerfil'
import './tarjetaMatch.css'

const DIMENSIONES = [
  { label: 'Obsesión', valor: 9 },
  { label: 'Experiencia', valor: 6 },
  { label: 'Impacto', valor: 8 },
]

interface TarjetaMatchProps {
  perfil: MatchPerfil
}

export default function TarjetaMatch({ perfil }: TarjetaMatchProps) {
  const primerNombre = perfil.nombre.split(' ')[0]

  return (
    <div className="tarjeta-match">
      <div className="tarjeta-match__header">
        <div className="tarjeta-match__foto-wrap">
          {perfil.foto
            ? <img src={perfil.foto} alt={perfil.nombre} className="tarjeta-match__foto" />
            : <div className="tarjeta-match__foto tarjeta-match__foto--vacio" />
          }
          <span className="tarjeta-match__dot" />
        </div>

        <div className="tarjeta-match__meta">
          <h2 className="tarjeta-match__nombre">{perfil.nombre}</h2>
          <div className="tarjeta-match__badges">
            <span className="tarjeta-match__badge">Full time</span>
            {perfil.tieneIdea && <span className="tarjeta-match__badge">Tiene idea</span>}
          </div>
          <p className="tarjeta-match__ocupacion">
            <Briefcase size={12} />
            {perfil.ocupacion}
          </p>
        </div>

        <div className="tarjeta-match__afinidad">
          <span className="tarjeta-match__afinidad-label">AFINIDAD TOTAL</span>
          <span className="tarjeta-match__afinidad-pct">89%</span>
        </div>
      </div>

      <div className="tarjeta-match__barra">
        <div className="tarjeta-match__barra-fill" style={{ width: '89%' }} />
      </div>

      <div className="tarjeta-match__dimensiones">
        <p className="tarjeta-match__seccion-label">DIMENSIONES</p>
        {DIMENSIONES.map((d) => (
          <div key={d.label} className="tarjeta-match__dimension">
            <span className="tarjeta-match__dimension-nombre">{d.label}</span>
            <span className="tarjeta-match__dimension-valor">{d.valor}/10</span>
          </div>
        ))}
      </div>

      {perfil.pasiones.length > 0 && (
        <div className="tarjeta-match__porque">
          <p className="tarjeta-match__seccion-label">✨ ¿POR QUÉ HACEN MATCH?</p>
          <ul className="tarjeta-match__porque-lista">
            {perfil.pasiones.map((p) => (
              <li key={p} className="tarjeta-match__porque-item">
                <span className="tarjeta-match__porque-dot" />
                {p}
              </li>
            ))}
          </ul>
        </div>
      )}

      {perfil.fraseRompeHielo && (
        <div className="tarjeta-match__hielo">
          <p className="tarjeta-match__hielo-label">
            <MessageSquare size={13} />
            ROMPE EL HIELO
          </p>
          <p className="tarjeta-match__hielo-texto">"{perfil.fraseRompeHielo}"</p>
        </div>
      )}

      {perfil.whatsapp && (
        <a
          href={`https://wa.me/${perfil.whatsapp.replace(/\D/g, '')}`}
          target="_blank"
          rel="noreferrer"
          className="tarjeta-match__cta"
        >
          Conectar con {primerNombre} →
        </a>
      )}
    </div>
  )
}
