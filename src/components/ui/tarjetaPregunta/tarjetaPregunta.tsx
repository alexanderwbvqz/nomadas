import { Trash2 } from 'lucide-react'
import CampoInput from '../campoInput/campoInput'
import BotonIcono from '../botonIcono/botonIcono'
import SelectorPeso from '../selectorPeso/selectorPeso'
import type { TarjetaPreguntaProps } from './tarjetaPregunta.types'
import type { PesoOpcion, OpcionForm } from '../../../types/dinamicas'
import './tarjetaPregunta.css'

export default function TarjetaPregunta({ index, pregunta, onChange, onEliminar }: TarjetaPreguntaProps) {
  function actualizarTexto(texto: string) {
    onChange({ ...pregunta, texto })
  }

  function actualizarOpcion(i: number, campo: keyof OpcionForm, valor: string | PesoOpcion) {
    const opciones = pregunta.opciones.map((o, idx) =>
      idx === i ? { ...o, [campo]: valor } : o
    )
    onChange({ ...pregunta, opciones })
  }

  return (
    <div className="tarjeta-pregunta">
      <div className="tarjeta-pregunta__header">
        <span className="tarjeta-pregunta__numero">Pregunta {index + 1}</span>
        <BotonIcono
          icono={<Trash2 size={14} />}
          variante="peligro"
          onClick={(e) => { e.stopPropagation(); onEliminar() }}
        />
      </div>

      <CampoInput
        label="Texto de la pregunta"
        placeholder="¿Cuál es tu mayor fortaleza como líder?"
        value={pregunta.texto}
        onChange={actualizarTexto}
        requerido
      />

      <div className="tarjeta-pregunta__opciones">
        {pregunta.opciones.map((opcion, i) => (
          <div key={i} className="tarjeta-pregunta__opcion">
            <div className={`tarjeta-pregunta__opcion-barra tarjeta-pregunta__opcion-barra--${i}`} />
            <div className="tarjeta-pregunta__opcion-campos">
              <CampoInput
                label={`Opción ${String.fromCharCode(65 + i)}`}
                placeholder="Escribe la opción..."
                value={opcion.texto}
                onChange={(v) => actualizarOpcion(i, 'texto', v)}
                requerido
              />
              <SelectorPeso
                valor={opcion.peso}
                onChange={(p) => actualizarOpcion(i, 'peso', p)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
