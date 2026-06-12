import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import type { CampoTextoProps } from './campoTexto.types'
import './campoTexto.css'

export default function CampoTexto({
  label,
  placeholder,
  tipo = 'text',
  requerido = false,
  enlaceDerecha,
  value,
  onChange,
}: CampoTextoProps) {
  const [mostrarContraseña, setMostrarContraseña] = useState(false)
  const esPassword = tipo === 'password'
  const tipoEfectivo = esPassword ? (mostrarContraseña ? 'text' : 'password') : tipo

  return (
    <div className="campo-texto">
      <div className="campo-texto__header">
        <label className="campo-texto__label">
          {label}
          {requerido && <span className="campo-texto__requerido">*</span>}
        </label>
        {enlaceDerecha && (
          <a
            className="campo-texto__enlace"
            href={enlaceDerecha.href}
            onClick={enlaceDerecha.onClick}
          >
            {enlaceDerecha.texto}
          </a>
        )}
      </div>
      <div className="campo-texto__input-wrapper">
        <input
          className="campo-texto__input"
          type={tipoEfectivo}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
        {esPassword && (
          <button
            type="button"
            className="campo-texto__toggle-password"
            onClick={() => setMostrarContraseña((v) => !v)}
            tabIndex={-1}
          >
            {mostrarContraseña ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  )
}
