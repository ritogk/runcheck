import { Configuration } from "@/core/openapiClient"
import { baseUrl } from "@/env"
const apiConfig = new Configuration({
  basePath: baseUrl,
  // credentials: 'include',
})

export { apiConfig }
