import Navbar from '../../components/ui/barraNavegacion/barraNavegacion'
import Footer from '../../components/ui/footer/footer'

export default function Layout({ children, sinFooter = false }: { children: React.ReactNode; sinFooter?: boolean }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {!sinFooter && <Footer />}
    </>
  )
}
