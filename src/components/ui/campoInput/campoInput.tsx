import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import './campoInput.css'

interface CampoInputProps {
  label: string
  placeholder?: string
  tipo?: 'text' | 'email' | 'tel' | 'password' | 'textarea'
  filas?: number
  requerido?: boolean
  disabled?: boolean
  value: string
  onChange: (valor: string) => void
  onBlur?: () => void
  error?: string
}

export default function CampoInput({
  label,
  placeholder,
  tipo = 'text',
  filas = 4,
  requerido = false,
  disabled = false,
  value,
  onChange,
  onBlur,
  error,
}: CampoInputProps) {
  const [mostrar, setMostrar] = useState(false)
  const esPassword = tipo === 'password'
  const esTextarea = tipo === 'textarea'
  const tipoReal = esPassword ? (mostrar ? 'text' : 'password') : tipo

  return (
    <div className="campo-input">
      {label && (
        <label className="campo-input__label">
          {label}
          {requerido && <span className="campo-input__requerido"> *</span>}
        </label>
      )}
      {esTextarea ? (
        <textarea
          className={`campo-input__textarea${error ? ' campo-input__textarea--error' : ''}`}
          placeholder={placeholder}
          value={value}
          rows={filas}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
        />
      ) : (
        <div className="campo-input__wrap">
          <input
            className={`campo-input__input${error ? ' campo-input__input--error' : ''}`}
            type={tipoReal}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
          />
          {esPassword && (
            <button
              type="button"
              className="campo-input__ojo"
              onClick={() => setMostrar((v) => !v)}
              tabIndex={-1}
            >
              {mostrar ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )}
        </div>
      )}
      {error && <span className="campo-input__error">{error}</span>}
    </div>
  )
}
