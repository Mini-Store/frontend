export enum ROLE {
  admin,
  user
}

export interface IUserResponseContract {
  id: string
  email: string 
  name: string
  avatarPath: string
  phone: string
  role: string
}

export interface IUserUpdateContract {
  email: string
  name: string
  avatarPath: string
  phone: string
  role: ROLE
}