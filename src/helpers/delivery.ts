import { HTTP_STATUSES } from '@constants/httpStatuses.ts'
import { IApiResult } from '@models/delivery/common/IResultJSON.ts'
import { AxiosResponse, isAxiosError } from 'axios'

export class CustomError extends Error {
  response: any
  constructor(message: string, response?: any) {
    super(message)
    this.response = response
  }
}

export const apiRequestWrapper = async <T>(
  request: Promise<AxiosResponse<T>>,
  successStatusCode = HTTP_STATUSES.OK,
): Promise<IApiResult<T>> => {
  const result: IApiResult<T> = {
    value: null,
    error: null,
  }

  try {
    const response = await request

    const isSuccessStatus = [
      successStatusCode,
      HTTP_STATUSES.CREATED,
      HTTP_STATUSES.NO_CONTENT,
    ].includes(response.status)

    if (!isSuccessStatus) {
      throw new CustomError(`API error, status: ${response.status}`, response)
    }

    result.value = response.data ?? null
  } catch (error_) {
    let errorMessage = 'Network error, try again later'

    if (isAxiosError(error_)) {
      errorMessage =
        error_.response?.data?.error ?? `Request failed with status: ${error_.response?.status}`
    } else if (error_ instanceof CustomError) {
      errorMessage = error_.message
    }

    result.error = errorMessage
  }

  return result
}
