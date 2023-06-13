<script setup lang="ts">
import { inject } from "vue"
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue"
import { XMarkIcon } from "@heroicons/vue/20/solid"
import {
  UseMainStateKey,
  UseMainStateType,
} from "@/app/pages/main-page/use-main-state"

const useMainState = inject(UseMainStateKey) as UseMainStateType

const onClose = () => {
  useMainState.adjustSpeedModal.close()
}

const hundleSpeedSelect = async (speed: number) => {
  useMainState.syncPlayer.adjustSpeed(speed)
  useMainState.adjustSpeedModal.close()
}
</script>

<template>
  <TransitionRoot
    as="template"
    :show="useMainState.adjustSpeedModal.subscription.opened.value"
  >
    <Dialog as="div" class="relative z-40" @close="onClose">
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
              <div class="mt-6">
                <div
                  class="mx-auto max-w-3xl transform divide-y divide-gray-100 rounded-t-lg bg-white ring-1 ring-black ring-opacity-5 transition-all"
                >
                  <!-- Results, show/hide based on command palette state -->
                  <ul
                    class="max-h-96 scroll-py-3 overflow-y-auto overflow-x-hidden p-1"
                    id="options"
                    role="listbox"
                  >
                    <!-- Active: "bg-gray-100" -->
                    <div>
                      <li
                        class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                        @click="hundleSpeedSelect(0.25)"
                      >
                        <p class="truncate text-sm font-medium text-gray-700">
                          0.25
                        </p>
                      </li>
                      <li
                        class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                        @click="hundleSpeedSelect(0.5)"
                      >
                        <p class="truncate text-sm font-medium text-gray-700">
                          0.5
                        </p>
                      </li>
                      <li
                        class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                        @click="hundleSpeedSelect(0.75)"
                      >
                        <p class="truncate text-sm font-medium text-gray-700">
                          0.75
                        </p>
                      </li>
                      <li
                        class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                        @click="hundleSpeedSelect(1)"
                      >
                        <p class="truncate text-sm font-medium text-gray-700">
                          標準
                        </p>
                      </li>
                      <li
                        class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                        @click="hundleSpeedSelect(1.25)"
                      >
                        <p class="truncate text-sm font-medium text-gray-700">
                          1.25
                        </p>
                      </li>
                      <li
                        class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                        @click="hundleSpeedSelect(1.5)"
                      >
                        <p class="truncate text-sm font-medium text-gray-700">
                          1.5
                        </p>
                      </li>
                      <li
                        class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                        @click="hundleSpeedSelect(1.75)"
                      >
                        <p class="truncate text-sm font-medium text-gray-700">
                          1.75
                        </p>
                      </li>

                      <li
                        class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
                        id="option-1"
                        role="option"
                        tabindex="-1"
                        @click="hundleSpeedSelect(2)"
                      >
                        <p class="truncate text-sm font-medium text-gray-700">
                          2
                        </p>
                      </li>
                    </div>
                    <!-- More items... -->
                  </ul>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
