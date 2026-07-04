import { useState } from 'react'
import Overlay from '../overlay/overlay'
import AppButton from '../boton/boton'
import type { ModalCrearEventoProps } from './modalCrearEvento.types'
import './modalCrearEvento.css'

export default function ModalCrearEvento({ onCerrar, onGuardar }: ModalCrearEventoProps) {
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [guardando, setGuardando] = useState(false)

  async function handleGuardar() {
    if (!nombre.trim() || !fecha) return
    setGuardando(true)
    await onGuardar(nombre.trim(), fecha)
    setGuardando(false)
  }

  return (
    <Overlay onClick={onCerrar}>
      <div className="modal-crear-evento" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-crear-evento__titulo">Nuevo evento</h2>

        <div className="modal-crear-evento__campos">
          <div className="modal-crear-evento__campo">
            <label className="modal-crear-evento__label">Nombre del evento</label>
            <input
              className="modal-crear-evento__input"
              placeholder="Ej. Meetup Julio 2026"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="modal-crear-evento__campo">
            <label className="modal-crear-evento__label">Fecha</label>
            <input
              type="date"
              className="modal-crear-evento__input"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
        </div>

        <div className="modal-crear-evento__acciones">
          <AppButton label="Cancelar" variante="outline" onClick={onCerrar} />
          <AppButton
            label={guardando ? 'Guardando...' : 'Crear evento'}
            onClick={handleGuardar}
            disabled={!nombre.trim() || !fecha || guardando}
          />
        </div>
      </div>
    </Overlay>
  )
}
