import { computed, ref, ComputedRef } from "vue"
import { VideoNo } from "@/app/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/UseModalState"
import { localStorageKeys } from "@/core/localstorageKey"

export interface IYoutubeSelectorModalState {
  open(videoNo: VideoNo): void
  close(): void
  select(url: string): void
  load(): void
  save(): void
  subscription: {
    opened: ComputedRef<boolean>
    currentVideoNo: ComputedRef<VideoNo>
    selectUrl: ComputedRef<string>
  }
}
export class YoutubeSelectorModalState implements IYoutubeSelectorModalState {
  private _opened = ref(false)
  private _currentVideoNo = ref(VideoNo.NONE)
  private _selectUrl = ref("")

  open = (videoNo: VideoNo): void => {
    this._opened.value = true
    this._currentVideoNo.value = videoNo
  }

  close = () => {
    this._opened.value = false
    this._currentVideoNo.value = VideoNo.NONE
  }

  select = (url: string) => {
    this._selectUrl.value = url
  }

  load = () => {
    const storage = localStorage.getItem(
      localStorageKeys.YOUTUBE_SELECT_MODAL_STATE
    )
    if (storage) {
      const item = <{ videoNo: VideoNo; opened: boolean }>JSON.parse(storage)
      this._opened.value = item.opened
      this._currentVideoNo.value = item.videoNo
    }
  }

  save = () => {
    localStorage.setItem(
      localStorageKeys.YOUTUBE_SELECT_MODAL_STATE,
      JSON.stringify({ videoNo: this._currentVideoNo.value, opened: true })
    )
  }

  subscription = {
    opened: computed(() => {
      return this._opened.value
    }),
    currentVideoNo: computed(() => {
      return this._currentVideoNo.value
    }),
    selectUrl: computed(() => {
      return this._selectUrl.value
    }),
  }
}
