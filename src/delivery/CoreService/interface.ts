import { IConnector } from '@models/delivery/common/IConnector.ts'
import { IAuthActions } from './AuthActions/interface.ts'
import { ICategoryActions } from './CategoryActions/interface.ts'
import { IOrderActions } from './OrderActions/interface.ts'
import { IProductActions } from './ProductActions/interface.ts'
import { IUserActions } from './UserActions/interface.ts'

export interface ICoreService {
  connector: IConnector
  authActions: IAuthActions
  productActions: IProductActions
  categoryActions: ICategoryActions
  userActions: IUserActions
  orderActions: IOrderActions
}
