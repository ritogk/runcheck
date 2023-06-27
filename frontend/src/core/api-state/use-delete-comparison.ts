import { ComparisonsApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useMutation, useQueryClient } from "@tanstack/vue-query"
import { GET_COMPARISONS } from "@/core/api-state/query-key"

export const useDeleteComparison = () => {
  const queryClient = useQueryClient()
  const comparisonsApi = new ComparisonsApi(apiConfig)

  const mutation = useMutation({
    mutationFn: (id: number) => comparisonsApi.comparisonsComparisonIdDelete({ comparisonId: id }),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [GET_COMPARISONS] })
    }
  })
  return mutation
}
