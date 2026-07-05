import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { TipoAliado } from '../types/admin'
import { subirLogoAliado, postularAliado } from '../api/aliados'

interface FormAliado {
  nombre: string
  logo: string
  tipo: TipoAliado | ''
  descripcion: string
  linkedin: string
  instagram: string
  email: string
  web: string
}

type CampoValidado = 'nombre' | 'tipo' | 'descripcion' | 'email' | 'linkedin' | 'instagram' | 'web'

function validarCampo(campo: CampoValidado, valor: string): string {
  switch (campo) {
    case 'nombre':
      return valor.trim() ? '' : 'El nombre es requerido'
    case 'tipo':
      return valor ? '' : 'Selecciona un tipo de aliado'
    case 'descripcion':
      if (!valor.trim()) return 'La descripción es requerida'
      if (valor.trim().length < 30) return `Mínimo 30 caracteres (${valor.trim().length}/30)`
      return ''
    case 'email':
      if (!valor.trim()) return 'El correo es requerido'
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())) return 'Ingresa un correo válido'
      return ''
    case 'linkedin':
    case 'instagram':
    case 'web':
      if (valor.trim() && !valor.trim().startsWith('https://')) return 'Debe comenzar con https://'
      return ''
  }
}

export function usePostularAliado() {
  const navigate = useNavigate()
  const logoUrlRef = useRef<string>('')

  const [form, setForm] = useState<FormAliado>({
    nombre: '', logo: '', tipo: '', descripcion: '', linkedin: '', instagram: '', email: '', web: '',
  })
  const [errores, setErrores] = useState<Partial<Record<CampoValidado, string>>>({})
  const [tocados, setTocados] = useState<Partial<Record<CampoValidado, boolean>>>({})
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [subiendoLogo, setSubiendoLogo] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [errorServidor, setErrorServidor] = useState<string | null>(null)

  function set(campo: keyof FormAliado, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  function handleBlur(campo: CampoValidado) {
    const valor = campo === 'tipo' ? form.tipo : form[campo as keyof FormAliado]
    setTocados((prev) => ({ ...prev, [campo]: true }))
    setErrores((prev) => ({ ...prev, [campo]: validarCampo(campo, valor) }))
  }

  function handleTipoClick(tipo: TipoAliado) {
    set('tipo', tipo)
    setTocados((prev) => ({ ...prev, tipo: true }))
    setErrores((prev) => ({ ...prev, tipo: '' }))
  }

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0]
    if (!archivo) return

    setSubiendoLogo(true)
    setLogoPreview(URL.createObjectURL(archivo))

    const url = await subirLogoAliado(archivo)

    if (!url) {
      setErrorServidor('No se pudo subir el logo. Inténtalo de nuevo.')
      setLogoPreview(null)
      setSubiendoLogo(false)
      return
    }

    logoUrlRef.current = url
    set('logo', url)
    setSubiendoLogo(false)
  }

  function quitarLogo() {
    setLogoPreview(null)
    logoUrlRef.current = ''
    set('logo', '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const campos: CampoValidado[] = ['nombre', 'tipo', 'descripcion', 'email', 'linkedin', 'instagram', 'web']
    const nuevosErrores: Partial<Record<CampoValidado, string>> = {}
    let hayErrores = false

    for (const campo of campos) {
      const valor = campo === 'tipo' ? form.tipo : form[campo as keyof FormAliado]
      const msg = validarCampo(campo, valor)
      if (msg) { nuevosErrores[campo] = msg; hayErrores = true }
    }

    setTocados({ nombre: true, tipo: true, descripcion: true, email: true, linkedin: true, instagram: true, web: true })
    setErrores(nuevosErrores)
    if (hayErrores) return

    setEnviando(true)
    setErrorServidor(null)

    const { ok } = await postularAliado({
      nombre: form.nombre.trim(),
      logo: logoUrlRef.current || null,
      tipo: form.tipo,
      descripcion: form.descripcion.trim(),
      email: form.email.trim() || null,
      linkedin: form.linkedin.trim() || null,
      instagram: form.instagram.trim() || null,
      web: form.web.trim() || null,
    })

    if (!ok) {
      setErrorServidor('Hubo un problema al enviar. Inténtalo de nuevo.')
      setEnviando(false)
      return
    }

    setEnviado(true)
  }

  function volverAliados() {
    navigate('/aliados')
  }

  return {
    form, errores, tocados, logoPreview, subiendoLogo,
    enviado, enviando, errorServidor,
    set, handleBlur, handleTipoClick, handleLogoChange, quitarLogo, handleSubmit, volverAliados,
  }
}
