export interface User {
  id: string
  createdAt: string
  username: string
  email: string
  phoneNumber: string
  password: string
  role: string
}

export interface AuthState {
  accessToken: string
  refreshToken: string
  loading: boolean
  user: User
}
