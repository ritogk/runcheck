import { getApiClient } from "@/core/api-client"
import { useQuery } from "@tanstack/vue-query"
import { GET_COMPARISONS } from "./query-key"

export const UseGetComparisons = () => {
  return useQuery({
    queryKey: [GET_COMPARISONS],
    queryFn: async () => {
      const client = await getApiClient()
      const response = await client.getComparisons()
      return response.data
    },
    staleTime: Infinity,
    retry: false
  })
}
