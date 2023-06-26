import { UsersApi, InlineObject } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useMutation } from "@tanstack/vue-query"

export const usePostApiUsers = () => {
  const usersApi = new UsersApi(apiConfig)

  const mutation = useMutation({
    mutationFn: (request: InlineObject) => usersApi.usersPost({ inlineObject: request })
  })
  return mutation
}
