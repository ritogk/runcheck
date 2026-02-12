import { Configuration, Middleware, FetchParams, RequestContext } from "@/core/openapiClient"
import { baseUrl } from "@/env"
import { authToken, youtubeToken } from "@/core/auth-token"

const authMiddleware: Middleware = {
  async pre(context: RequestContext): Promise<FetchParams | void> {
    const token = authToken.get()
    const ytToken = youtubeToken.get()
    const headers: Record<string, string> = {}

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }
    if (ytToken) {
      headers["x-youtube-access-token"] = ytToken
    }

    if (Object.keys(headers).length > 0) {
      return {
        url: context.url,
        init: {
          ...context.init,
          headers: {
            ...context.init.headers,
            ...headers,
          },
        },
      }
    }
  },
}

const apiConfig = new Configuration({
  basePath: baseUrl,
  middleware: [authMiddleware],
})

export { apiConfig }
