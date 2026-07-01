import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from './footer.types'
import './footer.css'

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
