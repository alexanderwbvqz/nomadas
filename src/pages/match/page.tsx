import { QrCode } from 'lucide-react'
import AppButton from '../../components/ui/boton/boton'
import { useQRScanner, SCANNER_VIDEO_ID } from '../../hooks/useQRScanner'
import './page.css'

export default function MatchPage() {
  const { scanning, errorCamara, iniciarScan, cancelarScan } = useQRScanner()

  return (
    <div className="match-page">
      {!scanning ? (
        <div className="match-hero">
          <p className="match-hero__marca">Nómadas</p>
          <h1 className="match-hero__titulo">
            Encuentra a tu<br />
            <span className="match-hero__titulo--resaltado">cofundador ideal</span>
          </h1>
          <p className="match-hero__subtitulo">
            Cada gran empresa nació de una conversación. Escanea el código QR de un nómada y descubre personas hechas para construir juntos.
          </p>
          <AppButton
            label="Escanear código QR"
            icon={<QrCode size={16} />}
            onClick={iniciarScan}
          />
          {errorCamara && (
            <p className="match-hero__error">
              No se pudo acceder a la cámara. Asegúrate de que el sitio usa HTTPS y que diste permiso de cámara.
            </p>
          )}
        </div>
      ) : (
        <div className="match-scanner">
          <p className="match-scanner__instruccion">Apunta la cámara al código QR</p>
          <div className="match-scanner__visor">
            <video id={SCANNER_VIDEO_ID} className="match-scanner__camara" />
            <div className="match-scanner__marco" />
          </div>
          <button className="match-scanner__cancelar" onClick={cancelarScan}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}
