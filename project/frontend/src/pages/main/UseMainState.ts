import { ComputedRef, InjectionKey, WritableComputedRef, Ref } from "vue"
import { VideoNo } from "@/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/UseModalState"
import { OpenModalState, IOpenModalState } from "./state/OpenModalState"
import { SaveModalState, ISaveModalState } from "./state/SaveModalState"
import {
  YoutubeSelectorModalState,
  IYoutubeSelectorModalState,
} from "./state/YoutubeSelectorModalState"
import {
  AdjustSpeedModalState,
  IAdjustSpeedModalState,
} from "./state/AdjustSpeedModalState"
import { SyncPlayerState, ISyncPlayerStateType } from "./state/SyncPlayerState"
import { PlayerManager } from "@/pages/main/parts/video-area-parts/libs/PlayerManager"

type UseMainStateType = {
  openModal: IOpenModalState
  saveModal: ISaveModalState
  youtubeModal: IYoutubeSelectorModalState
  adjustSpeedModal: IAdjustSpeedModalState
  syncPlayer: ISyncPlayerStateType
}

const UseMainState = (): UseMainStateType => {
  return {
    openModal: new OpenModalState(),
    saveModal: new SaveModalState(),
    youtubeModal: new YoutubeSelectorModalState(),
    adjustSpeedModal: new AdjustSpeedModalState(),
    syncPlayer: new SyncPlayerState(),
  }
}

const UseMainStateKey: InjectionKey<UseMainStateType> =
  Symbol("UseMainStateType")
export { UseMainState, UseMainStateKey, UseMainStateType }
