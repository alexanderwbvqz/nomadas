import { Link } from 'react-router-dom'
import { Settings } from 'lucide-react'
import { FOOTER_LINKS } from './footer.types'
import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__marca">
          <span className="footer__nombre">Nómadas</span>
          <span className="footer__copyright">© 2026 Nómadas.</span>
        </div>

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
          <Link to="/nomadas-admin-2026" className="footer__admin">
            <Settings size={14} />
          </Link>
        </nav>
      </div>
    </footer>
  )
}
