import type { OnboardingData } from '../../../../types/onboarding'
import type { CampoPaso6 } from '../../../../hooks/useOnboardingPaso6'
import CampoInput from '../../../../components/ui/campoInput/campoInput'
import './Paso7Tinder.css'

const PREGUNTAS: { campo: CampoPaso6; label: string; placeholder: string }[] = [
  { campo: 'millonDolares',    label: 'Si tuvieras 1 millón de dólares, ¿qué construirías?', placeholder: 'Una plataforma que...' },
  { campo: 'problemaResolver', label: '¿Qué problema del mundo te gustaría resolver?',        placeholder: 'El acceso a...' },
  { campo: 'fraseRepresenta',  label: '¿Qué frase te representa?',                             placeholder: '"Primero hazlo, luego hazlo bien."' },
  { campo: 'admiraEmprendedor',label: '¿Qué admiras en una persona emprendedora?',             placeholder: 'La capacidad de...' },
  { campo: 'mayorAprendizaje', label: '¿Cuál ha sido tu mayor aprendizaje en la vida?',        placeholder: 'Que el fracaso...' },
]

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
  errores?: Partial<Record<CampoPaso6, string>>
  tocados?: Partial<Record<CampoPaso6, boolean>>
  onBlur?: (campo: CampoPaso6, valor: string) => void
}

export default function Paso7Tinder({ data, onChange, errores = {}, tocados = {}, onBlur }: Props) {
  return (
    <div>
      <h1 className="paso__titulo">Preguntas Tinder</h1>
      <p className="paso__subtitulo">Estas son las que generan conexión real.</p>

      {PREGUNTAS.map(({ campo, label, placeholder }) => (
        <div key={campo} className="paso7__campo">
          <CampoInput
            label={label}
            requerido
            placeholder={placeholder}
            value={data[campo]}
            onChange={(v) => onChange(campo, v)}
            onBlur={() => onBlur?.(campo, data[campo])}
            error={tocados[campo] ? errores[campo] : undefined}
          />
        </div>
      ))}
    </div>
  )
}
