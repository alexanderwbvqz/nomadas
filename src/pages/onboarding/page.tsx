import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import type { OnboardingData, ResultadoPerfil } from '../../types/onboarding'
import { analizarPerfil } from '../../api/perfiles'
import { enviarCorreoRegistro } from '../../api/correos'
import { useOnboardingPaso1 } from '../../hooks/useOnboardingPaso1'

import { useOnboardingPaso6 } from '../../hooks/useOnboardingPaso6'
import Paso1Perfil from './pasos/paso1Perfil/Paso1Perfil'
import Paso2Pasiones from './pasos/paso2Pasiones/Paso2Pasiones'
import Paso3Sueno from './pasos/paso3Sueno/Paso3Sueno'
import Paso4Superpoderes from './pasos/paso4Superpoderes/Paso4Superpoderes'
import Paso5SocioIdeal from './pasos/paso6SocioIdeal/Paso6SocioIdeal'
import Paso6Tinder from './pasos/paso7Tinder/Paso7Tinder'
import TarjetaResultado from '../../components/ui/tarjetaResultado/tarjetaResultado'
import ModalConfirmacion from '../../components/ui/modalConfirmacion/modalConfirmacion'
import BotonNav from '../../components/ui/botonNav/botonNav'
import './page.css'

const TOTAL_PASOS = 6

const DATA_INICIAL: OnboardingData = {
  nombre: '', ocupacion: '', ocupacionCategoria: '', foto: '', whatsapp: '', email: '', redes: [],
  pasiones: [],
  sueno: '', tieneIdea: '', ideaFrase: '', ideasFrases: [], tieneEmprendimiento: '', detalleEmprendimiento: '',
  superpoderes: [],
  perfilesBuscados: [], valoresImportantes: [], disponibilidad: '',
  millonDolares: '', problemaResolver: '', fraseRepresenta: '',
  admiraEmprendedor: '', mayorAprendizaje: '',
}

function esValido(paso: number, data: OnboardingData): boolean {
  switch (paso) {
    case 1: return data.nombre.trim() !== '' && data.ocupacion !== ''
    case 2: return data.pasiones.length >= 1
    case 3: {
      if (data.sueno === '' || data.tieneIdea === '') return false
      if (data.tieneIdea === 'Sí') return data.ideaFrase.trim() !== ''
      if (data.tieneIdea === 'Tengo varias') {
        const ideas = data.ideasFrases.length > 0 ? data.ideasFrases : ['']
        return ideas.every((idea) => idea.trim() !== '')
      }
      return true
    }
    case 4: return data.superpoderes.length >= 1
    case 5: return data.perfilesBuscados.length >= 1 && data.valoresImportantes.length === 3 && data.disponibilidad !== ''
    case 6: return (
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
  useEffect(() => { document.title = 'Nómadas: Regístrate' }, [])
  const [paso, setPaso] = useState(1)
  const [data, setData] = useState<OnboardingData>(DATA_INICIAL)
  const [resultado, setResultado] = useState<ResultadoPerfil | null>(null)
  const [guardando, setGuardando] = useState(false)
  const [mostrarBienvenida, setMostrarBienvenida] = useState(false)
  const navigate = useNavigate()
  const paso1 = useOnboardingPaso1()
  const paso6 = useOnboardingPaso6()


  function onChange<K extends keyof OnboardingData>(campo: K, valor: OnboardingData[K]) {
    setData((prev) => ({ ...prev, [campo]: valor }))
  }

  async function siguiente() {
    if (paso === 1) {
      const valido = paso1.validarTodo({ nombre: data.nombre, email: data.email, whatsapp: data.whatsapp, ocupacion: data.ocupacion })
      if (!valido) return
    }
    if (paso === 6) {
      const valido = paso6.validarTodo({ millonDolares: data.millonDolares, problemaResolver: data.problemaResolver, fraseRepresenta: data.fraseRepresenta, admiraEmprendedor: data.admiraEmprendedor, mayorAprendizaje: data.mayorAprendizaje })
      if (!valido) return
    }
    if (paso < TOTAL_PASOS) {
      setPaso((p) => p + 1)
      return
    }

    setGuardando(true)

    const perfil = await analizarPerfil(data)

    if (!perfil) {
      setGuardando(false)
      return
    }

    enviarCorreoRegistro(data.nombre, data.email)

    setGuardando(false)
    setResultado(perfil)
  }

  function atras() {
    if (paso > 1) setPaso((p) => p - 1)
  }

  const porcentaje = Math.round((paso / TOTAL_PASOS) * 100)

  const pasos = [
    <Paso1Perfil key={1} data={data} onChange={onChange} errores={paso1.errores} tocados={paso1.tocados} onBlur={paso1.handleBlur} />,
    <Paso2Pasiones key={2} data={data} onChange={onChange} />,
    <Paso3Sueno key={3} data={data} onChange={onChange} />,
    <Paso4Superpoderes key={4} data={data} onChange={onChange} />,
    <Paso5SocioIdeal key={5} data={data} onChange={onChange} />,
    <Paso6Tinder key={6} data={data} onChange={onChange} errores={paso6.errores} tocados={paso6.tocados} onBlur={paso6.handleBlur} />,
  ]

  return (
    <div className="onboarding">
      <div className="onboarding__inner">
        <div className="onboarding__header">
          <Link to="/" className="onboarding__logo">NÓMADAS</Link>

          <div className="onboarding__progreso">
            <div className="onboarding__progreso-meta">
              <span className="onboarding__progreso-paso">Paso {paso} de {TOTAL_PASOS}</span>
              <span className="onboarding__progreso-pct">{porcentaje}%</span>
            </div>
            <div className="onboarding__progreso-segmentos">
              {Array.from({ length: TOTAL_PASOS }, (_, i) => {
                const num = i + 1
                let cls = 'onboarding__progreso-seg'
                if (num < paso) cls += ' onboarding__progreso-seg--activo'
                else if (num === paso) cls += ' onboarding__progreso-seg--actual'
                return <div key={num} className={cls} />
              })}
            </div>
          </div>
        </div>

        <div className="onboarding__content">
          <div className="onboarding__paso-wrap" key={paso}>
            {pasos[paso - 1]}
          </div>
        </div>

        <div className="onboarding__nav">
          {paso > 1 && (
            <BotonNav
              label="Atrás"
              variante="secundario"
              icono={<ArrowLeft size={16} />}
              iconoPosicion="izquierda"
              onClick={atras}
            />
          )}
          <BotonNav
            label={guardando ? 'Guardando...' : paso === TOTAL_PASOS ? 'Finalizar' : 'Siguiente'}
            variante="primario"
            icono={paso === TOTAL_PASOS ? <Sparkles size={16} /> : <ArrowRight size={16} />}
            iconoPosicion="derecha"
            disabled={(paso !== 1 && paso !== 6 && !esValido(paso, data)) || guardando}
            onClick={siguiente}
          />
        </div>
      </div>

      {guardando && (
        <div className="onboarding__loading">
          <div className="onboarding__spinner" />
          <p className="onboarding__loading-texto">Analizando tu perfil...</p>
        </div>
      )}

      {resultado && !mostrarBienvenida && (
        <TarjetaResultado
          resultado={resultado}
          nombre={data.nombre}
          foto={data.foto}
          superpoderes={data.superpoderes}
          fraseRepresenta={data.fraseRepresenta}
          onEntrar={() => setMostrarBienvenida(true)}
        />
      )}

      {mostrarBienvenida && (
        <ModalConfirmacion
          titulo="¡Todo listo!"
          mensaje="Hemos recibido tu registro y ahora iniciaremos el proceso de revisión. En un plazo máximo de 24 horas validaremos la información enviada. Una vez aprobada, tu perfil estará disponible en la sección Nómadas, donde otros cofundadores podrán conocerte y conectar contigo para formar la próxima gran startup. Te enviamos un correo de confirmación a tu email."
          onAceptar={() => navigate('/')}
        />
      )}
    </div>
  )
}
