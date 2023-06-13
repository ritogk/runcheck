<script setup lang="ts">
import { inject, ref } from "vue"
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
} from "@/app/pages/main/use-main-state"

const useMainState = inject(UseMainStateKey) as UseMainStateType

const form = {
  title: ref<HTMLInputElement | null>(null),
  memo: ref<HTMLInputElement | null>(null),
  tag: ref<HTMLInputElement | null>(null),
}

const onClose = () => {
  useMainState.saveModal.close()
}

const onSubmit = async () => {
  if (
    form.title.value === null ||
    form.memo.value === null ||
    form.tag.value === null
  )
    return

  if (
    await useMainState.syncPlayer.saveSync(
      false,
      form.title.value.value,
      form.memo.value.value,
      form.tag.value.value
    )
  ) {
    onClose()
  }
}
</script>

<template>
  <TransitionRoot
    as="template"
    :show="useMainState.saveModal.subscription.opened.value"
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
              class="relative w-full transform overflow-hidden rounded-lg bg-gray-100 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div class="absolute right-0 top-0 pr-4 pt-4 sm:block">
                <button
                  type="button"
                  class="rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
                  title="閉じる"
                  aria-label="閉じる"
                  @click="onClose()"
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
                      保存
                    </h2>
                  </div>

                  <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div class="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
                      <form class="space-y-6" @submit.prevent="onSubmit()">
                        <div>
                          <label
                            for="title"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >タイトル</label
                          >
                          <div class="mt-2">
                            <input
                              id="title"
                              name="title"
                              type="text"
                              autocomplete="title"
                              required
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                              :ref="form.title"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            for="memo"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >メモ</label
                          >
                          <div class="mt-2">
                            <input
                              id="memo"
                              name="memo"
                              type="text"
                              autocomplete="memo"
                              required
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                              :ref="form.memo"
                            />
                          </div>
                        </div>

                        <div>
                          <label
                            for="tag"
                            class="block text-sm font-medium leading-6 text-gray-900"
                            >タグ</label
                          >
                          <div class="mt-2">
                            <input
                              id="tag"
                              name="tag"
                              type="text"
                              autocomplete="tag"
                              required
                              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                              :ref="form.tag"
                            />
                          </div>
                        </div>

                        <div>
                          <button
                            type="submit"
                            class="flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
                          >
                            保存
                          </button>
                        </div>
                      </form>
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
