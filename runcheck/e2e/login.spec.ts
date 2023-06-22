import { test, expect } from "@playwright/test"
import { setupGetMock, setupPostMock } from "./core/setup-mock"
import { InlineResponse2004, User } from "../src/core/openapiClient"
import getOrigin from "./core/get-origin"
import { baseUrl } from "@/env"

test("ログイン後に比較画面に遷移する事", async ({ page }) => {
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
  await page.goto("/login")

  // ログインのラベルが表示されている事
  await expect(await page.isVisible(`text="ログイン"`)).toBe(true)

  // ログインに必要な項目を入力
  await page.getByLabel("メールアドレス").fill("test@test.example")
  await page.click('label:has-text("パスワード")')
  await page.keyboard.type("P@ssw0rd")

  //「ログイン」押下後に実行されるapiのモック
  await setupPostMock<User>(
    page,
    `${baseUrl}/authentication/login`,
    { id: 1, name: "testユーザー" },
    200
  )
  await setupGetMock<InlineResponse2004>(
    page,
    `${baseUrl}/status`,
    {
      user: { id: 1, name: "testユーザー" },
      isLogined: true,
      isYoutubeAuthroized: false
    },
    200
  )
  // 「ログイン」押下
  await page.getByRole("button", { name: "ログイン" }).click()

  // 待機させないとコケる・・・
  await page.waitForTimeout(300)

  // 比較ページに遷移されている事
  await expect(page.url()).toBe(`${await getOrigin(page)}/index`)
})
