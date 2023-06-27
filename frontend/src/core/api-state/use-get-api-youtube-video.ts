import { YoutubeApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQuery } from "@tanstack/vue-query"
import { GET_YOUTUBE_VIDEO } from "./query-key"

const UseApiGetYoutubeVideo = (isLogined: boolean) => {
  const youtubeApi = new YoutubeApi(apiConfig)
  return useQuery({
    queryKey: [GET_YOUTUBE_VIDEO],
    queryFn: () => youtubeApi.youtubeVideosGet(),
    retry: false,
    enabled: isLogined,
    staleTime: Infinity
  })
}
export default UseApiGetYoutubeVideo
