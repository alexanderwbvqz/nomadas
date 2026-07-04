import { useState } from 'react'
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
    <div className="match-perfil">

      <div className="match-perfil__topbar">
        <span className="match-perfil__marca">Nómadas</span>
      </div>

      <div className="match-perfil__hero">
        <div className="match-perfil__hero-texto">
          <p className="match-perfil__saludo-sub">Hola,</p>
          <h1 className="match-perfil__saludo-nombre">{primerNombre}</h1>
          <p className="match-perfil__saludo-desc">
            Conoce el perfil de este nómada y empieza una conversación que podría cambiar todo.
          </p>
          <AppButton label="Ver mi perfil" onClick={() => setModalAbierto(true)} />
        </div>

        {perfil.foto && (
          <div className="match-perfil__hero-foto-wrap">
            <img src={perfil.foto} alt={perfil.nombre} className="match-perfil__hero-foto" />
          </div>
        )}
      </div>

      <div className="match-perfil__seccion-header">
        <span className="match-perfil__seccion-titulo">Tus conexiones</span>
        <div className="match-perfil__seccion-linea" />
        {matches.length > 0 && (
          <span className="match-perfil__seccion-count">{matches.length}</span>
        )}
      </div>

      <div className="match-perfil__contenido">
        <CarruselMatch matches={matches} cargando={cargandoMatches} />
      </div>

      {modalAbierto && (
        <ModalPerfil id={perfil.id} onCerrar={() => setModalAbierto(false)} />
      )}
    </div>
  )
}
