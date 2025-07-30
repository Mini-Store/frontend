import { IConnector } from '@models/delivery/common/IConnector'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON'
import {
  IUserResponseContract,
  IUserUpdateContract,
} from '@models/delivery/contracts/IUserContract'

export interface IUserActions {
  connector: IConnector
  getList(): Promise<IApiResult<GetListResponse<IUserResponseContract>>>
  update(id: string, data: IUserUpdateContract): Promise<IApiResult<IUserResponseContract>>
}
