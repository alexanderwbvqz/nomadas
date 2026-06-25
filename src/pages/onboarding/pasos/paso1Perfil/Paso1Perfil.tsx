import { useRef, useState, useEffect } from 'react'
import { RefreshCw, Upload } from 'lucide-react'
import type { OnboardingData, Ocupacion } from '../../../../types/onboarding'
import type { CampoPaso1 } from '../../../../hooks/useOnboardingPaso1'
import BadgeSeleccionable from '../../../../components/ui/badgeSeleccionable/badgeSeleccionable'
import CampoInput from '../../../../components/ui/campoInput/campoInput'
import './Paso1Perfil.css'

const OCUPACIONES_FIJAS: Ocupacion[] = ['Estudiante', 'Profesional', 'Emprendedor', 'Freelancer', 'Otro']

function avatarUrl(seed: string) {
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(seed)}`
}

interface Props {
  data: OnboardingData
  onChange: <K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) => void
  errores?: Partial<Record<CampoPaso1, string>>
  tocados?: Partial<Record<CampoPaso1, boolean>>
  onBlur?: (campo: CampoPaso1, valor: string) => void
}

export default function Paso1Perfil({ data, onChange, errores = {}, tocados = {}, onBlur }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [avatarSeed, setAvatarSeed] = useState(() => Math.random().toString(36).slice(2))

  useEffect(() => {
    if (!data.foto) onChange('foto', avatarUrl(avatarSeed))
  }, [])
  const [mostrarOtro, setMostrarOtro] = useState(false)

  const usandoFotoPropia = data.foto.startsWith('data:')

  function onFoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => onChange('foto', ev.target?.result as string ?? '')
    reader.readAsDataURL(file)
  }

  function regenerar() {
    const seed = Math.random().toString(36).slice(2)
    setAvatarSeed(seed)
    onChange('foto', avatarUrl(seed))
  }

  function seleccionarOcupacion(o: Ocupacion) {
    if (o === 'Otro') {
      setMostrarOtro(true)
      onChange('ocupacion', '')
    } else {
      setMostrarOtro(false)
      onChange('ocupacion', o)
    }
  }

  return (
    <div>
      <h1 className="paso__titulo">Cuéntanos sobre ti</h1>
      <p className="paso__subtitulo">¿Cómo te gustaría que te conozcan?</p>

      <div className="paso1__campo">
        <CampoInput
          label="Nombre"
          placeholder="Walter Barreto"
          requerido
          value={data.nombre}
          onChange={(v) => onChange('nombre', v)}
          onBlur={() => onBlur?.('nombre', data.nombre)}
          error={tocados.nombre ? errores.nombre : undefined}
        />
      </div>

      <div className="paso1__campo">
        <CampoInput
          label="WhatsApp"
          placeholder="+51 999 999 999"
          tipo="tel"
          value={data.whatsapp}
          onChange={(v) => onChange('whatsapp', v)}
          onBlur={() => onBlur?.('whatsapp', data.whatsapp)}
          error={tocados.whatsapp ? errores.whatsapp : undefined}
        />
      </div>

      <div className="paso1__campo">
        <CampoInput
          label="Correo electrónico"
          placeholder="tu@correo.com"
          tipo="email"
          value={data.email}
          onChange={(v) => onChange('email', v)}
          onBlur={() => onBlur?.('email', data.email)}
          error={tocados.email ? errores.email : undefined}
        />
      </div>

      <div className="paso1__campo">
        <label className="paso1__label">¿A qué te dedicas actualmente? <span>*</span></label>
        <div className="paso__badges">
          {OCUPACIONES_FIJAS.map((o) => (
            <BadgeSeleccionable
              key={o}
              label={o}
              seleccionado={o === 'Otro' ? mostrarOtro : data.ocupacion === o}
              onClick={() => seleccionarOcupacion(o)}
            />
          ))}
        </div>
        {mostrarOtro && (
          <div className="paso1__otro-input">
            <CampoInput
              label=""
              placeholder="¿A qué te dedicas?"
              value={data.ocupacion}
              onChange={(v) => onChange('ocupacion', v)}
              onBlur={() => onBlur?.('ocupacion', data.ocupacion)}
              error={tocados.ocupacion ? errores.ocupacion : undefined}
            />
          </div>
        )}
        {tocados.ocupacion && errores.ocupacion && !mostrarOtro && (
          <span className="paso1__error">{errores.ocupacion}</span>
        )}
      </div>

      <div className="paso1__campo">
        <label className="paso1__label">Avatar</label>
        <div className="paso1__avatar-wrap">
          <img
            src={data.foto || avatarUrl(avatarSeed)}
            alt="avatar"
            className="paso1__avatar"
          />
          <div className="paso1__avatar-acciones">
            {!usandoFotoPropia && (
              <button className="paso1__foto-btn" onClick={regenerar}>
                <RefreshCw size={13} />
                Otro avatar
              </button>
            )}
            <button className="paso1__foto-btn" onClick={() => fileRef.current?.click()}>
              <Upload size={13} />
              {usandoFotoPropia ? 'Cambiar foto' : 'Subir mi foto'}
            </button>
            {usandoFotoPropia && (
              <button className="paso1__foto-btn paso1__foto-btn--ghost" onClick={() => onChange('foto', avatarUrl(avatarSeed))}>
                Usar avatar
              </button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="paso1__foto-input"
            onChange={onFoto}
          />
        </div>
      </div>
    </div>
  )
}
