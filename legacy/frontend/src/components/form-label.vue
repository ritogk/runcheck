<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  required: boolean
}>()
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
    <slot></slot>
  </div>
</template>
