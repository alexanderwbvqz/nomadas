import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from './footer.types'
import './footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__marca">
          <span className="footer__nombre">Nómadas</span>
          <span className="footer__copyright">© 2026 Nómadas. Exclusive Members Club.</span>
        </div>

        <nav className="footer__links">
          {FOOTER_LINKS.map((link) => (
            <Link key={link.label} to={link.href} className="footer__link">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  )
}
