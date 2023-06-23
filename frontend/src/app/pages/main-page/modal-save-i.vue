<script setup lang="ts">
import { inject, ref } from "vue"
import Modal from "@/components/modal.vue"
import FormLabel from "@/components/form-label.vue"
import Button from "@/components/button.vue"
import { UseMainStateKey, UseMainStateType } from "@/app/pages/main-page/use-main-state"

const useMainState = inject(UseMainStateKey) as UseMainStateType

const form = {
  title: {
    id: "title",
    required: true,
    label: "タイトル",
    placeholder: "鈴鹿6/22 vs 鈴鹿6/23",
    value: ref<string>("")
  },
  memo: {
    id: "memo",
    required: true,
    label: "メモ",
    placeholder: "6/22:30℃ 06/23:40℃",
    value: ref<string>("")
  },
  tag: {
    id: "email",
    required: true,
    label: "タグ",
    placeholder: "鈴鹿",
    value: ref<string>("")
  }
}

const onClose = () => {
  useMainState.saveModal.close()
}

const onSubmit = async () => {
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
  <Modal :is-showed="useMainState.saveModal.subscription.opened.value" @hudnle-close="onClose">
    <div class="">
      <div class="flex min-h-full flex-col justify-center px-2 py-2">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 class="text-center text-3xl font-bold tracking-tight text-gray-900">保存</h2>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="rounded-lg bg-white px-4 py-8 shadow sm:px-10">
            <form class="space-y-6" @submit.prevent="onSubmit()">
              <FormLabel
                :required="form.title.required"
                :id="form.title.id"
                :label="form.title.label"
              >
                <input
                  :id="form.title.id"
                  :name="form.title.id"
                  type="text"
                  :placeholder="form.title.placeholder"
                  :required="form.title.required"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                  v-model="form.title.value.value"
                />
              </FormLabel>

              <FormLabel :required="form.memo.required" :id="form.memo.id" :label="form.memo.label">
                <input
                  :id="form.memo.id"
                  :name="form.memo.id"
                  type="text"
                  :placeholder="form.memo.placeholder"
                  :required="form.memo.required"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                  v-model="form.memo.value.value"
                />
              </FormLabel>

              <FormLabel :required="form.tag.required" :id="form.tag.id" :label="form.tag.label">
                <input
                  :id="form.tag.id"
                  :name="form.tag.id"
                  type="text"
                  :placeholder="form.tag.placeholder"
                  :required="form.tag.required"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                  v-model="form.tag.value.value"
                />
              </FormLabel>

              <Button :label="'保存'" :type="'submit'" :variant="'primary'" class="w-full"></Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </Modal>
</template>
