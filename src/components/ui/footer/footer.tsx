import { Link } from 'react-router-dom'
import type { FooterLink } from './footer.types'
import './footer.css'

const FOOTER_LINKS: FooterLink[] = [
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Términos', href: '/terminos' },
  { label: 'Soporte', href: '/soporte' },
  { label: 'Contacto', href: 'https://wa.me/51973356545' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <span className="footer__copyright">© 2026 Nómadas.</span>

        <nav className="footer__links">
          {FOOTER_LINKS.map((link) =>
            link.href.startsWith('http') ? (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="footer__link">
                {link.label}
              </a>
            ) : (
              <Link key={link.label} to={link.href} className="footer__link">
                {link.label}
              </Link>
            )
          )}
        </nav>
      </div>
    </footer>
  )
}
