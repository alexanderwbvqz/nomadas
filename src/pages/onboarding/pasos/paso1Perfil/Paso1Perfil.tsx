import { useRef } from 'react'
import type { OnboardingData, Ocupacion } from '../../../../types/onboarding'
import BadgeSeleccionable from '../../../../components/ui/badgeSeleccionable/badgeSeleccionable'
import './Paso1Perfil.css'

const OCUPACIONES: Ocupacion[] = ['Estudiante', 'Profesional', 'Emprendedor', 'Freelancer', 'Otro']

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
}

export default function Paso1Perfil({ data, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)

  function onFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange('foto', ev.target?.result as string ?? '')
    reader.readAsDataURL(file)
  }

  return (
    <div>
      <h1 className="paso__titulo">👋 Cuéntanos sobre ti</h1>
      <p className="paso__subtitulo">¿Cómo te gustaría que te conozcan?</p>

      <div className="paso1__campo">
        <label className="paso1__label">Nombre <span>*</span></label>
        <input
          className="paso1__input"
          placeholder="Oscar Martínez"
          value={data.nombre}
          onChange={(e) => onChange('nombre', e.target.value)}
        />
      </div>

      <div className="paso1__campo">
        <label className="paso1__label">¿A qué te dedicas actualmente? <span>*</span></label>
        <div className="paso__badges">
          {OCUPACIONES.map((o) => (
            <BadgeSeleccionable
              key={o}
              label={o}
              seleccionado={data.ocupacion === o}
              onClick={() => onChange('ocupacion', o)}
            />
          ))}
        </div>
      </div>

      <div className="paso1__campo">
        <label className="paso1__label">Foto de perfil</label>
        <div className="paso1__foto-wrap">
          {data.foto ? (
            <img src={data.foto} alt="perfil" className="paso1__foto-preview" />
          ) : (
            <div className="paso1__foto-placeholder">📷</div>
          )}
          <button className="paso1__foto-btn" onClick={() => fileRef.current?.click()}>
            {data.foto ? 'Cambiar foto' : 'Subir foto'}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="paso1__foto-input"
            onChange={onFoto}
          />
        </div>
      </div>

      <div className="paso1__campo">
        <label className="paso1__label">Descríbete en una frase</label>
        <input
          className="paso1__input"
          placeholder='"Apasionado por la tecnología."'
          value={data.descripcion}
          onChange={(e) => onChange('descripcion', e.target.value)}
        />
      </div>
    </div>
  )
}
