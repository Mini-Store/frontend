import { useMessage } from '@hooks/useMessages'
import { useEffect } from 'react'
import { useGetUsers } from './useGetUsers'

export const useUsers = () => {
  const { error: showError } = useMessage()

  const {
    result,
    loading: isLoading,
    execute: getUsers,
  } = useGetUsers({
    onError: () => showError('Ошибка при получении пользователей'),
  })

  useEffect(() => {
    getUsers()
  }, [])

  return {
    users: result || [],
    isLoading: isLoading,
    getUsers,
  }
}
