import { computed, ref, ComputedRef } from "vue"
import { localStorageKeys } from "@/core/localstorage-key"

export interface IModalYoutubeSelectorState {
  open(playerNo: PlayerNo): void
  close(): void
  load(): void
  save(): void
  subscription: {
    opened: ComputedRef<boolean>
    currentPlayerNo: ComputedRef<PlayerNo>
  }
}

export class ModalYoutubeSelectorState implements IModalYoutubeSelectorState {
  private _opened = ref(false)
  private _currentPlayerNo = ref(PlayerNo.NONE)

  open = (playerNo: PlayerNo): void => {
    this._opened.value = true
    this._currentPlayerNo.value = playerNo
  }

  close = () => {
    this._opened.value = false
    this._currentPlayerNo.value = PlayerNo.NONE
  }

  load = () => {
    const storage = localStorage.getItem(
      localStorageKeys.YOUTUBE_SELECT_MODAL_STATE
    )
    if (storage) {
      const item = <{ playerNo: PlayerNo; opened: boolean }>JSON.parse(storage)
      this._opened.value = item.opened
      this._currentPlayerNo.value = item.playerNo
    }
  }

  save = () => {
    localStorage.setItem(
      localStorageKeys.YOUTUBE_SELECT_MODAL_STATE,
      JSON.stringify({ playerNo: this._currentPlayerNo.value, opened: true })
    )
  }

  subscription = {
    opened: computed(() => {
      return this._opened.value
    }),
    currentPlayerNo: computed(() => {
      return this._currentPlayerNo.value
    }),
  }
}

export enum PlayerNo {
  ONE = 1,
  TWO = 2,
  NONE = 3,
}
