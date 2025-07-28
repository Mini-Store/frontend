import { IProductsResponseContract } from '@models/delivery/contracts/IProductContract'

export interface IViewProductModal {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  product: IProductsResponseContract | null
}
