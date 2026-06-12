import { createBrowserRouter } from 'react-router-dom'
import Layout from '../pages/nomadas/layout'
import InicioPage from '../pages/inicio/page'
import NomidasPage from '../pages/nomadas/page'
import AliadosPage from '../pages/aliados/page'
import IniciarSesionPage from '../pages/iniciarSesion/page'
import RegistratePage from '../pages/registrate/page'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><InicioPage /></Layout>,
  },
  {
    path: '/nomada',
    element: <Layout><NomidasPage /></Layout>,
  },
  {
    path: '/aliados',
    element: <Layout><AliadosPage /></Layout>,
  },
  {
    path: '/iniciar-sesion',
    element: <IniciarSesionPage />,
  },
  {
    path: '/registrate',
    element: <RegistratePage />,
  },
])

export default router
