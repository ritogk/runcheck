import { test, expect } from "@playwright/test"
import { setupGetMock } from "./core/setup-mock"
import { InlineResponse2004, InlineResponse200, VideoType } from "../src/core/openapiClient"
import { baseUrl } from "@/env"

test("共有した同期結果が表示できる事", async ({ page }) => {
  // 未ログイン、YouTube認証済状態でステータス取得APIをモック
  await setupGetMock<InlineResponse2004>(
    page,
    `${baseUrl}/status`,
    {
      user: { id: 0, name: "" },
      isLogined: false,
      isYoutubeAuthroized: false
    },
    200
  )

  await setupGetMock<InlineResponse200>(
    page,
    `${baseUrl}/comparisons/1`,
    {
      id: 1,
      anonymous: false,
      category: "フィット",
      memo: "Z3の方が前に転がってる気が。",
      title: "作手 z3 vs atr-k",
      video1TimeSt: 8.66324373,
      video1Url: "https://youtu.be/n5MCkGGHikk",
      video1VideoType: VideoType.YOUTUBE,
      video2TimeSt: 12.99734313,
      video2Url: "https://youtu.be/bYKqVGb8VNg",
      video2VideoType: VideoType.YOUTUBE
    },
    200
  )
  await page.goto("/index?comparisonId=1")
  await expect(page.getByRole("button", { name: "同期を解除" })).toBeVisible()
})
