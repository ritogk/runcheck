import { InjectionKey, ref, computed, ComputedRef } from "vue"
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
  const _isRead = ref(false)
  const _videos = ref<VideoType[]>([])

  const load = async (): Promise<boolean> => {
    try {
      const res = await _youtubeApi.youtubeVideosGet()
      _isRead.value = true
      _videos.value.splice(0, _videos.value.length, ...res)
      return true
    } catch {
      _isRead.value = false
    }
    return false
  }

  return {
    subscription: {
      read: computed(() => _isRead.value),
      videos: computed(() => _videos.value),
    },
    load: load,
  }
}

export { YoutubeListState }
