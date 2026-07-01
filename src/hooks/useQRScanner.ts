import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserQRCodeReader } from '@zxing/browser'

export const SCANNER_VIDEO_ID = 'match-qr-video'
const MATCH_SEGMENT = '/match/'

export function useQRScanner() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [errorCamara, setErrorCamara] = useState(false)
  const controlsRef = useRef<{ stop: () => void } | null>(null)

  useEffect(() => {
    if (!scanning) return

    const reader = new BrowserQRCodeReader()

    reader
      .decodeFromVideoDevice(undefined, SCANNER_VIDEO_ID, (result) => {
        if (!result) return

        const text = result.getText()
        const idx = text.indexOf(MATCH_SEGMENT)
        if (idx !== -1) {
          const codigo = text.slice(idx + MATCH_SEGMENT.length)
          if (codigo) {
            controlsRef.current?.stop()
            navigate(`/match/${codigo}`)
          }
        }
      })
      .then((controls) => { controlsRef.current = controls })
      .catch(() => { setErrorCamara(true); setScanning(false) })

    return () => { controlsRef.current?.stop(); controlsRef.current = null }
  }, [scanning, navigate])

  function iniciarScan() {
    setErrorCamara(false)
    setScanning(true)
  }

  function cancelarScan() {
    controlsRef.current?.stop()
    controlsRef.current = null
    setScanning(false)
  }

  return { scanning, errorCamara, iniciarScan, cancelarScan }
}
