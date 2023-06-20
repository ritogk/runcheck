import { InjectionKey, ref, computed, ComputedRef } from 'vue'
import { localStorageKeys } from '@/core/localstorage-key'

export type UseLoadingStateType = {
  run(): number
  stop(id: number): void
  save(): void
  load(): void
  subscription: {
    isLoading: ComputedRef<boolean>
  }
}

const UseLoadingState = (): UseLoadingStateType => {
  const _isLoading = ref(false)
  const _processing = ref<{ id: number }[]>([])

  const run = (): number => {
    _isLoading.value = true
    const id =
      _processing.value.length === 0 ? 1 : Math.max(..._processing.value.map((x) => x.id)) + 1
    _processing.value.push({ id: id })
    // エラー時に何もできなくならないように10秒後に強制OFF
    setTimeout(() => {
      _isLoading.value = false
      _processing.value = []
      save()
    }, 10000)
    return id
  }

  const stop = (id: number) => {
    _processing.value = _processing.value.filter((x) => x.id !== id)
    if (_processing.value.length === 0) {
      _isLoading.value = false
    }
  }

  const save = () => {
    localStorage.setItem(localStorageKeys.LOADING, JSON.stringify(_isLoading.value))
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
      })
    }
  }
}

const UseLoadingStateKey: InjectionKey<UseLoadingStateType> = Symbol('UseLoadingState')

export { UseLoadingState, UseLoadingStateKey }
