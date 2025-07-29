import { AdminNavbar } from '@components/molecules/AdminNavbar'
import { SiteNavbar } from '@components/molecules/SiteNavbar'
import { SITE_ROUTES } from '@constants/routing'
import { authStore } from '@store/useAuthStore.ts'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const accessToken = authStore((state) => state.accessToken)
  const user = authStore((state) => state.user)
  const logout = authStore((state) => state.logout)
  const loading = authStore((state) => state.loading)
  const navigate = useNavigate()
  const isAdminRoute = location.pathname.startsWith('/admin')

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      navigate(SITE_ROUTES.LOGIN)
    } else {
      alert(result.message)
    }
  }

  return (
    <header className="py-6 border border-[#f5f5f5] rounded-xl">
      <div className="relative max-w-screen-xl mx-auto px-4">
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => navigate(SITE_ROUTES.INDEX)}
        >
          <p className="font-extrabold text-2xl m-0">Mini Store</p>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          {isAdminRoute ? <AdminNavbar /> : <SiteNavbar />}
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Space>
            {accessToken ? (
              <>
                {user?.role === 'admin' && !isAdminRoute && (
                  <Button type="default" onClick={() => navigate('/admin')}>
                    Админка
                  </Button>
                )}
                <Button type="primary" danger onClick={handleLogout} loading={loading}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Button type="default" onClick={() => navigate(SITE_ROUTES.LOGIN)}>
                  Войти
                </Button>
                <Button type="primary" onClick={() => navigate(SITE_ROUTES.REGISTER)}>
                  Регистрация
                </Button>
              </>
            )}
          </Space>
        </div>
      </div>
    </header>
  )
}
