import { useEffect, useState } from 'react'
import TarjetaCofundador from '../../components/ui/tarjetaCofundador/tarjetaCofundador'
import ModalPerfil from '../../components/ui/modalPerfil/modalPerfil'
import { supabase } from '../../lib/supabase'
import './page.css'

interface Cofundador {
  id: string
  nombre: string
  ocupacion: string
  foto: string
  categoria: string
  descripcion: string
  superpoderes: string[]
}

type FiltroLabel = 'Todos' | 'Tecnología' | 'Marketing - Ventas' | 'Operaciones' | 'Finanzas'

const FILTROS: FiltroLabel[] = ['Todos', 'Tecnología', 'Marketing - Ventas', 'Operaciones', 'Finanzas']

export default function NomidasPage() {
  useEffect(() => { document.title = 'Nómadas: Cofundadores' }, [])
  const [cofundadores, setCofundadores] = useState<Cofundador[]>([])
  const [cargando, setCargando] = useState(true)
  const [modalId, setModalId] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<FiltroLabel>('Todos')

  useEffect(() => {
    async function cargar() {
      const { data: perfiles } = await supabase
        .from('perfiles_datos')
        .select('id, nombre, ocupacion, foto, perfil_resultado(categoria, descripcion), perfil_superpoderes(superpoder)')
        .eq('aprobado', true)
        .order('created_at', { ascending: false })

      if (!perfiles || perfiles.length === 0) {
        setCargando(false)
        return
      }

      type Resultado = Array<{ categoria: string; descripcion: string }>
      type Superpoderes = Array<{ superpoder: string }>

      setCofundadores(
        perfiles.map((p) => {
          const res = (p.perfil_resultado as Resultado)?.[0]

          return {
            id: p.id,
            nombre: p.nombre.split(' ').slice(0, 2).join(' '),
            ocupacion: p.ocupacion ?? '',
            foto: p.foto ?? '',
            categoria: res?.categoria ?? '',
            descripcion: res?.descripcion ?? '',
            superpoderes: (p.perfil_superpoderes as Superpoderes)?.map((s) => s.superpoder) ?? [],
          }
        })
      )
      setCargando(false)
    }

    cargar()
  }, [])

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
        <div className="nomadas__filtros">
          {FILTROS.map((f) => (
            <button
              key={f}
              className={`nomadas__chip${filtro === f ? ' nomadas__chip--activo' : ''}`}
              onClick={() => setFiltro(f)}
            >
              {f}
            </button>
          ))}
        </div>
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
