import { Header } from '@components/organisms/Header'
import { ADMIN_ROUTES, SITE_ROUTES } from '@constants/routing'
import { Admin } from '@pages/Admin'
import Blog from '@pages/Blog'
import Cart from '@pages/Cart'
import Catalog from '@pages/Catalog'
import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { Products } from '@pages/Products'
import { Register } from '@pages/Register'
import { authStore } from '@store/useAuthStore'
import { Navigate, Route, Routes } from 'react-router-dom'

export const AppRouter = () => {
  const accessToken = authStore((state) => state.accessToken)
  const user = authStore((state) => state.user)
  return (
    <>
      <Header />
      <Routes>
        <Route path={SITE_ROUTES.INDEX} element={<Home />} />
        <Route path={SITE_ROUTES.BLOG} element={<Blog />} />
        <Route path={SITE_ROUTES.CATALOG} element={<Catalog />} />
        <Route path={SITE_ROUTES.CART} element={<Cart />} />
        <Route path={SITE_ROUTES.REGISTER} element={<Register />} />
        <Route path={SITE_ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ADMIN_ROUTES.INDEX}
          element={
            accessToken && user?.role === 'admin' ? (
              <Admin />
            ) : (
              <Navigate to={SITE_ROUTES.LOGIN} replace />
            )
          }
        />
        <Route
          path={ADMIN_ROUTES.PRODUCTS}
          element={
            accessToken && user?.role === 'admin' ? (
              <Products />
            ) : (
              <Navigate to={SITE_ROUTES.LOGIN} replace />
            )
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
