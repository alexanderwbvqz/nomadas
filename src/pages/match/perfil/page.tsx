import { useParams, useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { useMatchPerfil } from '../../../hooks/useMatchPerfil'
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

      <div className="match-perfil__header">
        {perfil.foto
          ? <img src={perfil.foto} alt={perfil.nombre} className="match-perfil__foto" />
          : <div className="match-perfil__foto match-perfil__foto--placeholder" />
        }
        <h1 className="match-perfil__nombre">{perfil.nombre}</h1>
        <p className="match-perfil__ocupacion">{perfil.ocupacion}</p>
        <span className="match-perfil__categoria">{perfil.categoria}</span>
      </div>

      {perfil.descripcion && (
        <div className="match-perfil__seccion">
          <p className="match-perfil__descripcion">{perfil.descripcion}</p>
        </div>
      )}

      {perfil.sueno && (
        <div className="match-perfil__seccion">
          <h3 className="match-perfil__seccion-titulo">Su sueño</h3>
          <p className="match-perfil__seccion-texto">{perfil.sueno}</p>
        </div>
      )}

      {perfil.pasiones.length > 0 && (
        <div className="match-perfil__seccion">
          <h3 className="match-perfil__seccion-titulo">Pasiones</h3>
          <div className="match-perfil__badges">
            {perfil.pasiones.map((p) => (
              <span key={p} className="match-perfil__badge">{p}</span>
            ))}
          </div>
        </div>
      )}

      {perfil.superpoderes.length > 0 && (
        <div className="match-perfil__seccion">
          <h3 className="match-perfil__seccion-titulo">Superpoderes</h3>
          <div className="match-perfil__badges">
            {perfil.superpoderes.map((s) => (
              <span key={s} className="match-perfil__badge match-perfil__badge--indigo">{s}</span>
            ))}
          </div>
        </div>
      )}

      {perfil.whatsapp && (
        <div className="match-perfil__cta">
          <AppButton
            label="Conectar por WhatsApp"
            icon={<MessageCircle size={16} />}
            onClick={() => window.open(`https://wa.me/${perfil.whatsapp.replace(/\D/g, '')}`, '_blank')}
          />
        </div>
      )}
    </div>
  )
}
