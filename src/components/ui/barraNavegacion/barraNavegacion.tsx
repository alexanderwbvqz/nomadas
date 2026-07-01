import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppButton from '../boton/boton'
import './barraNavegacion.css'
import type { MobileMenuProps, HamburgerIconProps } from './barraNavegacion.types'
import { NAV_LINKS } from './barraNavegacion.types'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="navbar__inner">

          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-text">NÓMADAS</span>
          </Link>

          <div className="navbar__links">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`navbar__link${location.pathname === link.href ? ' active' : ''}`}
              >
                {link.label}
                {location.pathname === link.href && <span className="navbar__link-indicator" />}
              </Link>
            ))}
          </div>

          <div className="navbar__cta">
            <Link to="/onboarding">
              <AppButton label="Quiero registrarme" />
            </Link>
          </div>

          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </nav>

      <MobileMenu
        open={mobileOpen}
        links={NAV_LINKS}
        activeLink={location.pathname}
        onLinkClick={() => setMobileOpen(false)}
      />
    </>
  )
}

function MobileMenu({ open, links, activeLink, onLinkClick }: MobileMenuProps) {
  return (
    <div className={`navbar__mobile${open ? ' open' : ''}`}>
      <div className="navbar__mobile-inner">
        {links.map((link) => (
          <Link
            key={link.label}
            to={link.href}
            onClick={onLinkClick}
            className={`navbar__mobile-link${activeLink === link.href ? ' active' : ''}`}
          >
            {link.label}
          </Link>
        ))}
        <Link to="/onboarding" onClick={onLinkClick}>
          <AppButton label="Quiero registrarme" />
        </Link>
      </div>
    </div>
  )
}

function HamburgerIcon({ open }: HamburgerIconProps) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      {open ? (
        <>
          <line x1="3" y1="3" x2="15" y2="15" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" />
          <line x1="15" y1="3" x2="3" y2="15" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="5" x2="15" y2="5" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="9" x2="15" y2="9" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" />
          <line x1="3" y1="13" x2="15" y2="13" stroke="#0a0a0f" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
    </svg>
  )
}
