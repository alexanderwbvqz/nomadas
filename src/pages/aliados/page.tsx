import { useState } from 'react'
import AppButton from '../../components/ui/boton/boton'
import TarjetaAliado from '../../components/ui/tarjetaAliado/tarjetaAliado'
import type { TipoAliado } from '../../components/ui/tarjetaAliado/tarjetaAliado.types'
import './page.css'

const FILTROS = ['Todos', 'Mentores', 'Universidad', 'Empresas']

const ALIADOS: { id: number; logo: string; nombre: string; descripcion: string; tipo: TipoAliado }[] = [
  { id: 1,  logo: 'https://i.pravatar.cc/150?img=1',  nombre: 'Elena Rodríguez',  descripcion: 'Ex-CTO de unicornio fintech, especializada en escalabilidad y arquitectura distribuida.',        tipo: 'Mentores' },
  { id: 2,  logo: 'https://i.pravatar.cc/150?img=10', nombre: 'Stanford Hub',     descripcion: 'Acceso preferencial a programas de investigación y talento de alto rendimiento en Silicon Valley.', tipo: 'Universidad' },
  { id: 3,  logo: 'https://i.pravatar.cc/150?img=20', nombre: 'Alpha Capital',    descripcion: 'Fondo de venture capital enfocado en etapas tempranas y capital semilla para fundadores latinos.',  tipo: 'Empresas' },
  { id: 4,  logo: 'https://i.pravatar.cc/150?img=30', nombre: 'Marc Andreessen',  descripcion: 'Socio estratégico para la optimización de procesos de venta B2B y crecimiento exponencial.',       tipo: 'Mentores' },
  { id: 5,  logo: 'https://i.pravatar.cc/150?img=40', nombre: 'Ethereum Labs',    descripcion: 'Laboratorio de innovación Web3 que provee infraestructura y soporte técnico a proyectos descentralizados.', tipo: 'Empresas' },
  { id: 6,  logo: 'https://i.pravatar.cc/150?img=50', nombre: 'Tec de Monterrey', descripcion: 'Alianza de emprendimiento para el desarrollo de talento tecnológico de clase mundial en Latam.',   tipo: 'Universidad' },
  { id: 7,  logo: 'https://i.pravatar.cc/150?img=60', nombre: 'Sequoia Latam',    descripcion: 'Fondo global con foco en startups latinoamericanas de alto impacto en Series A y B.',             tipo: 'Empresas' },
  { id: 8,  logo: 'https://i.pravatar.cc/150?img=15', nombre: 'UTEC Ventures',    descripcion: 'Programa de aceleración universitaria para startups deep tech en etapa pre-seed.',                  tipo: 'Universidad' },
]

export default function AliadosPage() {
  const [filtroActivo, setFiltroActivo] = useState('Todos')

  const aliadosFiltrados = filtroActivo === 'Todos'
    ? ALIADOS
    : ALIADOS.filter((a) => a.tipo === filtroActivo)

  return (
    <section className="aliados" id="aliados">
      <span className="aliados__badge">Red Estratégica</span>
      <h1 className="aliados__titulo">
        Quienes nos <span className="aliados__titulo-acento">respaldan</span>
      </h1>
      <p className="aliados__descripcion">
        Forjamos alianzas con los líderes de la industria, mentes académicas brillantes y capital visionario para potenciar el próximo unicornio.
      </p>

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
          />
        ))}
      </div>
    </section>
  )
}
