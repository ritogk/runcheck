import MainPageI from "@/app/pages/main-page-pi.vue"
import { Meta, StoryObj, setup } from "@storybook/vue3"
import { UseLoadingState, UseLoadingStateKey } from "@/app/use-loading-state"
import { UseUserState, UseUserStateKey } from "@/app/use-user-state"
import { UseAlretState, UseAlretStateKey } from "@/app/use-alret-state"
import { VueQueryPlugin } from '@tanstack/vue-query'

type Story = StoryObj<typeof MainPageI>

setup((app) => {
  app.use(VueQueryPlugin)
  const loadingState = UseLoadingState()
  const userState = UseUserState()
  const alretState = UseAlretState()
  app.provide(UseLoadingStateKey, loadingState)
  app.provide(UseUserStateKey, userState)
  app.provide(UseAlretStateKey, alretState)
  return
})

const meta: Meta<typeof MainPageI> = {
  title: "pages/main-page-pi",
  component: MainPageI,
  tags: ["autodocs"],
  render: () => ({
    components: { MainPageI: MainPageI },
    template: "<MainPageI/>"
  })
}

// 同期後の画

export const Default: Story = {}

export default meta