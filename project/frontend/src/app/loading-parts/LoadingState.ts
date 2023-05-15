import { InjectionKey, ref, computed, ComputedRef } from "vue"
import { localStorageKeys } from "@/core/localstorageKey"

type UseLoadingStateType = {
  run(): void
  stop(): void
  save(): void
  load(): void
  subscription: {
    isLoading: ComputedRef<boolean>
  }
}

const UseLoading = (): UseLoadingStateType => {
  const _isLoading = ref(false)

  const run = () => {
    _isLoading.value = true
    // エラー時に何もできなくならないように10秒後に強制OFF
    setTimeout(() => {
      _isLoading.value = false
      save()
    }, 10000)
  }

  const stop = () => {
    _isLoading.value = false
  }

  const save = () => {
    localStorage.setItem(
      localStorageKeys.LOADING,
      JSON.stringify(_isLoading.value)
    )
  }

  const load = () => {
    const loading = localStorage.getItem(localStorageKeys.LOADING)
    if (loading) {
      _isLoading.value = JSON.parse(loading)
    } else {
      _isLoading.value = false
    }
  }

  return {
    run: run,
    stop: stop,
    save: save,
    load: load,
    subscription: {
      isLoading: computed(() => {
        return _isLoading.value
      }),
    },
  }
}

const UseLoadingStateKey: InjectionKey<UseLoadingStateType> =
  Symbol("UseLoadingState")

export { UseLoading, UseLoadingStateKey, UseLoadingStateType }
