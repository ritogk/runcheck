import { getApiClient } from "@/core/api-client"
import type { CreateUserDto } from "@/core/api-types"
import { useMutation } from "@tanstack/vue-query"

export const usePostUsers = () => {
  const mutation = useMutation({
    mutationFn: async (request: CreateUserDto) => {
      const client = await getApiClient()
      const response = await client.registerUser(null, request)
      return response.data
    }
  })
  return mutation
}
