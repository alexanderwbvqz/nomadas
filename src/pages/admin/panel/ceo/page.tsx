import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSesionesCeo } from '../../../../hooks/useSesionesCeo'
import { useEventos } from '../../../../hooks/useEventos'
import { useDinamicas } from '../../../../hooks/useDinamicas'
import { buildPantallaCeoUrl, buildJugadorCeoUrl } from '../../../../utils/qr'
import BotonAgregar from '../../../../components/ui/botonAgregar/botonAgregar'
import TarjetaSesionCeo from '../../../../components/ui/tarjetaSesionCeo/tarjetaSesionCeo'
import ModalCrearSesionCeo from '../../../../components/ui/modalCrearSesionCeo/modalCrearSesionCeo'
import ModalEliminarDinamica from '../../../../components/ui/modalEliminarDinamica/modalEliminarDinamica'
import type { SesionCeo } from '../../../../types/sesionCeo'
import './page.css'

export default function AdminCeoPage() {
  const navigate = useNavigate()
  const { sesiones, cargando, crear, eliminar, enviarCorreos, enviando } = useSesionesCeo()
  const { eventos } = useEventos()
  const { dinamicas } = useDinamicas()
  const [modalCrear, setModalCrear] = useState(false)
  const [modalEliminar, setModalEliminar] = useState<SesionCeo | null>(null)

  async function handleCrear(dinamicaId: string, eventoId: string) {
    const nueva = await crear(dinamicaId, eventoId)
    setModalCrear(false)
    if (nueva) {
      window.open(buildPantallaCeoUrl(nueva.id), '_blank')
    }
  }

  if (cargando) {
    return <main className="admin-ceo"><p className="admin-ceo__cargando">Cargando...</p></main>
  }

  return (
    <main className="admin-ceo">
      <div className="admin-ceo__cabecera">
        <span />
        <BotonAgregar label="Nueva sesión" onClick={() => setModalCrear(true)} />
      </div>

      {sesiones.length === 0 ? (
        <p className="admin-ceo__vacia">No hay sesiones aún. Crea la primera.</p>
      ) : (
        <div className="admin-ceo__lista">
          {sesiones.map((s) => (
            <TarjetaSesionCeo
              key={s.id}
              sesion={s}
              jugadorUrl={buildJugadorCeoUrl(s.id)}
              enviando={enviando === s.id}
              onAbrir={() => window.open(buildPantallaCeoUrl(s.id), '_blank')}
              onEliminar={() => setModalEliminar(s)}
              onEnviarCorreos={() => enviarCorreos(s)}
              onVerResultados={() => navigate(`/admin/panel/ceo/${s.id}`)}
            />
          ))}
        </div>
      )}

      {modalCrear && dinamicas.length > 0 && eventos.length > 0 && (
        <ModalCrearSesionCeo
          dinamicas={dinamicas}
          eventos={eventos}
          onCerrar={() => setModalCrear(false)}
          onGuardar={handleCrear}
        />
      )}

      {modalEliminar && (
        <ModalEliminarDinamica
          nombre={modalEliminar.dinamicaNombre ?? 'esta sesión'}
          onCerrar={() => setModalEliminar(null)}
          onConfirmar={async () => { await eliminar(modalEliminar.id); setModalEliminar(null) }}
        />
      )}
    </main>
  )
}
