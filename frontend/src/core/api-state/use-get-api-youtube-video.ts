import { YoutubeApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQuery } from "@tanstack/vue-query"
import { GET_YOUTUBE_VIDEO } from "./query-key"

const UseApiGetYoutubeVideo = (isLogined: boolean) => {
  const youtubeApi = new YoutubeApi(apiConfig)
  return useQuery({
    queryKey: [GET_YOUTUBE_VIDEO],
    queryFn: () => youtubeApi.youtubeVideosGet(),
    enabled: isLogined,
    staleTime: Infinity, // キャッシュ時間無制限。更新する場合はGoogle連携する。
    retry: 3,
  })
}
export default UseApiGetYoutubeVideo
