import { AuthenticationApi, InlineObject1 } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQueryClient, useMutation } from "@tanstack/vue-query"
import { GET_STATUS, GET_YOUTUBE_VIDEO } from "./query-key"

export const usePostApiAuthenticationLogout = () => {
  const queryClient = useQueryClient()
  const authenticationApi = new AuthenticationApi(apiConfig)

  const mutation = useMutation({
    mutationFn: () => authenticationApi.authenticationLogoutPost(),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [GET_STATUS] })
      queryClient.removeQueries({ queryKey: [GET_YOUTUBE_VIDEO] })
    }
  })
  return mutation
}
