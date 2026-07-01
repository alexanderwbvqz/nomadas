import { useState, useRef } from 'react'
import { X, ImagePlus, Loader } from 'lucide-react'
import CampoInput from '../campoInput/campoInput'
import AppButton from '../boton/boton'
import type { AliadoAdmin } from '../../../hooks/useAliados'
import { supabase } from '../../../lib/supabase'
import './modalEditarAliado.css'

interface ModalEditarAliadoProps {
  aliado: AliadoAdmin
  onCerrar: () => void
  onGuardar: (aliado: AliadoAdmin) => void
}

export default function ModalEditarAliado({ aliado, onCerrar, onGuardar }: ModalEditarAliadoProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState({
    nombre: aliado.nombre,
    logo: aliado.logo,
    tipo: aliado.tipo,
    descripcion: aliado.descripcion,
    linkedin: aliado.linkedin ?? '',
    instagram: aliado.instagram ?? '',
    web: aliado.web ?? '',
  })
  const [logoPreview, setLogoPreview] = useState<string | null>(aliado.logo || null)
  const [subiendoLogo, setSubiendoLogo] = useState(false)

  function set(campo: string, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const archivo = e.target.files?.[0]
    if (!archivo) return

    setSubiendoLogo(true)
    setLogoPreview(URL.createObjectURL(archivo))

    const ext = archivo.name.split('.').pop()
    const nombre = `${Date.now()}.${ext}`

    const { error: uploadErr } = await supabase.storage
      .from('aliados-logos')
      .upload(nombre, archivo, { upsert: true })

    if (uploadErr) {
      setLogoPreview(aliado.logo || null)
      setSubiendoLogo(false)
      return
    }

    const { data } = supabase.storage.from('aliados-logos').getPublicUrl(nombre)
    set('logo', data.publicUrl)
    setSubiendoLogo(false)
  }

  function quitarLogo() {
    setLogoPreview(null)
    set('logo', '')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  function guardar() {
    onGuardar({
      ...aliado,
      nombre: form.nombre,
      logo: form.logo,
      tipo: form.tipo,
      descripcion: form.descripcion,
      linkedin: form.linkedin || undefined,
      instagram: form.instagram || undefined,
      web: form.web || undefined,
    })
  }

  const valido = form.nombre.trim() && form.descripcion.trim() && form.tipo

  return (
    <div className="modal-editar-aliado__overlay" onClick={onCerrar}>
      <div className="modal-editar-aliado" onClick={(e) => e.stopPropagation()}>
        <div className="modal-editar-aliado__cabecera">
          <h2 className="modal-editar-aliado__titulo">Editar aliado</h2>
          <button className="modal-editar-aliado__cerrar" onClick={onCerrar}>
            <X size={18} />
          </button>
        </div>

        <div className="modal-editar-aliado__form">
          <CampoInput
            label="Nombre"
            placeholder="Nombre del aliado"
            value={form.nombre}
            onChange={(v) => set('nombre', v)}
          />

          <div className="modal-editar-aliado__campo">
            <label className="modal-editar-aliado__label">Logo</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="modal-editar-aliado__file-input"
              onChange={handleLogoChange}
            />
            {logoPreview ? (
              <div className="modal-editar-aliado__logo-preview">
                <img src={logoPreview} alt="Logo" className="modal-editar-aliado__logo-img" />
                {subiendoLogo && (
                  <div className="modal-editar-aliado__logo-overlay">
                    <Loader size={18} className="modal-editar-aliado__logo-spinner" />
                  </div>
                )}
                {!subiendoLogo && (
                  <button type="button" className="modal-editar-aliado__logo-quitar" onClick={quitarLogo}>
                    <X size={12} />
                  </button>
                )}
              </div>
            ) : (
              <button
                type="button"
                className="modal-editar-aliado__upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus size={18} />
                <span>Subir logo</span>
              </button>
            )}
          </div>

          <div className="modal-editar-aliado__campo">
            <label className="modal-editar-aliado__label">Tipo</label>
            <select
              className="modal-editar-aliado__select"
              value={form.tipo}
              onChange={(e) => set('tipo', e.target.value)}
            >
              <option value="Mentores">Mentores</option>
              <option value="Universidad">Universidad</option>
              <option value="Empresas">Empresas</option>
            </select>
          </div>

          <div className="modal-editar-aliado__campo">
            <label className="modal-editar-aliado__label">Descripción</label>
            <textarea
              className="modal-editar-aliado__textarea"
              placeholder="Descripción del aliado..."
              value={form.descripcion}
              onChange={(e) => set('descripcion', e.target.value)}
              rows={3}
            />
          </div>

          <CampoInput
            label="LinkedIn (opcional)"
            placeholder="https://linkedin.com/..."
            value={form.linkedin}
            onChange={(v) => set('linkedin', v)}
          />
          <CampoInput
            label="Instagram (opcional)"
            placeholder="https://instagram.com/..."
            value={form.instagram}
            onChange={(v) => set('instagram', v)}
          />
          <CampoInput
            label="Sitio web (opcional)"
            placeholder="https://..."
            value={form.web}
            onChange={(v) => set('web', v)}
          />
        </div>

        <div className="modal-editar-aliado__acciones">
          <AppButton label="Cancelar" variante="outline" onClick={onCerrar} />
          <AppButton label="Guardar cambios" disabled={!valido || subiendoLogo} onClick={guardar} />
        </div>
      </div>
    </div>
  )
}
