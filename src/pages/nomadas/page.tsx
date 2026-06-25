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
  perfil_resultado: string
  superpoderes: string[]
}

type FiltroLabel = 'Todos' | 'Tecnología' | 'Ventas y Finanzas' | 'Marketing' | 'Operaciones'

const FILTROS: FiltroLabel[] = ['Todos', 'Tecnología', 'Ventas y Finanzas', 'Marketing', 'Operaciones']

const PERFIL_MAP: Record<FiltroLabel, string | null> = {
  'Todos':            null,
  'Tecnología':       'CTO Builder',
  'Ventas y Finanzas':'CFO Strategist',
  'Marketing':        'CMO',
  'Operaciones':      'COO Executor',
}

export default function NomidasPage() {
  const [cofundadores, setCofundadores] = useState<Cofundador[]>([])
  const [cargando, setCargando] = useState(true)
  const [modalId, setModalId] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<FiltroLabel>('Todos')

  useEffect(() => {
    async function cargar() {
      const { data: perfiles } = await supabase
        .from('perfiles_datos')
        .select('id, nombre, ocupacion, foto, sueno, perfil_resultado')
        .eq('aprobado', true)
        .order('created_at', { ascending: false })

      if (!perfiles || perfiles.length === 0) {
        setCargando(false)
        return
      }

      const ids = perfiles.map((p) => p.id)
      const [{ data: superpoderesRows }, { data: tinderRows }] = await Promise.all([
        supabase.from('perfil_superpoderes').select('perfil_id, superpoder').in('perfil_id', ids),
        supabase.from('perfil_tinder').select('perfil_id, frase_representa').in('perfil_id', ids),
      ])

      const superpoderesPorId: Record<string, string[]> = {}
      superpoderesRows?.forEach(({ perfil_id, superpoder }) => {
        if (!superpoderesPorId[perfil_id]) superpoderesPorId[perfil_id] = []
        superpoderesPorId[perfil_id].push(superpoder)
      })

      const frasePorId: Record<string, string> = {}
      tinderRows?.forEach(({ perfil_id, frase_representa }) => {
        frasePorId[perfil_id] = frase_representa ?? ''
      })

      setCofundadores(
        perfiles.map((p) => ({
          id: p.id,
          nombre: p.nombre.split(' ').slice(0, 2).join(' '),
          ocupacion: p.ocupacion ?? '',
          foto: p.foto ?? '',
          frase: frasePorId[p.id] || p.sueno || '',
          perfil_resultado: p.perfil_resultado ?? '',
          superpoderes: superpoderesPorId[p.id] ?? [],
        }))
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
            .filter((c) => PERFIL_MAP[filtro] === null || c.perfil_resultado === PERFIL_MAP[filtro])
            .map((c) => (
            <TarjetaCofundador
              key={c.id}
              foto={c.foto}
              nombre={c.nombre}
              rol={c.perfil_resultado || c.ocupacion}
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
