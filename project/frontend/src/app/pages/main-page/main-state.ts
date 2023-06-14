import { InjectionKey } from "vue"
import { ModalOpenState, IModalOpenState } from "./main-state/modal-open-state"
import { ModalSaveState, IModalSaveState } from "./main-state/modal-save-state"
import { MemoState } from "./main-state/memo-state"
import {
  ModalYoutubeSelectorState,
  IModalYoutubeSelectorState,
} from "./main-state/modal-youtube-selector-state"
import {
  ModalAdjustSpeedState,
  IModalAdjustSpeedState,
} from "./main-state/modal-adjust-speed-state"
import {
  SyncPlayerState,
  ISyncPlayerStateType,
} from "./main-state/sync-player-state"

type UseMainStateType = {
  openModal: IModalOpenState
  saveModal: IModalSaveState
  memo: MemoState
  youtubeModal: IModalYoutubeSelectorState
  adjustSpeedModal: IModalAdjustSpeedState
  syncPlayer: ISyncPlayerStateType
}

const UseMainState = (): UseMainStateType => {
  return {
    openModal: new ModalOpenState(),
    saveModal: new ModalSaveState(),
    memo: new MemoState(),
    youtubeModal: new ModalYoutubeSelectorState(),
    adjustSpeedModal: new ModalAdjustSpeedState(),
    syncPlayer: new SyncPlayerState(),
  }
}

const UseMainStateKey: InjectionKey<UseMainStateType> =
  Symbol("UseMainStateType")
export { UseMainState, UseMainStateKey, UseMainStateType }
