import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { MatchPerfil } from '../../../hooks/useMatchPerfil'
import { useBreakpoint } from '../../../hooks/useBreakpoint'
import TarjetaMatch from '../tarjetaMatch/tarjetaMatch'
import './carruselMatch.css'

interface CarruselMatchProps {
  matches: MatchPerfil[]
  cargando?: boolean
}

export default function CarruselMatch({ matches, cargando }: CarruselMatchProps) {
  const [pagina, setPagina] = useState(0)
  const bp = useBreakpoint()

  const esDesktop = bp === 'lg' || bp === 'xl'
  const itemsPorPagina = bp === 'tablet' ? 2 : 1
  const totalPaginas = Math.ceil(matches.length / itemsPorPagina)

  useEffect(() => {
    setPagina(0)
  }, [bp])

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

  const ordenados = [...matches].sort((a, b) => b.afinidad - a.afinidad)

  if (esDesktop) {
    return (
      <div className="carrusel-match__grid">
        {ordenados.map((perfil, i) => (
          <TarjetaMatch key={perfil.id} perfil={perfil} posicion={i + 1} />
        ))}
      </div>
    )
  }

  const visibles = ordenados.slice(pagina * itemsPorPagina, (pagina + 1) * itemsPorPagina)

  return (
    <div className="carrusel-match">
      <button
        className="carrusel-match__flecha"
        onClick={() => setPagina((p) => p - 1)}
        disabled={pagina === 0}
        aria-label="Anterior"
      >
        <ChevronLeft size={22} />
      </button>

      <div className={`carrusel-match__tarjetas${bp === 'tablet' ? ' carrusel-match__tarjetas--tablet' : ''}`}>
        {visibles.map((perfil, i) => (
          <TarjetaMatch key={perfil.id} perfil={perfil} posicion={pagina * itemsPorPagina + i + 1} />
        ))}
      </div>

      <button
        className="carrusel-match__flecha"
        onClick={() => setPagina((p) => p + 1)}
        disabled={pagina >= totalPaginas - 1}
        aria-label="Siguiente"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  )
}
