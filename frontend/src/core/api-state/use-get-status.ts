import { getApiClient } from "@/core/api-client"
import { useQuery } from "@tanstack/vue-query"
import { GET_STATUS } from "./query-key"

export const UseGetStatus = () => {
  return useQuery({
    queryKey: [GET_STATUS],
    queryFn: async () => {
      const client = await getApiClient()
      const response = await client.getStatus()
      return response.data
    },
    staleTime: Infinity,
    retry: 1
  })
}
