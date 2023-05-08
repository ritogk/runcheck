import { ComparisonsApi } from "@/core/openapiClient"

export const fetchComparisons = async () => {
  const comparisonsApi = new ComparisonsApi()
  const response = await comparisonsApi.comparisonsGet()
  return response
}
