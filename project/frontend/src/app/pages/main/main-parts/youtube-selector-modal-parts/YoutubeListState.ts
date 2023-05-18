import { ref, computed, ComputedRef } from "vue"
import { YoutubeApi } from "@/core/openapiClient"

type VideoType = {
  title: string
  description: string
  thumbnailUrl: string
  url: string
}

interface IYoutubeListState {
  subscription: {
    isReading: ComputedRef<boolean>
    read: ComputedRef<boolean>
    videos: ComputedRef<VideoType[]>
  }
  load(): Promise<boolean>
}

const YoutubeListState = (): IYoutubeListState => {
  const _youtubeApi = new YoutubeApi()
  const _isRead = ref(false)
  const _isReading = ref(false)
  const _videos = ref<VideoType[]>([])

  const load = async (): Promise<boolean> => {
    _isReading.value = true
    try {
      const res = await _youtubeApi.youtubeVideosGet()
      _isRead.value = true
      _videos.value.splice(0, _videos.value.length, ...res)
      _isReading.value = false
      return true
    } catch {
      _isRead.value = false
      _isReading.value = false
      return false
    }
  }

  return {
    subscription: {
      isReading: computed(() => _isReading.value),
      read: computed(() => _isRead.value),
      videos: computed(() => _videos.value),
    },
    load: load,
  }
}

export { YoutubeListState }
