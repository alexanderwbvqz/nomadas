import { Link } from 'react-router-dom'
import { BulbOutlined, SettingOutlined, LineChartOutlined } from '@ant-design/icons'
import AppButton from '../../components/ui/boton/boton'
import CampoTexto from '../../components/ui/campoTexto/campoTexto'
import './page.css'

export default function IniciarSesionPage() {
  return (
    <div className="login">
      <div className="login__orbe" />
      <div className="login__grid" />
      <Link to="/" className="login__logo">NÓMADAS</Link>

      <div className="login__card">
        <h1 className="login__card-titulo">Iniciar sesión</h1>
        <p className="login__card-subtitulo">
          ¿Aún no tienes una cuenta?{' '}
          <Link to="/registrate">Regístrate aquí</Link>
        </p>

        <div className="login__campos">
          <CampoTexto
            label="Correo electrónico"
            tipo="email"
            placeholder="tu.correo@proveedor.es"
            requerido
          />
          <CampoTexto
            label="Contraseña"
            tipo="password"
            placeholder="tucontraseñaaquí"
            requerido
            enlaceDerecha={{ texto: '¿Olvidaste la contraseña?' }}
          />
          <AppButton label="Iniciar sesión" />
        </div>
      </div>

      <div className="login__footer">
        <span className="login__footer-badge">Base para emprendedores</span>
        <div className="login__footer-items">
          <div className="login__footer-item">
            <BulbOutlined className="login__footer-icono" />
            Piénsalo.
          </div>
          <div className="login__footer-item">
            <SettingOutlined className="login__footer-icono" />
            Constrúyelo.
          </div>
          <div className="login__footer-item">
            <LineChartOutlined className="login__footer-icono" />
            Escálalo.
          </div>
        </div>
      </div>
    </div>
  )
}
