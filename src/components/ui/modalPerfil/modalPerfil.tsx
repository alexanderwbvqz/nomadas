import { X, Clock, Lightbulb, Heart, Zap, Users, Star, DollarSign, Globe, Quote, Mail, Shield, Award, BookOpen } from 'lucide-react'
import { usePerfilCompleto } from '../../../hooks/usePerfilCompleto'
import type { ModalPerfilProps } from './modalPerfil.types'
import Overlay from '../overlay/overlay'
import './modalPerfil.css'

export default function ModalPerfil({ id, onCerrar }: ModalPerfilProps) {
  const { perfil, cargando } = usePerfilCompleto(id)

  return (
    <Overlay onClick={onCerrar}>
      <div className="modal-perfil" onClick={(e) => e.stopPropagation()}>
        <button className="modal-perfil__cerrar" onClick={onCerrar}>
          <X size={20} />
        </button>

        {cargando || !perfil ? (
          <p className="modal-perfil__cargando">Cargando perfil...</p>
        ) : (
          <>
            <div className="modal-perfil__cabecera">
              <div className="modal-perfil__foto-wrap">
                {perfil.foto ? (
                  <img src={perfil.foto} alt={perfil.nombre} className="modal-perfil__foto" />
                ) : (
                  <div className="modal-perfil__foto-placeholder">
                    {perfil.nombre.charAt(0)}
                  </div>
                )}
              </div>
              <div className="modal-perfil__info">
                <h2 className="modal-perfil__nombre">{perfil.nombre}</h2>
                <span className="modal-perfil__perfil-badge">{perfil.categoria}</span>
                <p className="modal-perfil__ocupacion">{perfil.ocupacion}</p>
              </div>
            </div>

            <div className="modal-perfil__cuerpo">
              {perfil.descripcion && (
                <p className="modal-perfil__descripcion-ia">{perfil.descripcion}</p>
              )}

              {perfil.fraseRepresenta && (
                <div className="modal-perfil__frase">
                  <Quote size={14} className="modal-perfil__frase-icono" />
                  <p>"{perfil.fraseRepresenta}"</p>
                </div>
              )}

              <div className="modal-perfil__seccion">
                <div className="modal-perfil__seccion-titulo">
                  <Zap size={14} /> Superpoderes
                </div>
                <div className="modal-perfil__tags">
                  {perfil.superpoderes.map((s) => <span key={s} className="modal-perfil__tag">{s}</span>)}
                </div>
              </div>

              <div className="modal-perfil__seccion">
                <div className="modal-perfil__seccion-titulo">
                  <Heart size={14} /> Pasiones
                </div>
                <div className="modal-perfil__tags">
                  {perfil.pasiones.map((p) => <span key={p} className="modal-perfil__tag">{p}</span>)}
                </div>
              </div>

              {perfil.sueno && (
                <div className="modal-perfil__seccion">
                  <div className="modal-perfil__seccion-titulo">
                    <Star size={14} /> Sueño emprendedor
                  </div>
                  <p className="modal-perfil__texto">{perfil.sueno}</p>
                </div>
              )}

              {perfil.tieneIdea && (
                <div className="modal-perfil__seccion">
                  <div className="modal-perfil__seccion-titulo">
                    <Lightbulb size={14} /> ¿Tiene idea de negocio?
                  </div>
                  <p className="modal-perfil__texto">
                    {perfil.tieneIdea}{perfil.ideas.length > 0 ? ` — "${perfil.ideas.join(', ')}"` : ''}
                  </p>
                </div>
              )}

              <div className="modal-perfil__seccion">
                <div className="modal-perfil__seccion-titulo">
                  <Users size={14} /> Busca en un socio
                </div>
                <div className="modal-perfil__tags">
                  {perfil.perfilesBuscados.map((p) => <span key={p} className="modal-perfil__tag modal-perfil__tag--acento">{p}</span>)}
                </div>
              </div>

              {perfil.disponibilidad && (
                <div className="modal-perfil__seccion">
                  <div className="modal-perfil__seccion-titulo">
                    <Clock size={14} /> Disponibilidad semanal
                  </div>
                  <p className="modal-perfil__texto">{perfil.disponibilidad}</p>
                </div>
              )}

              {perfil.millonDolares && (
                <div className="modal-perfil__seccion">
                  <div className="modal-perfil__seccion-titulo">
                    <DollarSign size={14} /> Con 1 millón de dólares construiría
                  </div>
                  <p className="modal-perfil__texto">"{perfil.millonDolares}"</p>
                </div>
              )}

              {perfil.problemaResolver && (
                <div className="modal-perfil__seccion">
                  <div className="modal-perfil__seccion-titulo">
                    <Globe size={14} /> Problema del mundo que resolvería
                  </div>
                  <p className="modal-perfil__texto">"{perfil.problemaResolver}"</p>
                </div>
              )}

              {perfil.valoresImportantes && perfil.valoresImportantes.length > 0 && (
                <div className="modal-perfil__seccion">
                  <div className="modal-perfil__seccion-titulo">
                    <Shield size={14} /> Valores en un socio
                  </div>
                  <div className="modal-perfil__tags">
                    {perfil.valoresImportantes.map((v) => <span key={v} className="modal-perfil__tag">{v}</span>)}
                  </div>
                </div>
              )}

              {perfil.admiraEmprendedor && (
                <div className="modal-perfil__seccion">
                  <div className="modal-perfil__seccion-titulo">
                    <Award size={14} /> Lo que admira en un emprendedor
                  </div>
                  <p className="modal-perfil__texto">{perfil.admiraEmprendedor}</p>
                </div>
              )}

              {perfil.mayorAprendizaje && (
                <div className="modal-perfil__seccion">
                  <div className="modal-perfil__seccion-titulo">
                    <BookOpen size={14} /> Mayor aprendizaje
                  </div>
                  <p className="modal-perfil__texto">{perfil.mayorAprendizaje}</p>
                </div>
              )}
            </div>

            <div className="modal-perfil__pie">
              <div className="modal-perfil__contacto">
                {perfil.whatsapp && (
                  <a href={`https://wa.me/${perfil.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer" className="modal-perfil__btn-contacto modal-perfil__btn-contacto--wa">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp
                  </a>
                )}
                {perfil.email && (
                  <a href={`mailto:${perfil.email}`} className="modal-perfil__btn-contacto modal-perfil__btn-contacto--email">
                    <Mail size={18} />
                    Correo
                  </a>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Overlay>
  )
}
