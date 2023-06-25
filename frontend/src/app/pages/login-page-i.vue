<script setup lang="ts">
import { ref, inject } from "vue"
import { UseUserStateKey, type UseUserStateType } from "@/app/use-user-state"
import { UseAlretStateKey, type UseAlretStateType } from "@/app/use-alret-state"
import { useRouter } from "vue-router"
import { UseLoadingStateKey, type UseLoadingStateType } from "@/app/use-loading-state"
import InputPassword from "@/components/input-password.vue"
import InputEmail from "@/components/input-email.vue"
import FormLabel from "@/components/form-label.vue"
import Button from "@/components/button.vue"

const router = useRouter()
const userState = inject(UseUserStateKey) as UseUserStateType
const alretState = inject(UseAlretStateKey) as UseAlretStateType
const loadingState = inject(UseLoadingStateKey) as UseLoadingStateType

const form = {
  email: {
    id: "email",
    required: true,
    label: "メールアドレス",
    placeholder: "",
    value: ref<string>("")
  },
  password: {
    id: "password",
    required: true,
    label: "パスワード",
    placeholder: "",
    value: ref<string>("")
  },
  remember: {
    id: "remember",
    required: false,
    label: "次回から入力を省略",
    value: ref<boolean>(false)
  }
}

const onSubmit = async () => {
  const loadingId = loadingState.run()
  try {
    const response = await userState.login(
      form.email.value.value,
      form.password.value.value,
      form.remember.value.value
    )
    loadingState.stop(loadingId)
    alretState.clear()
    router.push({ name: "index" })
  } catch {
    alretState.add("認証に失敗しました。メールアドレスとパスワードを確認してください。")
  }
  loadingState.stop(loadingId)
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">ログイン</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="onSubmit()">
          <FormLabel :id="form.email.id" :required="false" :label="form.email.label">
            <InputEmail
              class="mt-2"
              :id="form.email.id"
              :value="form.email.value.value"
              :required="form.email.required"
              :label="form.email.label"
              :placeholder="form.email.placeholder"
              @input="form.email.value.value = $event"
            ></InputEmail>
          </FormLabel>

          <FormLabel :id="form.password.id" :required="false" :label="form.password.label">
            <InputPassword
              class="mt-2"
              :id="form.password.id"
              :value="form.password.value.value"
              :placeholder="form.password.placeholder"
              @input="form.password.value.value = $event"
            ></InputPassword>
          </FormLabel>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                :id="form.remember.id"
                :name="form.remember.id"
                v-model="form.remember.value.value"
                type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-600"
              />
              <label :for="form.remember.id" class="ml-2 block text-sm text-gray-900"
                >次回から入力を省略</label
              >
            </div>
          </div>

          <div>
            <Button
              class="w-full"
              :label="'ログイン'"
              :type="'submit'"
              :variant="'primary'"
            ></Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>
