<script setup lang="ts">
const props = defineProps<{
  label?: string
  variant?: "primary" | "danger" | "secondary" | "custom"
  type?: "submit" | "button" | "reset"
  size?: "sm" | "md" | "lg"
  accessibilityTitle?: string
}>()
</script>

<template>
  <button
    :type="props.type ?? 'button'"
    :class="{
      // variant
      'bg-slate-600 text-white hover:bg-slate-500 focus-visible:outline-slate-700':
        props.variant === 'primary',
      'bg-red-500 text-white hover:bg-red-400 focus-visible:outline-red-600':
        props.variant === 'danger',
      'bg-white text-gray-800 ring-gray-300 hover:bg-gray-50 focus-visible:outline-gray-400':
        props.variant === 'secondary' || props.variant === undefined,
      // size
      'py-1.5': props.size === 'sm',
      'py-2': props.size === 'md' || props.size === undefined,
      'py-2.5': props.size === 'lg'
    }"
    class="rounded-md px-4 text-sm font-semibold shadow-sm ring-1 ring-inset focus:z-10"
    :title="props.accessibilityTitle"
    :aria-label="props.accessibilityTitle"
  >
    <div class="flex justify-center gap-1">
      <div
        class="h-5 w-5"
        :class="{
          'text-white': props.variant === 'primary' || props.variant === 'danger',
          'fill-gray-400 text-gray-400':
            props.label !== undefined &&
            (props.variant === 'secondary' || props.variant === undefined),
          'fill-gray-500  text-gray-500':
            props.label === undefined &&
            (props.variant === 'secondary' || props.variant === undefined)
        }"
        aria-hidden="true"
        v-if="$slots.default"
      >
        <slot></slot>
      </div>
      {{ props.label }}
    </div>
  </button>
</template>
