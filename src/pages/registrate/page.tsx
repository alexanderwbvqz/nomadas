import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { BulbOutlined, SettingOutlined, LineChartOutlined } from '@ant-design/icons'
import AppButton from '../../components/ui/boton/boton'
import CampoTexto from '../../components/ui/campoTexto/campoTexto'
import './page.css'

export default function RegistratePage() {
  const navigate = useNavigate()
  const [aceptado, setAceptado] = useState(false)

  return (
    <div className="registro">
      <div className="registro__orbe" />
      <div className="registro__grid" />

      <Link to="/" className="registro__logo">NÓMADAS</Link>

      <div className="registro__card">
        <h1 className="registro__card-titulo">Crea tu cuenta</h1>
        <p className="registro__card-subtitulo">
          ¿Ya tienes una cuenta?{' '}
          <Link to="/iniciar-sesion">Inicia sesión aquí</Link>
        </p>

        <div className="registro__campos">
          <div className="registro__fila">
            <CampoTexto label="Nombre" placeholder="Juana" requerido />
            <CampoTexto label="Apellido" placeholder="Pérez" requerido />
          </div>

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
          />

          <label className="registro__terminos">
            <input
              type="checkbox"
              checked={aceptado}
              onChange={(e) => setAceptado(e.target.checked)}
            />
            <span className="registro__terminos-texto">
              Acepto los Términos y Condiciones
            </span>
          </label>

          <AppButton
            label="Regístrate aquí"
            disabled={!aceptado}
            onClick={() => navigate('/onboarding')}
          />
        </div>
      </div>

      <div className="registro__footer">
        <span className="registro__footer-badge">Base para emprendedores</span>
        <div className="registro__footer-items">
          <div className="registro__footer-item">
            <BulbOutlined className="registro__footer-icono" />
            Piénsalo.
          </div>
          <div className="registro__footer-item">
            <SettingOutlined className="registro__footer-icono" />
            Constrúyelo.
          </div>
          <div className="registro__footer-item">
            <LineChartOutlined className="registro__footer-icono" />
            Escálalo.
          </div>
        </div>
      </div>
    </div>
  )
}
