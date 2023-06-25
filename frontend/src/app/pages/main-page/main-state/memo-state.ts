import { computed, ref, type ComputedRef } from "vue"

/**
 * 同期メモの状態に関するクラス
 */
export interface IMemoState {
  changeTitle(value: string): void
  changeMemo(value: string): void
  show(): void
  hide(): void
  subscription: {
    title: ComputedRef<string>
    memo: ComputedRef<string>
  }
}
export class MemoState implements IMemoState {
  private _title = ref("")
  private _memo = ref("")
  private _isShowed = ref(false)

  changeTitle = (value: string) => {
    this._title.value = value
  }

  changeMemo = (value: string) => {
    this._memo.value = value
  }

  show = () => {
    this._isShowed.value = true
  }

  hide = () => {
    this._isShowed.value = false
  }

  subscription = {
    title: computed(() => {
      return this._title.value
    }),
    memo: computed(() => {
      return this._memo.value
    }),
    isShowed: computed(() => {
      return this._isShowed.value
    })
  }
}
