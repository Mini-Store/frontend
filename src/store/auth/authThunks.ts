import { delivery } from '@delivery/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { User } from './types'

interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

// Login
export const loginThunk = createAsyncThunk<AuthResponse, { email: string; password: string }>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const { value, error } = await delivery.CS.authActions.login(data)
      if (error || !value) return rejectWithValue(error || 'Нет данных')
      return {
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
      }
    } catch {
      return rejectWithValue('Ошибка при входе')
    }
  },
)

// Register
export const registerThunk = createAsyncThunk<AuthResponse, any>(
  'auth/register',
  async (data, { rejectWithValue }) => {
    try {
      const { value, error } = await delivery.CS.authActions.register(data)
      if (error || !value) return rejectWithValue(error || 'Нет данных')
      return {
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
      }
    } catch {
      return rejectWithValue('Ошибка при регистрации')
    }
  },
)

// Refresh token
export const refreshThunk = createAsyncThunk<{ accessToken: string; refreshToken: string }, string>(
  'auth/refresh',
  async (refreshToken, { rejectWithValue }) => {
    try {
      const { value, error } = await delivery.CS.authActions.refreshToken(refreshToken)
      if (error || !value) return rejectWithValue(error || 'Ошибка при обновлении токена')
      return {
        accessToken: value.accessToken ?? '',
        refreshToken: value.refreshToken ?? '',
      }
    } catch {
      return rejectWithValue('Ошибка при обновлении токена')
    }
  },
)
