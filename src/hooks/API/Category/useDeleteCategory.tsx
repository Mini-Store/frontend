import { useDelivery } from '@hooks/API/useDelivery.tsx'
import { useFetch } from '@hooks/API/useFetch'

export const useDeleteCategory = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void
  onError?: () => void
}) => {
  const delivery = useDelivery()
  const { execute, loading, result } = useFetch<void>({
    asyncFunction: delivery.CS.categoryActions.delete,
    onSuccess,
    onError,
  })
  return { result, loading, execute }
}
