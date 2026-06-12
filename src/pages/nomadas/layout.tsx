import Navbar from '../../components/ui/barraNavegacion/barraNavegacion'
import Footer from '../../components/ui/footer/footer'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}
