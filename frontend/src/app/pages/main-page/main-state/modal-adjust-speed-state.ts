import { computed, ref, type ComputedRef } from "vue"

/**
 * 動画速度の調整用モーダルの状態
 */
export type IModalAdjustSpeedState = {
  open(): void
  close(): void
  subscription: {
    opened: ComputedRef<boolean>
  }
}

export class ModalAdjustSpeedState implements IModalAdjustSpeedState {
  private _opened = ref(false)

  open = (): void => {
    this._opened.value = true
  }

  close = () => {
    this._opened.value = false
  }

  subscription = {
    opened: computed(() => {
      return this._opened.value
    })
  }
}
