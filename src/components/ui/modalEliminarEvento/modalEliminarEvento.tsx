import { X, Trash2 } from 'lucide-react'
import AppButton from '../boton/boton'
import Overlay from '../overlay/overlay'
import type { ModalEliminarEventoProps } from './modalEliminarEvento.types'
import './modalEliminarEvento.css'

export default function ModalEliminarEvento({ nombre, onCerrar, onConfirmar }: ModalEliminarEventoProps) {
  return (
    <Overlay onClick={onCerrar}>
      <div className="modal-eliminar-evento" onClick={(e) => e.stopPropagation()}>
        <button className="modal-eliminar-evento__cerrar" onClick={onCerrar}>
          <X size={18} />
        </button>

        <div className="modal-eliminar-evento__icono">
          <Trash2 size={24} />
        </div>

        <h2 className="modal-eliminar-evento__titulo">Eliminar evento</h2>
        <p className="modal-eliminar-evento__subtitulo">
          ¿Estás seguro de que deseas eliminar <strong>{nombre}</strong>? Se eliminarán también todas las asistencias registradas. Esta acción no se puede deshacer.
        </p>

        <div className="modal-eliminar-evento__acciones">
          <AppButton label="Eliminar" variante="naranja" onClick={onConfirmar} />
          <AppButton label="Cancelar" variante="outline" onClick={onCerrar} />
        </div>
      </div>
    </Overlay>
  )
}
