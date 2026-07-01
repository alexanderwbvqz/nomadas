import type { OnboardingData, TieneIdea } from '../../../../types/onboarding'
import BadgeSeleccionable from '../../../../components/ui/badgeSeleccionable/badgeSeleccionable'
import CampoInput from '../../../../components/ui/campoInput/campoInput'
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
  const ideas = data.ideasFrases.length > 0 ? data.ideasFrases : ['']

  function handleIdea(index: number, valor: string) {
    const nuevas = [...ideas]
    nuevas[index] = valor
    onChange('ideasFrases', nuevas)
  }

  function agregarIdea() {
    onChange('ideasFrases', [...ideas, ''])
  }

  return (
    <div>
      <h1 className="paso__titulo">Tu sueño emprendedor</h1>
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
          <CampoInput
            label=""
            placeholder="Cuéntanos tu idea en una frase..."
            value={data.ideaFrase}
            onChange={(v) => onChange('ideaFrase', v)}
          />
        )}

        {data.tieneIdea === 'Tengo varias' && (
          <div className="paso3__ideas">
            {ideas.map((idea, i) => (
              <CampoInput
                key={i}
                label={`Idea ${i + 1}`}
                placeholder="Cuéntanos tu idea en una frase..."
                value={idea}
                onChange={(v) => handleIdea(i, v)}
              />
            ))}
            <BadgeSeleccionable
              label="+ Agregar idea"
              seleccionado={true}
              onClick={agregarIdea}
            />
          </div>
        )}
      </div>
    </div>
  )
}
