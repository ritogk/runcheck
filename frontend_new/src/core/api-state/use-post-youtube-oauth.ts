import { YoutubeApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { youtubeToken } from "@/core/auth-token"
import { useQueryClient, useMutation } from "@tanstack/vue-query"
import { GET_YOUTUBE_VIDEO } from "./query-key"

export const usePostYoutubeOauth = () => {
  const queryClient = useQueryClient()
  const youtubeApi = new YoutubeApi(apiConfig)

  const mutation = useMutation({
    mutationFn: async (code: string) => {
      const response = await youtubeApi.youtubeOauthPostRaw({ inlineObject2: { code: code } })
      const json = await response.raw.json()
      if (json.accessToken) {
        youtubeToken.set(json.accessToken)
      }
      return json
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_YOUTUBE_VIDEO], exact: true })
    }
  })
  return mutation
}
