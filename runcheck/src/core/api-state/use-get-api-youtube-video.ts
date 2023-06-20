import { YoutubeApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQuery, useQueryClient } from "@tanstack/vue-query"
import { GET_YOUTUBE_VIDEO } from "./query-key"

const UseApiGetYoutubeVideo = (isLogined: boolean) => {
  const youtubeApi = new YoutubeApi(apiConfig)
  return useQuery({
    queryKey: [GET_YOUTUBE_VIDEO],
    queryFn: () => youtubeApi.youtubeVideosGet(),
    enabled: isLogined,
    staleTime: Infinity, // キャッシュ時間無制限 ※一旦画面更新するまでキャッシュを有効化させる
    retry: 3,
  })
}
export default UseApiGetYoutubeVideo

// export const refreshCache = () => {
//   const queryClient = useQueryClient() // こいつはsetup内でしか呼び出せないらしい。って事は呼び出し元
//   queryClient.invalidateQueries({ queryKey: [GET_YOUTUBE_VIDEO] })
// }
