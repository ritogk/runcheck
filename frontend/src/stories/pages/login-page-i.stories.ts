import LoginPageI from "@/app/pages/login-page-i.vue"
import { type Meta, type StoryObj, setup } from "@storybook/vue3"
import { UseLoadingState, UseLoadingStateKey } from "@/app/use-loading-state"
import { UseAlretState, UseAlretStateKey } from "@/app/use-alret-state"

type Story = StoryObj<typeof LoginPageI>

setup((app) => {
  const loadingState = UseLoadingState()
  const alretState = UseAlretState()
  app.provide(UseLoadingStateKey, loadingState)
  app.provide(UseAlretStateKey, alretState)
  return
})

const meta: Meta<typeof LoginPageI> = {
  title: "pages/login-page-i",
  component: LoginPageI,
  render: (args) => ({
    components: { LoginPageI },
    setup() {
      return { args }
    },
    template: "<LoginPageI/>"
  })
}

export const Default: Story = {}

export default meta
