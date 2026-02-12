import { Page } from "@playwright/test"

export default async (page: Page): Promise<string> => {
  return new URL(await page.url()).origin
}
