import { InjectionKey, reactive, computed, ComputedRef } from "vue"

type useAlretStateType = {
  subscription: ComputedRef<{ messages: string[] }>
  add(message: string): void
  remove(index: number): void
}

const useAlretState = (): useAlretStateType => {
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

const useAlretStateKey: InjectionKey<useAlretStateType> =
  Symbol("useAlretState")

export { useAlretState, useAlretStateKey, useAlretStateType }
