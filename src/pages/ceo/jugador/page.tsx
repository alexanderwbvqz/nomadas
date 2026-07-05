import { useParams } from 'react-router-dom'
import { Trophy, Loader2, Clock, CheckCircle, PartyPopper } from 'lucide-react'
import { useJugadorCeo } from '../../../hooks/useJugadorCeo'
import './page.css'

const MENSAJES_ERROR: Record<string, string> = {
  no_encontrado: 'No encontramos un perfil con ese número de WhatsApp.',
  no_aprobado: 'Tu perfil aún no ha sido aprobado.',
  no_asistio: 'No hay registro de tu asistencia a este evento.',
  ya_unido: 'Ya estás participando en esta sesión.',
  sesion_no_existe: 'Esta sesión no existe o fue eliminada.',
  error: 'Ocurrió un error. Intenta de nuevo.',
}

export default function JugadorCeoPage() {
  const { sesionId } = useParams<{ sesionId: string }>()
  const { estado, whatsapp, setWhatsapp, sesion, preguntaActual, respondido, unirse, responder } = useJugadorCeo(sesionId!)

  function handleUnirse(e: React.FormEvent) {
    e.preventDefault()
    unirse()
  }

  return (
    <div className="jugador-ceo">
      {/* ENTRADA */}
      {(estado === 'idle' || estado === 'cargando' || estado in MENSAJES_ERROR) && (
        <div className="jugador-ceo__entrada">
          <div className="jugador-ceo__icono-principal">
            <Trophy size={36} strokeWidth={1.5} />
          </div>
          <div className="jugador-ceo__encabezado">
            <h1 className="jugador-ceo__titulo">¿Quién será el CEO?</h1>
            <p className="jugador-ceo__subtitulo">Ingresa tu WhatsApp para participar</p>
          </div>

          <form className="jugador-ceo__form" onSubmit={handleUnirse}>
            <div className="jugador-ceo__campo">
              <label className="jugador-ceo__label">Número de WhatsApp</label>
              <input
                type="tel"
                className="jugador-ceo__input"
                placeholder="0987654321"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                disabled={estado === 'cargando'}
                autoFocus
              />
              {MENSAJES_ERROR[estado] && (
                <p className="jugador-ceo__error">{MENSAJES_ERROR[estado]}</p>
              )}
            </div>
            <button
              type="submit"
              className="jugador-ceo__btn-entrar"
              disabled={!whatsapp.trim() || estado === 'cargando'}
            >
              {estado === 'cargando'
                ? <><Loader2 size={18} className="jugador-ceo__spinner" /> Verificando...</>
                : 'Entrar al juego'
              }
            </button>
          </form>
        </div>
      )}

      {/* SALA DE ESPERA */}
      {estado === 'espera' && (
        <div className="jugador-ceo__estado-pantalla">
          <div className="jugador-ceo__estado-icono jugador-ceo__estado-icono--espera">
            <Clock size={32} strokeWidth={1.5} />
          </div>
          <h2 className="jugador-ceo__estado-titulo">¡Estás dentro!</h2>
          <p className="jugador-ceo__estado-texto">El juego comenzará en cualquier momento</p>
          <div className="jugador-ceo__dots">
            <span /><span /><span />
          </div>
        </div>
      )}

      {/* EN CURSO */}
      {estado === 'en_curso' && preguntaActual && (
        <div className="jugador-ceo__juego">
          <p className="jugador-ceo__pregunta-eyebrow">
            Pregunta {(sesion?.preguntaActual ?? 0) + 1}
          </p>
          <h2 className="jugador-ceo__pregunta-texto">{preguntaActual.texto}</h2>

          {respondido ? (
            <div className="jugador-ceo__respondido">
              <CheckCircle size={40} strokeWidth={1.5} className="jugador-ceo__respondido-icono" />
              <p>Respuesta enviada</p>
            </div>
          ) : (
            <div className="jugador-ceo__opciones">
              {preguntaActual.opciones.map((opcion, i) => (
                <button
                  key={opcion.id}
                  className={`jugador-ceo__opcion jugador-ceo__opcion--${i}`}
                  onClick={() => responder(preguntaActual.id, opcion.id, opcion.peso)}
                >
                  <span className="jugador-ceo__opcion-letra">{['A', 'B', 'C', 'D'][i]}</span>
                  <span className="jugador-ceo__opcion-texto">{opcion.texto}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ENTRE PREGUNTAS */}
      {estado === 'en_curso' && !preguntaActual && (
        <div className="jugador-ceo__estado-pantalla">
          <div className="jugador-ceo__estado-icono jugador-ceo__estado-icono--espera">
            <Clock size={32} strokeWidth={1.5} />
          </div>
          <h2 className="jugador-ceo__estado-titulo">Siguiente pregunta</h2>
          <p className="jugador-ceo__estado-texto">Prepárate...</p>
        </div>
      )}

      {/* FINALIZANDO */}
      {estado === 'finalizando' && (
        <div className="jugador-ceo__estado-pantalla">
          <div className="jugador-ceo__estado-icono jugador-ceo__estado-icono--fin">
            <Trophy size={32} strokeWidth={1.5} />
          </div>
          <h2 className="jugador-ceo__estado-titulo">¡Terminaste!</h2>
          <p className="jugador-ceo__estado-texto">Los resultados aparecerán en la pantalla principal</p>
        </div>
      )}

      {/* FINALIZADO */}
      {estado === 'finalizado' && (
        <div className="jugador-ceo__estado-pantalla">
          <div className="jugador-ceo__estado-icono jugador-ceo__estado-icono--gracias">
            <PartyPopper size={32} strokeWidth={1.5} />
          </div>
          <h2 className="jugador-ceo__estado-titulo">Gracias por participar</h2>
          <p className="jugador-ceo__estado-texto">Mira la pantalla principal para ver los resultados</p>
        </div>
      )}
    </div>
  )
}
