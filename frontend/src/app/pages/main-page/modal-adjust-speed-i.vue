<script setup lang="ts">
import { inject } from "vue"
import Modal from "@/components/modal.vue"
import { UseMainStateKey, type UseMainStateType } from "@/app/pages/main-page/use-main-state"

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
  <Modal
    :is-showed="useMainState.adjustSpeedModal.subscription.opened.value"
    @hudnle-close="onClose"
  >
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
              <p class="truncate text-sm font-medium text-gray-700">0.25</p>
            </li>
            <li
              class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
              id="option-1"
              role="option"
              tabindex="-1"
              @click="hundleSpeedSelect(0.5)"
            >
              <p class="truncate text-sm font-medium text-gray-700">0.5</p>
            </li>
            <li
              class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
              id="option-1"
              role="option"
              tabindex="-1"
              @click="hundleSpeedSelect(0.75)"
            >
              <p class="truncate text-sm font-medium text-gray-700">0.75</p>
            </li>
            <li
              class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
              id="option-1"
              role="option"
              tabindex="-1"
              @click="hundleSpeedSelect(1)"
            >
              <p class="truncate text-sm font-medium text-gray-700">標準</p>
            </li>
            <li
              class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
              id="option-1"
              role="option"
              tabindex="-1"
              @click="hundleSpeedSelect(1.25)"
            >
              <p class="truncate text-sm font-medium text-gray-700">1.25</p>
            </li>
            <li
              class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
              id="option-1"
              role="option"
              tabindex="-1"
              @click="hundleSpeedSelect(1.5)"
            >
              <p class="truncate text-sm font-medium text-gray-700">1.5</p>
            </li>
            <li
              class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
              id="option-1"
              role="option"
              tabindex="-1"
              @click="hundleSpeedSelect(1.75)"
            >
              <p class="truncate text-sm font-medium text-gray-700">1.75</p>
            </li>

            <li
              class="group flex cursor-default select-none rounded-xl border-b border-b-gray-100 p-3 focus:bg-gray-100"
              id="option-1"
              role="option"
              tabindex="-1"
              @click="hundleSpeedSelect(2)"
            >
              <p class="truncate text-sm font-medium text-gray-700">2</p>
            </li>
          </div>
          <!-- More items... -->
        </ul>
      </div>
    </div>
  </Modal>
</template>
