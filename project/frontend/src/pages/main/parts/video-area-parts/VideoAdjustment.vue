<script setup lang="ts">
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  // SearchIcon,
} from "@heroicons/vue/20/solid";
</script>
<template>
  <!-- 進む -->
  <div class="mt-2 flex gap-2 justify-between">
    <button
      class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      <div class="flex items-center justify-center">
        <ChevronDoubleRightIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        1s
      </div>
    </button>
    <button
      class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      <div class="flex items-center justify-center">
        <ChevronDoubleRightIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        0.5s
      </div>
    </button>
    <button
      class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      <div class="flex items-center justify-center">
        <ChevronDoubleRightIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        0.1s
      </div>
    </button>
    <button
      class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      <div class="flex items-center justify-center">
        <ChevronDoubleRightIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        0.05s
      </div>
    </button>
  </div>
  <!-- 戻る -->
  <div class="mt-2 flex gap-2 justify-between">
    <button
      class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      <div class="flex items-center justify-center">
        <ChevronDoubleLeftIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        1s
      </div>
    </button>
    <button
      class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      <div class="flex items-center justify-center">
        <ChevronDoubleLeftIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        0.5s
      </div>
    </button>
    <button
      class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      <div class="flex items-center justify-center">
        <ChevronDoubleLeftIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        0.1s
      </div>
    </button>
    <button
      class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
    >
      <div class="flex items-center justify-center">
        <ChevronDoubleLeftIcon
          class="h-5 w-5 text-gray-400"
          aria-hidden="true"
        />
        0.05s
      </div>
    </button>
  </div>
</template>
