import { IConnector } from '@models/delivery/common/IConnector'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON'
import { IOrderResponseContract } from '@models/delivery/contracts/IOrderContract'

export interface IOrderActions {
  connector: IConnector
  getList(): Promise<IApiResult<GetListResponse<IOrderResponseContract>>>
}
