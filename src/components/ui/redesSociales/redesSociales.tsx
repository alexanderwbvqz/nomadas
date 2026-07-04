import type { ReactElement } from 'react'
import type { RedesSocialesProps } from './redesSociales.types'
import './redesSociales.css'

const ICONOS: Record<string, ReactElement> = {
  linkedin: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  instagram: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  facebook: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
}

export default function RedesSociales({ redes }: RedesSocialesProps) {
  if (redes.length === 0) return null
  return (
    <div className="redes-sociales">
      {redes.map((r) => (
        <a key={r.red} href={r.url} target="_blank" rel="noopener noreferrer" className="redes-sociales__link">
          {ICONOS[r.red]}
          {r.red.charAt(0).toUpperCase() + r.red.slice(1)}
        </a>
      ))}
    </div>
  )
}
