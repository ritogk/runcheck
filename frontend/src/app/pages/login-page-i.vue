<script setup lang="ts">
import { ref, inject } from "vue"
import { UseAlretStateKey, type UseAlretStateType } from "@/app/use-alret-state"
import { useRouter } from "vue-router"
import InputPassword from "@/components/input-password.vue"
import FormLabel from "@/components/form-label.vue"
import Button from "@/components/button.vue"
import Spiner from "@/components/svg/spiner.vue"

import { usePostAuthenticationLogin } from "@/core/api-state/use-post-authentication-login"

const router = useRouter()
const alretState = inject(UseAlretStateKey) as UseAlretStateType

const postAuthenticationLogin = usePostAuthenticationLogin()

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

const isLogging = ref(false)

const onSubmit = async () => {
  try {
    isLogging.value = true
    await postAuthenticationLogin.mutateAsync({
      email: form.email.value.value,
      password: form.password.value.value,
      remember: form.remember.value.value
    })
    isLogging.value = false
    alretState.clear()
    router.push({ name: "index" })
  } catch (e) {
    console.log(e)
    alretState.add("認証に失敗しました。メールアドレスとパスワードを確認してください。")
  }
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
            <input
              type="email"
              autocomplete="email"
              :id="form.email.id"
              :name="form.email.id"
              :placeholder="form.email.placeholder"
              :required="form.email.required"
              v-model="form.email.value.value"
              class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
            />
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
            <Button class="w-full" :label="'ログイン'" :type="'submit'" :variant="'primary'"
              ><Spiner
                v-show="isLogging"
                class="h-5 w-5 animate-spin fill-slate-500 text-slate-300"
              ></Spiner
            ></Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup></script>
@/core/api-state/use-post-authentication-login
