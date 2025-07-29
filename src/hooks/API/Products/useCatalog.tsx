import { useGetProducts } from '@hooks/API/Products/useGetProducts'
import { useMessage } from '@hooks/useMessages'
import { useEffect } from 'react'

export const useCatalog = () => {
  const { error: showError } = useMessage()

  const {
    result,
    loading: isLoading,
    execute: getProducts,
  } = useGetProducts({
    onError: () => showError('Ошибка при получении товаров'),
  })

  useEffect(() => {
    getProducts()
  }, [])

  return {
    products: result || [],
    isLoading: isLoading,
    getProducts,
  }
}
