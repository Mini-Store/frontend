import { HTTP_STATUSES } from '@constants/httpStatuses'
import { apiRequestWrapper } from '@helpers/delivery'
import { IConnector } from '@models/delivery/common/IConnector'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON'
import {
  IUserResponseContract,
  IUserUpdateContract,
} from '@models/delivery/contracts/IUserContract'
import { IUserActions } from './interface'

export class UserActions implements IUserActions {
  connector: IConnector
  constructor(connector: IConnector) {
    this.connector = connector
  }
  getList = async (): Promise<IApiResult<GetListResponse<IUserResponseContract>>> => {
    return await apiRequestWrapper(this.connector.connector.get('/user/list'), HTTP_STATUSES.OK)
  }
  update = async (
    id: string,
    data: IUserUpdateContract,
  ): Promise<IApiResult<IUserResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.put(`/user/${id}`, data),
      HTTP_STATUSES.OK,
    )
  }
}
