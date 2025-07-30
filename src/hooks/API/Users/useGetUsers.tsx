import { useDelivery } from '@hooks/API/useDelivery'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useEffect } from 'react'

export const useGetUsers = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) => {
  const delivery = useDelivery()
  const { result, loading, execute } = useFetch({
    asyncFunction: () => delivery.CS.userActions.getList(),
    onSuccess,
    onError,
  })

  useEffect(() => {}, [result])

  return { result, loading, execute }
}
