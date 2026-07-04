import { Eye } from 'lucide-react'
import BotonIcono from '../botonIcono/botonIcono'
import type { TablaAsistenciaProps } from './tablaAsistencia.types'
import './tablaAsistencia.css'

export default function TablaAsistencia({ asistencias, onVerPerfil }: TablaAsistenciaProps) {
  return (
    <div className="tabla-asistencia__wrap">
      <table className="tabla-asistencia">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombre</th>
            <th>WhatsApp</th>
            <th>Categoría</th>
            <th>Hora de registro</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {asistencias.length === 0 ? (
            <tr>
              <td colSpan={6} className="tabla-asistencia__vacio">
                Aún nadie ha confirmado asistencia.
              </td>
            </tr>
          ) : (
            asistencias.map((a, i) => (
              <tr key={a.perfilId}>
                <td className="tabla-asistencia__td-num">{i + 1}</td>
                <td>
                  <div className="tabla-asistencia__nomada">
                    {a.foto
                      ? <img src={a.foto} alt={a.nombre} className="tabla-asistencia__avatar" />
                      : <div className="tabla-asistencia__avatar-placeholder">{a.nombre.charAt(0)}</div>
                    }
                    <span className="tabla-asistencia__nombre">{a.nombre}</span>
                  </div>
                </td>
                <td className="tabla-asistencia__whatsapp">{a.whatsapp || '—'}</td>
                <td>
                  {a.categoria
                    ? <span className="tabla-asistencia__categoria">{a.categoria}</span>
                    : <span className="tabla-asistencia__vacio-celda">—</span>
                  }
                </td>
                <td className="tabla-asistencia__hora">
                  {new Date(a.registradoEn).toLocaleTimeString('es-PE', {
                    hour: '2-digit', minute: '2-digit',
                  })}
                </td>
                <td>
                  <BotonIcono
                    icono={<Eye size={15} />}
                    onClick={() => onVerPerfil(a.perfilId)}
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
