import { useState } from 'react'
import Overlay from '../overlay/overlay'
import AppButton from '../boton/boton'
import type { ModalCrearSesionCeoProps } from './modalCrearSesionCeo.types'
import './modalCrearSesionCeo.css'

export default function ModalCrearSesionCeo({ dinamicas, eventos, onCerrar, onGuardar }: ModalCrearSesionCeoProps) {
  const [dinamicaId, setDinamicaId] = useState(dinamicas[0]?.id ?? '')
  const [eventoId, setEventoId] = useState(eventos[0]?.id ?? '')
  const [guardando, setGuardando] = useState(false)

  async function handleGuardar() {
    if (!dinamicaId || !eventoId) return
    setGuardando(true)
    await onGuardar(dinamicaId, eventoId)
    setGuardando(false)
  }

  return (
    <Overlay onClick={onCerrar}>
      <div className="modal-crear-sesion-ceo" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-crear-sesion-ceo__titulo">Nueva sesión CEO</h2>

        <div className="modal-crear-sesion-ceo__campos">
          <div className="modal-crear-sesion-ceo__campo">
            <label className="modal-crear-sesion-ceo__label">Dinámica</label>
            <select
              className="modal-crear-sesion-ceo__select"
              value={dinamicaId}
              onChange={(e) => setDinamicaId(e.target.value)}
            >
              {dinamicas.map((d) => (
                <option key={d.id} value={d.id}>{d.nombre}</option>
              ))}
            </select>
          </div>

          <div className="modal-crear-sesion-ceo__campo">
            <label className="modal-crear-sesion-ceo__label">Evento</label>
            <select
              className="modal-crear-sesion-ceo__select"
              value={eventoId}
              onChange={(e) => setEventoId(e.target.value)}
            >
              {eventos.map((e) => (
                <option key={e.id} value={e.id}>{e.nombre}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="modal-crear-sesion-ceo__acciones">
          <AppButton label="Cancelar" variante="outline" onClick={onCerrar} />
          <AppButton
            label={guardando ? 'Creando...' : 'Crear sesión'}
            onClick={handleGuardar}
            disabled={!dinamicaId || !eventoId || guardando}
          />
        </div>
      </div>
    </Overlay>
  )
}
