import { useNavigate } from 'react-router-dom'
import AppButton from '../../components/ui/boton/boton'
import './page.css'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="not-found">
      <p className="not-found__marca">Nómadas</p>
      <h1 className="not-found__codigo">404</h1>
      <h2 className="not-found__titulo">Página no encontrada</h2>
      <p className="not-found__subtitulo">La ruta que buscas no existe o fue movida.</p>
      <AppButton label="Volver al inicio" onClick={() => navigate('/')} />
    </div>
  )
}
