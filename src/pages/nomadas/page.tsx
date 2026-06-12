import { FilterOutlined } from '@ant-design/icons'
import TarjetaCofundador from '../../components/ui/tarjetaCofundador/tarjetaCofundador'
import AppButton from '../../components/ui/boton/boton'
import './page.css'

const COFUNDADORES = [
  { id: 1,  foto: 'https://i.pravatar.cc/150?img=1',  nombre: 'Alejandro V.', rol: 'AI Enthusiast & Product Strategist',    habilidades: ['Python', 'UX Strategy', 'LLMs'],       frase: 'Mi sueño: Democratizar el acceso a la educación avanzada mediante agentes de IA personalizados.' },
  { id: 2,  foto: 'https://i.pravatar.cc/150?img=5',  nombre: 'María G.',     rol: 'Full Stack Developer & Entrepreneur',    habilidades: ['React', 'Node.js', 'Startups'],         frase: 'Creo que la tecnología bien aplicada puede cambiar la vida de millones de personas.' },
  { id: 3,  foto: 'https://i.pravatar.cc/150?img=3',  nombre: 'Carlos M.',    rol: 'Growth Hacker & Marketing Lead',         habilidades: ['SEO', 'Paid Ads', 'Branding'],          frase: 'Busco un co-fundador técnico para construir el próximo unicornio del agro en Latinoamérica.' },
  { id: 4,  foto: 'https://i.pravatar.cc/150?img=10', nombre: 'Lucía R.',     rol: 'UX Designer & Design Thinker',           habilidades: ['Figma', 'Research', 'Prototyping'],     frase: 'Diseñar no es solo hacer cosas bonitas, es resolver problemas reales para personas reales.' },
  { id: 5,  foto: 'https://i.pravatar.cc/150?img=12', nombre: 'Diego F.',     rol: 'Backend Engineer & Cloud Architect',     habilidades: ['AWS', 'Go', 'Microservicios'],          frase: 'Quiero construir infraestructura que escale a millones de usuarios desde el día uno.' },
  { id: 6,  foto: 'https://i.pravatar.cc/150?img=20', nombre: 'Sofía P.',     rol: 'Fintech Founder & Financial Analyst',    habilidades: ['Fintech', 'Excel', 'Regulación'],      frase: 'La inclusión financiera es el reto más importante de nuestra generación en LATAM.' },
  { id: 7,  foto: 'https://i.pravatar.cc/150?img=15', nombre: 'Andrés T.',    rol: 'Mobile Developer & UI Engineer',         habilidades: ['Flutter', 'Swift', 'Firebase'],         frase: 'Las mejores apps son las que el usuario ni siente que está usando una app.' },
  { id: 8,  foto: 'https://i.pravatar.cc/150?img=25', nombre: 'Valeria N.',   rol: 'Operations & Supply Chain Expert',       habilidades: ['Logística', 'ERP', 'Lean'],             frase: 'Una operación eficiente es la ventaja competitiva más difícil de copiar.' },
  { id: 9,  foto: 'https://i.pravatar.cc/150?img=32', nombre: 'Mateo L.',     rol: 'Data Scientist & ML Engineer',           habilidades: ['TensorFlow', 'SQL', 'Data Viz'],        frase: 'Los datos sin contexto son ruido. Con el contexto correcto, son el futuro.' },
  { id: 10, foto: 'https://i.pravatar.cc/150?img=33', nombre: 'Camila S.',    rol: 'Content Strategist & Brand Builder',     habilidades: ['Copywriting', 'SEO', 'Social Media'],  frase: 'Una buena historia puede cambiar la percepción de un producto de la noche a la mañana.' },
  { id: 11, foto: 'https://i.pravatar.cc/150?img=40', nombre: 'Javier O.',    rol: 'Blockchain Developer & Web3 Founder',    habilidades: ['Solidity', 'Ethereum', 'DeFi'],         frase: 'Web3 no es una moda, es una nueva forma de distribuir el valor de forma justa.' },
  { id: 12, foto: 'https://i.pravatar.cc/150?img=45', nombre: 'Isabella C.',  rol: 'Health Tech Entrepreneur',               habilidades: ['Salud Digital', 'HL7', 'UX'],           frase: 'La tecnología en salud puede salvar millones de vidas si la hacemos accesible.' },
  { id: 13, foto: 'https://i.pravatar.cc/150?img=50', nombre: 'Sebastián R.', rol: 'EdTech Product Manager',                 habilidades: ['Producto', 'Agile', 'EdTech'],          frase: 'Aprender debería ser tan adictivo como el scroll infinito, pero con propósito.' },
  { id: 14, foto: 'https://i.pravatar.cc/150?img=55', nombre: 'Paula M.',     rol: 'Legal Tech & Startup Advisor',           habilidades: ['Derecho', 'SaaS', 'Contratos'],         frase: 'El mejor momento para pensar en los aspectos legales de tu startup es antes de que sea un problema.' },
  { id: 15, foto: 'https://i.pravatar.cc/150?img=60', nombre: 'Nicolás H.',   rol: 'DevOps Engineer & Platform Builder',     habilidades: ['Kubernetes', 'CI/CD', 'Docker'],        frase: 'Una buena plataforma hace que los devs vuelen. Una mala plataforma los paraliza.' },
  { id: 16, foto: 'https://i.pravatar.cc/150?img=65', nombre: 'Renata Q.',    rol: 'Agritech Innovator & Rural Entrepreneur', habilidades: ['Agro', 'IoT', 'Sostenibilidad'],       frase: 'El campo es el mercado más grande e ignorado por la tecnología en Latinoamérica.' },
]

export default function NomidasPage() {
  return (
    <section className="nomadas" id="nomada">
      <h1 className="nomadas__titulo">
        Encuentra los mejores{' '}
        <span className="nomadas__titulo-acento">cofundadores</span>{' '}
        para tu startup.
      </h1>
      <p className="nomadas__descripcion">
        Aquí encontrarás emprendedores con la misma visión que tú para formar un equipo ideal y desarrollar juntos ideas de negocio innovadoras.
      </p>

      <div className="nomadas__cabecera">
        <h2 className="nomadas__cabecera-titulo">Cofundadores</h2>
        <AppButton label="Filtros" variante="outline" icon={<FilterOutlined />} />
      </div>

      <div className="nomadas__grid">
        {COFUNDADORES.map((c) => (
          <TarjetaCofundador
            key={c.id}
            foto={c.foto}
            nombre={c.nombre}
            rol={c.rol}
            habilidades={c.habilidades}
            frase={c.frase}
          />
        ))}
      </div>

      <div className="nomadas__mas">
        <AppButton label="Más resultados ›" variante="outline" />
        <p className="nomadas__mas-texto">¡Más de 6000+ nómadas te están esperando!</p>
      </div>
    </section>
  )
}
