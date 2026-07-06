import { useRef } from 'react'
import { ImagePlus, X, Loader } from 'lucide-react'
import CampoInput from '../../components/ui/campoInput/campoInput'
import AppButton from '../../components/ui/boton/boton'
import ModalConfirmacion from '../../components/ui/modalConfirmacion/modalConfirmacion'
import type { TipoAliado } from '../../types/admin'
import { usePostularAliado } from '../../hooks/usePostularAliado'
import './page.css'

export default function PostularAliadoPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    form, errores, tocados,
    logoPreview, subiendoLogo, enviado, enviando, errorServidor,
    set, handleBlur, handleTipoClick, handleLogoChange, quitarLogo,
    handleSubmit, volverAliados,
  } = usePostularAliado()


  return (
    <div className="postular-aliado">
      {enviado && (
        <ModalConfirmacion
          titulo="¡Postulación enviada!"
          mensaje={<>Hemos recibido tu postulación como aliado y ahora iniciaremos el proceso de revisión. En un plazo máximo de 24 horas validaremos la información enviada. Una vez aprobada, tu aliado estará visible en la sección Aliados de la plataforma. <strong>Te enviamos un correo de confirmación a tu email.</strong> Si no lo ves, revisa tu carpeta de spam.</>}
          onAceptar={volverAliados}
        />
      )}
      <div className="postular-aliado__card">
        <div className="postular-aliado__encabezado">
          <span className="postular-aliado__badge">Red Estratégica</span>
          <h1 className="postular-aliado__titulo">Sé nuestro <span className="postular-aliado__titulo-acento">aliado</span></h1>
          <p className="postular-aliado__descripcion">
            Únete a nuestra red de mentores, universidades y empresas que impulsan a los fundadores del mañana.
          </p>
        </div>

        <form className="postular-aliado__form" onSubmit={handleSubmit} noValidate>
          <CampoInput
            label="Nombre o razón social"
            placeholder="Ej. Universidad Señor de Sipán, Walter Barreto..."
            requerido
            value={form.nombre}
            onChange={(v) => set('nombre', v)}
            onBlur={() => handleBlur('nombre')}
            error={tocados.nombre ? errores.nombre : undefined}
          />

          <div className="postular-aliado__campo">
            <label className="postular-aliado__label">Logo</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="postular-aliado__file-input"
              onChange={handleLogoChange}
            />
            {logoPreview ? (
              <div className="postular-aliado__logo-fila">
                <div className="postular-aliado__logo-preview">
                  <img src={logoPreview} alt="Logo" className="postular-aliado__logo-img" />
                  {subiendoLogo && (
                    <div className="postular-aliado__logo-overlay">
                      <Loader size={18} className="postular-aliado__logo-spinner" />
                    </div>
                  )}
                </div>
                <div className="postular-aliado__logo-info">
                  <span className="postular-aliado__logo-estado">
                    {subiendoLogo ? 'Subiendo...' : 'Logo cargado'}
                  </span>
                  {!subiendoLogo && (
                    <div className="postular-aliado__logo-acciones">
                      <button type="button" className="postular-aliado__logo-cambiar" onClick={() => fileInputRef.current?.click()}>
                        Cambiar
                      </button>
                      <button type="button" className="postular-aliado__logo-quitar" onClick={quitarLogo}>
                        <X size={13} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                type="button"
                className="postular-aliado__upload-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImagePlus size={20} />
                <span>Subir logo</span>
              </button>
            )}
          </div>

          <div className="postular-aliado__campo">
            <label className="postular-aliado__label">Tipo de aliado <span className="postular-aliado__requerido">*</span></label>
            <div className={`postular-aliado__tipos${tocados.tipo && errores.tipo ? ' postular-aliado__tipos--error' : ''}`}>
              {(['Mentores', 'Organizadores', 'Aliados Estratégicos'] as TipoAliado[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  className={`postular-aliado__tipo-btn${form.tipo === t ? ' postular-aliado__tipo-btn--activo' : ''}`}
                  onClick={() => handleTipoClick(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            {tocados.tipo && errores.tipo && (
              <span className="postular-aliado__campo-error">{errores.tipo}</span>
            )}
          </div>

          <CampoInput
            label="Descripción"
            tipo="textarea"
            filas={4}
            placeholder="Cuéntanos quiénes son y cómo pueden aportar valor a los nómadas..."
            requerido
            value={form.descripcion}
            onChange={(v) => set('descripcion', v)}
            onBlur={() => handleBlur('descripcion')}
            error={tocados.descripcion ? errores.descripcion : undefined}
          />

          <CampoInput
            label="Correo de contacto"
            tipo="email"
            placeholder="contacto@empresa.com"
            requerido
            value={form.email}
            onChange={(v) => set('email', v)}
            onBlur={() => handleBlur('email')}
            error={tocados.email ? errores.email : undefined}
          />

          <CampoInput
            label="LinkedIn (opcional)"
            placeholder="https://linkedin.com/in/..."
            value={form.linkedin}
            onChange={(v) => set('linkedin', v)}
            onBlur={() => handleBlur('linkedin')}
            error={tocados.linkedin ? errores.linkedin : undefined}
          />

          <CampoInput
            label="Instagram (opcional)"
            placeholder="https://instagram.com/..."
            value={form.instagram}
            onChange={(v) => set('instagram', v)}
            onBlur={() => handleBlur('instagram')}
            error={tocados.instagram ? errores.instagram : undefined}
          />

          <CampoInput
            label="Sitio web (opcional)"
            placeholder="https://..."
            value={form.web}
            onChange={(v) => set('web', v)}
            onBlur={() => handleBlur('web')}
            error={tocados.web ? errores.web : undefined}
          />

          {errorServidor && <p className="postular-aliado__error">{errorServidor}</p>}
          <div className="postular-aliado__acciones">
            <AppButton label="Cancelar" variante="outline" onClick={volverAliados} />
            <AppButton label={enviando ? 'Enviando...' : 'Enviar'} disabled={enviando || subiendoLogo} htmlType="submit" />
          </div>
        </form>
      </div>
    </div>
  )
}
