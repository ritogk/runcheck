<script setup lang="ts">
const props = defineProps<{
  value: string
  id: string
  placeholder: string
  label: string
  required: boolean
}>()

const emits = defineEmits<{ (e: "input", value: string): void }>()

const hundleInput = (event: any) => {
  emits("input", event.target.value)
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
      <input
        type="text"
        :id="props.id"
        :name="props.id"
        :placeholder="props.placeholder"
        :required="props.required"
        :value="props.value"
        @input="hundleInput"
        class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-slate-600 sm:text-sm sm:leading-6"
      />
    </div>
  </div>
</template>
