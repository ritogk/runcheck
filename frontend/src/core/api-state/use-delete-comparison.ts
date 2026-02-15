import { getApiClient } from "@/core/api-client"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { GET_COMPARISONS } from "@/core/api-state/query-key"

export const useDeleteComparison = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const client = await getApiClient()
      await client.deleteComparison({ id })
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [GET_COMPARISONS] })
    }
  })
  return mutation
}
