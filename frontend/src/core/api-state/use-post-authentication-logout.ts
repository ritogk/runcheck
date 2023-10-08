import { AuthenticationApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQueryClient, useMutation } from "@tanstack/vue-query"
import { GET_STATUS, GET_YOUTUBE_VIDEO, GET_COMPARISONS } from "./query-key"

export const usePostAuthenticationLogout = () => {
  const queryClient = useQueryClient()
  const authenticationApi = new AuthenticationApi(apiConfig)

  const mutation = useMutation({
    mutationFn: () => authenticationApi.authenticationLogoutPost(),
    onSuccess: async () => {
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
