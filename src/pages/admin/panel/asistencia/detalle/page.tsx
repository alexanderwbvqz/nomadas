import { useMemo, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, QrCode, CheckSquare } from 'lucide-react'
import { useAsistencia } from '../../../../../hooks/useAsistencia'
import { useInscritos } from '../../../../../hooks/useInscritos'
import { buildEventoUrl } from '../../../../../utils/qr'
import type { Inscrito } from '../../../../../types/admin'
import BotonIcono from '../../../../../components/ui/botonIcono/botonIcono'
import ModalQR from '../../../../../components/ui/modalQR/modalQR'
import ModalVerInscripcion from '../../../../../components/ui/modalVerInscripcion/modalVerInscripcion'
import CampoInput from '../../../../../components/ui/campoInput/campoInput'
import TablaAsistencia from '../../../../../components/ui/tablaAsistencia/tablaAsistencia'
import '../page.css'

export default function AdminAsistenciaDetallePage() {
  const { eventoId = '' } = useParams<{ eventoId: string }>()
  const navigate = useNavigate()
  const { evento, asistencias, cargando, finalizar } = useAsistencia(eventoId)
  const { inscritos } = useInscritos()
  const [modalQR, setModalQR] = useState(false)
  const [modalInscrito, setModalInscrito] = useState<Inscrito | null>(null)
  const [filtroNombre, setFiltroNombre] = useState('')
  const [filtroWhatsapp, setFiltroWhatsapp] = useState('')

  const filtradas = useMemo(() => {
    let lista = [...asistencias]
    if (filtroNombre) lista = lista.filter((a) => a.nombre.toLowerCase().includes(filtroNombre.toLowerCase()))
    if (filtroWhatsapp) lista = lista.filter((a) => a.whatsapp.includes(filtroWhatsapp))
    return lista
  }, [asistencias, filtroNombre, filtroWhatsapp])

  if (cargando) {
    return <main className="admin-asistencia"><p className="admin-asistencia__cargando">Cargando...</p></main>
  }

  return (
    <main className="admin-asistencia">
      <div className="admin-asistencia__cabecera">
        <div className="admin-asistencia__selector-wrap">
          <button className="admin-asistencia__volver" onClick={() => navigate('/admin/panel/asistencia')}>
            <ArrowLeft size={16} /> Eventos
          </button>
          <div>
            <p className="admin-asistencia__evento-nombre-detalle">{evento?.nombre}</p>
            <p className="admin-asistencia__evento-fecha-detalle">
              {evento && new Date(evento.fecha + 'T00:00:00').toLocaleDateString('es-PE', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </p>
          </div>
          {evento && (
            <span className={`admin-asistencia__estado-badge admin-asistencia__estado-badge--${evento.estado}`}>
              {evento.estado === 'activo' ? 'Activo' : 'Finalizado'}
            </span>
          )}
        </div>

        <div className="admin-asistencia__acciones">
          <BotonIcono icono={<QrCode size={16} />} onClick={() => setModalQR(true)} />
          {evento?.estado === 'activo' && (
            <BotonIcono icono={<CheckSquare size={16} />} onClick={finalizar} />
          )}
        </div>
      </div>

      <div className="admin-asistencia__filtros">
        <CampoInput label="" placeholder="Buscar por nombre..." value={filtroNombre} onChange={setFiltroNombre} />
        <CampoInput label="" placeholder="Buscar por WhatsApp..." value={filtroWhatsapp} onChange={setFiltroWhatsapp} />
      </div>

      <TablaAsistencia
        asistencias={filtradas}
        onVerPerfil={(perfilId) => setModalInscrito(inscritos.find((i) => i.id === perfilId) ?? null)}
      />

      {modalQR && evento && (
        <ModalQR
          nombre={evento.nombre}
          url={buildEventoUrl(evento.id)}
          onCerrar={() => setModalQR(false)}
        />
      )}

      {modalInscrito && (
        <ModalVerInscripcion inscrito={modalInscrito} onCerrar={() => setModalInscrito(null)} />
      )}
    </main>
  )
}
