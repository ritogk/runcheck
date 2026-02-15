import { getApiClient } from "@/core/api-client"
import { useQuery } from "@tanstack/vue-query"
import { GET_YOUTUBE_VIDEO } from "./query-key"

export const UseGetYoutubeVideo = (isLogined: boolean) => {
  return useQuery({
    queryKey: [GET_YOUTUBE_VIDEO],
    queryFn: async () => {
      const client = await getApiClient()
      const response = await client.fetchVideos()
      return response.data
    },
    retry: false,
    // enabled: isLogined,
    staleTime: Infinity
  })
}
