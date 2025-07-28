export interface IUser {
  id: string
  createdAt: string
  username: string
  email: string
  phoneNumber?: string
  password?: string
  role: string
}