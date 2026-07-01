import AppButton from '../boton/boton'
import type { TarjetaCofundadorProps } from './tarjetaCofundador.types'
import './tarjetaCofundador.css'

export default function TarjetaCofundador({
  foto,
  nombre,
  rol,
  habilidades,
  descripcion,
  onVerPerfil,
}: TarjetaCofundadorProps) {
  return (
    <div className="tarjeta">
      <div className="tarjeta__avatar-wrapper">
        <img src={foto} alt={nombre} className="tarjeta__avatar" />
      </div>

      <div>
        <h3 className="tarjeta__nombre">{nombre}</h3>
        <p className="tarjeta__rol">{rol}</p>
      </div>

      <div className="tarjeta__habilidades">
        {habilidades.map((h) => (
          <span key={h} className="tarjeta__habilidad">{h}</span>
        ))}
      </div>

      <p className="tarjeta__descripcion">{descripcion}</p>

      <div className="tarjeta__acciones">
        <AppButton label="Ver perfil" onClick={onVerPerfil} />
      </div>
    </div>
  )
}
