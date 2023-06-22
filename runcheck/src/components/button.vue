<script setup lang="ts">
const props = defineProps<{
  label: string
  variant: "primary" | "danger"
  type: "submit" | "button" | "reset"
}>()
</script>

<template>
  <button
    :type="props.type"
    :class="{
      'bg-slate-500 text-white hover:bg-slate-400 focus-visible:outline-slate-600':
        props.variant === 'primary',
      'bg-red-500 text-white hover:bg-red-400 focus-visible:outline-red-600':
        props.variant === 'danger',
      'bg-white text-gray-800 ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-400':
        props.variant === undefined
    }"
    class="rounded-md px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset focus:z-10"
  >
    {{ props.label }}
  </button>
</template>
