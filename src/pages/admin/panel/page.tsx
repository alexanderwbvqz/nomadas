import { useState, useMemo, useEffect } from 'react'
import { LogOut, ListFilter, Users } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useAdminAuth } from '../../../hooks/useAdminAuth'
import { useInscritos } from '../../../hooks/useInscritos'
import type { Inscrito, EstadoInscrito } from '../../../types/admin'
import TarjetaContador from '../../../components/ui/tarjetaContador/tarjetaContador'
import TablaAdmin from '../../../components/ui/tablaAdmin/tablaAdmin'
import ModalVerInscripcion from '../../../components/ui/modalVerInscripcion/modalVerInscripcion'
import ModalRechazo from '../../../components/ui/modalRechazo/modalRechazo'
import Paginacion from '../../../components/ui/paginacion/paginacion'
import CampoInput from '../../../components/ui/campoInput/campoInput'
import AppButton from '../../../components/ui/boton/boton'
import './page.css'

const POR_PAGINA = 25

export default function AdminPanelPage() {
  const { session, cargando: cargandoAuth, logout } = useAdminAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!cargandoAuth && !session) {
      navigate('/nomadas-admin-2026', { replace: true })
    }
  }, [session, cargandoAuth])

  async function cerrarSesion() {
    await logout()
    navigate('/nomadas-admin-2026', { replace: true })
  }

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
    if (filtroPerfil) lista = lista.filter((i) => i.perfil === filtroPerfil)
    if (filtroNombre) lista = lista.filter((i) => i.nombre.toLowerCase().includes(filtroNombre.toLowerCase()))
    return lista.sort((a, b) => new Date(b.fechaInscripcion).getTime() - new Date(a.fechaInscripcion).getTime())
  }, [inscritos, filtroEstado, filtroPerfil, filtroNombre])

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA)
  const paginados = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  const total = inscritos.length
  const porAprobar = inscritos.filter((i) => i.estado === 'por_aprobar').length
  const aprobados = inscritos.filter((i) => i.estado === 'aprobado').length
  const rechazados = inscritos.filter((i) => i.estado === 'rechazado').length

  const perfiles = [...new Set(inscritos.map((i) => i.perfil))]

  return (
    <div className="admin-panel">
      <header className="admin-panel__header">
        <Link to="/" className="admin-panel__logo">NÓMADAS</Link>
        <span className="admin-panel__header-titulo">Panel de administración</span>
        <AppButton label="Cerrar sesión" variante="outline" icon={<LogOut size={16} />} className="admin-panel__logout-btn" onClick={cerrarSesion} />
      </header>

      <main className="admin-panel__main">
        {cargandoData && <p className="admin-panel__cargando">Cargando inscritos...</p>}
        <div className="admin-panel__contadores">
          <TarjetaContador titulo="Total inscritos" valor={total} />
          <TarjetaContador titulo="Por aprobar" valor={porAprobar} variante="amarillo" />
          <TarjetaContador titulo="Aprobados" valor={aprobados} variante="verde" />
          <TarjetaContador titulo="Rechazados" valor={rechazados} variante="rojo" />
        </div>

        <div className="admin-panel__filtros">
          <CampoInput
            label=""
            placeholder="Buscar por nombre..."
            value={filtroNombre}
            onChange={(v) => { setFiltroNombre(v); setPagina(1) }}
          />
          <div className="admin-panel__select-wrap">
            <ListFilter size={15} className="admin-panel__select-icono" />
            <select
              className="admin-panel__select"
              value={filtroEstado}
              onChange={(e) => { setFiltroEstado(e.target.value as EstadoInscrito | ''); setPagina(1) }}
            >
              <option value="">Todos los estados</option>
              <option value="por_aprobar">Por aprobar</option>
              <option value="aprobado">Aprobado</option>
              <option value="rechazado">Rechazado</option>
            </select>
          </div>
          <div className="admin-panel__select-wrap">
            <Users size={15} className="admin-panel__select-icono" />
            <select
              className="admin-panel__select"
              value={filtroPerfil}
              onChange={(e) => { setFiltroPerfil(e.target.value); setPagina(1) }}
            >
              <option value="">Todos los perfiles</option>
              {perfiles.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
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
      </main>

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
    </div>
  )
}
