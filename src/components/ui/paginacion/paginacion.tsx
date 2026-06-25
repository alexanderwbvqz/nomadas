import { ChevronLeft, ChevronRight } from 'lucide-react'
import './paginacion.css'

interface PaginacionProps {
  paginaActual: number
  totalPaginas: number
  onCambiar: (pagina: number) => void
}

export default function Paginacion({ paginaActual, totalPaginas, onCambiar }: PaginacionProps) {
  if (totalPaginas <= 1) return null

  const paginas = Array.from({ length: totalPaginas }, (_, i) => i + 1)

  return (
    <div className="paginacion">
      <button
        className="paginacion__btn"
        onClick={() => onCambiar(paginaActual - 1)}
        disabled={paginaActual === 1}
      >
        <ChevronLeft size={16} />
      </button>

      {paginas.map((p) => (
        <button
          key={p}
          className={`paginacion__num${p === paginaActual ? ' paginacion__num--activo' : ''}`}
          onClick={() => onCambiar(p)}
        >
          {p}
        </button>
      ))}

      <button
        className="paginacion__btn"
        onClick={() => onCambiar(paginaActual + 1)}
        disabled={paginaActual === totalPaginas}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  )
}
