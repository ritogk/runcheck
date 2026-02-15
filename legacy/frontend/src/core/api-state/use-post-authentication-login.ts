import { AuthenticationApi, InlineObject1 } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { authToken } from "@/core/auth-token"
import { useQueryClient, useMutation } from "@tanstack/vue-query"
import { GET_STATUS, GET_YOUTUBE_VIDEO } from "./query-key"

export const usePostAuthenticationLogin = () => {
  const queryClient = useQueryClient()
  const authenticationApi = new AuthenticationApi(apiConfig)

  const mutation = useMutation({
    mutationFn: async (request: InlineObject1) => {
      const response = await authenticationApi.authenticationLoginPostRaw({ inlineObject1: request })
      const json = await response.raw.json()
      if (json.accessToken) {
        authToken.set(json.accessToken)
      }
      return { id: json.id, name: json.name }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_STATUS], exact: true })
      queryClient.resetQueries({ queryKey: [GET_YOUTUBE_VIDEO], exact: true })
    }
  })
  return mutation
}
