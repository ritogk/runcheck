import { getApiClient } from "@/core/api-client"
import { authToken, youtubeToken } from "@/core/auth-token"
import { useQueryClient, useMutation } from "@tanstack/vue-query"
import { GET_STATUS, GET_YOUTUBE_VIDEO, GET_COMPARISONS } from "./query-key"

export const usePostAuthenticationLogout = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async () => {
      const client = await getApiClient()
      await client.logout()
    },
    onSuccess: async () => {
      authToken.clear()
      youtubeToken.clear()
      await queryClient.invalidateQueries({ queryKey: [GET_STATUS], exact: true })
      await queryClient.resetQueries({
        queryKey: [GET_YOUTUBE_VIDEO],
        exact: true
      })
      await queryClient.resetQueries({
        queryKey: [GET_COMPARISONS],
        exact: true
      })
    }
  })
  return mutation
}
