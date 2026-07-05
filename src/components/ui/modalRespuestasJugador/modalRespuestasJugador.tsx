import Overlay from '../overlay/overlay'
import AppButton from '../boton/boton'
import type { ModalRespuestasJugadorProps } from './modalRespuestasJugador.types'
import './modalRespuestasJugador.css'

export default function ModalRespuestasJugador({ nombre, respuestas, onCerrar }: ModalRespuestasJugadorProps) {
  return (
    <Overlay onClick={onCerrar}>
      <div className="modal-respuestas" onClick={(e) => e.stopPropagation()}>
        <div className="modal-respuestas__cabecera">
          <div>
            <p className="modal-respuestas__eyebrow">Respuestas de</p>
            <h2 className="modal-respuestas__nombre">{nombre}</h2>
          </div>
          <AppButton label="Cerrar" variante="outline" onClick={onCerrar} />
        </div>

        <div className="modal-respuestas__lista">
          {respuestas.length === 0 ? (
            <p className="modal-respuestas__vacia">Este jugador no respondió ninguna pregunta.</p>
          ) : (
            respuestas.map((r, i) => (
              <div key={i} className="modal-respuestas__item">
                <p className="modal-respuestas__pregunta">
                  <span className="modal-respuestas__numero">{i + 1}</span>
                  {r.preguntaTexto}
                </p>
                <p className="modal-respuestas__opcion">{r.opcionTexto}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </Overlay>
  )
}
