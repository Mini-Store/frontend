import { HTTP_STATUSES } from '@constants/httpStatuses'
import { apiRequestWrapper } from '@helpers/delivery'
import { IConnector } from '@models/delivery/common/IConnector'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON'
import { IOrderResponseContract } from '@models/delivery/contracts/IOrderContract'
import { IOrderActions } from './interface'

export class OrderActions implements IOrderActions {
  connector: IConnector
  constructor(connector: IConnector) {
    this.connector = connector
  }
  getList = async (): Promise<IApiResult<GetListResponse<IOrderResponseContract>>> => {
    return await apiRequestWrapper(this.connector.connector.get('/order/all'), HTTP_STATUSES.OK)
  }
}
