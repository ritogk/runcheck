import { test, expect } from "@playwright/test"
import { setupGetMock } from "./core/setup-mock"
import { InlineResponse2004, InlineResponse2003 } from "../src/core/openapiClient"
import { baseUrl } from "@/env"

test("未ログイン状態で、モーダルからYouTube動画を選択した状態で同期が行える事", async ({
  page
}) => {
  // 未ログイン、YouTube認証済状態でステータス取得APIをモック
  await setupGetMock<InlineResponse2004>(
    page,
    `${baseUrl}/status`,
    {
      user: { id: 0, name: "" },
      isLogined: false,
      isYoutubeAuthroized: true
    },
    200
  )

  await setupGetMock<InlineResponse2003[]>(
    page,
    `${baseUrl}/youtube/videos`,
    [
      {
        description:
          "・タイヤ\nフロント:195/50R15 advan a052\nリア:205/50R15 Direzza Z3\n\n・気温\n28℃\n\n・その他\nガソリン満タン\n助手席あり",
        thumbnailUrl: "https://i.ytimg.com/vi/QYb_AvOGuKQ/default.jpg",
        title: "21/10/02 YZサーキット FIT GK5 37.858",
        url: "https://www.youtube.com/embed/QYb_AvOGuKQ"
      },
      {
        description:
          "逆走は踏めて楽しい。\n\n・タイヤ\nフロント:255/50R15 ATR-K\nリア:195/50R15 Direzza Z3\n\n・気温\n13℃\n\n・空気圧\nフロント:2.0\nリア:1.8",
        thumbnailUrl: "https://i.ytimg.com/vi/wM8l4YFbMsw/default.jpg",
        title: "20/12/26 美浜サーキット(逆走) FIT GK5 48.273",
        url: "https://www.youtube.com/embed/wM8l4YFbMsw"
      }
    ],
    200
  )
  await page.goto("/index")

  const playerOneLocator = await page.locator("#player-one")
  // 「YouTube動画検索」を押下
  await playerOneLocator.getByTitle("YouTube動画選択").click()
  // 「美浜サーキット」を含むボタンを押下
  await page.getByRole("button", { name: "美浜サーキット" }).click()

  const playerTwoLocator = await page.locator("#player-two")
  // 「YouTube動画検索」を押下
  await playerTwoLocator.getByTitle("YouTube動画選択").click()
  // 「美浜サーキット」を含むボタンを押下
  await page.getByRole("button", { name: "YZサーキット" }).click()

  // 待機させないと同期が失敗する
  await page.waitForTimeout(1500)

  // 「動画を同期」を押下
  await page.getByRole("button", { name: "動画を同期" }).click()

  // 「同期を解除」ボタンが表示されている事
  await expect(page.getByRole("button", { name: "同期を解除" })).toBeVisible()

  // player1とplayer2の調整エリアが隠れている事(一旦YouTube入力欄が非表示されているかでチェックする)
  await expect(playerOneLocator.getByLabel("YouTube", { exact: true })).toBeVisible({
    visible: false
  })
  await expect(playerTwoLocator.getByLabel("YouTube", { exact: true })).toBeVisible({
    visible: false
  })
})
