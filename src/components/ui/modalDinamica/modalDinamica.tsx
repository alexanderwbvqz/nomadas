import { useState } from 'react'
import Overlay from '../overlay/overlay'
import AppButton from '../boton/boton'
import CampoInput from '../campoInput/campoInput'
import BotonAgregar from '../botonAgregar/botonAgregar'
import TarjetaPregunta from '../tarjetaPregunta/tarjetaPregunta'
import type { ModalDinamicaProps } from './modalDinamica.types'
import type { PreguntaForm } from '../../../types/dinamicas'
import './modalDinamica.css'

function preguntaVacia(): PreguntaForm {
  return {
    texto: '',
    opciones: [
      { texto: '', peso: 2.0 },
      { texto: '', peso: 1.5 },
      { texto: '', peso: 1.0 },
      { texto: '', peso: 0.5 },
    ],
  }
}

export default function ModalDinamica({ dinamica, onCerrar, onGuardar }: ModalDinamicaProps) {
  const [nombre, setNombre] = useState(dinamica?.nombre ?? '')
  const [tiempoRespuesta, setTiempoRespuesta] = useState(String(dinamica?.tiempoRespuesta ?? 30))
  const [tiempoPausa, setTiempoPausa] = useState(String(dinamica?.tiempoPausa ?? 5))
  const [preguntas, setPreguntas] = useState<PreguntaForm[]>(
    dinamica?.preguntas.map((p) => ({
      texto: p.texto,
      opciones: p.opciones.map((o) => ({ texto: o.texto, peso: o.peso })),
    })) ?? [preguntaVacia()]
  )
  const [guardando, setGuardando] = useState(false)

  function agregarPregunta() {
    setPreguntas((prev) => [...prev, preguntaVacia()])
  }

  function actualizarPregunta(i: number, pregunta: PreguntaForm) {
    setPreguntas((prev) => prev.map((p, idx) => (idx === i ? pregunta : p)))
  }

  function eliminarPregunta(i: number) {
    setPreguntas((prev) => prev.filter((_, idx) => idx !== i))
  }

  const valido =
    nombre.trim().length > 0 &&
    parseInt(tiempoRespuesta) > 0 &&
    parseInt(tiempoPausa) > 0 &&
    preguntas.length > 0 &&
    preguntas.every(
      (p) => p.texto.trim().length > 0 && p.opciones.every((o) => o.texto.trim().length > 0)
    )

  async function handleGuardar() {
    if (!valido) return
    setGuardando(true)
    await onGuardar({
      nombre: nombre.trim(),
      tiempoRespuesta: parseInt(tiempoRespuesta),
      tiempoPausa: parseInt(tiempoPausa),
      preguntas,
    })
    setGuardando(false)
  }

  return (
    <Overlay onClick={onCerrar}>
      <div className="modal-dinamica" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-dinamica__titulo">
          {dinamica ? 'Editar dinámica' : 'Nueva dinámica'}
        </h2>

        <div className="modal-dinamica__cuerpo">
          <CampoInput
            label="Nombre de la dinámica"
            placeholder="Ej. CEO Quiz — Evento Julio 2026"
            value={nombre}
            onChange={setNombre}
            requerido
          />

          <div className="modal-dinamica__tiempo-campos">
            <CampoInput
              label="Segundos por pregunta"
              placeholder="Ej. 30"
              value={tiempoRespuesta}
              onChange={setTiempoRespuesta}
              requerido
            />
            <CampoInput
              label="Segundos de pausa entre preguntas"
              placeholder="Ej. 5"
              value={tiempoPausa}
              onChange={setTiempoPausa}
              requerido
            />
          </div>

          <div className="modal-dinamica__preguntas">
            <p className="modal-dinamica__seccion-label">Preguntas</p>
            {preguntas.map((p, i) => (
              <TarjetaPregunta
                key={i}
                index={i}
                pregunta={p}
                onChange={(pf) => actualizarPregunta(i, pf)}
                onEliminar={() => eliminarPregunta(i)}
              />
            ))}
            <BotonAgregar label="Agregar pregunta" onClick={agregarPregunta} fullWidth />
          </div>
        </div>

        <div className="modal-dinamica__acciones">
          <AppButton label="Cancelar" variante="outline" onClick={onCerrar} />
          <AppButton
            label={guardando ? 'Guardando...' : dinamica ? 'Guardar cambios' : 'Crear dinámica'}
            onClick={handleGuardar}
            disabled={!valido || guardando}
          />
        </div>
      </div>
    </Overlay>
  )
}
