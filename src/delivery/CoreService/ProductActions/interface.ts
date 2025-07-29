import { IConnector } from '@models/delivery/common/IConnector'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON'
import {
  IProductCreateContract,
  IProductResponseContract,
  IProductUpdateContract,
} from '@models/delivery/contracts/IProductContract'
import { IQueryContract } from '@models/delivery/contracts/IQueryContract'

export interface IProductActions {
  connector: IConnector
  getList(query: IQueryContract): Promise<IApiResult<GetListResponse<IProductResponseContract>>>
  getAllNames(): Promise<IApiResult<GetListResponse<IProductResponseContract>>>
  create(data: IProductCreateContract): Promise<IApiResult<IProductResponseContract>>
  update(id: string, data: IProductUpdateContract): Promise<IApiResult<IProductResponseContract>>
  delete(id: string): Promise<IApiResult<void>>
}
