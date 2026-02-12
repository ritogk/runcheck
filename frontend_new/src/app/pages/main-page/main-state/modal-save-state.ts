import { computed, ref, type ComputedRef } from "vue"

/**
 * 保存モーダルの状態
 */
export type IModalSaveState = {
  open(): void
  close(): void
  subscription: {
    opened: ComputedRef<boolean>
  }
}

export class ModalSaveState implements IModalSaveState {
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
