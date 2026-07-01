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
  frase: string
  categoria: string
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
        .select('id, nombre, ocupacion, foto, perfil_suenos(sueno), perfil_resultado(categoria), perfil_tinder(frase_representa), perfil_superpoderes(superpoder)')
        .eq('aprobado', true)
        .order('created_at', { ascending: false })

      if (!perfiles || perfiles.length === 0) {
        setCargando(false)
        return
      }

      type Suenos = Array<{ sueno: string }>
      type Resultado = Array<{ categoria: string }>
      type Tinder = Array<{ frase_representa: string }>
      type Superpoderes = Array<{ superpoder: string }>

      setCofundadores(
        perfiles.map((p) => {
          const sueno = (p.perfil_suenos as Suenos)?.[0]?.sueno ?? ''
          const categoria = (p.perfil_resultado as Resultado)?.[0]?.categoria ?? ''
          const frase = (p.perfil_tinder as Tinder)?.[0]?.frase_representa || sueno

          return {
            id: p.id,
            nombre: p.nombre.split(' ').slice(0, 2).join(' '),
            ocupacion: p.ocupacion ?? '',
            foto: p.foto ?? '',
            frase,
            categoria,
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
              frase={c.frase}
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
