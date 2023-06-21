<script setup lang="ts">
const props = defineProps<{
  label: string
  type: "submit"|"button"|"reset"
}>()
</script>

<template>
  <button
    :type="props.type"
    class="flex w-full justify-center rounded-md  px-3 py-2 text-sm font-semibold  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-600 text-white hover:bg-slate-500 focus-visible:outline-slate-600" 
  >
    {{ props.label }}
  </button>
</template>
