import { getApiClient } from "@/core/api-client"

export const putComparisonsIdPublish = async (id: string) => {
  const client = await getApiClient()
  await client.publishComparison({ id })
}
