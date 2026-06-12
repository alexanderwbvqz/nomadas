import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { OnboardingData, ResultadoPerfil } from '../../types/onboarding'
import { calcularPerfil } from './scoring'
import Paso1Perfil from './pasos/paso1Perfil/Paso1Perfil'
import Paso2Pasiones from './pasos/paso2Pasiones/Paso2Pasiones'
import Paso3Sueno from './pasos/paso3Sueno/Paso3Sueno'
import Paso4Superpoderes from './pasos/paso4Superpoderes/Paso4Superpoderes'
import Paso5ComoTrabaja from './pasos/paso5ComoTrabaja/Paso5ComoTrabaja'
import Paso6SocioIdeal from './pasos/paso6SocioIdeal/Paso6SocioIdeal'
import Paso7Tinder from './pasos/paso7Tinder/Paso7Tinder'
import TarjetaResultado from '../../components/ui/tarjetaResultado/tarjetaResultado'
import './page.css'

const TOTAL_PASOS = 7

const DATA_INICIAL: OnboardingData = {
  nombre: '', ocupacion: '', foto: '', descripcion: '',
  pasiones: [],
  sueno: '', tieneIdea: '', ideaFrase: '',
  superpoderes: [],
  reaccionProblema: '', rolEnProyecto: '',
  perfilesBuscados: [], valoresImportantes: [], disponibilidad: '',
  millonDolares: '', problemaResolver: '', fraseRepresenta: '',
  admiraEmprendedor: '', mayorAprendizaje: '',
}

function esValido(paso: number, data: OnboardingData): boolean {
  switch (paso) {
    case 1: return data.nombre.trim() !== '' && data.ocupacion !== ''
    case 2: return data.pasiones.length >= 1
    case 3: return data.sueno !== '' && data.tieneIdea !== ''
    case 4: return data.superpoderes.length >= 1
    case 5: return data.reaccionProblema !== '' && data.rolEnProyecto !== ''
    case 6: return data.perfilesBuscados.length >= 1 && data.valoresImportantes.length === 3 && data.disponibilidad !== ''
    case 7: return (
      data.millonDolares.trim() !== '' &&
      data.problemaResolver.trim() !== '' &&
      data.fraseRepresenta.trim() !== '' &&
      data.admiraEmprendedor.trim() !== '' &&
      data.mayorAprendizaje.trim() !== ''
    )
    default: return false
  }
}

export default function OnboardingPage() {
  const [paso, setPaso] = useState(1)
  const [data, setData] = useState<OnboardingData>(DATA_INICIAL)
  const [resultado, setResultado] = useState<ResultadoPerfil | null>(null)
  const navigate = useNavigate()

  function onChange<K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) {
    setData((prev) => ({ ...prev, [campo]: valor }))
  }

  function siguiente() {
    if (paso < TOTAL_PASOS) {
      setPaso((p) => p + 1)
    } else {
      setResultado(calcularPerfil(data))
    }
  }

  function atras() {
    if (paso > 1) setPaso((p) => p - 1)
  }

  const pasos = [
    <Paso1Perfil key={1} data={data} onChange={onChange} />,
    <Paso2Pasiones key={2} data={data} onChange={onChange} />,
    <Paso3Sueno key={3} data={data} onChange={onChange} />,
    <Paso4Superpoderes key={4} data={data} onChange={onChange} />,
    <Paso5ComoTrabaja key={5} data={data} onChange={onChange} />,
    <Paso6SocioIdeal key={6} data={data} onChange={onChange} />,
    <Paso7Tinder key={7} data={data} onChange={onChange} />,
  ]

  return (
    <div className="onboarding">
      <div className="onboarding__header">
        <Link to="/" className="onboarding__logo">NÓMADAS</Link>
        <div className="onboarding__progreso-meta">
          <span className="onboarding__progreso-texto">Paso {paso} de {TOTAL_PASOS}</span>
        </div>
        <div className="onboarding__progreso-barra-wrap">
          <div
            className="onboarding__progreso-barra"
            style={{ width: `${(paso / TOTAL_PASOS) * 100}%` }}
          />
        </div>
      </div>

      <div className="onboarding__content">
        <div className="onboarding__paso-wrap" key={paso}>
          {pasos[paso - 1]}
        </div>
      </div>

      <div className="onboarding__nav">
        {paso > 1 && (
          <button className="onboarding__btn-atras" onClick={atras}>
            Atrás
          </button>
        )}
        <button
          className="onboarding__btn-siguiente"
          onClick={siguiente}
          disabled={!esValido(paso, data)}
        >
          {paso === TOTAL_PASOS ? 'Ver mi perfil' : 'Siguiente'}
        </button>
      </div>

      {resultado && (
        <TarjetaResultado
          resultado={resultado}
          nombre={data.nombre}
          foto={data.foto}
          superpoderes={data.superpoderes}
          fraseRepresenta={data.fraseRepresenta}
          onEntrar={() => navigate('/dashboard')}
        />
      )}
    </div>
  )
}
