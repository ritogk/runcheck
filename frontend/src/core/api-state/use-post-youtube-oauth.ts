import { getApiClient } from "@/core/api-client"
import { youtubeToken } from "@/core/auth-token"
import { useQueryClient, useMutation } from "@tanstack/vue-query"
import { GET_YOUTUBE_VIDEO } from "./query-key"

export const usePostYoutubeOauth = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (code: string) => {
      const client = await getApiClient()
      const response = await client.exchangeToken(null, { code })
      if (response.data.accessToken) {
        youtubeToken.set(response.data.accessToken)
      }
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_YOUTUBE_VIDEO], exact: true })
    }
  })
  return mutation
}
