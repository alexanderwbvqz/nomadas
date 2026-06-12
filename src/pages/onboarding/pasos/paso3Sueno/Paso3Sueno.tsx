import type { OnboardingData, TieneIdea } from '../../../../types/onboarding'
import BadgeSeleccionable from '../../../../components/ui/badgeSeleccionable/badgeSeleccionable'
import './Paso3Sueno.css'

const SUENOS = [
  'Una startup tecnológica', 'Una agencia', 'Un ecommerce',
  'Una empresa tradicional', 'Una empresa de impacto social', 'No lo tengo claro aún',
]

const TIENE_IDEA: TieneIdea[] = ['Sí', 'No', 'Tengo varias']

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
}

export default function Paso3Sueno({ data, onChange }: Props) {
  return (
    <div>
      <h1 className="paso__titulo">🚀 Tu sueño emprendedor</h1>
      <p className="paso__subtitulo">Cuéntanos adónde quieres llegar.</p>

      <div className="paso3__seccion">
        <p className="paso__pregunta">¿Qué te gustaría construir algún día?</p>
        <div className="paso__badges">
          {SUENOS.map((s) => (
            <BadgeSeleccionable
              key={s}
              label={s}
              seleccionado={data.sueno === s}
              onClick={() => onChange('sueno', s)}
            />
          ))}
        </div>
      </div>

      <div className="paso3__seccion">
        <p className="paso__pregunta">¿Ya tienes una idea de negocio?</p>
        <div className="paso__badges">
          {TIENE_IDEA.map((t) => (
            <BadgeSeleccionable
              key={t}
              label={t}
              seleccionado={data.tieneIdea === t}
              onClick={() => onChange('tieneIdea', t)}
            />
          ))}
        </div>

        {data.tieneIdea === 'Sí' && (
          <input
            className="paso3__input"
            placeholder="Cuéntanos tu idea en una frase..."
            value={data.ideaFrase}
            onChange={(e) => onChange('ideaFrase', e.target.value)}
          />
        )}
      </div>
    </div>
  )
}
