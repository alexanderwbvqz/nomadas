import { useParams } from 'react-router-dom'
import QRCode from 'react-qr-code'
import { usePantallaCeo } from '../../../hooks/usePantallaCeo'
import { buildJugadorCeoUrl } from '../../../utils/qr'
import './page.css'

export default function PantallaCeoPage() {
  const { sesionId } = useParams<{ sesionId: string }>()
  const {
    sesion,
    dinamica,
    jugadoresEnSala,
    timer,
    resultados,
    cargando,
    preguntaActual,
    iniciarJuego,
    mostrarResultados,
  } = usePantallaCeo(sesionId!)

  if (cargando) {
    return <div className="pantalla-ceo pantalla-ceo--cargando"><p>Cargando...</p></div>
  }

  if (!sesion || !dinamica) {
    return <div className="pantalla-ceo pantalla-ceo--error"><p>Sesión no encontrada.</p></div>
  }

  const jugadorUrl = buildJugadorCeoUrl(sesionId!)
  const totalPreguntas = dinamica.preguntas.length

  return (
    <div className="pantalla-ceo">
      {/* SALA DE ESPERA */}
      {sesion.estado === 'espera' && (
        <div className="pantalla-ceo__espera">
          <div className="pantalla-ceo__espera-contenido">
            <h1 className="pantalla-ceo__titulo-juego">{dinamica.nombre}</h1>
            <p className="pantalla-ceo__evento-nombre">{sesion.eventoNombre}</p>

            <div className="pantalla-ceo__qr-bloque">
              <div className="pantalla-ceo__qr-caja">
                <QRCode value={jugadorUrl} size={220} />
              </div>
              <div className="pantalla-ceo__qr-info">
                <p className="pantalla-ceo__qr-label">Escanea para jugar</p>
                <p className="pantalla-ceo__qr-url">{jugadorUrl}</p>
              </div>
            </div>

            <div className="pantalla-ceo__jugadores-contador">
              <span className="pantalla-ceo__jugadores-numero">{jugadoresEnSala}</span>
              <span className="pantalla-ceo__jugadores-label">jugadores en sala</span>
            </div>

            <button className="pantalla-ceo__btn-iniciar" onClick={iniciarJuego}>
              Iniciar juego
            </button>
          </div>
        </div>
      )}

      {/* PREGUNTA ACTIVA */}
      {sesion.estado === 'en_curso' && preguntaActual && (
        <div className="pantalla-ceo__juego">
          <div className="pantalla-ceo__barra-superior">
            <span className="pantalla-ceo__progreso">
              Pregunta {(sesion.preguntaActual ?? 0) + 1} / {totalPreguntas}
            </span>
            <div className="pantalla-ceo__timer-circulo">
              <span className="pantalla-ceo__timer-numero">{timer}</span>
            </div>
          </div>

          <h2 className="pantalla-ceo__pregunta-texto">{preguntaActual.texto}</h2>

          <div className="pantalla-ceo__opciones">
            {preguntaActual.opciones.map((opcion, i) => (
              <div key={opcion.id} className={`pantalla-ceo__opcion pantalla-ceo__opcion--${i}`}>
                <span className="pantalla-ceo__opcion-letra">{['A', 'B', 'C', 'D'][i]}</span>
                <span className="pantalla-ceo__opcion-texto">{opcion.texto}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ENTRE PREGUNTAS (pausa) */}
      {sesion.estado === 'en_curso' && !preguntaActual && (
        <div className="pantalla-ceo__pausa">
          <p className="pantalla-ceo__pausa-texto">Próxima pregunta en...</p>
          <span className="pantalla-ceo__pausa-timer">{timer}</span>
        </div>
      )}

      {/* FINALIZANDO — botón para ver resultados */}
      {sesion.estado === 'finalizando' && (
        <div className="pantalla-ceo__finalizando">
          <h2 className="pantalla-ceo__finalizando-titulo">¡Juego terminado!</h2>
          <p className="pantalla-ceo__finalizando-subtitulo">¿Listos para conocer a los CEOs?</p>
          <button className="pantalla-ceo__btn-resultados" onClick={mostrarResultados}>
            Ver resultados
          </button>
        </div>
      )}

      {/* RESULTADOS FINALES */}
      {sesion.estado === 'finalizado' && (
        <div className="pantalla-ceo__resultados">
          <h2 className="pantalla-ceo__resultados-titulo">Los CEOs de {sesion.eventoNombre}</h2>
          <div className="pantalla-ceo__grid">
            {resultados.map((r) => (
              <div key={r.perfilId} className="pantalla-ceo__tarjeta-resultado">
                <div className="pantalla-ceo__tarjeta-nombre">{r.nombre}</div>
                <div className="pantalla-ceo__tarjeta-categoria">{r.categoria}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
