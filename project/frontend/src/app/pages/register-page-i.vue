<script setup lang="ts">
import { ref, inject } from "vue"
import {
  UseAlretStateKey,
  UseAlretStateType,
} from "@/app/dashboard-parts/UseAlretState"
import { useRouter } from "vue-router"
import {
  UseUserStateKey,
  UseUserStateType,
} from "@/app/dashboard-parts/UseUserState"
import {
  UseLoadingStateKey,
  UseLoadingStateType,
} from "@/app/loading-parts/loading-state"

const router = useRouter()
const useAlertState = inject(UseAlretStateKey) as UseAlretStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType

const userState = inject(UseUserStateKey) as UseUserStateType

const form = {
  hanndleName: ref<HTMLInputElement | null>(null),
  carType: ref<HTMLInputElement | null>(null),
  email: ref<HTMLInputElement | null>(null),
  password: ref<HTMLInputElement | null>(null),
  passwordConfirm: ref<HTMLInputElement | null>(null),
}

const onSwitchPasswordVisibility = (type: "password" | "password-confirm") => {
  switch (type) {
    case "password":
      if (form.password.value === null) return
      form.password.value.type =
        form.password.value.type === "password" ? "text" : "password"
      break
    case "password-confirm":
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

  const loadingId = useLoadingState.run()
  try {
    await userState.register(
      form.hanndleName.value.value,
      form.carType.value.value,
      form.email.value.value,
      form.password.value.value
    )
    useLoadingState.stop(loadingId)
    useAlertState.clear()
    router.push({ name: "index" })
  } catch {
    useAlertState.add(
      "エラーが発生しました。既に登録されているメールアドレスの可能性があります。"
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
        新規登録
      </h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <div class="space-y-4">
          <div>
            <label
              for="hundle-name"
              class="block text-sm font-medium leading-6 text-gray-900"
              required
              >ハンドルネーム<span
                class="text-lg leading-none text-red-400"
                title="このフィールドは必須です"
                >*</span
              ></label
            >
            <div class="mt-2">
              <input
                id="hundle-name"
                name="hundle-name"
                type="text"
                :ref="form.hanndleName"
                autocomplete="hundle-name"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="car-type"
              class="block text-sm font-medium leading-6 text-gray-900"
              >車種<span
                class="text-lg leading-none text-red-400"
                title="このフィールドは必須です"
                >*</span
              ></label
            >
            <div class="mt-2">
              <input
                id="car-type"
                name="car-type"
                type="text"
                :ref="form.carType"
                autocomplete="car-type"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >メールアドレス<span
                class="text-lg leading-none text-red-400"
                title="このフィールドは必須です"
                >*</span
              ></label
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
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >パスワード<span
                class="text-lg leading-none text-red-400"
                title="このフィールドは必須です"
                >*</span
              ></label
            >
            <div class="mt-2">
              <div class="flex gap-2">
                <div class="relative mt-2 w-1/2 rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="new-password"
                    :ref="form.password"
                    required
                    pattern="^(?=.*\d)(?=.*[a-zA-Z]).{8,}$"
                    title="半角英字と半角数字を組み合わせて8文字以上で入力してください。"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    placeholder="パスワード"
                  />
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
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
                <div class="relative mt-2 w-1/2 rounded-md shadow-sm">
                  <input
                    id="password-confirm"
                    name="password-confirm"
                    type="password"
                    autocomplete="password-confirm"
                    :ref="form.passwordConfirm"
                    required
                    pattern="^(?=.*\d)(?=.*[a-zA-Z]).{8,}$"
                    title="半角英字と半角数字を組み合わせて8文字以上で入力してください。"
                    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                    placeholder="確認"
                  />
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="fill-gray-400 hover:fill-gray-300"
                      width="20"
                      height="20"
                      viewBox="0 0 200 145.522"
                      @click="onSwitchPasswordVisibility('password-confirm')"
                    >
                      <path
                        d="M99.363,0C52.631,0,14.243,30.17,0,72.083,14.243,114,52.631,145.522,99.363,145.522S185.754,114,200,72.083A106.312,106.312,0,0,0,99.363,0ZM97.382,24.478a47.647,47.647,0,1,1,1.981,95.254,47.643,47.643,0,1,1-1.981-95.265ZM99.363,39.1A32.987,32.987,0,1,0,132.35,72.083,32.987,32.987,0,0,0,99.363,39.1Zm8.233,8.743a11.454,11.454,0,1,1-11.215,11.69A11.455,11.455,0,0,1,107.6,47.839Z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <button
              type="button"
              class="mt-7 flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              @click="onSubmit()"
            >
              新規登録
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
