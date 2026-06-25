import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Handshake } from 'lucide-react'
import AppButton from '../../components/ui/boton/boton'
import TarjetaAliado from '../../components/ui/tarjetaAliado/tarjetaAliado'
import ModalAliado from '../../components/ui/modalAliado/modalAliado'
import type { TipoAliado } from '../../components/ui/tarjetaAliado/tarjetaAliado.types'
import { supabase } from '../../lib/supabase'
import './page.css'

const FILTROS = ['Todos', 'Mentores', 'Universidad', 'Empresas']

interface Aliado {
  id: string
  logo: string
  nombre: string
  descripcion: string
  tipo: TipoAliado
  linkedin?: string
  instagram?: string
  web?: string
}

export default function AliadosPage() {
  const navigate = useNavigate()
  const [filtroActivo, setFiltroActivo] = useState('Todos')
  const [aliados, setAliados] = useState<Aliado[]>([])
  const [modalAliado, setModalAliado] = useState<Aliado | null>(null)

  useEffect(() => {
    supabase
      .from('aliados')
      .select('id, logo, nombre, descripcion, tipo, linkedin, instagram, web')
      .eq('activo', true)
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        if (data) setAliados(data as Aliado[])
      })
  }, [])

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
        {FILTROS.map((f) => (
          <AppButton
            key={f}
            label={f}
            variante={filtroActivo === f ? 'primario' : 'texto'}
            onClick={() => setFiltroActivo(f)}
          />
        ))}
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
