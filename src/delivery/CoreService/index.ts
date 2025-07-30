import { ApiConnector } from '@helpers/connector.ts'
import { IConnector } from '@models/delivery/common/IConnector.ts'
import { AuthActions } from './AuthActions'
import { IAuthActions } from './AuthActions/interface.ts'
import { CategoryActions } from './CategoryActions/index.ts'
import { ICategoryActions } from './CategoryActions/interface.ts'
import { ICoreService } from './interface.ts'
import { ProductActions } from './ProductActions/index.ts'
import { IProductActions } from './ProductActions/interface.ts'
import { UserActions } from './UserActions/index.ts'
import { IUserActions } from './UserActions/interface.ts'

export class CoreService implements ICoreService {
  connector: IConnector
  authActions: IAuthActions
  productActions: IProductActions
  categoryActions: ICategoryActions
  userActions: IUserActions

  constructor() {
    this.connector = new ApiConnector('/api')
    this.authActions = new AuthActions(this.connector)
    this.productActions = new ProductActions(this.connector)
    this.categoryActions = new CategoryActions(this.connector)
    this.userActions = new UserActions(this.connector)
  }
}
