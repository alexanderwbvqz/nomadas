import type { OnboardingData } from '../../../../types/onboarding'
import './Paso7Tinder.css'

type CampoTinder = 'millonDolares' | 'problemaResolver' | 'fraseRepresenta' | 'admiraEmprendedor' | 'mayorAprendizaje'

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
}

const PREGUNTAS: { campo: CampoTinder; label: string; placeholder: string }[] = [
  { campo: 'millonDolares', label: 'Si tuvieras 1 millón de dólares, ¿qué construirías?', placeholder: 'Una plataforma que...' },
  { campo: 'problemaResolver', label: '¿Qué problema del mundo te gustaría resolver?', placeholder: 'El acceso a...' },
  { campo: 'fraseRepresenta', label: '¿Qué frase te representa?', placeholder: '"Primero hazlo, luego hazlo bien."' },
  { campo: 'admiraEmprendedor', label: '¿Qué admiras en una persona emprendedora?', placeholder: 'La capacidad de...' },
  { campo: 'mayorAprendizaje', label: '¿Cuál ha sido tu mayor aprendizaje en la vida?', placeholder: 'Que el fracaso...' },
]

export default function Paso7Tinder({ data, onChange }: Props) {
  return (
    <div>
      <h1 className="paso__titulo">🔥 Preguntas Tinder</h1>
      <p className="paso__subtitulo">Estas son las que generan conexión real.</p>

      {PREGUNTAS.map(({ campo, label, placeholder }) => (
        <div key={campo} className="paso7__campo">
          <label className="paso7__label">{label}</label>
          <input
            className="paso7__input"
            placeholder={placeholder}
            value={data[campo]}
            onChange={(e) => onChange(campo, e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}
