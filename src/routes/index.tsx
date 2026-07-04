import { createBrowserRouter, Navigate } from 'react-router-dom'
import Layout from '../pages/nomadas/layout'
import InicioPage from '../pages/inicio/page'
import NomidasPage from '../pages/nomadas/page'
import AliadosPage from '../pages/aliados/page'
import OnboardingPage from '../pages/onboarding/page'
import AdminLoginPage from '../pages/admin/login/page'
import AdminLayout from '../pages/admin/layout/adminLayout'
import AdminCofundadoresPage from '../pages/admin/panel/cofundadores/page'
import AdminAliadosPage from '../pages/admin/panel/aliados/page'
import AdminAsistenciaPage from '../pages/admin/panel/asistencia/page'
import AdminAsistenciaDetallePage from '../pages/admin/panel/asistencia/detalle/page'
import PostularAliadoPage from '../pages/postularAliado/page'
import RegistrarAsistenciaPage from '../pages/evento/registrar/page'
import MatchPage from '../pages/match/page'
import MatchInicioPage from '../pages/match/inicio/page'
import NotFoundPage from '../pages/404/page'

const router = createBrowserRouter([
  { path: '/', element: <Layout><InicioPage /></Layout> },
  { path: '/nomadas', element: <Layout><NomidasPage /></Layout> },
  { path: '/aliados', element: <Layout><AliadosPage /></Layout> },
  { path: '/onboarding', element: <OnboardingPage /> },
  { path: '/postular-aliado', element: <PostularAliadoPage /> },
  { path: '/match', element: <MatchPage /> },
  { path: '/match/:codigo', element: <MatchInicioPage /> },
  { path: '/evento/:id/registrar', element: <RegistrarAsistenciaPage /> },
  { path: '/admin', element: <AdminLoginPage /> },
  {
    path: '/admin/panel',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="cofundadores" replace /> },
      { path: 'cofundadores', element: <AdminCofundadoresPage /> },
      { path: 'aliados', element: <AdminAliadosPage /> },
      { path: 'asistencia', element: <AdminAsistenciaPage /> },
      { path: 'asistencia/:eventoId', element: <AdminAsistenciaDetallePage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])

export default router
