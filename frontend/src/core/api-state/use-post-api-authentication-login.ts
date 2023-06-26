import { AuthenticationApi, InlineObject1 } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQueryClient, useMutation } from "@tanstack/vue-query"
import { GET_STATUS } from "./query-key"

export const usePostApiAuthenticationLogin = () => {
  const queryClient = useQueryClient()
  const authenticationApi = new AuthenticationApi(apiConfig)

  const mutation = useMutation({
    mutationFn: (request: InlineObject1) =>
      authenticationApi.authenticationLoginPost({ inlineObject1: request }),
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [GET_STATUS] })
    }
  })
  return mutation
}