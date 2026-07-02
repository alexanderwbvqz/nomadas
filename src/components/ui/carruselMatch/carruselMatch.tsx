import type { MatchPerfil } from '../../../hooks/useMatchPerfil'
import TarjetaMatch from '../tarjetaMatch/tarjetaMatch'
import './carruselMatch.css'

interface CarruselMatchProps {
  matches: MatchPerfil[]
  cargando?: boolean
}

export default function CarruselMatch({ matches, cargando }: CarruselMatchProps) {
  if (cargando) {
    return (
      <div className="carrusel-match__skeleton-wrap">
        {[1, 2, 3].map((i) => (
          <div key={i} className="carrusel-match__skeleton" />
        ))}
      </div>
    )
  }

  if (matches.length === 0) return null

  return (
    <div className="carrusel-match">
      {matches.map((perfil) => (
        <div key={perfil.id} className="carrusel-match__item">
          <TarjetaMatch perfil={perfil} />
        </div>
      ))}
    </div>
  )
}
