import { IConnector } from '../../models/delivery/common/IConnector.ts'
import { IProductsActions } from './ProductsActions/interface.ts'
import { IAuthActions } from './AuthActions/interface.ts'

export interface ICoreService {
  connector: IConnector
  productsActions: IProductsActions
  authActions: IAuthActions
}
