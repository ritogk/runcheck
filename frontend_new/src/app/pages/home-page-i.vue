<script setup lang="ts">
import { ref, computed, ComputedRef } from "vue"
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
import { UseGetComparisons } from "@/core/api-state/use-get-comparisons"
import { useDeleteComparison } from "@/core/api-state/use-delete-comparison"

const { data, isFetching } = UseGetComparisons()

const comparisons: ComputedRef<{ id: string; title: string; memo: string; tag: string }[]> =
  computed(() => {
    if (!data.value || data.value.length == 0) {
      return []
    }
    return data.value
      .filter((x) => {
        return !x.anonymous
      })
      .map((x) => {
        return { id: x.id, title: x.title, memo: x.memo, tag: x.category }
      })
  })

const tagOptions = computed(() => {
  const tmp = [
    { id: 0, name: "　" },
    ...comparisons.value.map((x) => {
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

const filteredComparisons = computed(() => {
  return comparisons.value
    .filter((x) => {
      return selected.value.name === "　" || x.tag === selected.value.name
    })
    .map((x) => {
      return { id: x.id, title: x.title, memo: x.memo, tag: x.tag }
    })
})

const router = useRouter()
const hundleTitleClick = (comparisonId: string) => {
  router.push({ name: "index", query: { comparisonId: comparisonId } })
}

const deleteComparison = useDeleteComparison()
const hundleDelete = async (comparisonId: string, title: string) => {
  if (confirm(`${title}を削除します。\nよろしいですか？`)) {
    deleteComparison.mutate(comparisonId)
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
        <ul role="list" class="divide-y divide-gray-200" v-show="isFetching">
          <!-- スケルトン -->
          <li v-for="index in 4" :key="index">
            <div class="hover:bg-gray-50">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <div class="my-1 h-3 w-1/4 animate-pulse rounded-full bg-gray-300"></div>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <div class="sm:flex">
                    <div class="my-1 h-3 w-16 animate-pulse rounded-full bg-gray-300"></div>
                    <div class="my-1 ml-2 h-3 w-16 animate-pulse rounded-full bg-gray-300"></div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <ul role="list" class="divide-y divide-gray-200" v-show="!isFetching">
          <li v-for="comparison in filteredComparisons" :key="comparison.id">
            <div class="hover:bg-gray-50">
              <div class="px-4 py-4 sm:px-6">
                <div class="flex items-center justify-between">
                  <button
                    class="w-full truncate text-left text-sm font-medium text-slate-600"
                    @click="hundleTitleClick(comparison.id)"
                  >
                    {{ comparison.title }}
                  </button>
                </div>
                <div class="mt-2 sm:flex sm:justify-between">
                  <button class="w-full sm:flex" @click="hundleTitleClick(comparison.id)">
                    <p class="flex items-center text-sm text-gray-500">
                      <Memo></Memo>
                      {{ comparison.memo }}
                    </p>
                    <p class="mt-2 flex items-center text-sm text-gray-500 sm:ml-6 sm:mt-0">
                      <PIN></PIN>
                      {{ comparison.tag }}
                    </p>
                  </button>
                  <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                    <button
                      class="truncate text-sm font-medium text-red-400"
                      @click="hundleDelete(comparison.id, comparison.title)"
                    >
                      削除する
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
@/core/api-state/use-delete-comparison
