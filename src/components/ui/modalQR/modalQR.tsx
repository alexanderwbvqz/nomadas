import { useRef } from 'react'
import QRCode from 'react-qr-code'
import AppButton from '../boton/boton'
import Overlay from '../overlay/overlay'
import { buildMatchUrl, descargarQRComoPNG } from '../../../utils/qr'
import './modalQR.css'

interface ModalQRProps {
  codigo?: string
  url?: string
  nombre: string
  onCerrar: () => void
}

export default function ModalQR({ codigo, url: urlProp, nombre, onCerrar }: ModalQRProps) {
  const url = urlProp ?? buildMatchUrl(codigo ?? '')
  const qrRef = useRef<HTMLDivElement>(null)

  function descargar() {
    if (qrRef.current) descargarQRComoPNG(qrRef.current, nombre)
  }

  return (
    <Overlay onClick={onCerrar}>
      <div className="modal-qr" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-qr__titulo">Código QR</h2>
        <p className="modal-qr__nombre">{nombre}</p>
        {codigo && <p className="modal-qr__codigo">{codigo}</p>}
        <div className="modal-qr__qr" ref={qrRef}>
          <QRCode value={url} size={200} />
        </div>
        <p className="modal-qr__url">{url}</p>
        <div className="modal-qr__acciones">
          <AppButton label="Cancelar" variante="outline" onClick={onCerrar} />
          <AppButton label="Descargar" onClick={descargar} />
        </div>
      </div>
    </Overlay>
  )
}
