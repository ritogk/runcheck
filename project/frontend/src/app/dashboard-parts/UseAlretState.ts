import { InjectionKey, reactive, computed, ComputedRef } from "vue"

type UseAlretStateType = {
  subscription: ComputedRef<{ messages: string[] }>
  add(message: string): void
  remove(index: number): void
}

const UseAlretState = (): UseAlretStateType => {
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

const UseAlretStateKey: InjectionKey<UseAlretStateType> =
  Symbol("UseAlretState")

export { UseAlretState, UseAlretStateKey, UseAlretStateType }
