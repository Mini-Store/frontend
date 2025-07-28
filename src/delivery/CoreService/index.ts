import { ApiConnector } from '../../helpers/connector.ts'
import { IConnector } from '../../models/delivery/common/IConnector.ts'
import { ICoreService } from './interface.ts'
import { ProductsActions } from './ProductsActions'
import { IProductsActions } from './ProductsActions/interface.ts'
import { AuthActions } from './AuthActions'
import { IAuthActions } from './AuthActions/interface.ts'

export class CoreService implements ICoreService {
  connector: IConnector
  authActions: IAuthActions
  productsActions: IProductsActions

  constructor() {
    this.connector = new ApiConnector('/api')
    this.authActions = new AuthActions(this.connector)
    this.productsActions = new ProductsActions(this.connector)
  }
}
