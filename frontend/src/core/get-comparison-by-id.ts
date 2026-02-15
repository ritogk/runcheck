import { getApiClient } from "@/core/api-client"

export const getComparisonById = async (id: string) => {
  const client = await getApiClient()
  const response = await client.findComparison({ id })
  return response.data
}
