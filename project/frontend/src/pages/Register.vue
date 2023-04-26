<script setup lang="ts">
import { ref } from "vue"

const form = {
  hanndleName: ref<HTMLInputElement | null>(null),
  carType: ref<HTMLInputElement | null>(null),
  email: ref<HTMLInputElement | null>(null),
  password: ref<HTMLInputElement | null>(null),
  passwordConfirm: ref<HTMLInputElement | null>(null),
}

const onSubmit = () => {
  if (
    form.hanndleName.value === null ||
    form.carType.value === null ||
    form.email.value === null ||
    form.password.value === null ||
    form.passwordConfirm.value === null
  )
    return

  form.passwordConfirm.value.setCustomValidity("")
  if (
    !form.hanndleName.value.reportValidity() ||
    !form.carType.value.reportValidity() ||
    !form.email.value.reportValidity() ||
    !form.password.value.reportValidity() ||
    !form.passwordConfirm.value.reportValidity()
  )
    return

  if (form.password.value.value !== form.passwordConfirm.value.value) {
    form.passwordConfirm.value.setCustomValidity("パスワードが一致しません。")
    form.passwordConfirm.value.reportValidity()
    return
  }
  console.log(form.password.value.value)
  console.log(form.passwordConfirm.value.value)
  console.log(form.carType.value.value)
  console.log(form.email.value.value)
  console.log(form.hanndleName.value.value)
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
            <div class="mt-2">
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

          <div>
            <label
              for="car-type"
              class="block text-sm font-medium leading-6 text-gray-900"
              >車種<span
                class="text-red-400 text-lg leading-none"
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
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="email"
              class="block text-sm font-medium leading-6 text-gray-900"
              >メールアドレス<span
                class="text-red-400 text-lg leading-none"
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
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium leading-6 text-gray-900"
              >パスワード<span
                class="text-red-400 text-lg leading-none"
                title="このフィールドは必須です"
                >*</span
              ></label
            >
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autocomplete="new-password"
                :ref="form.password"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              for="password-confirmation"
              class="block text-sm font-medium leading-6 text-gray-900"
              >パスワード(確認)<span
                class="text-red-400 text-lg leading-none"
                title="このフィールドは必須です"
                >*</span
              ></label
            >
            <div class="mt-2">
              <input
                id="password-confirmation"
                name="password-confirmation"
                type="password"
                autocomplete="passwordConfirm"
                :ref="form.passwordConfirm"
                required
                class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
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
