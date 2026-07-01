import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../../components/ui/barraNavegacion/barraNavegacion'
import './page.css'

export default function NotFoundPage() {
  useEffect(() => { document.title = 'Nómadas: Página no encontrada' }, [])
  const navigate = useNavigate()

  return (
    <>
      <Navbar />
      <section className="not-found">
        <span className="not-found__codigo">404</span>
        <h1 className="not-found__titulo">Página no encontrada</h1>
        <p className="not-found__descripcion">
          La página que buscas no existe o fue movida.
        </p>
        <button className="not-found__btn" onClick={() => navigate('/')}>
          Volver al inicio
        </button>
      </section>
    </>
  )
}
