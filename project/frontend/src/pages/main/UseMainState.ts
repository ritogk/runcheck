import { ComputedRef, InjectionKey, WritableComputedRef, Ref } from "vue"
import { VideoNo } from "@/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/UseModalState"
import { OpenModalState } from "./state/OpenModalState"
import { SaveModalState } from "./state/SaveModalState"
import { YoutubeSelectorModalState } from "./state/YoutubeSelectorModalState"
import { SyncPlayerState } from "./state/SyncPlayerState"
import { PlayerManager } from "@/pages/main/parts/video-area-parts/libs/PlayerManager"

type UseMainStateType = {
  openModal: {
    open(): void
    close(): void
    subscription: {
      opened: ComputedRef<boolean>
    }
  }
  saveModal: {
    open(): void
    close(): void
    subscription: {
      opened: ComputedRef<boolean>
    }
  }
  youtubeModal: {
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
  syncPlayer: {
    diff: Ref<{ abs: number; own: number; two: number }[]>
    playerOneManager: PlayerManager
    playerTwoManager: PlayerManager
    currentPosition: WritableComputedRef<number>
    switchPlay(): void
    switchMute(): void
    switchRepeat(): void
    adjustSpeed(speed: number): void
    reload(): void
    runSync(): void
    stopSync(): void
    enableSync(): void
    disableSync(): void
    seekTo(progressRate: number): Promise<void>
    subscription: {
      playing: ComputedRef<boolean>
      muted: ComputedRef<boolean>
      repeated: ComputedRef<boolean>
      speed: ComputedRef<number>
      synced: ComputedRef<boolean>
      progressRate: ComputedRef<number>
      duration: ComputedRef<number>
    }
  }
}

const UseMainState = (): UseMainStateType => {
  return {
    openModal: new OpenModalState(),
    saveModal: new SaveModalState(),
    youtubeModal: new YoutubeSelectorModalState(),
    syncPlayer: new SyncPlayerState(),
  }
}

const UseMainStateKey: InjectionKey<UseMainStateType> =
  Symbol("UseMainStateType")
export { UseMainState, UseMainStateKey, UseMainStateType }
