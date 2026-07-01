import { X, Zap, Heart, Star, Lightbulb, Users, Clock, DollarSign, Globe, Quote, Shield, Award, BookOpen } from 'lucide-react'
import type { Inscrito } from '../../../types/admin'
import AppButton from '../boton/boton'
import './modalVerInscripcion.css'

interface ModalVerInscripcionProps {
  inscrito: Inscrito
  onCerrar: () => void
}

function Fila({ label, valor }: { label: string; valor: string }) {
  if (!valor) return null
  return (
    <div className="modal-ver__fila">
      <span className="modal-ver__fila-label">{label}</span>
      <span className="modal-ver__fila-valor">{valor}</span>
    </div>
  )
}

export default function ModalVerInscripcion({ inscrito, onCerrar }: ModalVerInscripcionProps) {
  return (
    <div className="modal-ver__overlay" onClick={onCerrar}>
      <div className="modal-ver" onClick={(e) => e.stopPropagation()}>
        <button className="modal-ver__cerrar" onClick={onCerrar}>
          <X size={18} />
        </button>

        <div className="modal-ver__cabecera">
          {inscrito.foto && (
            <img src={inscrito.foto} alt={inscrito.nombre} className="modal-ver__foto" />
          )}
          <div>
            <h2 className="modal-ver__nombre">{inscrito.nombre}</h2>
            <span className="modal-ver__badge">{inscrito.categoria}</span>
            <p className="modal-ver__ocupacion">{inscrito.ocupacion}</p>
          </div>
        </div>

        <div className="modal-ver__cuerpo">
          {inscrito.descripcion && (
            <p className="modal-ver__descripcion-ia">{inscrito.descripcion}</p>
          )}

          <Fila label="Correo" valor={inscrito.email} />
          <Fila label="WhatsApp" valor={inscrito.whatsapp} />

          {inscrito.fraseRepresenta && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><Quote size={13} /> Frase que lo representa</div>
              <p className="modal-ver__texto">"{inscrito.fraseRepresenta}"</p>
            </div>
          )}

          {inscrito.superpoderes.length > 0 && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><Zap size={13} /> Superpoderes</div>
              <div className="modal-ver__tags">
                {inscrito.superpoderes.map((s) => <span key={s} className="modal-ver__tag">{s}</span>)}
              </div>
            </div>
          )}

          {inscrito.pasiones.length > 0 && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><Heart size={13} /> Pasiones</div>
              <div className="modal-ver__tags">
                {inscrito.pasiones.map((p) => <span key={p} className="modal-ver__tag">{p}</span>)}
              </div>
            </div>
          )}

          {inscrito.sueno && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><Star size={13} /> Sueño emprendedor</div>
              <p className="modal-ver__texto">{inscrito.sueno}</p>
            </div>
          )}

          {inscrito.tieneIdea && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><Lightbulb size={13} /> ¿Tiene idea de negocio?</div>
              <p className="modal-ver__texto">
                {inscrito.tieneIdea}{inscrito.ideas.length > 0 ? ` — "${inscrito.ideas.join(', ')}"` : ''}
              </p>
            </div>
          )}

          {inscrito.perfilesBuscados.length > 0 && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><Users size={13} /> Busca en un socio</div>
              <div className="modal-ver__tags">
                {inscrito.perfilesBuscados.map((p) => <span key={p} className="modal-ver__tag modal-ver__tag--acento">{p}</span>)}
              </div>
            </div>
          )}

          {inscrito.disponibilidad && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><Clock size={13} /> Disponibilidad semanal</div>
              <p className="modal-ver__texto">{inscrito.disponibilidad}</p>
            </div>
          )}

          {inscrito.millonDolares && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><DollarSign size={13} /> Con 1 millón construiría</div>
              <p className="modal-ver__texto">"{inscrito.millonDolares}"</p>
            </div>
          )}

          {inscrito.problemaResolver && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><Globe size={13} /> Problema que resolvería</div>
              <p className="modal-ver__texto">"{inscrito.problemaResolver}"</p>
            </div>
          )}

          {inscrito.valoresImportantes && inscrito.valoresImportantes.length > 0 && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><Shield size={13} /> Valores en un socio</div>
              <div className="modal-ver__tags">
                {inscrito.valoresImportantes.map((v) => <span key={v} className="modal-ver__tag">{v}</span>)}
              </div>
            </div>
          )}

          {inscrito.admiraEmprendedor && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><Award size={13} /> Lo que admira en un emprendedor</div>
              <p className="modal-ver__texto">{inscrito.admiraEmprendedor}</p>
            </div>
          )}

          {inscrito.mayorAprendizaje && (
            <div className="modal-ver__seccion">
              <div className="modal-ver__seccion-titulo"><BookOpen size={13} /> Mayor aprendizaje</div>
              <p className="modal-ver__texto">{inscrito.mayorAprendizaje}</p>
            </div>
          )}
        </div>

        <div className="modal-ver__footer">
          <AppButton label="Aceptar" onClick={onCerrar} />
        </div>
      </div>
    </div>
  )
}
