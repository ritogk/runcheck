import { InjectionKey } from "vue"
import { OpenModalState, IOpenModalState } from "./state/OpenModalState"
import { SaveModalState, ISaveModalState } from "./state/SaveModalState"
import { MemoState } from "./state/MemoState"
import {
  YoutubeSelectorModalState,
  IYoutubeSelectorModalState,
} from "./state/YoutubeSelectorModalState"
import {
  AdjustSpeedModalState,
  IAdjustSpeedModalState,
} from "./state/AdjustSpeedModalState"
import { SyncPlayerState, ISyncPlayerStateType } from "./state/SyncPlayerState"

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
