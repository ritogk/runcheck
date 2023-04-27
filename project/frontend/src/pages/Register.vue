<script setup lang="ts">
import { ref, inject } from "vue"
import {
  useAlretListStateKey,
  useAlretListStateType,
} from "@/components/AlretList/useAlretListState"
import { UsersApi, AuthenticationApi } from "@/core/openapiClient/apis"
import { useRouter } from "vue-router"

const router = useRouter()
const useAlertListState = inject(useAlretListStateKey) as useAlretListStateType
const usersApi = new UsersApi()
const authenticationApi = new AuthenticationApi()

const form = {
  hanndleName: ref<HTMLInputElement | null>(null),
  carType: ref<HTMLInputElement | null>(null),
  email: ref<HTMLInputElement | null>(null),
  password: ref<HTMLInputElement | null>(null),
  passwordConfirm: ref<HTMLInputElement | null>(null),
}

const onSwitchPasswordVisibility = (type: "password" | "passwordConfirm") => {
  switch (type) {
    case "password":
      if (form.password.value === null) return
      form.password.value.type =
        form.password.value.type === "password" ? "text" : "password"
      break
    case "passwordConfirm":
      if (form.passwordConfirm.value === null) return
      form.passwordConfirm.value.type =
        form.passwordConfirm.value.type === "password" ? "text" : "password"
      break
  }
}

const onSubmit = async () => {
  if (
    form.hanndleName.value === null ||
    form.carType.value === null ||
    form.email.value === null ||
    form.password.value === null ||
    form.passwordConfirm.value === null
  )
    return
  // 独自エラーの初期化
  form.passwordConfirm.value.setCustomValidity("")
  // エラーチェック
  if (
    !form.hanndleName.value.reportValidity() ||
    !form.carType.value.reportValidity() ||
    !form.email.value.reportValidity() ||
    !form.password.value.reportValidity() ||
    !form.passwordConfirm.value.reportValidity()
  )
    return

  // パスワードチェック
  if (form.password.value.value !== form.passwordConfirm.value.value) {
    form.passwordConfirm.value.setCustomValidity("パスワードが一致しません。")
    form.passwordConfirm.value.reportValidity()
    return
  }

  // 登録処理
  try {
    await usersApi.usersPost({
      inlineObject: {
        handleName: form.hanndleName.value.value,
        carType: form.carType.value.value,
        email: form.email.value.value,
        password: form.password.value.value,
      },
    })
  } catch {
    useAlertListState.add("エラーが発生しました。")
    return
  }
  // ログイン
  await authenticationApi.authenticationLoginPost({
    inlineObject1: {
      email: form.email.value.value,
      password: form.password.value.value,
      remember: true,
    },
  })
  router.push({ name: "index" })
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
        新規登録
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div>
          <div>
            <label
              for="hundle-name"
              class="block text-sm font-medium leading-6 text-gray-900"
              required
              >ハンドルネーム<span
                class="text-red-400 text-lg leading-none"
                title="このフィールドは必須です"
                >*</span
              ></label
            >
            <div class="mt-1">
              <input
                id="hundle-name"
                name="hundle-name"
                type="text"
                :ref="form.hanndleName"
                autocomplete="hundle-name"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="mt-2">
            <label
              for="car-type"
              class="block text-sm font-medium leading-6 text-gray-900"
              >車種<span
                class="text-red-400 text-lg leading-none"
                title="このフィールドは必須です"
                >*</span
              ></label
            >
            <div class="mt-1">
              <input
                id="car-type"
                name="car-type"
                type="text"
                :ref="form.carType"
                autocomplete="car-type"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="mt-2">
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >メールアドレス<span
                class="text-red-400 text-lg leading-none"
                title="このフィールドは必須です"
                >*</span
              ></label
            >
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                :ref="form.email"
                autocomplete="email"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="mt-2">
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >パスワード<span
                class="text-red-400 text-lg leading-none"
                title="このフィールドは必須です"
                >*</span
              ></label
            >
            <div class="mt-1">
              <div class="relative mt-2 rounded-md shadow-sm">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="new-password"
                  :ref="form.password"
                  required
                  pattern="^(?=.*\d)(?=.*[a-zA-Z]).{8,}$"
                  title="半角英字と半角数字を組み合わせて8文字以上で入力してください。"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="パスワード"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-gray-400 hover:fill-gray-300"
                    width="20"
                    height="20"
                    viewBox="0 0 200 145.522"
                    @click="onSwitchPasswordVisibility('password')"
                  >
                    <path
                      d="M99.363,0C52.631,0,14.243,30.17,0,72.083,14.243,114,52.631,145.522,99.363,145.522S185.754,114,200,72.083A106.312,106.312,0,0,0,99.363,0ZM97.382,24.478a47.647,47.647,0,1,1,1.981,95.254,47.643,47.643,0,1,1-1.981-95.265ZM99.363,39.1A32.987,32.987,0,1,0,132.35,72.083,32.987,32.987,0,0,0,99.363,39.1Zm8.233,8.743a11.454,11.454,0,1,1-11.215,11.69A11.455,11.455,0,0,1,107.6,47.839Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="mt-2">
              <div class="relative mt-2 rounded-md shadow-sm">
                <input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  autocomplete="password-confirm"
                  :ref="form.passwordConfirm"
                  required
                  pattern="^(?=.*\d)(?=.*[a-zA-Z]).{8,}$"
                  title="半角英字と半角数字を組み合わせて8文字以上で入力してください。"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="確認"
                />
                <div class="absolute inset-y-0 right-0 flex items-center pr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="fill-gray-400 hover:fill-gray-300"
                    width="20"
                    height="20"
                    viewBox="0 0 200 145.522"
                    @click="onSwitchPasswordVisibility('passwordConfirm')"
                  >
                    <path
                      d="M99.363,0C52.631,0,14.243,30.17,0,72.083,14.243,114,52.631,145.522,99.363,145.522S185.754,114,200,72.083A106.312,106.312,0,0,0,99.363,0ZM97.382,24.478a47.647,47.647,0,1,1,1.981,95.254,47.643,47.643,0,1,1-1.981-95.265ZM99.363,39.1A32.987,32.987,0,1,0,132.35,72.083,32.987,32.987,0,0,0,99.363,39.1Zm8.233,8.743a11.454,11.454,0,1,1-11.215,11.69A11.455,11.455,0,0,1,107.6,47.839Z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <button
              type="button"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              @click="onSubmit()"
            >
              ログイン
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
