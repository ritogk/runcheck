<script setup lang="ts">
import { ref, inject, watch, reactive } from "vue"
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue"
import {
  XMarkIcon,
  CheckIcon,
  ChevronUpDownIcon,
} from "@heroicons/vue/20/solid"
import {
  UseMainStateKey,
  UseMainStateType,
} from "@/app/pages/main/UseMainState"
import { fetchComparisons } from "@/core/comparisons"
import { operationLog } from "@/core/operationLog"

const useMainState = inject(UseMainStateKey) as UseMainStateType

const onClose = () => {
  useMainState.openModal.close()
}

const comparisonOptions = reactive<{ id: number; name: string }[]>([
  { id: 0, name: "　" },
])
watch(useMainState.openModal.subscription.opened, async (value) => {
  if (value) {
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
  }
})
const selected = ref(comparisonOptions[0])

const hundleOpen = () => {
  operationLog.send(operationLog.OPERATION_CD.OPEN_CLICK)
  location.href = `${window.location.origin}${window.location.pathname}?comparisonId=${selected.value.id}`
}
</script>
<template>
  <TransitionRoot
    as="template"
    :show="useMainState.openModal.subscription.opened.value"
  >
    <Dialog as="div" class="relative z-40" @close="onClose()">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative w-full transform rounded-lg bg-gray-100 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  title="閉じる"
                  aria-label="閉じる"
                  @click="onClose"
                >
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="">
                <div class="flex min-h-full flex-col justify-center px-2 py-2">
                  <div class="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2
                      class="text-center text-3xl font-bold tracking-tight text-gray-900"
                    >
                      開く
                    </h2>
                  </div>
                  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div class="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
                      <Listbox as="div" v-model="selected">
                        <ListboxLabel
                          class="block text-sm font-medium leading-6 text-gray-900"
                          >タイトル</ListboxLabel
                        >
                        <div class="relative mt-2">
                          <ListboxButton
                            class="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-slate-600 sm:text-sm sm:leading-6"
                          >
                            <span class="block truncate">{{
                              selected.name
                            }}</span>
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
                                v-for="option in comparisonOptions"
                                :key="option.id"
                                :value="option"
                                v-slot="{ active, selected }"
                              >
                                <li
                                  :class="[
                                    active
                                      ? 'bg-slate-600 text-white'
                                      : 'text-gray-900',
                                    'relative cursor-default select-none py-2 pl-8 pr-4',
                                  ]"
                                >
                                  <span
                                    :class="[
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'block truncate',
                                    ]"
                                    >{{ option.name }}</span
                                  >

                                  <span
                                    v-if="selected"
                                    :class="[
                                      active ? 'text-white' : 'text-slate-600',
                                      'absolute inset-y-0 left-0 flex items-center pl-1.5',
                                    ]"
                                  >
                                    <CheckIcon
                                      class="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                </li>
                              </ListboxOption>
                            </ListboxOptions>
                          </transition>
                        </div>
                      </Listbox>

                      <div class="mt-12">
                        <button
                          type="submit"
                          class="flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600 disabled:bg-slate-400"
                          :disabled="selected.id === 0"
                          @click="hundleOpen"
                        >
                          開く
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
