import { useDelivery } from '@hooks/API/useDelivery'
import { useFetch } from '@hooks/API/useFetch.tsx'
import { useEffect } from 'react'

export const useGetCategories = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) => {
  const delivery = useDelivery()
  const { result, loading, execute } = useFetch({
    asyncFunction: () => delivery.CS.categoryActions.getList(),
    onSuccess,
    onError,
  })

  useEffect(() => {}, [result])

  return { result, loading, execute }
}
