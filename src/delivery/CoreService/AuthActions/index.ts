import { HTTP_STATUSES } from '@constants/httpStatuses'
import { apiRequestWrapper } from '@helpers/delivery'
import { IConnector } from '@models/delivery/common/IConnector'
import { IApiResult } from '@models/delivery/common/IResultJSON'
import {
  IAuthLoginContract,
  IAuthRegisterContract,
  IAuthResponseContract,
} from '@models/delivery/contracts/IAuthContract'
import { IAuthActions } from './interface'

export class AuthActions implements IAuthActions {
  connector: IConnector
  constructor(connector: IConnector) {
    this.connector = connector
  }
  refreshToken = async (refreshToken: string): Promise<IApiResult<IAuthResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.post('/auth/refresh-token/', refreshToken),
      HTTP_STATUSES.OK,
    )
  }
  register = async (data: IAuthRegisterContract): Promise<IApiResult<IAuthResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.post('auth/register', data),
      HTTP_STATUSES.OK,
    )
  }
  login = async (data: IAuthLoginContract): Promise<IApiResult<IAuthResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.post('auth/login', data),
      HTTP_STATUSES.OK,
    )
  }
}
