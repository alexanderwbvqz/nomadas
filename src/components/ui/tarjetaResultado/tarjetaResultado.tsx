import { useEffect, useState } from 'react'
import type { TarjetaResultadoProps } from './tarjetaResultado.types'
import './tarjetaResultado.css'

export default function TarjetaResultado({
  resultado,
  nombre,
  foto,
  superpoderes,
  fraseRepresenta,
  onEntrar,
}: TarjetaResultadoProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50)
    return () => clearTimeout(t)
  }, [])

  const topSuperpoderes = superpoderes.slice(0, 3)

  return (
    <div className={`tarjeta-resultado__overlay${visible ? ' tarjeta-resultado__overlay--visible' : ''}`}>
      <div className={`tarjeta-resultado${visible ? ' tarjeta-resultado--visible' : ''}`}>
        <div className="tarjeta-resultado__glow" />

        <div className="tarjeta-resultado__foto-wrapper tarjeta-resultado__item">
          {foto ? (
            <img src={foto} alt={nombre} className="tarjeta-resultado__foto" />
          ) : (
            <div className="tarjeta-resultado__foto-placeholder">
              {nombre.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <div className="tarjeta-resultado__emoji tarjeta-resultado__item">
          {resultado.emoji}
        </div>

        <h2 className="tarjeta-resultado__perfil tarjeta-resultado__item">
          {resultado.perfil}
        </h2>

        <p className="tarjeta-resultado__nombre tarjeta-resultado__item">{nombre}</p>

        {topSuperpoderes.length > 0 && (
          <div className="tarjeta-resultado__tags tarjeta-resultado__item">
            {topSuperpoderes.map((s) => (
              <span key={s} className="tarjeta-resultado__tag">{s}</span>
            ))}
          </div>
        )}

        <p className="tarjeta-resultado__frase tarjeta-resultado__item">
          "{fraseRepresenta}"
        </p>

        <p className="tarjeta-resultado__descripcion tarjeta-resultado__item">
          {resultado.descripcion}
        </p>

        {resultado.busca.length > 0 && (
          <p className="tarjeta-resultado__busca tarjeta-resultado__item">
            Busca: <strong>{resultado.busca.join(' + ')}</strong>
          </p>
        )}

        <button className="tarjeta-resultado__btn tarjeta-resultado__item" onClick={onEntrar}>
          Entrar a Nómadas
        </button>
      </div>
    </div>
  )
}
