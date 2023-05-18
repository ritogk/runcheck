import { ComparisonsApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
const comparisonsApi = new ComparisonsApi(apiConfig)

export const fetchComparisons = async () => {
  const response = await comparisonsApi.comparisonsGet()
  return response
}

export const deleteComparison = async (id: number) => {
  const resposne = comparisonsApi.comparisonsComparisonIdDelete({
    comparisonId: id,
  })
  return resposne
}
