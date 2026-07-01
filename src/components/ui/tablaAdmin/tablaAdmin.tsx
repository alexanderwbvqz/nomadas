import type { Inscrito, EstadoInscrito } from '../../../types/admin'
import BotonesAccion from '../botonesAccion/botonesAccion'
import './tablaAdmin.css'

interface TablaAdminProps {
  inscritos: Inscrito[]
  onVer: (inscrito: Inscrito) => void
  onAprobar: (id: string) => void
  onRechazar: (inscrito: Inscrito) => void
  onQR?: (inscrito: Inscrito) => void
}

const ESTADO_LABEL: Record<EstadoInscrito, string> = {
  por_aprobar: 'Por aprobar',
  aprobado: 'Aprobado',
  rechazado: 'Rechazado',
}

export default function TablaAdmin({ inscritos, onVer, onAprobar, onRechazar, onQR }: TablaAdminProps) {
  if (inscritos.length === 0) {
    return <p className="tabla-admin__vacio">No hay inscritos que coincidan con los filtros.</p>
  }

  return (
    <div className="tabla-admin__wrap">
      <table className="tabla-admin">
        <thead>
          <tr>
            <th>#</th>
            <th>Fecha</th>
            <th>Código</th>
            <th>Nombre</th>
            <th>Perfil</th>
            <th>Estado</th>
            <th>Observaciones</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inscritos.map((ins) => (
            <tr key={ins.id}>
              <td className="tabla-admin__orden">{ins.orden}</td>
              <td className="tabla-admin__fecha">
                {new Date(ins.fechaInscripcion).toLocaleDateString('es-PE', {
                  day: '2-digit', month: '2-digit', year: 'numeric',
                })}
              </td>
              <td className="tabla-admin__codigo">{ins.codigoMatch || '—'}</td>
              <td className="tabla-admin__nombre">
                <div className="tabla-admin__nombre-wrap">
                  {ins.foto && <img src={ins.foto} alt={ins.nombre} className="tabla-admin__avatar" />}
                  {ins.nombre}
                </div>
              </td>
              <td>
                <span className="tabla-admin__perfil-badge">{ins.categoria}</span>
              </td>
              <td>
                <span className={`tabla-admin__estado tabla-admin__estado--${ins.estado}`}>
                  {ESTADO_LABEL[ins.estado]}
                </span>
              </td>
              <td className="tabla-admin__obs">
                {ins.observaciones ? (
                  <span className="tabla-admin__obs-texto">{ins.observaciones}</span>
                ) : (
                  <span className="tabla-admin__obs-vacio">—</span>
                )}
              </td>
              <td>
                <BotonesAccion
                  onVer={() => onVer(ins)}
                  onAprobar={() => onAprobar(ins.id)}
                  onRechazar={() => onRechazar(ins)}
                  onQR={onQR ? () => onQR(ins) : undefined}
                  aprobadoDeshabilitado={ins.estado === 'aprobado' || ins.estado === 'rechazado'}
                  rechazadoDeshabilitado={ins.estado === 'aprobado' || ins.estado === 'rechazado'}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
