import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const SCANNER_VIDEO_ID = 'match-qr-video'
const MATCH_SEGMENT = '/match/'

interface BarcodeDetector {
  detect(source: HTMLVideoElement): Promise<Array<{ rawValue: string }>>
}
declare const BarcodeDetector: {
  new(options: { formats: string[] }): BarcodeDetector
  getSupportedFormats?(): Promise<string[]>
}

export function useQRScanner() {
  const navigate = useNavigate()
  const [scanning, setScanning] = useState(false)
  const [errorCamara, setErrorCamara] = useState(false)
  const activeRef = useRef(false)
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    if (!scanning) return

    activeRef.current = true

    async function iniciar() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        })
        streamRef.current = stream

        const video = document.getElementById(SCANNER_VIDEO_ID) as HTMLVideoElement
        if (!video || !activeRef.current) { detener(stream); return }

        video.srcObject = stream
        await video.play()

        if (!('BarcodeDetector' in window)) {
          setErrorCamara(true)
          setScanning(false)
          detener(stream)
          return
        }

        const detector = new BarcodeDetector({ formats: ['qr_code'] })

        const loop = async () => {
          if (!activeRef.current) return
          try {
            const results = await detector.detect(video)
            for (const barcode of results) {
              const idx = barcode.rawValue.indexOf(MATCH_SEGMENT)
              if (idx !== -1) {
                const codigo = barcode.rawValue.slice(idx + MATCH_SEGMENT.length)
                if (codigo) {
                  activeRef.current = false
                  detener(stream)
                  navigate(`/match/${codigo}`)
                  return
                }
              }
            }
          } catch {}
          requestAnimationFrame(loop)
        }

        requestAnimationFrame(loop)
      } catch {
        setErrorCamara(true)
        setScanning(false)
      }
    }

    iniciar()

    return () => {
      activeRef.current = false
      if (streamRef.current) { detener(streamRef.current); streamRef.current = null }
    }
  }, [scanning, navigate])

  function detener(stream: MediaStream) {
    stream.getTracks().forEach((t) => t.stop())
  }

  function iniciarScan() {
    setErrorCamara(false)
    setScanning(true)
  }

  function cancelarScan() {
    activeRef.current = false
    if (streamRef.current) { detener(streamRef.current); streamRef.current = null }
    setScanning(false)
  }

  return { scanning, errorCamara, iniciarScan, cancelarScan }
}
