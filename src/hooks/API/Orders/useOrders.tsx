import { useMessage } from '@hooks/useMessages'
import { useEffect } from 'react'
import { useGetOrders } from './useGetOrders'

export const useOrders = () => {
  const { error: showError } = useMessage()

  const {
    result,
    loading: isLoading,
    execute: getOrders,
  } = useGetOrders({
    onError: () => showError('Ошибка при получении заказов'),
  })

  useEffect(() => {
    getOrders()
  }, [])

  return {
    orders: result || [],
    isLoading: isLoading,
    getOrders,
  }
}
