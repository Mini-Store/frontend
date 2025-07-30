import { useGetProducts } from '@hooks/API/Products/useGetProducts'
import { useMessage } from '@hooks/useMessages'
import { useEffect } from 'react'

export const useCategory = () => {
  const { error: showError } = useMessage()

  const {
    result,
    loading: isLoading,
    execute: getCategories,
  } = useGetProducts({
    onError: () => showError('Ошибка при получении категорий'),
  })

  useEffect(() => {
    getCategories()
  }, [])

  return {
    categories: result || [],
    isLoading: isLoading,
    getCategories,
  }
}
