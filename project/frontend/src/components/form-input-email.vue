<script setup lang="ts">
import InputEmail from "./input-email.vue"

const props = defineProps<{
  value: string
  id: string
  placeholder: string
  label: string
  required: boolean
}>()

const emits = defineEmits<{ (e: "input", value: string): void }>()

const hundleInput = (value: string) => {
  emits("input", value)
}
</script>

<template>
  <div>
    <label
      :for="props.id"
      class="block text-sm font-medium leading-6 text-gray-900"
      :required="props.required"
      >{{ props.label
      }}<span
        v-if="props.required"
        class="text-lg leading-none text-red-400"
        title="このフィールドは必須です"
        >*</span
      ></label
    >
    <div class="mt-2">
      <InputEmail
        :id="props.id"
        :value="props.value"
        :required="props.required"
        :label="props.label"
        :placeholder="props.placeholder"
        @input="hundleInput"
      ></InputEmail>
    </div>
  </div>
</template>
