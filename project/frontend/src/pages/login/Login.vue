<script setup lang="ts">
import { ref, inject } from "vue"
import { useUserStateKey, useUserStateType } from "@/components/useUserState"
import {
  useAlretListStateKey,
  useAlretListStateType,
} from "@/app/dashboard-parts/useAlretListState"
import { useRouter } from "vue-router"

const router = useRouter()
const userState = inject(useUserStateKey) as useUserStateType
const userAlretListState = inject(useAlretListStateKey) as useAlretListStateType

const form = {
  email: ref<HTMLInputElement | null>(null),
  password: ref<HTMLInputElement | null>(null),
  remember: ref<HTMLInputElement | null>(null),
}

const onSubmit = async () => {
  if (
    form.email.value === null ||
    form.password.value === null ||
    form.remember.value === null
  )
    return
  try {
    const response = await userState.login(
      form.email.value.value,
      form.password.value.value,
      form.remember.value.checked
    )
    if (!response) throw new Error()
    router.push({ name: "index" })
  } catch {
    userAlretListState.add(
      "認証に失敗しました。メールアドレスとパスワードを確認してください。"
    )
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img
        class="mx-auto h-12 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2
        class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900"
      >
        ログイン
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="onSubmit()">
          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >メールアドレス</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                :ref="form.email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="example@example.com"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >パスワード</label
            >
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                :ref="form.password"
                autocomplete="new-password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="パスワード"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                :ref="form.remember"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"
                >次回から入力を省略</label
              >
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
