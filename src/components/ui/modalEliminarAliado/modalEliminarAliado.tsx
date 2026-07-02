import { X, Trash2 } from 'lucide-react'
import AppButton from '../boton/boton'
import Overlay from '../overlay/overlay'
import './modalEliminarAliado.css'

interface ModalEliminarAliadoProps {
  nombre: string
  onCerrar: () => void
  onConfirmar: () => void
}

export default function ModalEliminarAliado({ nombre, onCerrar, onConfirmar }: ModalEliminarAliadoProps) {
  return (
    <Overlay onClick={onCerrar}>
      <div className="modal-eliminar-aliado" onClick={(e) => e.stopPropagation()}>
        <button className="modal-eliminar-aliado__cerrar" onClick={onCerrar}>
          <X size={18} />
        </button>

        <div className="modal-eliminar-aliado__icono">
          <Trash2 size={24} />
        </div>

        <h2 className="modal-eliminar-aliado__titulo">Eliminar aliado</h2>
        <p className="modal-eliminar-aliado__subtitulo">
          ¿Estás seguro de que deseas eliminar a <strong>{nombre}</strong>? Esta acción no se puede deshacer.
        </p>

        <div className="modal-eliminar-aliado__acciones">
          <AppButton label="Eliminar" variante="naranja" onClick={onConfirmar} />
          <AppButton label="Cancelar" variante="outline" onClick={onCerrar} />
        </div>
      </div>
    </Overlay>
  )
}
