import { InjectionKey, reactive, ToRefs, toRefs, Ref, ref } from "vue"

type useAlretListStateType = {
  stateRefs: ToRefs<{ messages: string[] }>
  add(message: string): void
  remove(index: number): void
}

const useAlretListState = (): useAlretListStateType => {
  // 状態
  const state = reactive({ messages: [] as string[] })

  const add = (message: string) => {
    state.messages.push(message)
  }

  const remove = (index: number) => {
    state.messages.splice(index, 1)
  }

  return {
    stateRefs: toRefs(state),
    add: add,
    remove: remove,
  }
}

const useAlretListStateKey: InjectionKey<useAlretListStateType> =
  Symbol("useMessageState")

export { useAlretListState, useAlretListStateKey, useAlretListStateType }
