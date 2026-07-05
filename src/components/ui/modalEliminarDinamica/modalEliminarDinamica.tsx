import { X, Trash2 } from 'lucide-react'
import AppButton from '../boton/boton'
import Overlay from '../overlay/overlay'
import type { ModalEliminarDinamicaProps } from './modalEliminarDinamica.types'
import './modalEliminarDinamica.css'

export default function ModalEliminarDinamica({ nombre, onCerrar, onConfirmar }: ModalEliminarDinamicaProps) {
  return (
    <Overlay onClick={onCerrar}>
      <div className="modal-eliminar-dinamica" onClick={(e) => e.stopPropagation()}>
        <button className="modal-eliminar-dinamica__cerrar" onClick={onCerrar}>
          <X size={18} />
        </button>

        <div className="modal-eliminar-dinamica__icono">
          <Trash2 size={24} />
        </div>

        <h2 className="modal-eliminar-dinamica__titulo">Eliminar dinámica</h2>
        <p className="modal-eliminar-dinamica__subtitulo">
          ¿Estás seguro de que deseas eliminar <strong>{nombre}</strong>? Se eliminarán también todas sus preguntas. Esta acción no se puede deshacer.
        </p>

        <div className="modal-eliminar-dinamica__acciones">
          <AppButton label="Eliminar" variante="naranja" onClick={onConfirmar} />
          <AppButton label="Cancelar" variante="outline" onClick={onCerrar} />
        </div>
      </div>
    </Overlay>
  )
}
