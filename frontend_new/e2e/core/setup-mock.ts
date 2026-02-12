import { Page } from "@playwright/test"

export const setupGetMock = async <T>(page: Page, path: string, response: T, status: number) => {
  await page.route(path, async (route) => {
    const method = route.request().method()
    if ("GET" === method) {
      await route.fulfill({
        status: status,
        contentType: "application/json",
        json: response
      })
    }
  })
}

export const setupPostMock = async <T>(page: Page, path: string, response: T, status: number) => {
  await page.route(path, async (route) => {
    const method = route.request().method()
    if ("POST" === method) {
      await route.fulfill({
        status: status,
        contentType: "application/json",
        json: response
      })
    }
  })
}
