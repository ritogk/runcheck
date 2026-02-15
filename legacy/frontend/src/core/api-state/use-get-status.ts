import { StatusApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQuery } from "@tanstack/vue-query"
import { GET_STATUS } from "./query-key"

export const UseGetStatus = () => {
  const statusApi = new StatusApi(apiConfig)
  return useQuery({
    queryKey: [GET_STATUS],
    queryFn: () => statusApi.statusGet(),
    staleTime: Infinity,
    retry: 3
  })
}
