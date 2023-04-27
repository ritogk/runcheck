import { InjectionKey, reactive, computed, ComputedRef } from "vue"

enum VideoNo {
  ONE,
  TWO,
  NONE,
}

type UseYoutubeSelectModalStateType = {
  subscription: ComputedRef<{ videoNo: VideoNo; opened: boolean }>
  open(videoNo: VideoNo): void
  close(): void
}

const UseYoutubeSelectModalState = (): UseYoutubeSelectModalStateType => {
  const state = reactive({ videoNo: VideoNo.NONE, opened: false })

  const open = (videoNo: VideoNo) => {
    state.videoNo = videoNo
    state.opened = true
  }

  const close = () => {
    state.videoNo = VideoNo.NONE
    state.opened = false
  }

  return {
    subscription: computed(() => state),
    open: open,
    close: close,
  }
}

const UseYoutubeSelectModalStateKey: InjectionKey<UseYoutubeSelectModalStateType> =
  Symbol("UseYoutubeSelectModalState")

export {
  UseYoutubeSelectModalState,
  UseYoutubeSelectModalStateKey,
  UseYoutubeSelectModalStateType,
  VideoNo,
}
