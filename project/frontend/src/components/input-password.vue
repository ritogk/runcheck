<script setup lang="ts">
const props = defineProps<{
  value: string
  id: string
  placeholder: string
}>()

const emits = defineEmits<{
  (e: "input", value: string): void
  (e: "change"): void
}>()

const hundleInput = (event: any) => {
  emits("input", event.target.value)
}

const hundleChange = (event: any) => {
  emits("change")
}

const switchPasswordVisibility = () => {
  const element = <HTMLInputElement>document.getElementById(props.id)
  element.type = element.type === "password" ? "text" : "password"
}
</script>

<template>
  <div class="relative mt-2 rounded-md shadow-sm">
    <input
      :id="props.id"
      :name="props.id"
      :placeholder="props.placeholder"
      :value="props.value"
      required
      type="password"
      autocomplete="new-password"
      @input="hundleInput"
      @change="hundleChange"
      pattern="^(?=.*\d)(?=.*[a-zA-Z]).{8,}$"
      title="半角英字と半角数字を組み合わせて8文字以上で入力してください。"
      class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
    />
    <div class="absolute inset-y-0 right-0 flex items-center pr-3">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="fill-gray-400 hover:fill-gray-300"
        width="20"
        height="20"
        viewBox="0 0 200 145.522"
        @click="switchPasswordVisibility"
      >
        <path
          d="M99.363,0C52.631,0,14.243,30.17,0,72.083,14.243,114,52.631,145.522,99.363,145.522S185.754,114,200,72.083A106.312,106.312,0,0,0,99.363,0ZM97.382,24.478a47.647,47.647,0,1,1,1.981,95.254,47.643,47.643,0,1,1-1.981-95.265ZM99.363,39.1A32.987,32.987,0,1,0,132.35,72.083,32.987,32.987,0,0,0,99.363,39.1Zm8.233,8.743a11.454,11.454,0,1,1-11.215,11.69A11.455,11.455,0,0,1,107.6,47.839Z"
        />
      </svg>
    </div>
  </div>
</template>
