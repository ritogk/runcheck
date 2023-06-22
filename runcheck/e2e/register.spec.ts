import { test, expect } from "@playwright/test"
import { setupGetMock, setupPostMock } from "./core/setup-mock"
import { InlineResponse2004, User } from "../src/core/openapiClient"
import getOrigin from "./core/get-origin"
import { baseUrl } from "@/env"

test("新規登録後に比較ページに遷移する事", async ({ page }) => {
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
  await page.goto("/register")

  // 新規登録のラベルが表示されている事
  const isTextVisible = await page.isVisible(`text="新規登録"`)
  await expect(isTextVisible).toBe(true)
  // 新規登録に必要な項目を入力
  await page.getByLabel("ハンドルネーム").fill("testユーザー")
  await page.getByLabel("車種").fill("GK5")
  await page.getByLabel("メールアドレス").fill("test@example.com")
  await page.getByPlaceholder("パスワード").fill("P@ssw0rd")
  await page.getByPlaceholder("確認").fill("P@ssw0rd")

  //「新規登録」押下後に実行されるapiのモック
  await setupPostMock<User>(page, `${baseUrl}/users`, { id: 1, name: "testユーザー" }, 200)
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
  // 「新規登録」押下
  await page.getByRole("button", { name: "新規登録" }).click()

  // 待機させないとコケる・・・
  await page.waitForTimeout(300)

  // 比較ページに遷移されている事
  await expect(page.url()).toBe(`${await getOrigin(page)}/index`)
})
