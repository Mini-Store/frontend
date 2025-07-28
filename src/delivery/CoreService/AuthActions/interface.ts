import { IConnector } from '@models/delivery/common/IConnector'
import { IApiResult } from '@models/delivery/common/IResultJSON'
import {
  IAuthLoginContract,
  IAuthRegisterContract,
  IAuthResponseContract,
} from '@models/delivery/contracts/IAuthContract'

export interface IAuthActions {
  connector: IConnector
  refreshToken(refreshToken: string): Promise<IApiResult<IAuthResponseContract>>
  register(data: IAuthRegisterContract): Promise<IApiResult<IAuthResponseContract>>
  login(data: IAuthLoginContract): Promise<IApiResult<IAuthResponseContract>>
}
