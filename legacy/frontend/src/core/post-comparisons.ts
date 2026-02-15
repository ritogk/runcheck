import { ComparisonsApi, VideoType } from "@/core/openapiClient/index"
import { apiConfig } from "@/core/openapi"

export const postComparisons = async (comparison: {
  title: string
  category: string
  memo: string
  anonymous: boolean
  video1EmbedUrl: string
  video1TimeSt: number
  video1VideoType: VideoType
  video2EmbedUrl: string
  video2TimeSt: number
  video2VideoType: VideoType
}) => {
  const comparisonsApi = new ComparisonsApi(apiConfig)
  const response = await comparisonsApi.comparisonsPost({
    videoComparison: {
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
    }
  })
  return response
}
