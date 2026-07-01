import Navbar from '../../components/ui/barraNavegacion/barraNavegacion'
import Footer from '../../components/ui/footer/footer'
import './layout.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="layout__main">{children}</main>
      <Footer />
    </div>
  )
}
