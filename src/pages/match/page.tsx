import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { QrCode } from 'lucide-react'
import AppButton from '../../components/ui/boton/boton'
import { decodificarQRDeImagen } from '../../lib/qr'
import './page.css'

const MATCH_SEGMENT = '/match/'

export default function MatchPage() {
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState(false)
  const [procesando, setProcesando] = useState(false)

  async function handleArchivo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setProcesando(true)
    setError(false)

    const texto = await decodificarQRDeImagen(file)

    if (texto) {
      const idx = texto.indexOf(MATCH_SEGMENT)
      if (idx !== -1) {
        const codigo = texto.slice(idx + MATCH_SEGMENT.length)
        if (codigo) { navigate(`/match/${codigo}`); return }
      }
    }

    setError(true)
    setProcesando(false)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="match-page">
      <div className="match-hero">
        <p className="match-hero__marca">Nómadas</p>
        <h1 className="match-hero__titulo">
          Encuentra a tu<br />
          <span className="match-hero__titulo--resaltado">cofundador ideal</span>
        </h1>
        <p className="match-hero__subtitulo">
          Cada gran empresa nació de una conversación. Escanea el código QR de un nómada y descubre personas hechas para construir juntos.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="match-hero__input"
          onChange={handleArchivo}
        />
        <AppButton
          label={procesando ? 'Procesando...' : 'Escanear código QR'}
          icon={<QrCode size={16} />}
          onClick={() => inputRef.current?.click()}
          disabled={procesando}
        />
        {error && (
          <p className="match-hero__error">
            No se encontró un código QR válido. Intenta de nuevo.
          </p>
        )}
      </div>
    </div>
  )
}
