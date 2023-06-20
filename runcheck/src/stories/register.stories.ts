import RegisterPageI from "@/app/pages/register-page-i.vue"
import { Meta, StoryObj, setup } from "@storybook/vue3"
import { UseLoadingState, UseLoadingStateKey } from "@/app/use-loading-state"
import { UseUserState, UseUserStateKey } from "@/app/use-user-state"
import { UseAlretState, UseAlretStateKey } from "@/app/use-alret-state"

type Story = StoryObj<typeof RegisterPageI>

const meta: Meta<typeof RegisterPageI> = {
  title: "pages/register-page-i",
  component: RegisterPageI
}

setup((app) => {
  const loadingState = UseLoadingState()
  const userState = UseUserState()
  const alretState = UseAlretState()
  app.provide(UseLoadingStateKey, loadingState)
  app.provide(UseUserStateKey, userState)
  app.provide(UseAlretStateKey, alretState)
  return
})

export const Default: Story = {
  render: (args) => ({
    components: { RegisterPageI: RegisterPageI },
    setup() {
      return { args }
    },
    template: "<RegisterPageI/>"
  })
}

export default meta
