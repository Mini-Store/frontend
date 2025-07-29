import { ICategoryResponseContract } from './ICategoryCategory'

export interface IProductResponseContract {
  id: string
  createdAt: string
  name: string
  description: string
  price: string
  images: string[]
  category: ICategoryResponseContract
}

export interface IProductCreateContract {
  name: string
  description: string
  price: number
  images: string[]
}

export interface IProductUpdateContract {
  name: string
  description: string
  price: number
  images: string[]
}
