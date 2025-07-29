import { HTTP_STATUSES } from '@constants/httpStatuses'
import { apiRequestWrapper } from '@helpers/delivery'
import { IConnector } from '@models/delivery/common/IConnector'
import { GetListResponse, IApiResult } from '@models/delivery/common/IResultJSON'
import {
  IProductCreateContract,
  IProductResponseContract,
  IProductUpdateContract,
} from '@models/delivery/contracts/IProductContract'
import { IQueryContract } from '@models/delivery/contracts/IQueryContract'
import { IProductActions } from './interface'

export class ProductActions implements IProductActions {
  connector: IConnector
  constructor(connector: IConnector) {
    this.connector = connector
  }
  getList = async (
    query: IQueryContract = {},
  ): Promise<IApiResult<GetListResponse<IProductResponseContract>>> => {
    const params: IQueryContract = {
      name: query.name ?? undefined,
      category: query.category ?? undefined,
      ...(query.priceFrom && { priceFrom: query.priceFrom }),
      ...(query.priceTo && { priceTo: query.priceTo }),
    }
    return await apiRequestWrapper(
      this.connector.connector.get('/product', { params }),
      HTTP_STATUSES.OK,
    )
  }
  getAllNames = async (): Promise<IApiResult<GetListResponse<IProductResponseContract>>> => {
    return await apiRequestWrapper(
      this.connector.connector.get('/product/names'),
      HTTP_STATUSES.OK,
    )
  }
  create = async (data: IProductCreateContract): Promise<IApiResult<IProductResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.post('/product', data),
      HTTP_STATUSES.OK,
    )
  }
  update = async (
    id: string,
    data: IProductUpdateContract,
  ): Promise<IApiResult<IProductResponseContract>> => {
    return await apiRequestWrapper(
      this.connector.connector.put(`/product/${id}`, data),
      HTTP_STATUSES.OK,
    )
  }
  delete = async (id: string): Promise<IApiResult<void>> => {
    return await apiRequestWrapper(
      this.connector.connector.delete(`/product/${id}`),
      HTTP_STATUSES.NO_CONTENT,
    )
  }
}
