import { AuthenticationApi, InlineObject1 } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQueryClient, useMutation } from "@tanstack/vue-query"
import { GET_STATUS } from "./query-key"

export const usePostApiAuthenticationLogout = () => {
  const queryClient = useQueryClient()
  const authenticationApi = new AuthenticationApi(apiConfig)

  const mutation = useMutation({
    mutationFn: () => authenticationApi.authenticationLogoutPost(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_STATUS] })
    }
  })
  return mutation
}
