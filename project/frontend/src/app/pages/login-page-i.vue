<script setup lang="ts">
import { ref, inject } from "vue"
import { UseUserStateKey, UseUserStateType } from "@/app/use-user-state"
import { UseAlretStateKey, UseAlretStateType } from "@/app/use-alret-state"
import { useRouter } from "vue-router"
import { UseLoadingStateKey, UseLoadingStateType } from "@/app/loading-state"

const router = useRouter()
const userState = inject(UseUserStateKey) as UseUserStateType
const useAlretState = inject(UseAlretStateKey) as UseAlretStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType

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
  const loadingId = useLoadingState.run()
  try {
    const response = await userState.login(
      form.email.value.value,
      form.password.value.value,
      form.remember.value.checked
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
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
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
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
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
                class="h-4 w-4 rounded border-gray-300 text-slate-600 focus:ring-slate-600"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"
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
