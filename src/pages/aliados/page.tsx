import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Handshake } from 'lucide-react'
import AppButton from '../../components/ui/boton/boton'
import TarjetaAliado from '../../components/ui/tarjetaAliado/tarjetaAliado'
import FiltroChips from '../../components/ui/filtroChips/filtroChips'
import ModalAliado from '../../components/ui/modalAliado/modalAliado'
import { useAliadosPublicos } from '../../hooks/useAliadosPublicos'
import type { Aliado } from '../../types/admin'
import './page.css'

const FILTROS = ['Todos', 'Mentores', 'Organizadores', 'Aliados Estratégicos']

export default function AliadosPage() {
  useEffect(() => { document.title = 'Nómadas: Aliados' }, [])
  const navigate = useNavigate()
  const [filtroActivo, setFiltroActivo] = useState('Todos')
  const { aliados } = useAliadosPublicos()
  const [modalAliado, setModalAliado] = useState<Aliado | null>(null)

  const aliadosFiltrados = filtroActivo === 'Todos'
    ? aliados
    : aliados.filter((a) => a.tipo === filtroActivo)

  return (
    <>
    <section className="aliados" id="aliados">
      <span className="aliados__badge">Red Estratégica</span>
      <h1 className="aliados__titulo">
        Quienes nos <span className="aliados__titulo-acento">respaldan</span>
      </h1>
      <p className="aliados__descripcion">
        Forjamos alianzas con los líderes de la industria, mentes académicas brillantes y capital visionario para potenciar el próximo unicornio.
      </p>

      <div className="aliados__cta">
        <AppButton label="Sé nuestro aliado" icon={<Handshake size={17} />} className="aliados__cta-btn" onClick={() => navigate('/postular-aliado')} />
      </div>

      <div className="aliados__filtros">
        <FiltroChips opciones={FILTROS} activo={filtroActivo} onChange={setFiltroActivo} />
      </div>

      <div className="aliados__grid">
        {aliadosFiltrados.map((a) => (
          <TarjetaAliado
            key={a.id}
            logo={a.logo}
            nombre={a.nombre}
            descripcion={a.descripcion}
            tipo={a.tipo}
            linkedin={a.linkedin}
            instagram={a.instagram}
            web={a.web}
            onConocerMas={() => setModalAliado(a)}
          />
        ))}
      </div>
    </section>

    {modalAliado && (
      <ModalAliado
        logo={modalAliado.logo}
        nombre={modalAliado.nombre}
        descripcion={modalAliado.descripcion}
        tipo={modalAliado.tipo}
        linkedin={modalAliado.linkedin}
        instagram={modalAliado.instagram}
        web={modalAliado.web}
        onCerrar={() => setModalAliado(null)}
      />
    )}
    </>
  )
}
