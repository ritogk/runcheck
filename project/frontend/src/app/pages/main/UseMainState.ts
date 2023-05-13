import { InjectionKey } from "vue"
import {
  OpenModalState,
  IOpenModalState,
} from "./use-main-state-parts/OpenModalState"
import {
  SaveModalState,
  ISaveModalState,
} from "./use-main-state-parts/SaveModalState"
import { MemoState } from "./use-main-state-parts/MemoState"
import {
  YoutubeSelectorModalState,
  IYoutubeSelectorModalState,
} from "./use-main-state-parts/YoutubeSelectorModalState"
import {
  AdjustSpeedModalState,
  IAdjustSpeedModalState,
} from "./use-main-state-parts/AdjustSpeedModalState"
import {
  SyncPlayerState,
  ISyncPlayerStateType,
} from "./use-main-state-parts/SyncPlayerState"

type UseMainStateType = {
  openModal: IOpenModalState
  saveModal: ISaveModalState
  memo: MemoState
  youtubeModal: IYoutubeSelectorModalState
  adjustSpeedModal: IAdjustSpeedModalState
  syncPlayer: ISyncPlayerStateType
}

const UseMainState = (): UseMainStateType => {
  return {
    openModal: new OpenModalState(),
    saveModal: new SaveModalState(),
    memo: new MemoState(),
    youtubeModal: new YoutubeSelectorModalState(),
    adjustSpeedModal: new AdjustSpeedModalState(),
    syncPlayer: new SyncPlayerState(),
  }
}

const UseMainStateKey: InjectionKey<UseMainStateType> =
  Symbol("UseMainStateType")
export { UseMainState, UseMainStateKey, UseMainStateType }
