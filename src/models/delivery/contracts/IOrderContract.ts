import { IProductResponseContract } from './IProductContract'
import { IUserResponseContract } from './IUserContract'

export interface IOrderResponseContract {
  id: string
  createdAt: string
  user: IUserResponseContract 
  status: string
  method: string
  payment: string
  address: string
  comment: string
  totalAmount: number
  items: Array<{
    quantity: number
    price: number
    product: IProductResponseContract
  }>
}