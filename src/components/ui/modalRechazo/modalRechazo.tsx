import { useState } from 'react'
import { X } from 'lucide-react'
import AppButton from '../boton/boton'
import Overlay from '../overlay/overlay'
import './modalRechazo.css'

interface ModalRechazoProps {
  nombre: string
  onCerrar: () => void
  onConfirmar: (motivo: string) => void
}

export default function ModalRechazo({ nombre, onCerrar, onConfirmar }: ModalRechazoProps) {
  const [motivo, setMotivo] = useState('')

  return (
    <Overlay onClick={onCerrar}>
      <div className="modal-rechazo" onClick={(e) => e.stopPropagation()}>
        <button className="modal-rechazo__cerrar" onClick={onCerrar}>
          <X size={18} />
        </button>

        <h2 className="modal-rechazo__titulo">Rechazar inscripción</h2>
        <p className="modal-rechazo__subtitulo">
          Estás por rechazar a <strong>{nombre}</strong>. Indica el motivo.
        </p>

        <textarea
          className="modal-rechazo__textarea"
          placeholder="Escribe el motivo del rechazo..."
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          rows={4}
        />

        <div className="modal-rechazo__acciones">
          <AppButton
            label="Confirmar rechazo"
            disabled={!motivo.trim()}
            onClick={() => onConfirmar(motivo.trim())}
          />
          <AppButton label="Cancelar" variante="outline" onClick={onCerrar} />
        </div>
      </div>
    </Overlay>
  )
}
