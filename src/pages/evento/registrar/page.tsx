import { useParams } from 'react-router-dom'
import { CheckCircle, UserCheck } from 'lucide-react'
import { useRegistroAsistencia } from '../../../hooks/useRegistroAsistencia'
import CampoInput from '../../../components/ui/campoInput/campoInput'
import AppButton from '../../../components/ui/boton/boton'
import './page.css'

export default function RegistrarAsistenciaPage() {
  const { id = '' } = useParams<{ id: string }>()
  const { evento, cargandoEvento, whatsapp, setWhatsapp, estado, nombreNomada, registrar } = useRegistroAsistencia(id)

  if (cargandoEvento) {
    return (
      <div className="registro-evento">
        <div className="registro-evento__card">
          <p>Cargando...</p>
        </div>
      </div>
    )
  }

  if (!evento) {
    return (
      <div className="registro-evento">
        <div className="registro-evento__card">
          <span className="registro-evento__logo">NÓMADAS</span>
          <p className="registro-evento__no-existe">Este evento no existe o fue eliminado.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="registro-evento">
      <div className="registro-evento__card">
        <span className="registro-evento__logo">NÓMADAS</span>

        <h1 className="registro-evento__titulo">{evento.nombre}</h1>
        <p className="registro-evento__fecha">
          {new Date(evento.fecha + 'T00:00:00').toLocaleDateString('es-PE', {
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
          })}
        </p>

        {estado === 'finalizado' ? (
          <div className="registro-evento__feedback registro-evento__feedback--finalizado">
            Este evento ya ha finalizado.
          </div>
        ) : estado === 'registrado' ? (
          <div className="registro-evento__feedback registro-evento__feedback--registrado">
            <CheckCircle size={28} className="registro-evento__feedback-icono" />
            <span>¡Asistencia confirmada! Nos vemos en el evento, {nombreNomada}.</span>
          </div>
        ) : estado === 'ya_registrado' ? (
          <div className="registro-evento__feedback registro-evento__feedback--registrado">
            <UserCheck size={28} className="registro-evento__feedback-icono" />
            <span>Ya confirmaste tu asistencia, {nombreNomada}.</span>
          </div>
        ) : (
          <div className="registro-evento__form">
            <CampoInput
              label="Tu número de WhatsApp"
              tipo="tel"
              placeholder="Ej. 987654321"
              value={whatsapp}
              onChange={setWhatsapp}
              disabled={estado === 'cargando'}
            />

            <AppButton
              label={estado === 'cargando' ? 'Verificando...' : 'Confirmar asistencia'}
              onClick={registrar}
              disabled={!whatsapp.trim() || estado === 'cargando'}
              className="registro-evento__btn"
            />

            {estado === 'no_encontrado' && (
              <div className="registro-evento__feedback registro-evento__feedback--error">
                No encontramos un perfil con este número.
              </div>
            )}

            {estado === 'por_aprobar' && (
              <div className="registro-evento__feedback registro-evento__feedback--pendiente">
                Tu registro aún está en revisión. Comunícate con la persona encargada.
              </div>
            )}

            {estado === 'rechazado' && (
              <div className="registro-evento__feedback registro-evento__feedback--error">
                Tu perfil no fue aprobado. No puedes registrar asistencia.
              </div>
            )}

            {estado === 'error' && (
              <div className="registro-evento__feedback registro-evento__feedback--error">
                Ocurrió un error. Intenta de nuevo.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
