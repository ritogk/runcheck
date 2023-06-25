import RegisterPageI from "@/app/pages/register-page-i.vue"
import { type Meta, type StoryObj, setup } from "@storybook/vue3"
import { UseLoadingState, UseLoadingStateKey } from "@/app/use-loading-state"
import { UseUserState, UseUserStateKey } from "@/app/use-user-state"
import { UseAlretState, UseAlretStateKey } from "@/app/use-alret-state"
import { userEvent, within } from "@storybook/testing-library"

type Story = StoryObj<typeof RegisterPageI>

setup((app) => {
  const loadingState = UseLoadingState()
  const userState = UseUserState()
  const alretState = UseAlretState()
  app.provide(UseLoadingStateKey, loadingState)
  app.provide(UseUserStateKey, userState)
  app.provide(UseAlretStateKey, alretState)
  return
})

const meta: Meta<typeof RegisterPageI> = {
  title: "pages/register-page-i",
  component: RegisterPageI,
  render: (args) => ({
    components: { RegisterPageI },
    setup() {
      return { args }
    },
    template: "<RegisterPageI/>"
  })
}

export const Default: Story = {}

export const Validation: Story = {
  render: (args) => ({
    components: { RegisterPageI: RegisterPageI },
    setup() {
      return { args }
    },
    template: `<p class="text-sm">パスワードと確認パスワードが相違</p>
              <RegisterPageI/>`
  }),
  //name: "",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    const hundleNameInput = canvas.getByText("ハンドルネーム")
    const carTypeInput = canvas.getByText("車種")
    const emailInput = canvas.getByText("メールアドレス")
    const passwordInput = canvas.getByPlaceholderText("パスワード")
    const passwordConfirmInput = canvas.getByPlaceholderText("確認") as HTMLInputElement

    await userEvent.type(hundleNameInput, "ryoji")
    await userEvent.type(carTypeInput, "gk5")
    await userEvent.type(emailInput, "homing0321r4cfw@yahoo.co.jp")
    await userEvent.type(passwordInput, "P@ssw0rd")
    await userEvent.type(passwordConfirmInput, "P@ssw0rd1")
    const submitButton = canvas.getByRole("button", { name: "新規登録" })
    await userEvent.click(submitButton)
  }
}

export default meta
