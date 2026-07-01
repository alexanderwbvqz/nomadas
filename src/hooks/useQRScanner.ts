import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5Qrcode } from 'html5-qrcode'
import { buildMatchUrl } from '../lib/qr'

const SCANNER_ID = 'match-qr-scanner'

export function useQRScanner() {
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

  function iniciarScan() {
    setErrorCamara(false)
    setScanning(true)
  }

  function cancelarScan() {
    setScanning(false)
  }

  return { scanning, errorCamara, iniciarScan, cancelarScan, SCANNER_ID }
}
