import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5Qrcode } from 'html5-qrcode'
import { QrCode } from 'lucide-react'
import AppButton from '../../components/ui/boton/boton'
import { buildMatchUrl } from '../../lib/qr'
import './page.css'

const SCANNER_ID = 'match-qr-scanner'

export default function MatchPage() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [errorCamara, setErrorCamara] = useState(false)
  const scannedRef = useRef(false)
  const startedRef = useRef(false)

  useEffect(() => {
    if (!scanning) return

    const scanner = new Html5Qrcode(SCANNER_ID)

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 240, height: 240 } },
        (text) => {
          if (scannedRef.current) return
          scannedRef.current = true

          const prefix = buildMatchUrl('')
          if (text.startsWith(prefix)) {
            const codigo = text.replace(prefix, '')
            scanner.stop().then(() => navigate(`/match/${codigo}`))
          }
        },
        undefined,
      )
      .then(() => { startedRef.current = true })
      .catch(() => { setErrorCamara(true); setScanning(false) })

    return () => {
      if (startedRef.current) {
        startedRef.current = false
        scanner.stop().catch(() => {})
      }
    }
  }, [scanning, navigate])

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
            onClick={() => { setErrorCamara(false); setScanning(true) }}
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
            <div id={SCANNER_ID} className="match-scanner__camara" />
            <div className="match-scanner__marco" />
          </div>
          <button className="match-scanner__cancelar" onClick={() => setScanning(false)}>
            Cancelar
          </button>
        </div>
      )}
    </div>
  )
}
