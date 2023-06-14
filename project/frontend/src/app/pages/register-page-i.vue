<script setup lang="ts">
import { ref, Ref, inject, watch } from "vue"
import { UseAlretStateKey, UseAlretStateType } from "@/app/alret-state"
import { useRouter } from "vue-router"
import { UseUserStateKey, UseUserStateType } from "@/app/user-state"
import { UseLoadingStateKey, UseLoadingStateType } from "@/app/loading-state"
import FormInputText from "@/components/form-input-text.vue"
import FormInputEmail from "@/components/form-input-email.vue"
import InputPassword from "@/components/input-password.vue"

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
    placeholder: "パスワード",
    value: ref<string>(""),
  },
  passwordConfirm: {
    id: "password-confirm",
    required: true,
    label: "パスワード(確認)",
    placeholder: "確認",
    value: ref<string>(""),
  },
}

const router = useRouter()
const useAlertState = inject(UseAlretStateKey) as UseAlretStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType
const userState = inject(UseUserStateKey) as UseUserStateType

const unmatchedPasswordMessage = "パスワードが一致しません。"
const hundlePasswordCongirmValidate = (): boolean => {
  const passwordConfirmElement = <HTMLInputElement>(
    document.getElementById(form.passwordConfirm.id)
  )
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
        <form @submit.prevent="onSubmit">
          <div class="space-y-4">
            <FormInputText
              :id="form.hanndleName.id"
              :value="form.hanndleName.value.value"
              :required="form.hanndleName.required"
              :label="form.hanndleName.label"
              :placeholder="form.hanndleName.placeholder"
              @input="form.hanndleName.value.value = $event"
            ></FormInputText>

            <FormInputText
              :id="form.carType.id"
              :value="form.carType.value.value"
              :required="form.carType.required"
              :label="form.carType.label"
              :placeholder="form.carType.placeholder"
              @input="form.carType.value.value = $event"
            ></FormInputText>

            <FormInputEmail
              :id="form.email.id"
              :value="form.email.value.value"
              :required="form.email.required"
              :label="form.email.label"
              :placeholder="form.email.placeholder"
              @input="form.email.value.value = $event"
            ></FormInputEmail>

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
            </div>

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
