import { setupWorker, rest } from "msw"

export const setupGetMocks = (mocks: { path: string; response: any }[]) => {
  const worker = setupWorker(
    ...mocks.map((x) => {
      return rest.get(x.path, (req, res, ctx) => {
        return res(ctx.json(x.response))
      })
    })
  )
  worker.start()
}
