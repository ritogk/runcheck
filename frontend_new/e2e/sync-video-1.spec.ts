import { test, expect } from "@playwright/test"
import { setupGetMock } from "./core/setup-mock"
import { InlineResponse2004 } from "../src/core/openapiClient"
import { baseUrl } from "@/env"

test("未ログイン状態で、player1をYoutubeをURL直入力し、player2にローカル動画を選択した状態で同期が行える事", async ({
  page
}) => {
  // 未ログイン状態のステータス取得APIをモック
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
  await page.goto("/app/index")

  const playerOneLocator = await page.locator("#player-one")
  // YotTubeのURLを入力してENTER押下
  await playerOneLocator
    .getByLabel("YouTube", { exact: true })
    .fill(
      "https://www.youtube.com/watch?v=2yt_BNky6Kg&ab_channel=%E3%81%BB%E3%81%BFcar%2Fpuyopuyo%2Fprogram"
    )
  await playerOneLocator.getByLabel("YouTube", { exact: true }).press("Enter")

  const playerTwoLocator = await page.locator("#player-two")

  // Local動画を選択
  await playerTwoLocator
    .locator('input[type="file"]')
    .setInputFiles(`${__dirname}/files/hiroyuki.webm`)

  // 待機させないと同期が失敗する
  await page.waitForTimeout(5000)

  // 「動画を同期」を押下
  await page.getByRole("button", { name: "動画を同期" }).click()

  // 「動画を同期」ボタンが表示されている事
  await expect(page.getByRole("button", { name: "同期を解除" })).toBeVisible()

  // player1とplayer2の調整エリアが隠れている事(一旦YouTube入力欄が非表示されているかでチェックする)
  await expect(playerOneLocator.getByLabel("YouTube", { exact: true })).toBeVisible({
    visible: false
  })
  await expect(playerTwoLocator.getByLabel("YouTube", { exact: true })).toBeVisible({
    visible: false
  })
})
