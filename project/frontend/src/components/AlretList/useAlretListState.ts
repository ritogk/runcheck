import { InjectionKey, reactive, computed, ComputedRef } from "vue"

type useAlretListStateType = {
  subscription: ComputedRef<{ messages: string[] }>
  add(message: string): void
  remove(index: number): void
}

const useAlretListState = (): useAlretListStateType => {
  // 状態
  const state = reactive({ messages: [] as string[] })

  const add = (message: string) => {
    state.messages.push(message)
    window.scroll({ top: 0, behavior: "smooth" })
  }

  const remove = (index: number) => {
    state.messages.splice(index, 1)
  }

  return {
    subscription: computed(() => state),
    add: add,
    remove: remove,
  }
}

const useAlretListStateKey: InjectionKey<useAlretListStateType> =
  Symbol("useMessageState")

export { useAlretListState, useAlretListStateKey, useAlretListStateType }
