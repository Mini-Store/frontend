import { IAuthStore } from '@models/delivery/contracts/IAuthContract'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { delivery } from '../delivery'

export const authStore = create(
  persist<IAuthStore>(
    (set, get) => ({
      accessToken: '',
      refreshToken: '',
      loading: false,
      user: {
        id: '',
        createdAt: '',
        username: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
      },
      setTokens: (accessToken: string, refreshToken: string) => {
        set({ accessToken, refreshToken })
      },
      setUser: (user) => {
        set({ user })
      },
      refresh: async () => {
        const { value, error } = await delivery.CS.authActions.refreshToken(get().refreshToken)
        if (error) return
        set({
          accessToken: value?.accessToken ?? '',
          refreshToken: value?.refreshToken ?? '',
        })
      },
      register: async (data) => {
        try {
          set({ loading: true })
          const { error, value } = await delivery.CS.authActions.register(data)
          if (error) return { success: false, message: error }
          if (!value) return { success: false, message: 'Нет данных' }
          console.log('login response:', value)
          set({
            accessToken: value.accessToken,
            refreshToken: value.refreshToken,
            user: {
              id: String(value.user.id),
              createdAt: '',
              username: '',
              email: value.user.email,
              phoneNumber: '',
              password: '',
              role: value.user.role,
            },
          })
          return { success: true, message: 'Регистрация прошла успешно' }
        } catch (e) {
          return { success: false, message: 'Ошибка при регистрации' }
        } finally {
          set({ loading: false })
        }
      },
      login: async (data) => {
        try {
          set({ loading: true })
          const { value, error } = await delivery.CS.authActions.login(data)
          console.log('Response from backend:', { error, value });
          if (error) return { success: false, message: error }
          if (!value) return { success: false, message: 'Нет данных' }
          set({
            accessToken: value.accessToken,
            refreshToken: value.refreshToken,
            user: {
              id: String(value.user.id),
              createdAt: value.user.createdAt,
              username: value.user.username,
              email: value.user.email,
              phoneNumber: value.user.phoneNumber,
              password: '',
              role: value.user.role,
            },
          })
          return { success: true, message: 'Вход выполнен успешно' }
        } catch (e) {
          return { success: false, message: 'Ошибка при входе' }
        } finally {
          set({ loading: false })
        }
      },
      logout: async () => {
        set({
          accessToken: '',
          refreshToken: '',
          user: {
            id: '',
            createdAt: '',
            username: '',
            email: '',
            phoneNumber: '',
            password: '',
            role: '',
          },
        })
        return { success: true, message: 'Вы вышли из аккаунта' }
      },
    }),
    {
      name: 'auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
      }),
      storage: {
        getItem: (name) => {
          const stored = localStorage.getItem(name)
          return stored ? JSON.parse(stored) : null
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: (name) => {
          localStorage.removeItem(name)
        },
      },
    },
  ),
)
