import { useParams, useNavigate } from 'react-router-dom'
import { Eye, Check, X } from 'lucide-react'
import { useSesionCeoDetalle } from '../../../../../hooks/useSesionCeoDetalle'
import ModalRespuestasJugador from '../../../../../components/ui/modalRespuestasJugador/modalRespuestasJugador'
import BotonVolver from '../../../../../components/ui/botonVolver/botonVolver'
import './page.css'

export default function AdminCeoDetallePage() {
  const { sesionId } = useParams<{ sesionId: string }>()
  const navigate = useNavigate()
  const {
    sesion,
    jugadores,
    cargando,
    respuestasModal,
    cargandoRespuestas,
    verRespuestas,
    confirmar,
    cerrarModal,
  } = useSesionCeoDetalle(sesionId!)

  if (cargando) {
    return <main className="ceo-detalle"><p className="ceo-detalle__cargando">Cargando...</p></main>
  }

  return (
    <main className="ceo-detalle">
      <div className="ceo-detalle__cabecera">
        <BotonVolver label="CEO" onClick={() => navigate('/admin/panel/ceo')} />
        <div>
          <h2 className="ceo-detalle__titulo">{sesion?.dinamicaNombre}</h2>
          <p className="ceo-detalle__subtitulo">{sesion?.eventoNombre}</p>
        </div>
      </div>

      {jugadores.length === 0 ? (
        <p className="ceo-detalle__vacia">No hay jugadores registrados en esta sesión.</p>
      ) : (
        <div className="ceo-detalle__tabla-wrapper">
          <table className="ceo-detalle__tabla">
            <thead>
              <tr>
                <th className="ceo-detalle__th ceo-detalle__th--puesto">#</th>
                <th className="ceo-detalle__th">Nombre</th>
                <th className="ceo-detalle__th">Perfil</th>
                <th className="ceo-detalle__th ceo-detalle__th--puntaje">Puntaje</th>
                <th className="ceo-detalle__th ceo-detalle__th--acciones">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {jugadores.map((j, i) => (
                <tr key={j.perfilId} className="ceo-detalle__fila">
                  <td className="ceo-detalle__td ceo-detalle__td--puesto">
                    <span className="ceo-detalle__puesto">{i + 1}</span>
                  </td>
                  <td className="ceo-detalle__td">
                    <span className="ceo-detalle__nombre">{j.nombre}</span>
                  </td>
                  <td className="ceo-detalle__td">
                    <span className="ceo-detalle__categoria">{j.categoria}</span>
                  </td>
                  <td className="ceo-detalle__td ceo-detalle__td--puntaje">
                    <span className="ceo-detalle__puntaje">{j.puntaje.toFixed(1)}</span>
                  </td>
                  <td className="ceo-detalle__td ceo-detalle__td--acciones">
                    <div className="ceo-detalle__acciones">
                      <button
                        className="ceo-detalle__btn-accion ceo-detalle__btn-accion--ojo"
                        onClick={() => verRespuestas(j.perfilId, j.nombre)}
                        disabled={cargandoRespuestas}
                        title="Ver respuestas"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        className={`ceo-detalle__btn-accion ceo-detalle__btn-accion--check ${j.confirmado === true ? 'ceo-detalle__btn-accion--activo-check' : ''}`}
                        onClick={() => confirmar(j.perfilId, j.confirmado === true ? null : true)}
                        title="Confirmar como CEO"
                      >
                        <Check size={15} />
                      </button>
                      <button
                        className={`ceo-detalle__btn-accion ceo-detalle__btn-accion--x ${j.confirmado === false ? 'ceo-detalle__btn-accion--activo-x' : ''}`}
                        onClick={() => confirmar(j.perfilId, j.confirmado === false ? null : false)}
                        title="No quiere ser CEO"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {respuestasModal && (
        <ModalRespuestasJugador
          nombre={respuestasModal.nombre}
          respuestas={respuestasModal.respuestas}
          onCerrar={cerrarModal}
        />
      )}
    </main>
  )
}
