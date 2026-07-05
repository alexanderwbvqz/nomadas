import { useState } from 'react'
import { useDinamicas } from '../../../../hooks/useDinamicas'
import BotonAgregar from '../../../../components/ui/botonAgregar/botonAgregar'
import TarjetaDinamica from '../../../../components/ui/tarjetaDinamica/tarjetaDinamica'
import ModalDinamica from '../../../../components/ui/modalDinamica/modalDinamica'
import ModalEliminarDinamica from '../../../../components/ui/modalEliminarDinamica/modalEliminarDinamica'
import type { Dinamica, DinamicaForm } from '../../../../types/dinamicas'
import './page.css'

export default function AdminDinamicasPage() {
  const { dinamicas, cargando, crear, actualizar, eliminar } = useDinamicas()
  const [modalCrear, setModalCrear] = useState(false)
  const [modalEditar, setModalEditar] = useState<Dinamica | null>(null)
  const [modalEliminar, setModalEliminar] = useState<Dinamica | null>(null)

  async function handleGuardar(form: DinamicaForm) {
    if (modalEditar) {
      await actualizar(modalEditar.id, form)
      setModalEditar(null)
    } else {
      await crear(form)
      setModalCrear(false)
    }
  }

  if (cargando) {
    return <main className="admin-dinamicas"><p className="admin-dinamicas__cargando">Cargando...</p></main>
  }

  return (
    <main className="admin-dinamicas">
      <div className="admin-dinamicas__cabecera">
        <h2 className="admin-dinamicas__titulo">Dinámicas</h2>
        <BotonAgregar label="Nueva dinámica" onClick={() => setModalCrear(true)} />
      </div>

      {dinamicas.length === 0 ? (
        <p className="admin-dinamicas__vacia">No hay dinámicas aún. Crea la primera.</p>
      ) : (
        <div className="admin-dinamicas__lista">
          {dinamicas.map((d) => (
            <TarjetaDinamica
              key={d.id}
              dinamica={d}
              onEditar={() => setModalEditar(d)}
              onEliminar={() => setModalEliminar(d)}
            />
          ))}
        </div>
      )}

      {(modalCrear || modalEditar) && (
        <ModalDinamica
          dinamica={modalEditar ?? undefined}
          onCerrar={() => { setModalCrear(false); setModalEditar(null) }}
          onGuardar={handleGuardar}
        />
      )}

      {modalEliminar && (
        <ModalEliminarDinamica
          nombre={modalEliminar.nombre}
          onCerrar={() => setModalEliminar(null)}
          onConfirmar={async () => { await eliminar(modalEliminar.id); setModalEliminar(null) }}
        />
      )}
    </main>
  )
}
