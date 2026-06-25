import { X, Globe, ExternalLink } from 'lucide-react'
import type { ModalAliadoProps } from './modalAliado.types'
import './modalAliado.css'

const BADGE_CLASE: Record<string, string> = {
  'Mentores':    'modal-aliado__badge--mentoria',
  'Universidad': 'modal-aliado__badge--educacion',
  'Empresas':    'modal-aliado__badge--financiamiento',
}

function IconLinkedin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function IconInstagram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

export default function ModalAliado({ logo, nombre, descripcion, tipo, linkedin, instagram, web, onCerrar }: ModalAliadoProps) {
  return (
    <div className="modal-aliado__overlay" onClick={onCerrar}>
      <div className="modal-aliado" onClick={(e) => e.stopPropagation()}>
        <button className="modal-aliado__cerrar" onClick={onCerrar}>
          <X size={20} />
        </button>

        <div className="modal-aliado__logo-wrapper">
          <img src={logo} alt={nombre} className="modal-aliado__logo" />
        </div>

        <h2 className="modal-aliado__nombre">{nombre}</h2>

        <span className={`modal-aliado__badge ${BADGE_CLASE[tipo]}`}>{tipo}</span>

        <p className="modal-aliado__descripcion">{descripcion}</p>

        {(linkedin || instagram || web) && (
          <div className="modal-aliado__links">
            {linkedin && (
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="modal-aliado__link">
                <IconLinkedin />
                LinkedIn
                <ExternalLink size={12} className="modal-aliado__link-ext" />
              </a>
            )}
            {instagram && (
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="modal-aliado__link">
                <IconInstagram />
                Instagram
                <ExternalLink size={12} className="modal-aliado__link-ext" />
              </a>
            )}
            {web && (
              <a href={web} target="_blank" rel="noopener noreferrer" className="modal-aliado__link">
                <Globe size={16} />
                Visitar sitio web
                <ExternalLink size={12} className="modal-aliado__link-ext" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
