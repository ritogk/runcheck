import { InjectionKey, ref, computed, ComputedRef } from "vue"

type UseAlretStateType = {
  subscription: {
    messages: ComputedRef<string[]>
  }
  add(message: string): void
  remove(index: number): void
}

const UseAlretState = (): UseAlretStateType => {
  // 状態
  const _messages = ref<string[]>([])

  const add = (message: string) => {
    _messages.value.push(message)
    window.scroll({ top: 0, behavior: "smooth" })
  }

  const remove = (index: number) => {
    _messages.value.splice(index, 1)
  }

  return {
    subscription: {
      messages: computed(() => {
        return _messages.value
      }),
    },
    add: add,
    remove: remove,
  }
}

const UseAlretStateKey: InjectionKey<UseAlretStateType> =
  Symbol("UseAlretState")

export { UseAlretState, UseAlretStateKey, UseAlretStateType }
