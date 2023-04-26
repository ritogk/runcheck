import { InjectionKey, reactive, ToRefs, toRefs, Ref, ref } from "vue"

type useMessageStateType = {
  stateRefs: ToRefs<{ messages: string[] }>
  addMessage(message: string): void
  deleteMessage(index: number): void
}

const useMessageState = (): useMessageStateType => {
  // 状態
  const state = reactive({ messages: [] as string[] })

  const addMessage = (message: string) => {
    state.messages.push(message)
  }

  const deleteMessage = (index: number) => {
    state.messages.splice(index, 1)
  }

  return {
    stateRefs: toRefs(state),
    addMessage: addMessage,
    deleteMessage: deleteMessage,
  }
}

const useMessageStateKey: InjectionKey<useMessageStateType> =
  Symbol("useMessageState")

export { useMessageState, useMessageStateKey, useMessageStateType }
