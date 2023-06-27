import MainPageI from "@/app/pages/main-page-pi.vue"
import { type Meta, type StoryObj, setup } from "@storybook/vue3"
import { UseLoadingState, UseLoadingStateKey } from "@/app/use-loading-state"
import { UseAlretState, UseAlretStateKey } from "@/app/use-alret-state"
import { VueQueryPlugin } from "@tanstack/vue-query"
import { setupGetMocks } from "@/stories/core/setup-mock"
import { InlineResponse2004, InlineResponse2003 } from "@/core/openapiClient"
import { baseUrl } from "@/env"

const statusResponse: InlineResponse2004 = {
  user: { id: 1, name: "aaa" },
  isLogined: true,
  isYoutubeAuthroized: true
}
const youtubeResponse: InlineResponse2003[] = [
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
]
const mocks = [
  { path: `${baseUrl}/status`, response: statusResponse },
  {
    path: `${baseUrl}/youtube/videos`,
    response: youtubeResponse
  }
]
setupGetMocks(mocks)

setup((app) => {
  app.use(VueQueryPlugin)
  const loadingState = UseLoadingState()
  const alretState = UseAlretState()
  app.provide(UseLoadingStateKey, loadingState)
  app.provide(UseAlretStateKey, alretState)
  return
})

const meta: Meta<typeof MainPageI> = {
  title: "pages/main-page-pi(ログイン済, Youtube連携済)",
  component: MainPageI,
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof MainPageI>
export const Default: Story = {
  render: () => ({
    components: { MainPageI: MainPageI },
    template: "<MainPageI/>",
    setup: () => {}
  })
}
