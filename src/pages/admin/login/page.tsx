import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CampoInput from '../../../components/ui/campoInput/campoInput'
import AppButton from '../../../components/ui/boton/boton'
import { useAdminAuth } from '../../../hooks/useAdminAuth'
import './page.css'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [cargando, setCargando] = useState(false)
  const { login } = useAdminAuth()
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setCargando(true)

    const err = await login(email, password)

    if (err) {
      setError('Correo o contraseña incorrectos.')
      setCargando(false)
      return
    }

    navigate('/nomadas-admin-2026/panel')
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        <Link to="/" className="admin-login__logo">NÓMADAS</Link>
        <h1 className="admin-login__titulo">Panel de administración</h1>
        <p className="admin-login__subtitulo">Acceso restringido</p>

        <form className="admin-login__form" onSubmit={handleSubmit}>
          <CampoInput
            label="Correo electrónico"
            tipo="email"
            placeholder="admin@nomadas.com"
            requerido
            value={email}
            onChange={setEmail}
          />
          <CampoInput
            label="Contraseña"
            tipo="password"
            placeholder="••••••••"
            requerido
            value={password}
            onChange={setPassword}
          />
          {error && <p className="admin-login__error">{error}</p>}
          <AppButton
            label={cargando ? 'Entrando...' : 'Entrar'}
            disabled={!email || !password || cargando}
            htmlType="submit"
          />
        </form>
      </div>
    </div>
  )
}
