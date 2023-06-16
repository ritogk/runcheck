import { computed, ref, ComputedRef } from "vue"

export interface IModalAdjustSpeedState {
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
    }),
  }
}
