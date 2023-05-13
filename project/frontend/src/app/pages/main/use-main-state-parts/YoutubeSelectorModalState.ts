import { computed, ref, ComputedRef } from "vue"
import { localStorageKeys } from "@/core/localstorageKey"

export interface IYoutubeSelectorModalState {
  open(playerNo: PlayerNo): void
  close(): void
  select(url: string): void
  load(): void
  save(): void
  subscription: {
    opened: ComputedRef<boolean>
    currentPlayerNo: ComputedRef<PlayerNo>
    selectUrl: ComputedRef<string>
  }
}

export class YoutubeSelectorModalState implements IYoutubeSelectorModalState {
  private _opened = ref(false)
  private _currentPlayerNo = ref(PlayerNo.NONE)
  private _selectUrl = ref("")

  open = (playerNo: PlayerNo): void => {
    this._opened.value = true
    this._currentPlayerNo.value = playerNo
  }

  close = () => {
    this._opened.value = false
    this._currentPlayerNo.value = PlayerNo.NONE
  }

  select = (url: string) => {
    this._selectUrl.value = url
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
    selectUrl: computed(() => {
      return this._selectUrl.value
    }),
  }
}

export enum PlayerNo {
  ONE = 1,
  TWO = 2,
  NONE = 3,
}
