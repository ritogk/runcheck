<script setup lang="ts">
import { ref, inject, watch, reactive } from "vue"
import Modal from "@/components/modal.vue"
import Button from "@/components/button.vue"
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions
} from "@headlessui/vue"
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid"
import { UseMainStateKey, UseMainStateType } from "@/app/pages/main-page/use-main-state"
import { fetchComparisons } from "@/core/comparisons"
import { UseLoadingStateKey, UseLoadingStateType } from "@/app/use-loading-state"

const useMainState = inject(UseMainStateKey) as UseMainStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType

const onClose = () => {
  useMainState.openModal.close()
}

const comparisonOptions = reactive<{ id: number; name: string }[]>([{ id: 0, name: "　" }])
watch(useMainState.openModal.subscription.opened, async (value) => {
  if (value) {
    const loadingId = useLoadingState.run()
    try {
      const response = await fetchComparisons()
      comparisonOptions.splice(
        0,
        comparisonOptions.length,
        ...response
          .filter((x) => {
            return !x.anonymous
          })
          .map((x) => {
            return { id: x.id, name: x.title }
          })
      )
    } catch {
      comparisonOptions.splice(0, comparisonOptions.length, {
        id: 0,
        name: "　"
      })
    }
    useLoadingState.stop(loadingId)
  }
})
const selected = ref(comparisonOptions[0])

const hundleOpen = () => {
  location.href = `${window.location.origin}${window.location.pathname}?comparisonId=${selected.value.id}`
}
</script>
<template>
  <Modal :is-showed="useMainState.openModal.subscription.opened.value" @hudnle-close="onClose">
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
                  class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
                >
                  <span class="block truncate">{{ selected.name }}</span>
                  <span
                    class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                  >
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
