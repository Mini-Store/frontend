import { ROUTES } from '@constants/routing'
import { HeaderNavbar } from '@components/molecules/HeaderNavbar'
import { authStore } from '@store/useAuthStore.ts'
import { Button, Space } from 'antd'
import { useNavigate } from 'react-router-dom'

export const Header = () => {
  const accessToken = authStore((state) => state.accessToken)
  const user = authStore((state) => state.user)
  const logout = authStore((state) => state.logout)
  const loading = authStore((state) => state.loading)
  const navigate = useNavigate()

  const handleLogout = async () => {
    const result = await logout()
    if (result.success) {
      navigate(ROUTES.LOGIN)
    } else {
      alert(result.message)
    }
  }

  return (
    <header className="py-6 border border-[#f5f5f5] rounded-xl">
      <div className="relative max-w-screen-xl mx-auto px-4">
        <div
          className="absolute left-4 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => navigate(ROUTES.INDEX)}
        >
          <p className="font-extrabold text-2xl m-0">Mini Store</p>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <HeaderNavbar />
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <Space>
            {accessToken ? (
              <>
                {user?.role === 'admin' && (
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
                <Button type="default" onClick={() => navigate(ROUTES.LOGIN)}>
                  Войти
                </Button>
                <Button type="primary" onClick={() => navigate(ROUTES.REGISTER)}>
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
