import { useEffect, useState } from 'react'
import TarjetaCofundador from '../../components/ui/tarjetaCofundador/tarjetaCofundador'
import ModalPerfil from '../../components/ui/modalPerfil/modalPerfil'
import FiltroChips from '../../components/ui/filtroChips/filtroChips'
import { useNomadas } from '../../hooks/useNomadas'
import './page.css'

type FiltroLabel = 'Todos' | 'Tecnología' | 'Marketing - Ventas' | 'Operaciones' | 'Finanzas'

const FILTROS: FiltroLabel[] = ['Todos', 'Tecnología', 'Marketing - Ventas', 'Operaciones', 'Finanzas']

export default function NomidasPage() {
  useEffect(() => { document.title = 'Nómadas: Cofundadores' }, [])
  const { cofundadores, cargando } = useNomadas()
  const [modalId, setModalId] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<FiltroLabel>('Todos')

  return (
    <>
    <section className="nomadas" id="nomada">
      <h1 className="nomadas__titulo">
        Encuentra los mejores{' '}
        <span className="nomadas__titulo-acento">cofundadores</span>{' '}
        para tu startup.
      </h1>
      <p className="nomadas__descripcion">
        Aquí encontrarás emprendedores con la misma visión que tú para formar un equipo ideal y desarrollar juntos ideas de negocio innovadoras.
      </p>

      <div className="nomadas__cabecera">
        <FiltroChips opciones={FILTROS} activo={filtro} onChange={(v) => setFiltro(v as FiltroLabel)} />
      </div>

      {cargando ? (
        <p className="nomadas__estado">Cargando nómadas...</p>
      ) : cofundadores.length === 0 ? (
        <p className="nomadas__estado">Aún no hay nómadas registrados. ¡Sé el primero!</p>
      ) : (
        <div className="nomadas__grid">
          {cofundadores
            .filter((c) => filtro === 'Todos' || c.categoria === filtro)
            .map((c) => (
            <TarjetaCofundador
              key={c.id}
              foto={c.foto}
              nombre={c.nombre}
              rol={c.categoria || c.ocupacion}
              habilidades={c.superpoderes.slice(0, 3)}
              descripcion={c.descripcion}
              onVerPerfil={() => setModalId(c.id)}
            />
          ))}
        </div>
      )}
    </section>

    {modalId && (
      <ModalPerfil id={modalId} onCerrar={() => setModalId(null)} />
    )}
    </>
  )
}
