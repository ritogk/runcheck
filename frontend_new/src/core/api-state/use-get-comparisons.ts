import { ComparisonsApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQuery } from "@tanstack/vue-query"
import { GET_COMPARISONS } from "./query-key"

export const UseGetComparisons = () => {
  const comparisonsApi = new ComparisonsApi(apiConfig)
  return useQuery({
    queryKey: [GET_COMPARISONS],
    queryFn: () => comparisonsApi.comparisonsGet(),
    staleTime: Infinity,
    retry: false
  })
}
