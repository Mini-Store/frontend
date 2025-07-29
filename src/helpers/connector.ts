import { authStore } from '@store/useAuthStore'
import axios, { AxiosInstance } from 'axios'

export class ApiConnector {
  connector: AxiosInstance
  constructor(baseUrl: string) {
    this.connector = axios.create({
      baseURL: baseUrl,
      withCredentials: true,
    })
    this.connector.interceptors.request.use((config) => {
      const token = authStore.getState().accessToken
      if (token) {
        config.headers = config.headers ?? {}
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }
}
