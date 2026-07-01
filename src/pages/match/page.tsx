import { ScanLine } from 'lucide-react'
import './page.css'

export default function MatchPage() {
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
        <div className="match-instruccion">
          <div className="match-instruccion__icono">
            <ScanLine size={24} />
          </div>
          <p className="match-instruccion__texto">
            Abre <strong>Google Lens</strong> desde la barra de búsqueda de tu celular y apunta al código QR de otro nómada.
          </p>
        </div>
      </div>
    </div>
  )
}
