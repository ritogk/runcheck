import MainPageI from "@/app/pages/main-page-pi.vue"
import { type Meta, type StoryObj, setup } from "@storybook/vue3"
import { UseLoadingState, UseLoadingStateKey } from "@/app/use-loading-state"
import { UseAlretState, UseAlretStateKey } from "@/app/use-alret-state"
import { VueQueryPlugin } from "@tanstack/vue-query"
import { setupGetMocks } from "@/stories/core/setup-mock"
import type { YoutubeVideoDto, StatusResponseDto } from "@/core/api-types"

setup((app) => {
  app.use(VueQueryPlugin)
  const loadingState = UseLoadingState()
  const alretState = UseAlretState()
  app.provide(UseLoadingStateKey, loadingState)
  app.provide(UseAlretStateKey, alretState)

  const worker = window.msw.worker
  const statusResponse: StatusResponseDto = {
    user: { id: "1", name: "aaa" },
    isLogined: true,
    isYoutubeAuthroized: true
  }
  setupGetMocks(worker, "/status", statusResponse)

  const youtubeResponse: YoutubeVideoDto[] = [
    {
      description:
        "\u30FB\u30BF\u30A4\u30E4\n\u30D5\u30ED\u30F3\u30C8:195/50R15 advan a052\n\u30EA\u30A2:205/50R15 Direzza Z3\n\n\u30FB\u6C17\u6E29\n28\u2103\n\n\u30FB\u305D\u306E\u4ED6\n\u30AC\u30BD\u30EA\u30F3\u6E80\u30BF\u30F3\n\u52A9\u624B\u5E2D\u3042\u308A",
      thumbnailUrl: "https://i.ytimg.com/vi/QYb_AvOGuKQ/default.jpg",
      title: "21/10/02 YZ\u30B5\u30FC\u30AD\u30C3\u30C8 FIT GK5 37.858",
      url: "https://www.youtube.com/embed/QYb_AvOGuKQ"
    },
    {
      description:
        "\u9006\u8D70\u306F\u8E0F\u3081\u3066\u697D\u3057\u3044\u3002\n\n\u30FB\u30BF\u30A4\u30E4\n\u30D5\u30ED\u30F3\u30C8:255/50R15 ATR-K\n\u30EA\u30A2:195/50R15 Direzza Z3\n\n\u30FB\u6C17\u6E29\n13\u2103\n\n\u30FB\u7A7A\u6C17\u5727\n\u30D5\u30ED\u30F3\u30C8:2.0\n\u30EA\u30A2:1.8",
      thumbnailUrl: "https://i.ytimg.com/vi/wM8l4YFbMsw/default.jpg",
      title: "20/12/26 \u7F8E\u6D5C\u30B5\u30FC\u30AD\u30C3\u30C8(\u9006\u8D70) FIT GK5 48.273",
      url: "https://www.youtube.com/embed/wM8l4YFbMsw"
    }
  ]
  setupGetMocks(worker, "/youtube/videos", youtubeResponse)
  return
})

const meta: Meta<typeof MainPageI> = {
  title: "pages/main-page-pi(\u30ED\u30B0\u30A4\u30F3\u6E08, Youtube\u9023\u643A\u6E08)",
  component: MainPageI,
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof MainPageI>
export const Default: Story = {
  render: () => ({
    components: { MainPageI: MainPageI },
    template: `<MainPageI/>`,
    setup: () => {}
  })
}
