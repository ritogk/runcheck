import HomePageI from "@/app/pages/home-page-i.vue"
import { type Meta, type StoryObj, setup } from "@storybook/vue3"
import { UseLoadingState, UseLoadingStateKey } from "@/app/use-loading-state"
import { setupGetMocks } from "@/stories/core/setup-mock"
import { VueQueryPlugin } from "@tanstack/vue-query"
import { InlineResponse200, VideoType } from "@/core/openapiClient"
import { baseUrl } from "@/env"

const comparisonsResponse: InlineResponse200[] = [
  {
    id: 12,
    title: "\u3051\u3093\u307d\u30fc\u3055\u3093\u6bd4\u8f03(\u7f8e\u6d5c)",
    memo: "\u7f8e\u6d5c",
    category: "\u30d5\u30a3\u30c3\u30c8",
    video1Url: "https://youtu.be/nLKSSdMWZ8g",
    video1TimeSt: 15.3,
    video1VideoType: VideoType.YOUTUBE,
    video2Url: "https://youtu.be/m7JMzHjsrss",
    video2TimeSt: 23.83570244,
    video2VideoType: VideoType.YOUTUBE,
    anonymous: false
  },
  {
    id: 13,
    title: "\u4f5c\u624b z3 vs atr-k",
    memo: "Z3\u306e\u65b9\u304c\u524d\u306b\u8ee2\u304c\u3063\u3066\u308b\u6c17\u304c\u3002",
    category: "\u30d5\u30a3\u30c3\u30c8",
    video1Url: "https://youtu.be/n5MCkGGHikk",
    video1TimeSt: 8.66324373,
    video1VideoType: VideoType.YOUTUBE,
    video2Url: "https://youtu.be/bYKqVGb8VNg",
    video2TimeSt: 12.99734313,
    video2VideoType: VideoType.YOUTUBE,
    anonymous: false
  }
]
const mocks = [
  {
    path: `${baseUrl}/comparisons`,
    response: comparisonsResponse
  }
]
setupGetMocks(mocks)

setup((app) => {
  app.use(VueQueryPlugin)
  const loadingState = UseLoadingState()
  app.provide(UseLoadingStateKey, loadingState)
  return
})

const meta: Meta<typeof HomePageI> = {
  title: "pages/home-page-i",
  component: HomePageI,
  tags: ["autodocs"]
}
export default meta

type Story = StoryObj<typeof HomePageI>
export const Default: Story = {
  render: () => ({
    components: { HomePageI: HomePageI },
    template: `<p class="text-sm">モックの関係でF5更新してから開き直して下さい。</p>
              <HomePageI/>`,
    setup: () => {}
  })
}
