import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, Compass } from 'lucide-react'
import AppButton from '../../components/ui/boton/boton'
import Footer from '../../components/ui/footer/footer'
import { useMetricas } from '../../hooks/useMetricas'
import fotoFundador from '../../assets/foto_01_walter_barreto.png'
import './page.css'

export default function InicioPage() {
  useEffect(() => { document.title = 'Nómadas: Encuentra tu cofundador' }, [])
  const navigate = useNavigate()
  const { nomadas, aliados } = useMetricas()

  return (
    <section className="inicio">
      <div className="inicio__izquierda">
        <h1 className="inicio__titulo">
          Encuentra a las<br />
          <span className="inicio__titulo-acento">personas correctas</span><br />
          para tu startup
        </h1>

        <p className="inicio__descripcion">
          Aquí encontrarás personas con ideas brillantes que aún les falta equipo para emprender.
          Conecta, colabora y construye el futuro juntos.
        </p>

        <p className="inicio__tagline">
          <Compass size={14} />
          Únete y forma tu equipo ideal de nómadas emprendedores
        </p>

        <div className="inicio__cta">
          <AppButton
            label="Explorar Nómadas"
            icon={<ArrowRight size={16} />}
            onClick={() => navigate('/nomadas')}
          />
        </div>

        <div className="inicio__metricas">
          <div className="inicio__metrica">
            <span className="inicio__metrica-valor">{nomadas}</span>
            <span className="inicio__metrica-label">Nómadas registrados</span>
          </div>
          <div className="inicio__metrica-sep" />
          <div className="inicio__metrica">
            <span className="inicio__metrica-valor">{aliados}</span>
            <span className="inicio__metrica-label">Aliados activos</span>
          </div>
          <div className="inicio__metrica-sep" />
          <div className="inicio__metrica">
            <span className="inicio__metrica-valor">100%</span>
            <span className="inicio__metrica-label">Gratis</span>
          </div>
        </div>

        <button className="inicio__cta-registro" onClick={() => navigate('/onboarding')}>
          Quiero registrarme
        </button>

        <Footer />
      </div>

      <div className="inicio__derecha">
        <img src={fotoFundador} alt="Walter Barreto" className="inicio__foto" />
        <div className="inicio__foto-overlay" />

        <div className="inicio__quote">
          <p className="inicio__quote-texto">
            "Los nómadas saben que los grandes proyectos no nacen de una sola persona.
            Nacen cuando encuentran a las personas correctas."
          </p>
          <span className="inicio__quote-autor">— Walter Barreto, fundador de Nómadas</span>
        </div>
      </div>
    </section>
  )
}
