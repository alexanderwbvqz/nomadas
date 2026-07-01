import { useParams, useNavigate } from 'react-router-dom'
import { useMatchPerfil } from '../../../hooks/useMatchPerfil'
import TarjetaMatch from '../../../components/ui/tarjetaMatch/tarjetaMatch'
import AppButton from '../../../components/ui/boton/boton'
import './page.css'

export default function MatchPerfilPage() {
  const { codigo = '' } = useParams()
  const navigate = useNavigate()
  const { perfil, cargando, noEncontrado } = useMatchPerfil(codigo)

  if (cargando) {
    return (
      <div className="match-perfil match-perfil--centro">
        <div className="match-perfil__spinner" />
      </div>
    )
  }

  if (noEncontrado || !perfil) {
    return (
      <div className="match-perfil match-perfil--centro">
        <p className="match-perfil__marca">Nómadas</p>
        <div className="match-perfil__error-icono">⚠️</div>
        <h2 className="match-perfil__error-titulo">Código no encontrado</h2>
        <p className="match-perfil__error-texto">Este código QR no corresponde a ningún nómada registrado.</p>
        <AppButton label="Volver al inicio" variante="outline" onClick={() => navigate('/')} />
      </div>
    )
  }

  return (
    <div className="match-perfil">
      <p className="match-perfil__marca">Nómadas</p>
      <TarjetaMatch perfil={perfil} />
    </div>
  )
}
