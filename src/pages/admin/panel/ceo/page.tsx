import { useState } from 'react'
import { useSesionesCeo } from '../../../../hooks/useSesionesCeo'
import { useEventos } from '../../../../hooks/useEventos'
import { useDinamicas } from '../../../../hooks/useDinamicas'
import { enviarCorreosSesion } from '../../../../api/sesionCeo'
import { buildPantallaCeoUrl, buildJugadorCeoUrl } from '../../../../utils/qr'
import BotonAgregar from '../../../../components/ui/botonAgregar/botonAgregar'
import TarjetaSesionCeo from '../../../../components/ui/tarjetaSesionCeo/tarjetaSesionCeo'
import ModalCrearSesionCeo from '../../../../components/ui/modalCrearSesionCeo/modalCrearSesionCeo'
import ModalEliminarDinamica from '../../../../components/ui/modalEliminarDinamica/modalEliminarDinamica'
import type { SesionCeo } from '../../../../types/sesionCeo'
import './page.css'

export default function AdminCeoPage() {
  const { sesiones, cargando, crear, eliminar } = useSesionesCeo()
  const { eventos } = useEventos()
  const { dinamicas } = useDinamicas()
  const [modalCrear, setModalCrear] = useState(false)
  const [modalEliminar, setModalEliminar] = useState<SesionCeo | null>(null)
  const [enviando, setEnviando] = useState<string | null>(null)

  async function handleCrear(dinamicaId: string, eventoId: string) {
    const nueva = await crear(dinamicaId, eventoId)
    setModalCrear(false)
    if (nueva) {
      window.open(buildPantallaCeoUrl(nueva.id), '_blank')
    }
  }

  async function handleEnviarCorreos(sesion: SesionCeo) {
    setEnviando(sesion.id)
    await enviarCorreosSesion(sesion.id, sesion.eventoId, buildJugadorCeoUrl(sesion.id))
    setEnviando(null)
  }

  if (cargando) {
    return <main className="admin-ceo"><p className="admin-ceo__cargando">Cargando...</p></main>
  }

  return (
    <main className="admin-ceo">
      <div className="admin-ceo__cabecera">
        <div>
          <h2 className="admin-ceo__titulo">CEO</h2>
          <p className="admin-ceo__subtitulo">Gestiona las sesiones del juego para encontrar al CEO</p>
        </div>
        <BotonAgregar label="Nueva sesión" onClick={() => setModalCrear(true)} />
      </div>

      {sesiones.length === 0 ? (
        <p className="admin-ceo__vacia">No hay sesiones aún. Crea la primera.</p>
      ) : (
        <div className="admin-ceo__lista">
          {sesiones.map((s) => (
            <div key={s.id} className="admin-ceo__fila">
              <TarjetaSesionCeo
                sesion={s}
                onAbrir={() => window.open(buildPantallaCeoUrl(s.id), '_blank')}
                onEliminar={() => setModalEliminar(s)}
              />
              <div className="admin-ceo__enlaces">
                <a
                  href={buildJugadorCeoUrl(s.id)}
                  target="_blank"
                  rel="noreferrer"
                  className="admin-ceo__enlace"
                >
                  Enlace jugadores
                </a>
                <button
                  className="admin-ceo__btn-correo"
                  onClick={() => handleEnviarCorreos(s)}
                  disabled={enviando === s.id}
                >
                  {enviando === s.id ? 'Enviando...' : 'Enviar correos'}
                </button>
              </div>
            </div>
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
