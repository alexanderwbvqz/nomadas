import { useEffect } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Users, Handshake } from 'lucide-react'
import { useAdminAuth } from '../../../hooks/useAdminAuth'
import AppButton from '../../../components/ui/boton/boton'
import './adminLayout.css'

export default function AdminLayout() {
  const { session, cargando, logout } = useAdminAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!cargando && !session) {
      navigate('/nomadas-admin-2026', { replace: true })
    }
  }, [session, cargando])

  async function cerrarSesion() {
    await logout()
    navigate('/nomadas-admin-2026', { replace: true })
  }

  if (cargando) return null

  return (
    <div className="admin-layout">
      <header className="admin-layout__header">
        <Link to="/" className="admin-layout__logo">NÓMADAS</Link>
        <span className="admin-layout__header-titulo">Panel de administración</span>
        <AppButton
          label="Cerrar sesión"
          variante="outline"
          icon={<LogOut size={16} />}
          className="admin-layout__logout-btn"
          onClick={cerrarSesion}
        />
      </header>

      <nav className="admin-layout__nav">
        <NavLink
          to="/nomadas-admin-2026/panel/cofundadores"
          className={({ isActive }) => `admin-layout__tab${isActive ? ' admin-layout__tab--activo' : ''}`}
        >
          <Users size={15} />
          <span>Cofundadores</span>
        </NavLink>
        <NavLink
          to="/nomadas-admin-2026/panel/aliados"
          className={({ isActive }) => `admin-layout__tab${isActive ? ' admin-layout__tab--activo' : ''}`}
        >
          <Handshake size={15} />
          <span>Aliados</span>
        </NavLink>
      </nav>

      <Outlet />
    </div>
  )
}
