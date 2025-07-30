import { useAppDispatch, useAppSelector } from '@hooks/useStore'
import { logout, setTokens, setUser } from './auth/authSlice'
import { loginThunk, refreshThunk, registerThunk } from './auth/authThunks'

export const useAuthStore = () => {
  const dispatch = useAppDispatch()
  const auth = useAppSelector((state) => state.auth)

  return {
    // State
    accessToken: auth.accessToken,
    refreshToken: auth.refreshToken,
    user: auth.user,
    loading: auth.loading,

    // Actions
    login: (credentials: { email: string; password: string }) => dispatch(loginThunk(credentials)),
    register: (userData: any) => dispatch(registerThunk(userData)),
    refresh: (token: string) => dispatch(refreshThunk(token)),
    logout: () => {
      dispatch(logout())
      return { success: true, message: 'Выход выполнен успешно' }
    },
    setTokens: (tokens: { accessToken: string; refreshToken: string }) =>
      dispatch(setTokens(tokens)),
    setUser: (user: any) => dispatch(setUser(user)),
  }
}
