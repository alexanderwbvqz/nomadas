import { useState } from 'react'
import { Sparkles, Flame } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import { useMatchPerfil } from '../../../hooks/useMatchPerfil'
import { useMatchesTop10 } from '../../../hooks/useMatchesTop10'
import CarruselMatch from '../../../components/ui/carruselMatch/carruselMatch'
import ModalPerfil from '../../../components/ui/modalPerfil/modalPerfil'
import AppButton from '../../../components/ui/boton/boton'
import './page.css'

export default function MatchInicioPage() {
  const { codigo = '' } = useParams()
  const navigate = useNavigate()
  const { perfil, cargando, noEncontrado } = useMatchPerfil(codigo)
  const { matches, cargando: cargandoMatches } = useMatchesTop10(perfil)
  const [modalAbierto, setModalAbierto] = useState(false)

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

  const primerNombre = perfil.nombre.split(' ')[0]

  return (
    <div className="match-perfil match-perfil--carrusel">
      <p className="match-perfil__marca">Nómadas</p>

      <div className="match-perfil__saludo">
        <h1 className="match-perfil__saludo-titulo">
          Hola, {primerNombre} <Sparkles size={26} className="match-perfil__saludo-icono" />
        </h1>
        <p className="match-perfil__saludo-texto">
          Conoce el perfil de este nómada y empieza una conversación que podría cambiar todo.
        </p>
        <AppButton label="Ver mi perfil" onClick={() => setModalAbierto(true)} />
      </div>

      <div className="match-perfil__conexiones-label">
        <Flame size={16} className="match-perfil__conexiones-icono" />
        <span>Tus mejores conexiones en Nómadas</span>
      </div>

      <CarruselMatch matches={matches} cargando={cargandoMatches} />

      {modalAbierto && (
        <ModalPerfil id={perfil.id} onCerrar={() => setModalAbierto(false)} />
      )}
    </div>
  )
}
