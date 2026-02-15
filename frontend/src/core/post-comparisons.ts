import { getApiClient } from "@/core/api-client"
import type { CreateComparisonDto } from "@/core/api-types"

export const postComparisons = async (comparison: {
  title: string
  category: string
  memo: string
  anonymous: boolean
  video1EmbedUrl: string
  video1TimeSt: number
  video1VideoType: CreateComparisonDto["video1VideoType"]
  video2EmbedUrl: string
  video2TimeSt: number
  video2VideoType: CreateComparisonDto["video2VideoType"]
}) => {
  const client = await getApiClient()
  const response = await client.createComparison(null, {
    title: comparison.title,
    category: comparison.category,
    memo: comparison.memo,
    anonymous: comparison.anonymous,
    video1Url: comparison.video1EmbedUrl,
    video1TimeSt: comparison.video1TimeSt,
    video1VideoType: comparison.video1VideoType,
    video2Url: comparison.video2EmbedUrl,
    video2TimeSt: comparison.video2TimeSt,
    video2VideoType: comparison.video2VideoType
  })
  return response.data
}
