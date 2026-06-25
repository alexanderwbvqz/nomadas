import type { TarjetaContadorProps } from './tarjetaContador.types'
import './tarjetaContador.css'

export default function TarjetaContador({ titulo, valor, variante = 'default' }: TarjetaContadorProps) {
  return (
    <div className={`tarjeta-contador tarjeta-contador--${variante}`}>
      <span className="tarjeta-contador__valor">{valor}</span>
      <span className="tarjeta-contador__titulo">{titulo}</span>
    </div>
  )
}
