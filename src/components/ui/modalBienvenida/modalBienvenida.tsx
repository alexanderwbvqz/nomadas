import { PartyPopper } from 'lucide-react'
import AppButton from '../boton/boton'
import './modalBienvenida.css'

interface ModalBienvenidaProps {
  onAceptar: () => void
}

export default function ModalBienvenida({ onAceptar }: ModalBienvenidaProps) {
  return (
    <div className="modal-bienvenida__overlay">
      <div className="modal-bienvenida">
        <div className="modal-bienvenida__icono">
          <PartyPopper size={32} />
        </div>

        <h2 className="modal-bienvenida__titulo">¡Todo listo!</h2>

        <p className="modal-bienvenida__mensaje">
          Hemos recibido tu registro y ahora iniciaremos el proceso de revisión.
          En un plazo máximo de 24 horas validaremos la información enviada.
          Una vez aprobada, tu perfil estará disponible en la sección Nómadas,
          donde otros cofundadores podrán conocerte y conectar contigo para
          formar la próxima gran startup.
        </p>

        <AppButton label="Aceptar" onClick={onAceptar} />
      </div>
    </div>
  )
}
