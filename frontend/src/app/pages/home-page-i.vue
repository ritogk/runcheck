<script setup lang="ts">
import { ref, inject, reactive, computed } from "vue"
import Memo from "@/components/svg/memo.vue"
import PIN from "@/components/svg/pin.vue"
import { useRouter } from "vue-router"
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from "@headlessui/vue"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid"
import { fetchComparisons, deleteComparison } from "@/core/comparisons"
import { UseLoadingStateKey, type UseLoadingStateType } from "@/app/use-loading-state"

const loadingState = inject(UseLoadingStateKey) as UseLoadingStateType

const comparisons = reactive<{ id: number; title: string; memo: string; tag: string }[]>([])

const fetch = async () => {
  const loadingId = loadingState.run()
  const response = await fetchComparisons()
  comparisons.splice(
    0,
    comparisons.length,
    ...response
      .filter((x) => {
        return !x.anonymous
      })
      .map((x) => {
        return { id: x.id, title: x.title, memo: x.memo, tag: x.category }
      })
  )
  loadingState.stop(loadingId)
}
fetch()

const tagOptions = computed(() => {
  const tmp = [
    { id: 0, name: "　" },
    ...comparisons.map((x) => {
      return { id: x.id, name: x.tag }
    })
  ]
  const groupedArray = tmp.reduce((result: { id: number; name: string }[], obj) => {
    const existingObj = result.find((item) => item.name === obj.name)
    if (existingObj) {
      existingObj.id++
    } else {
      result.push({ id: 1, name: obj.name })
    }
    return result
  }, [])
  return groupedArray
})
const selected = ref({ id: 0, name: "　" })

const syncs = computed(() => {
  return comparisons
    .filter((x) => {
      return selected.value.name === "　" || x.tag === selected.value.name
    })
    .map((x) => {
      return { id: x.id, title: x.title, memo: x.memo, tag: x.tag }
    })
})

const router = useRouter()
const hundleTitleClick = (comparisonId: number) => {
  router.push({ name: "index", query: { comparisonId: comparisonId } })
}

const hundleDelete = async (comparisonId: number, title: string) => {
  if (confirm(`${title}を削除します。\nよろしいですか？`)) {
    await deleteComparison(comparisonId)
    window.location.reload()
  }
}
</script>

<template>
  <div class="mx-3">
    <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">ホーム</h2>
      </div>
    </div>

    <div class="mx-auto max-w-[700px] items-center">
      <!-- タグ -->
      <Listbox as="div" v-model="selected" class="mb-7">
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900">タグ</ListboxLabel>
        <div class="relative mt-2">
          <ListboxButton
            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
          >
            <span class="block truncate">{{ selected.name }}</span>
            <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
            </span>
          </ListboxButton>

          <transition
            leave-active-class="transition ease-in duration-100"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
            <ListboxOptions
              class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              <ListboxOption
                as="template"
                v-for="option in tagOptions"
                :key="option.id"
                :value="option"
                v-slot="{ active, selected }"
              >
                <li
                  :class="[
                    active ? 'bg-slate-600 text-white' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9'
                  ]"
                >
                  <span :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']">{{
                    option.name
                  }}</span>

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-slate-600',
                      'absolute inset-y-0 right-0 flex items-center pr-4'
                    ]"
                  >
                    <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>

      <div class="overflow-hidden bg-white shadow sm:rounded-md">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="sync in syncs" :key="sync.id">
            <a href="#" class="block hover:bg-gray-50">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <p
                    class="truncate text-sm font-medium text-slate-600"
                    @click="hundleTitleClick(sync.id)"
                  >
                    {{ sync.title }}
                  </p>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex" @click="hundleTitleClick(sync.id)">
                    <p class="flex items-center text-sm text-gray-500">
                      <Memo></Memo>
                      {{ sync.memo }}
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:ml-6 sm:mt-0">
                      <PIN></PIN>
                      {{ sync.tag }}
                    </p>
                  </div>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <p
                      class="truncate text-sm font-medium text-red-400"
                      @click="hundleDelete(sync.id, sync.title)"
                    >
                      削除する
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
