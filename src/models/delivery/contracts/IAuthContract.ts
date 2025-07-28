import { IUser } from './IUserContract'

export interface IAuth {
  accessToken: string
  refreshToken: string
  user: IUser
  setTokens: (accessToken: string, refreshToken: string) => void
  setUser: (user: IUser) => void
  refresh: () => Promise<void>
  logout: () => Promise<{ success: boolean; message: string }>
}

export interface IAuthResponseContract {
  accessToken: string
  refreshToken: string
  user: IUser
}

export interface IAuthStore extends IAuth {
  loading: boolean
  register: (data: IAuthRegisterContract) => Promise<{ success: boolean; message: string }>
  login: (data: IAuthLoginContract) => Promise<{ success: boolean; message: string }>
}

export interface IAuthRegisterContract {
  email: string
  password: string
  name: string
  phoneNumber?: string
  avatarPath?: string
  role?: string
}

export interface IAuthLoginContract {
  email: string
  password: string
}
