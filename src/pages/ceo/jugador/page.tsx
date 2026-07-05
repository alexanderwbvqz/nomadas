import { useParams } from 'react-router-dom'
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
      {/* ENTRADA — escribir WhatsApp */}
      {(estado === 'idle' || estado === 'cargando' || estado in MENSAJES_ERROR) && (
        <div className="jugador-ceo__entrada">
          <div className="jugador-ceo__logo">
            <span>🏆</span>
          </div>
          <h1 className="jugador-ceo__titulo">¿Quién será el CEO?</h1>
          <p className="jugador-ceo__subtitulo">Ingresa tu número de WhatsApp para participar</p>

          <form className="jugador-ceo__form" onSubmit={handleUnirse}>
            <input
              type="tel"
              className="jugador-ceo__input"
              placeholder="Ej: 0987654321"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              disabled={estado === 'cargando'}
            />
            {MENSAJES_ERROR[estado] && (
              <p className="jugador-ceo__error">{MENSAJES_ERROR[estado]}</p>
            )}
            <button
              type="submit"
              className="jugador-ceo__btn-entrar"
              disabled={!whatsapp.trim() || estado === 'cargando'}
            >
              {estado === 'cargando' ? 'Verificando...' : 'Entrar al juego'}
            </button>
          </form>
        </div>
      )}

      {/* SALA DE ESPERA */}
      {estado === 'espera' && (
        <div className="jugador-ceo__espera">
          <div className="jugador-ceo__espera-icono">⏳</div>
          <h2 className="jugador-ceo__espera-titulo">¡Estás dentro!</h2>
          <p className="jugador-ceo__espera-texto">El juego comenzará pronto...</p>
          <div className="jugador-ceo__pulse" />
        </div>
      )}

      {/* EN CURSO — responder pregunta */}
      {estado === 'en_curso' && preguntaActual && (
        <div className="jugador-ceo__juego">
          <p className="jugador-ceo__pregunta-numero">
            Pregunta {(sesion?.preguntaActual ?? 0) + 1}
          </p>
          <h2 className="jugador-ceo__pregunta-texto">{preguntaActual.texto}</h2>

          {respondido ? (
            <div className="jugador-ceo__respondido">
              <span className="jugador-ceo__respondido-icono">✓</span>
              <p>¡Respuesta enviada!</p>
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
        <div className="jugador-ceo__espera">
          <div className="jugador-ceo__espera-icono">⚡</div>
          <h2 className="jugador-ceo__espera-titulo">¡Bien hecho!</h2>
          <p className="jugador-ceo__espera-texto">Siguiente pregunta en un momento...</p>
        </div>
      )}

      {/* FINALIZANDO */}
      {estado === 'finalizando' && (
        <div className="jugador-ceo__espera">
          <div className="jugador-ceo__espera-icono">🎉</div>
          <h2 className="jugador-ceo__espera-titulo">¡Terminaste!</h2>
          <p className="jugador-ceo__espera-texto">Espera los resultados en la pantalla principal...</p>
        </div>
      )}

      {/* FINALIZADO */}
      {estado === 'finalizado' && (
        <div className="jugador-ceo__gracias">
          <div className="jugador-ceo__gracias-icono">🏆</div>
          <h2 className="jugador-ceo__gracias-titulo">¡Gracias por participar!</h2>
          <p className="jugador-ceo__gracias-texto">
            Los resultados están en la pantalla principal. ¡Descubre si eres el CEO!
          </p>
        </div>
      )}
    </div>
  )
}
