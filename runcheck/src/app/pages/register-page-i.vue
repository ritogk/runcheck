<script setup lang="ts">
import { ref, inject } from "vue"
import { UseAlretStateKey, UseAlretStateType } from "@/app/use-alret-state"
import { useRouter } from "vue-router"
import { UseUserStateKey, UseUserStateType } from "@/app/use-user-state"
import { UseLoadingStateKey, UseLoadingStateType } from "@/app/use-loading-state"
import InputPassword from "@/components/input-password.vue"
import InputEmail from "@/components/input-email.vue"
import FormLabel from "@/components/form-label.vue"

const form = {
  hanndleName: {
    id: "hanndle-name",
    required: true,
    label: "ハンドルネーム",
    placeholder: "",
    value: ref<string>("")
  },
  carType: {
    id: "car-type",
    required: true,
    label: "車種",
    placeholder: "",
    value: ref<string>("")
  },
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
    placeholder: "パスワード",
    value: ref<string>("")
  },
  passwordConfirm: {
    id: "password-confirm",
    required: true,
    label: "パスワード(確認)",
    placeholder: "確認",
    value: ref<string>("")
  }
}

const router = useRouter()
const alertState = inject(UseAlretStateKey) as UseAlretStateType
const loadingState = inject(UseLoadingStateKey) as UseLoadingStateType
const userState = inject(UseUserStateKey) as UseUserStateType

const unmatchedPasswordMessage = "パスワードが一致しません。"
const hundlePasswordCongirmValidate = (): boolean => {
  const passwordConfirmElement = document.getElementById(
    form.passwordConfirm.id
  ) as HTMLInputElement
  // 「検証エラーなし」または「パスワード不一致でひっかかた後」
  if (
    passwordConfirmElement.validationMessage === "" ||
    passwordConfirmElement.validationMessage === unmatchedPasswordMessage
  ) {
    // パスワードチェック
    if (form.password.value.value !== form.passwordConfirm.value.value) {
      passwordConfirmElement.setCustomValidity(unmatchedPasswordMessage)
      passwordConfirmElement.reportValidity()
      return false
    } else {
      passwordConfirmElement.setCustomValidity("")
    }
  }
  return true
}

const onSubmit = async () => {
  // ごくまれにchangeイベントハンドラのバリデーションが走る前に送信されるのでここでもやる。
  hundlePasswordCongirmValidate()

  const loadingId = loadingState.run()
  try {
    await userState.register(
      form.hanndleName.value.value,
      form.carType.value.value,
      form.email.value.value,
      form.password.value.value
    )
    loadingState.stop(loadingId)
    alertState.clear()
    router.push({ name: "index" })
  } catch {
    alertState.add("エラーが発生しました。既に登録されているメールアドレスの可能性があります。")
  }
  loadingState.stop(loadingId)
}
</script>

<template>
  <div>
    {{ alertState.subscription.messages.value }}
  </div>
  <div class="flex min-h-full flex-col justify-center py-6 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">新規登録</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form @submit.prevent="onSubmit">
          <div class="space-y-4">
            <FormLabel
              :id="form.hanndleName.id"
              :required="form.hanndleName.required"
              :label="form.hanndleName.label"
            >
              <input
                type="text"
                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                :id="form.hanndleName.id"
                :name="form.hanndleName.id"
                :placeholder="form.hanndleName.placeholder"
                :required="form.hanndleName.required"
                v-model="form.hanndleName.value.value"
              />
            </FormLabel>

            <FormLabel
              :id="form.carType.id"
              :required="form.carType.required"
              :label="form.carType.label"
            >
              <input
                type="text"
                class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
                :id="form.carType.id"
                :name="form.carType.id"
                :placeholder="form.carType.placeholder"
                :required="form.carType.required"
                v-model="form.carType.value.value"
              />
            </FormLabel>

            <FormLabel
              :id="form.email.id"
              :required="form.email.required"
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
              :required="form.password.required"
              :label="form.password.label"
            >
              <div class="mt-2">
                <div class="flex gap-2">
                  <InputPassword
                    class="w-1/2"
                    :id="form.password.id"
                    :value="form.password.value.value"
                    :placeholder="form.password.placeholder"
                    @input="form.password.value.value = $event"
                  ></InputPassword>
                  <InputPassword
                    class="w-1/2"
                    :id="form.passwordConfirm.id"
                    :value="form.passwordConfirm.value.value"
                    :placeholder="form.passwordConfirm.placeholder"
                    @input="form.passwordConfirm.value.value = $event"
                    @change="hundlePasswordCongirmValidate"
                  ></InputPassword>
                </div>
              </div>
            </FormLabel>

            <div>
              <button
                type="submit"
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
