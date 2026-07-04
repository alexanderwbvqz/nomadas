import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useEventos } from '../../../../hooks/useEventos'
import { buildEventoUrl } from '../../../../utils/qr'
import BotonAgregar from '../../../../components/ui/botonAgregar/botonAgregar'
import TarjetaEvento from '../../../../components/ui/tarjetaEvento/tarjetaEvento'
import ModalCrearEvento from '../../../../components/ui/modalCrearEvento/modalCrearEvento'
import ModalQR from '../../../../components/ui/modalQR/modalQR'
import ModalEliminarEvento from '../../../../components/ui/modalEliminarEvento/modalEliminarEvento'
import type { Evento } from '../../../../types/asistencia'
import './page.css'

export default function AdminAsistenciaPage() {
  const navigate = useNavigate()
  const { eventos, conteos, cargando, crear, eliminar } = useEventos()
  const [modalCrear, setModalCrear] = useState(false)
  const [modalQR, setModalQR] = useState<Evento | null>(null)
  const [eventoNuevo, setEventoNuevo] = useState<Evento | null>(null)
  const [modalEliminar, setModalEliminar] = useState<Evento | null>(null)

  async function handleCrear(nombre: string, fecha: string) {
    const nuevo = await crear(nombre, fecha)
    setModalCrear(false)
    if (nuevo) { setEventoNuevo(nuevo); setModalQR(nuevo) }
  }

  function handleCerrarQR() {
    if (eventoNuevo) {
      navigate(`/admin/panel/asistencia/${eventoNuevo.id}`)
    } else {
      setModalQR(null)
    }
  }

  if (cargando) {
    return <main className="admin-asistencia"><p className="admin-asistencia__cargando">Cargando...</p></main>
  }

  return (
    <main className="admin-asistencia">
      <div className="admin-asistencia__cabecera">
        <h2 className="admin-asistencia__titulo">Eventos</h2>
        <BotonAgregar label="Nuevo evento" onClick={() => setModalCrear(true)} />
      </div>

      {eventos.length === 0 ? (
        <p className="admin-asistencia__sin-eventos">No hay eventos aún. Crea el primero.</p>
      ) : (
        <div className="admin-asistencia__lista">
          {eventos.map((ev) => (
            <TarjetaEvento
              key={ev.id}
              evento={ev}
              conteoAsistentes={conteos[ev.id] ?? 0}
              onClick={() => navigate(`/admin/panel/asistencia/${ev.id}`)}
              onVerQR={() => setModalQR(ev)}
              onEliminar={() => setModalEliminar(ev)}
            />
          ))}
        </div>
      )}

      {modalCrear && (
        <ModalCrearEvento onCerrar={() => setModalCrear(false)} onGuardar={handleCrear} />
      )}

      {modalQR && (
        <ModalQR
          nombre={modalQR.nombre}
          url={buildEventoUrl(modalQR.id)}
          onCerrar={handleCerrarQR}
        />
      )}

      {modalEliminar && (
        <ModalEliminarEvento
          nombre={modalEliminar.nombre}
          onCerrar={() => setModalEliminar(null)}
          onConfirmar={async () => { await eliminar(modalEliminar.id); setModalEliminar(null) }}
        />
      )}
    </main>
  )
}
