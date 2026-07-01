import { useState, useMemo } from 'react'
import { ListFilter, Users } from 'lucide-react'
import { useInscritos } from '../../../../hooks/useInscritos'
import type { Inscrito, EstadoInscrito } from '../../../../types/admin'
import TarjetaContador from '../../../../components/ui/tarjetaContador/tarjetaContador'
import TablaAdmin from '../../../../components/ui/tablaAdmin/tablaAdmin'
import ModalVerInscripcion from '../../../../components/ui/modalVerInscripcion/modalVerInscripcion'
import ModalRechazo from '../../../../components/ui/modalRechazo/modalRechazo'
import Paginacion from '../../../../components/ui/paginacion/paginacion'
import CampoInput from '../../../../components/ui/campoInput/campoInput'
import SelectFiltro from '../../../../components/ui/selectFiltro/selectFiltro'
import './page.css'

const POR_PAGINA = 25

export default function AdminCofundadoresPage() {
  const { inscritos, cargando: cargandoData, aprobar, rechazar: rechazarHook } = useInscritos()
  const [pagina, setPagina] = useState(1)
  const [filtroEstado, setFiltroEstado] = useState<EstadoInscrito | ''>('')
  const [filtroPerfil, setFiltroPerfil] = useState('')
  const [filtroNombre, setFiltroNombre] = useState('')
  const [modalVer, setModalVer] = useState<Inscrito | null>(null)
  const [modalRechazo, setModalRechazo] = useState<Inscrito | null>(null)

  async function rechazar(motivo: string) {
    if (!modalRechazo) return
    await rechazarHook(modalRechazo.id, motivo)
    setModalRechazo(null)
  }

  const filtrados = useMemo(() => {
    let lista = [...inscritos]
    if (filtroEstado) lista = lista.filter((i) => i.estado === filtroEstado)
    if (filtroPerfil) lista = lista.filter((i) => i.categoria === filtroPerfil)
    if (filtroNombre) lista = lista.filter((i) => i.nombre.toLowerCase().includes(filtroNombre.toLowerCase()))
    return lista.sort((a, b) => new Date(b.fechaInscripcion).getTime() - new Date(a.fechaInscripcion).getTime())
  }, [inscritos, filtroEstado, filtroPerfil, filtroNombre])

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA)
  const paginados = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  const total = inscritos.length
  const porAprobar = inscritos.filter((i) => i.estado === 'por_aprobar').length
  const aprobados = inscritos.filter((i) => i.estado === 'aprobado').length
  const rechazados = inscritos.filter((i) => i.estado === 'rechazado').length

  const perfiles = [...new Set(inscritos.map((i) => i.categoria))]

  return (
    <main className="admin-cofundadores">
      {cargandoData && <p className="admin-cofundadores__cargando">Cargando inscritos...</p>}

      <div className="admin-cofundadores__contadores">
        <TarjetaContador titulo="Total inscritos" valor={total} />
        <TarjetaContador titulo="Por aprobar" valor={porAprobar} variante="amarillo" />
        <TarjetaContador titulo="Aprobados" valor={aprobados} variante="verde" />
        <TarjetaContador titulo="Rechazados" valor={rechazados} variante="rojo" />
      </div>

      <div className="admin-cofundadores__filtros">
        <CampoInput
          label=""
          placeholder="Buscar por nombre..."
          value={filtroNombre}
          onChange={(v) => { setFiltroNombre(v); setPagina(1) }}
        />
        <SelectFiltro
          icono={<ListFilter size={15} />}
          valor={filtroEstado}
          opciones={[
            { valor: '', label: 'Todos los estados' },
            { valor: 'por_aprobar', label: 'Por aprobar' },
            { valor: 'aprobado', label: 'Aprobado' },
            { valor: 'rechazado', label: 'Rechazado' },
          ]}
          onChange={(v) => { setFiltroEstado(v as EstadoInscrito | ''); setPagina(1) }}
        />
        <SelectFiltro
          icono={<Users size={15} />}
          valor={filtroPerfil}
          opciones={[
            { valor: '', label: 'Todos los perfiles' },
            ...perfiles.map((p) => ({ valor: p, label: p })),
          ]}
          onChange={(v) => { setFiltroPerfil(v); setPagina(1) }}
        />
      </div>

      <TablaAdmin
        inscritos={paginados}
        onVer={setModalVer}
        onAprobar={aprobar}
        onRechazar={setModalRechazo}
      />

      <Paginacion
        paginaActual={pagina}
        totalPaginas={totalPaginas}
        onCambiar={setPagina}
      />

      {modalVer && (
        <ModalVerInscripcion inscrito={modalVer} onCerrar={() => setModalVer(null)} />
      )}
      {modalRechazo && (
        <ModalRechazo
          nombre={modalRechazo.nombre}
          onCerrar={() => setModalRechazo(null)}
          onConfirmar={rechazar}
        />
      )}
    </main>
  )
}
