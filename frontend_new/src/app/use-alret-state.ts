import { type InjectionKey, ref, computed, type ComputedRef } from "vue"

type UseAlretStateType = {
  subscription: {
    messages: ComputedRef<string[]>
  }
  add(message: string): void
  remove(index: number): void
  clear(): void
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

  const clear = () => {
    _messages.value = []
  }

  return {
    subscription: {
      messages: computed(() => {
        return _messages.value
      })
    },
    add: add,
    remove: remove,
    clear: clear
  }
}

const UseAlretStateKey: InjectionKey<UseAlretStateType> = Symbol("UseAlretState")

export { UseAlretState, UseAlretStateKey, type UseAlretStateType }
