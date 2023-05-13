import { InjectionKey, reactive, computed, ComputedRef, ref } from "vue"
import { YoutubeApi } from "@/core/openapiClient"

type VideoType = {
  title: string
  description: string
  thumbnailUrl: string
  url: string
}

interface IYoutubeListState {
  subscription: {
    read: ComputedRef<boolean>
    videos: ComputedRef<VideoType[]>
  }
  load(): Promise<boolean>
}

const YoutubeListState = (): IYoutubeListState => {
  const _youtubeApi = new YoutubeApi()
  const state = reactive({ read: false, videos: [] as VideoType[] })

  const load = async (): Promise<boolean> => {
    try {
      const res = await _youtubeApi.youtubeVideosGet()
      state.read = true
      state.videos.splice(0, state.videos.length, ...res)
      return true
    } catch {
      state.read = false
    }
    return false
  }

  return {
    subscription: {
      read: computed(() => state.read),
      videos: computed(() => state.videos),
    },
    load: load,
  }
}

export { YoutubeListState }
