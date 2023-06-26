import { StatusApi } from "@/core/openapiClient"
import { apiConfig } from "@/core/openapi"
import { useQuery, useQueryClient } from "@tanstack/vue-query"
import { GET_STATUS } from "./query-key"

const UseApiGetStatus = () => {
  const statusApi = new StatusApi(apiConfig)
  return useQuery({
    queryKey: [GET_STATUS],
    queryFn: () => statusApi.statusGet(),
    staleTime: Infinity,
    retry: 3
  })
}
export default UseApiGetStatus

// export const refreshCache = () => {
//   const queryClient = useQueryClient() // こいつはsetup内でしか呼び出せないらしい。って事は呼び出し元
//   queryClient.invalidateQueries({ queryKey: [GET_YOUTUBE_VIDEO] })
// }
