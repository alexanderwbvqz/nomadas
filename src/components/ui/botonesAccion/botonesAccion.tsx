import { Eye, Check, X, Pencil, Trash2, QrCode } from 'lucide-react'
import './botonesAccion.css'

interface BotonesAccionProps {
  onVer?: () => void
  onAprobar?: () => void
  onRechazar?: () => void
  onEditar?: () => void
  onEliminar?: () => void
  onQR?: () => void
  aprobadoDeshabilitado?: boolean
  rechazadoDeshabilitado?: boolean
}

export default function BotonesAccion({
  onVer,
  onAprobar,
  onRechazar,
  onEditar,
  onEliminar,
  onQR,
  aprobadoDeshabilitado = false,
  rechazadoDeshabilitado = false,
}: BotonesAccionProps) {
  return (
    <div className="botones-accion">
      {onVer && (
        <button className="botones-accion__btn botones-accion__btn--ver" onClick={onVer} title="Ver">
          <Eye size={15} />
        </button>
      )}
      {onAprobar && (
        <button
          className="botones-accion__btn botones-accion__btn--aprobar"
          onClick={onAprobar}
          disabled={aprobadoDeshabilitado}
          title="Aprobar"
        >
          <Check size={15} />
        </button>
      )}
      {onRechazar && (
        <button
          className="botones-accion__btn botones-accion__btn--rechazar"
          onClick={onRechazar}
          disabled={rechazadoDeshabilitado}
          title="Rechazar"
        >
          <X size={15} />
        </button>
      )}
      {onEditar && (
        <button className="botones-accion__btn botones-accion__btn--editar" onClick={onEditar} title="Editar">
          <Pencil size={15} />
        </button>
      )}
      {onEliminar && (
        <button className="botones-accion__btn botones-accion__btn--eliminar" onClick={onEliminar} title="Eliminar">
          <Trash2 size={15} />
        </button>
      )}
      {onQR && (
        <button className="botones-accion__btn botones-accion__btn--qr" onClick={onQR} title="Generar QR">
          <QrCode size={15} />
        </button>
      )}
    </div>
  )
}
