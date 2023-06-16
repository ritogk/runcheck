<script setup lang="ts">
import { ref, inject } from "vue"
import { UseUserStateKey, UseUserStateType } from "@/app/user-state"
import { UseAlretStateKey, UseAlretStateType } from "@/app/alret-state"
import { useRouter } from "vue-router"
import { UseLoadingStateKey, UseLoadingStateType } from "@/app/loading-state"
import InputPassword from "@/components/input-password.vue"
import InputEmail from "@/components/input-email.vue"
import FormLabel from "@/components/form-label.vue"

const router = useRouter()
const userState = inject(UseUserStateKey) as UseUserStateType
const useAlretState = inject(UseAlretStateKey) as UseAlretStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType

const form = {
  email: {
    id: "email",
    required: true,
    label: "メールアドレス",
    placeholder: "",
    value: ref<string>(""),
  },
  password: {
    id: "password",
    required: true,
    label: "パスワード",
    placeholder: "",
    value: ref<string>(""),
  },
  remember: {
    id: "remember",
    required: false,
    label: "次回から入力を省略",
    value: ref<boolean>(false),
  },
}

const onSubmit = async () => {
  const loadingId = useLoadingState.run()
  try {
    const response = await userState.login(
      form.email.value.value,
      form.password.value.value,
      form.remember.value.value
    )
    useLoadingState.stop(loadingId)
    useAlretState.clear()
    router.push({ name: "index" })
  } catch {
    useAlretState.add(
      "認証に失敗しました。メールアドレスとパスワードを確認してください。"
    )
  }
  useLoadingState.stop(loadingId)
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        ログイン
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="onSubmit()">
          <FormLabel
            :id="form.email.id"
            :required="false"
            :label="form.email.label"
          >
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

          <FormLabel
            :id="form.password.id"
            :required="false"
            :label="form.password.label"
          >
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
              <label
                :for="form.remember.id"
                class="ml-2 block text-sm text-gray-900"
                >次回から入力を省略</label
              >
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
            >
              ログイン
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>
