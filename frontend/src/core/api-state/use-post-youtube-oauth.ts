import { YoutubeApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQueryClient, useMutation } from "@tanstack/vue-query"
import { GET_YOUTUBE_VIDEO } from "./query-key"

export const usePostYoutubeOauth = () => {
  const queryClient = useQueryClient()
  const youtubeApi = new YoutubeApi(apiConfig)

  const mutation = useMutation({
    mutationFn: (code: string) => youtubeApi.youtubeOauthPost({ inlineObject2: { code: code } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_YOUTUBE_VIDEO], exact: true })
    }
  })
  return mutation
}
