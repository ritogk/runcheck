<script setup lang="ts">
const props = defineProps<{
  title: string
  memo: string
}>()
</script>

<template>
  <div>
    <!-- タイトル、詳細 -->
    <div class="rounded-md border border-gray-300 bg-white px-4 py-3 sm:px-4">
      <div
        class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
      >
        <div class="ml-4 mt-4">
          <h3 class="text-base font-semibold leading-6 text-gray-900">
            {{ props.title }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ props.memo }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
