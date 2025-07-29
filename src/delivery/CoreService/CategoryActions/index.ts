import { HTTP_STATUSES } from '@constants/httpStatuses'
import { apiRequestWrapper } from '@helpers/delivery'
import { IConnector } from '@models/delivery/common/IConnector'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON'
import {
  ICategoryCreateContract,
  ICategoryResponseContract,
  ICategoryUpdateContract,
} from '@models/delivery/contracts/ICategoryCategory'
import { ICategoryActions } from './interface'

export class CategoryActions implements ICategoryActions {
  connector: IConnector
  constructor(connector: IConnector) {
    this.connector = connector
  }
  getList = async (): Promise<IApiResult<GetListResponse<ICategoryResponseContract>>> => {
    return await apiRequestWrapper(this.connector.connector.get('/category'), HTTP_STATUSES.OK)
  }
  create = async (
    data: ICategoryCreateContract,
  ): Promise<IApiResult<ICategoryResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.post('/category', data),
      HTTP_STATUSES.OK,
    )
  }
  update = async (
    id: string,
    data: ICategoryUpdateContract,
  ): Promise<IApiResult<ICategoryResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.put(`/category/${id}`, data),
      HTTP_STATUSES.OK,
    )
  }
  delete = async (id: string): Promise<IApiResult<void>> => {
    return await apiRequestWrapper(
      this.connector.connector.delete(`/category/${id}`),
      HTTP_STATUSES.NO_CONTENT,
    )
  }
}
