import OpenAPIClientAxios from "openapi-client-axios"
import type { Client } from "@/core/api-types"
import { authToken, youtubeToken } from "@/core/auth-token"
import { baseUrl } from "@/env"

// @ts-ignore - JSON import resolved by Vite alias
import spec from "@openapi/api.json"

// baseUrl includes /api/v1 but spec paths already include it,
// so extract just the origin for the server URL
const serverUrl = baseUrl.replace(/\/api\/v1$/, "") || "/"

const api = new OpenAPIClientAxios({
  definition: spec as any,
  withServer: { url: serverUrl },
})

let clientPromise: Promise<Client> | null = null

export const getApiClient = async (): Promise<Client> => {
  if (!clientPromise) {
    clientPromise = api.getClient<Client>()
    const client = await clientPromise
    client.interceptors.request.use((config) => {
      const token = authToken.get()
      const ytToken = youtubeToken.get()
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`
      }
      if (ytToken) {
        config.headers["x-youtube-access-token"] = ytToken
      }
      return config
    })
  }
  return clientPromise
}
