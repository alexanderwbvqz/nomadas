import { useState, useMemo } from 'react'
import { Users, Handshake } from 'lucide-react'
import BotonesAccion from '../../../../components/ui/botonesAccion/botonesAccion'
import SelectFiltro from '../../../../components/ui/selectFiltro/selectFiltro'
import type { TipoAliado } from '../../../../components/ui/tarjetaAliado/tarjetaAliado.types'
import TarjetaContador from '../../../../components/ui/tarjetaContador/tarjetaContador'
import ModalEditarAliado from '../../../../components/ui/modalEditarAliado/modalEditarAliado'
import ModalEliminarAliado from '../../../../components/ui/modalEliminarAliado/modalEliminarAliado'
import ToggleActivo from '../../../../components/ui/toggleActivo/toggleActivo'
import { useAliados } from '../../../../hooks/useAliados'
import type { AliadoAdmin } from '../../../../hooks/useAliados'
import './page.css'

const TIPO_CLASE: Record<TipoAliado, string> = {
  Mentores:               'admin-aliados__tipo--mentores',
  Organizadores:          'admin-aliados__tipo--universidad',
  'Aliados Estratégicos': 'admin-aliados__tipo--empresas',
}

export default function AdminAliadosPage() {
  const { aliados, cargando, toggleActivo: toggleActivoHook, guardar: guardarHook, eliminar: eliminarHook } = useAliados()
  const [filtroTipo, setFiltroTipo] = useState<TipoAliado | ''>('')
  const [modalEditar, setModalEditar] = useState<AliadoAdmin | null>(null)
  const [modalEliminar, setModalEliminar] = useState<AliadoAdmin | null>(null)

  async function guardar(actualizado: AliadoAdmin) {
    await guardarHook(actualizado)
    setModalEditar(null)
  }

  async function eliminar() {
    if (!modalEliminar) return
    await eliminarHook(modalEliminar.id)
    setModalEliminar(null)
  }

  const filtrados = useMemo(() => {
    let lista = [...aliados]
    if (filtroTipo) lista = lista.filter((a) => a.tipo === filtroTipo)
    return lista
  }, [aliados, filtroTipo])

  const total = aliados.length
  const activos = aliados.filter((a) => a.activo).length
  const inactivos = aliados.filter((a) => !a.activo).length

  return (
    <>
      <main className="admin-aliados">
        {cargando && <p className="admin-aliados__cargando">Cargando aliados...</p>}
        <div className="admin-aliados__contadores">
          <TarjetaContador titulo="Total aliados" valor={total} />
          <TarjetaContador titulo="Activos" valor={activos} variante="verde" />
          <TarjetaContador titulo="Inactivos" valor={inactivos} variante="amarillo" />
        </div>

        <div className="admin-aliados__filtros">
          <SelectFiltro
            icono={<Users size={15} />}
            valor={filtroTipo}
            opciones={[
              { valor: '', label: 'Todos los tipos' },
              { valor: 'Mentores', label: 'Mentores' },
              { valor: 'Organizadores', label: 'Organizadores' },
              { valor: 'Aliados Estratégicos', label: 'Aliados Estratégicos' },
            ]}
            onChange={(v) => setFiltroTipo(v as TipoAliado | '')}
          />
        </div>

        <div className="admin-aliados__tabla-wrap">
          <table className="admin-aliados__tabla">
            <thead>
              <tr>
                <th>#</th>
                <th>ALIADO</th>
                <th>TIPO</th>
                <th>DESCRIPCIÓN</th>
                <th>REDES</th>
                <th>VISIBILIDAD</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {!cargando && filtrados.length === 0 && (
                <tr>
                  <td colSpan={7} className="admin-aliados__vacio">
                    <Handshake size={32} />
                    <span>{aliados.length === 0 ? 'Aún no hay aliados registrados' : 'No hay aliados con ese filtro'}</span>
                  </td>
                </tr>
              )}
              {filtrados.map((a, i) => (
                <tr key={a.id}>
                  <td className="admin-aliados__td-num">{i + 1}</td>
                  <td>
                    <div className="admin-aliados__aliado">
                      {a.logo
                        ? <img
                            src={a.logo}
                            alt={a.nombre}
                            className="admin-aliados__logo"
                            onError={(e) => { e.currentTarget.replaceWith(Object.assign(document.createElement('div'), { className: 'admin-aliados__logo-placeholder', textContent: a.nombre.charAt(0).toUpperCase() })) }}
                          />
                        : <div className="admin-aliados__logo-placeholder">{a.nombre.charAt(0).toUpperCase()}</div>
                      }
                      <span className="admin-aliados__nombre">{a.nombre}</span>
                    </div>
                  </td>
                  <td>
                    <span className={`admin-aliados__badge ${TIPO_CLASE[a.tipo]}`}>{a.tipo}</span>
                  </td>
                  <td><p className="admin-aliados__descripcion">{a.descripcion}</p></td>
                  <td>
                    <div className="admin-aliados__redes">
                      {a.linkedin && (
                        <a href={a.linkedin} target="_blank" rel="noreferrer" className="admin-aliados__red" title="LinkedIn">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                      )}
                      {a.instagram && (
                        <a href={a.instagram} target="_blank" rel="noreferrer" className="admin-aliados__red" title="Instagram">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                        </a>
                      )}
                      {a.web && (
                        <a href={a.web} target="_blank" rel="noreferrer" className="admin-aliados__red" title="Sitio web">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                        </a>
                      )}
                      {!a.linkedin && !a.instagram && !a.web && <span className="admin-aliados__sin-redes">—</span>}
                    </div>
                  </td>
                  <td>
                    <ToggleActivo
                      activo={a.activo}
                      onChange={() => toggleActivoHook(a.id, !a.activo)}
                    />
                  </td>
                  <td>
                    <BotonesAccion
                      onEditar={() => setModalEditar(a)}
                      onEliminar={() => setModalEliminar(a)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {modalEditar && (
        <ModalEditarAliado aliado={modalEditar} onCerrar={() => setModalEditar(null)} onGuardar={guardar} />
      )}
      {modalEliminar && (
        <ModalEliminarAliado nombre={modalEliminar.nombre} onCerrar={() => setModalEliminar(null)} onConfirmar={eliminar} />
      )}
    </>
  )
}
