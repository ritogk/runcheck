import { rest, SetupWorkerApi } from "msw"
import { baseUrl } from "@/env"
export const setupGetMocks = <T>(worker: SetupWorkerApi, path: string, response: any) => {
  worker.use(
    rest.get(`${baseUrl}${path}`, (req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(200), ctx.json(response))
    })
  )
}
