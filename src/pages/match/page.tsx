import { QrCode } from 'lucide-react'
import AppButton from '../../components/ui/boton/boton'
import './page.css'

export default function MatchPage() {
  function abrirGoogleLens() {
    window.open('https://lens.google.com', '_blank')
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
        <AppButton
          label="Escanear código QR"
          icon={<QrCode size={16} />}
          onClick={abrirGoogleLens}
        />
      </div>
    </div>
  )
}
