import { PartyPopper } from 'lucide-react'
import AppButton from '../boton/boton'
import Overlay from '../overlay/overlay'
import './modalConfirmacion.css'

interface ModalConfirmacionProps {
  titulo: string
  mensaje: string
  onAceptar: () => void
}

export default function ModalConfirmacion({ titulo, mensaje, onAceptar }: ModalConfirmacionProps) {
  return (
    <Overlay>
      <div className="modal-confirmacion">
        <div className="modal-confirmacion__icono">
          <PartyPopper size={32} />
        </div>

        <h2 className="modal-confirmacion__titulo">{titulo}</h2>

        <p className="modal-confirmacion__mensaje">{mensaje}</p>

        <AppButton label="Aceptar" onClick={onAceptar} />
      </div>
    </Overlay>
  )
}
