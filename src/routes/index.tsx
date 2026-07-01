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
import PostularAliadoPage from '../pages/postularAliado/page'
import MatchPage from '../pages/match/page'
import MatchPerfilPage from '../pages/match/perfil/page'
import NotFoundPage from '../pages/404/page'

const router = createBrowserRouter([
  { path: '/', element: <Layout><InicioPage /></Layout> },
  { path: '/nomadas', element: <Layout><NomidasPage /></Layout> },
  { path: '/aliados', element: <Layout><AliadosPage /></Layout> },
  { path: '/onboarding', element: <OnboardingPage /> },
  { path: '/postular-aliado', element: <PostularAliadoPage /> },
  { path: '/match', element: <MatchPage /> },
  { path: '/match/:codigo', element: <MatchPerfilPage /> },
  { path: '/admin', element: <AdminLoginPage /> },
  {
    path: '/admin/panel',
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="cofundadores" replace /> },
      { path: 'cofundadores', element: <AdminCofundadoresPage /> },
      { path: 'aliados', element: <AdminAliadosPage /> },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])

export default router
