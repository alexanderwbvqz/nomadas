import './overlay.css'

interface OverlayProps {
  onClick?: () => void
  children: React.ReactNode
}

export default function Overlay({ onClick, children }: OverlayProps) {
  return (
    <div className="overlay" onClick={onClick}>
      {children}
    </div>
  )
}
