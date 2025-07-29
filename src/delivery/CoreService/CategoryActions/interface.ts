import { IConnector } from '@models/delivery/common/IConnector'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON'
import {
  ICategoryCreateContract,
  ICategoryResponseContract,
  ICategoryUpdateContract,
} from '@models/delivery/contracts/ICategoryCategory'

export interface ICategoryActions {
  connector: IConnector
  getList(): Promise<IApiResult<GetListResponse<ICategoryResponseContract>>>
  create(data: ICategoryCreateContract): Promise<IApiResult<ICategoryResponseContract>>
  update(id: string, data: ICategoryUpdateContract): Promise<IApiResult<ICategoryResponseContract>>
  delete(id: string): Promise<IApiResult<void>>
}
