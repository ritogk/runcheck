<script setup lang="ts">
const props = defineProps<{
  value: string
  id: string
  placeholder: string
  required: boolean
}>()

const emits = defineEmits<{ (e: "input", value: string): void }>()

const hundleInput = (event: any) => {
  emits("input", event.target.value)
}
</script>

<template>
  <input
    type="email"
    autocomplete="email"
    :id="props.id"
    :name="props.id"
    :placeholder="props.placeholder"
    :required="props.required"
    :value="props.value"
    @input="hundleInput"
    class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
  />
</template>
