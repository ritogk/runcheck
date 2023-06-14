<script setup lang="ts">
import { ref, inject, watch } from "vue"
import { UseAlretStateKey, UseAlretStateType } from "@/app/alret-state"
import { useRouter } from "vue-router"
import { UseUserStateKey, UseUserStateType } from "@/app/user-state"
import { UseLoadingStateKey, UseLoadingStateType } from "@/app/loading-state"
import FormInputText from "@/components/form-input-text.vue"

const form = {
  hanndleName: {
    id: "hanndle-name",
    required: true,
    label: "ハンドルネーム",
    placeholder: "",
    value: ref<string>(""),
  },
  carType: {
    id: "car-type",
    required: true,
    label: "車種",
    placeholder: "",
    value: ref<string>(""),
  },
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
  passwordConfirm: {
    id: "password-confirm",
    required: true,
    label: "パスワード(確認)",
    placeholder: "",
    value: ref<string>(""),
  },
}

const router = useRouter()
const useAlertState = inject(UseAlretStateKey) as UseAlretStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType
const userState = inject(UseUserStateKey) as UseUserStateType

const onSwitchPasswordVisibility = (type: "password" | "password-confirm") => {
  switch (type) {
    case "password":
      const passwordElement = <HTMLInputElement>(
        document.getElementById(form.password.id)
      )
      passwordElement.type === "password" ? "text" : "password"
      break
    case "password-confirm":
      const passwordConfirmElement = <HTMLInputElement>(
        document.getElementById(form.passwordConfirm.id)
      )
      passwordConfirmElement.type === "password" ? "text" : "password"
  }
}

const onSubmit = async () => {
  const passwordElement = <HTMLInputElement>(
    document.getElementById(form.password.id)
  )
  const passwordConfirmElement = <HTMLInputElement>(
    document.getElementById(form.passwordConfirm.id)
  )
  // 独自エラーの初期化
  passwordConfirmElement.setCustomValidity("")
  // パスワードチェック
  if (passwordElement.value !== passwordConfirmElement.value) {
    passwordConfirmElement.setCustomValidity("パスワードが一致しません。")
    passwordConfirmElement.reportValidity()
    return
  }
  const loadingId = useLoadingState.run()
  try {
    await userState.register(
      form.hanndleName.value.value,
      form.carType.value.value,
      form.email.value.value,
      passwordElement.value
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

watch(form.hanndleName.value, (value) => {
  console.log(value)
})
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
        <form @submit.prevent="onSubmit">
          <div class="space-y-4">
            <FormInputText
              :id="form.hanndleName.id"
              :required="form.hanndleName.required"
              :label="form.hanndleName.label"
              :placeholder="form.hanndleName.placeholder"
              @input="form.hanndleName.value.value = $event"
            ></FormInputText>

            <FormInputText
              :id="form.carType.id"
              :required="form.carType.required"
              :label="form.carType.label"
              :placeholder="form.carType.placeholder"
              @input="form.carType.value.value = $event"
            ></FormInputText>

            <FormInputText
              :id="form.email.id"
              :required="form.email.required"
              :label="form.email.label"
              :placeholder="form.email.placeholder"
              @input="form.email.value.value = $event"
            ></FormInputText>

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
                class="mt-7 flex w-full justify-center rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-600"
              >
                新規登録
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
