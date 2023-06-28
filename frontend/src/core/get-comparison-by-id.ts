import { ComparisonsApi } from "@/core/openapiClient/index"
import { apiConfig } from "@/core/openapi"

export const getComparisonById = async (id: number) => {
  const comparisonsApi = new ComparisonsApi(apiConfig)
  const res = await comparisonsApi.comparisonsComparisonIdGet({
    comparisonId: id
  })
  return res
}
