import { computed, ref, ComputedRef, Ref } from "vue"

export interface IMemoState {
  changeTitle(value: string): void
  changeMemo(value: string): void
  subscription: {
    title: ComputedRef<string>
    memo: ComputedRef<string>
  }
}
export class MemoState implements IMemoState {
  private _title = ref("")
  private _memo = ref("")

  changeTitle = (value: string) => {
    this._title.value = value
  }

  changeMemo = (value: string) => {
    this._memo.value = value
  }

  subscription = {
    title: computed(() => {
      return this._title.value
    }),
    memo: computed(() => {
      return this._memo.value
    }),
  }
}
