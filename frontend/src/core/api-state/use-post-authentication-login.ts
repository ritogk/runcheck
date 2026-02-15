import { getApiClient } from "@/core/api-client"
import type { LoginDto } from "@/core/api-types"
import { authToken } from "@/core/auth-token"
import { useQueryClient, useMutation } from "@tanstack/vue-query"
import { GET_STATUS, GET_YOUTUBE_VIDEO } from "./query-key"

export const usePostAuthenticationLogin = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async (request: LoginDto) => {
      const client = await getApiClient()
      const response = await client.login(null, request)
      if (response.data.accessToken) {
        authToken.set(response.data.accessToken)
      }
      return { id: response.data.id, name: response.data.name }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_STATUS], exact: true })
      queryClient.resetQueries({ queryKey: [GET_YOUTUBE_VIDEO], exact: true })
    }
  })
  return mutation
}
