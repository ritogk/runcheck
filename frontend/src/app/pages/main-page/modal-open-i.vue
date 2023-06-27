<script setup lang="ts">
import { ref, inject, ComputedRef, computed } from "vue"
import Modal from "@/components/modal.vue"
import Button from "@/components/button.vue"
import Spiner from "@/components/svg/spiner.vue"
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from "@headlessui/vue"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid"
import { UseMainStateKey, type UseMainStateType } from "@/app/pages/main-page/use-main-state"
import { UseLoadingStateKey, type UseLoadingStateType } from "@/app/use-loading-state"
import { UseAlretStateKey, type UseAlretStateType } from "@/app/use-alret-state"
import UseGetComparisons from "@/core/api-state/use-get-comparisons"

const mainState = inject(UseMainStateKey) as UseMainStateType
const loadingState = inject(UseLoadingStateKey) as UseLoadingStateType
const alretState = inject(UseAlretStateKey) as UseAlretStateType

const { data, isFetching } = UseGetComparisons()

const onClose = () => {
  mainState.openModal.close()
}

const comparisonOptions: ComputedRef<{ id: number; name: string }[]> = computed(() => {
  if (!data.value || data.value.length == 0) {
    return [{ id: 0, name: "" }]
  }
  return data.value
    .filter((x) => {
      return !x.anonymous
    })
    .map((x) => {
      return { id: x.id, name: x.title }
    })
})

const selected = ref(comparisonOptions.value[0])

const hundleOpen = async () => {
  if (selected.value.name === "") {
    alert("選択してから押下して下さい。")
    return
  }
  mainState.openModal.close()
  const loadingId = loadingState.run()
  if (await mainState.syncPlayer.loadSync(selected.value.id)) {
    alretState.clear()
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
  } else {
    alretState.add("動画の読み込みでエラーが発生しました。")
  }
  loadingState.stop(loadingId)
}
</script>
<template>
  <Modal :is-showed="mainState.openModal.subscription.opened.value" @hudnle-close="onClose">
    <div class="">
      <div class="flex min-h-full flex-col justify-center px-2 py-2">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">開く</h2>
        </div>
        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
            <Listbox as="div" v-model="selected">
              <ListboxLabel class="block text-sm font-medium leading-6 text-gray-900"
                >タイトル</ListboxLabel
              >
              <div class="relative mt-2">
                <ListboxButton
                  class="relative h-9 w-full rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
                >
                  <span class="block truncate">{{ selected.name }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
                    <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                  </span>
                </ListboxButton>
                <div
                  class="absolute left-0 top-0 h-9 w-full cursor-default rounded-md bg-gray-200 py-1.5 pl-3 pr-10 text-left opacity-30 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
                  v-show="isFetching"
                >
                  <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Spiner class="h-5 w-5 animate-spin fill-slate-500 text-gray-700"></Spiner>
                  </div>
                </div>

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
                      v-for="option in comparisonOptions"
                      :key="option.id"
                      :value="option"
                      v-slot="{ active, selected }"
                    >
                      <li
                        :class="[
                          active ? 'bg-slate-600 text-white' : 'text-gray-900',
                          'relative cursor-default select-none py-2 pl-8 pr-4'
                        ]"
                      >
                        <span
                          :class="[selected ? 'font-semibold' : 'font-normal', 'block truncate']"
                          >{{ option.name }}</span
                        >

                        <span
                          v-if="selected"
                          :class="[
                            active ? 'text-white' : 'text-slate-600',
                            'absolute inset-y-0 left-0 flex items-center pl-1.5'
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

            <div class="mt-12">
              <Button
                :variant="'primary'"
                :label="'開く'"
                class="w-full"
                @click="hundleOpen"
              ></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
