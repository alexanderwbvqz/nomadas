export interface ModalCrearEventoProps {
  onCerrar: () => void
  onGuardar: (nombre: string, fecha: string) => Promise<void>
}
