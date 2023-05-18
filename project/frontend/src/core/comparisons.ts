import { ComparisonsApi } from "@/core/openapiClient"
const comparisonsApi = new ComparisonsApi()

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
