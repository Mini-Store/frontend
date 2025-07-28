import { Header } from '@components/organisms/Header'
import { ROUTES } from '@constants/routing'
import { Admin } from '@pages/Admin'
import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { Register } from '@pages/Register'
import { Route, Routes, Navigate } from 'react-router-dom'
import { authStore } from '@store/useAuthStore'

export const AppRouter = () => {
  const accessToken = authStore((state) => state.accessToken)
  const user = authStore((state) => state.user)
  return (
    <>
      <Header />
      <Routes>
        <Route path={ROUTES.INDEX} element={<Home />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.ADMIN}
          element={
            accessToken && user?.role === 'admin' ? (
              <Admin />
            ) : (
              <Navigate to={ROUTES.LOGIN} replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
