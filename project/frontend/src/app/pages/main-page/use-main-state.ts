import { InjectionKey } from "vue"
import {
  OpenModalState,
  IOpenModalState,
} from "./use-main-state/open-modal-state"
import {
  SaveModalState,
  ISaveModalState,
} from "./use-main-state/save-modal-state"
import { MemoState } from "./use-main-state/memo-state"
import {
  YoutubeSelectorModalState,
  IYoutubeSelectorModalState,
} from "./use-main-state/youtube-selector-modal-state"
import {
  AdjustSpeedModalState,
  IAdjustSpeedModalState,
} from "./use-main-state/adjust-speed-modal-state"
import {
  SyncPlayerState,
  ISyncPlayerStateType,
} from "./use-main-state/sync-player-state"

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
