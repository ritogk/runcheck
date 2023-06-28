import { ComparisonsApi } from "@/core/openapiClient/index"
import { apiConfig } from "@/core/openapi"

export const putComparisonsIdPublish = async (id: number) => {
  const comparisonsApi = new ComparisonsApi(apiConfig)
  const response = await comparisonsApi.comparisonsComparisonIdPublishPut({
    comparisonId: id
  })
  return response
}
