<script setup lang="ts">
import { ref, inject, reactive, computed } from "vue"
import { useRouter } from "vue-router"
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid"
import { fetchComparisons, deleteComparison } from "@/core/comparisons"
import {
  UseLoadingStateKey,
  UseLoadingStateType,
} from "@/app/loading-parts/LoadingState"
import { operationLog } from "@/core/operationLog"

const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType

const comparisons = reactive<
  { id: number; title: string; memo: string; tag: string }[]
>([])

const fetch = async () => {
  const loadingId = useLoadingState.run()
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
  useLoadingState.stop(loadingId)
}
fetch()

const tagOptions = computed(() => {
  return [
    { id: 0, name: "　" },
    ...comparisons.map((x) => {
      return { id: x.id, name: x.tag }
    }),
  ]
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
  operationLog.send(operationLog.OPERATION_CD.HOME_OPEN_CLICK)
  router.push({ name: "index", query: { comparisonId: comparisonId } })
}

const hundleDelete = async (comparisonId: number, title: string) => {
  operationLog.send(operationLog.OPERATION_CD.HOME_DELETE_CLICK)
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
        <h2
          class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
        >
          ホーム
        </h2>
      </div>
    </div>

    <div class="max-w-[700px] items-center mx-auto">
      <!-- タグ -->
      <Listbox as="div" v-model="selected" class="mb-7">
        <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
          >タグ</ListboxLabel
        >
        <div class="relative mt-2">
          <ListboxButton
            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
          >
            <span class="block truncate">{{ selected.name }}</span>
            <span
              class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
            >
              <ChevronUpDownIcon
                class="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
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
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                  ]"
                >
                  <span
                    :class="[
                      selected ? 'font-semibold' : 'font-normal',
                      'block truncate',
                    ]"
                    >{{ option.name }}</span
                  >

                  <span
                    v-if="selected"
                    :class="[
                      active ? 'text-white' : 'text-slate-600',
                      'absolute inset-y-0 right-0 flex items-center pr-4',
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="currentColor"
                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        viewBox="0 0 162.465 200"
                      >
                        <path
                          d="M61.031,263.266a7.417,7.417,0,0,0-7.3,7.522v13.7H27.817c-5.779,0-11.567,4.487-11.567,11.047V452.223c0,6.56,5.789,11.043,11.567,11.043H167.153c5.779,0,11.562-4.483,11.562-11.043V295.534c0-6.56-5.783-11.047-11.562-11.047H141.238v-13.7a7.416,7.416,0,1,0-14.831,0v13.7H104.9v-13.7a7.415,7.415,0,1,0-14.829,0v13.7H68.559v-13.7a7.417,7.417,0,0,0-7.528-7.522ZM31.086,299.322H53.728v10.041a7.416,7.416,0,1,0,14.832,0V299.322H90.068v10.041a7.417,7.417,0,1,0,14.829,0V299.322h21.51v10.041a7.416,7.416,0,1,0,14.832,0V299.322h22.648V448.435H31.086Zm29.364,37.1a7.046,7.046,0,0,0,0,14.092h74.064a7.046,7.046,0,1,0,0-14.092Zm0,34.112a7.046,7.046,0,1,0,0,14.091h74.064a7.046,7.046,0,1,0,0-14.091Zm0,34.117a7.046,7.046,0,1,0,0,14.091h74.064a7.046,7.046,0,1,0,0-14.091Z"
                          transform="translate(-16.249 -263.266)"
                        />
                      </svg>
                      {{ sync.memo }}
                    </p>
                    <p
                      class="mt-2 flex items-center text-sm text-gray-500 sm:ml-6 sm:mt-0"
                    >
                      <svg
                        class="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.096.446-.24.757-.433.62-.384 1.445-.966 2.274-1.765C15.302 14.988 17 12.493 17 9A7 7 0 103 9c0 3.492 1.698 5.988 3.355 7.584a13.731 13.731 0 002.273 1.765 11.842 11.842 0 00.976.544l.062.029.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      {{ sync.tag }}
                    </p>
                  </div>
                  <div
                    class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"
                  >
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
