<script setup lang="ts">
import { provide, inject } from "vue"
import { UseMainStateType, UseMainStateKey } from "@/pages/main/UseMainState"
import { useUserStateKey, useUserStateType } from "@/components/useUserState"

const useMainState = inject(UseMainStateKey) as UseMainStateType

const userState = inject(useUserStateKey) as useUserStateType
</script>

<template>
  <div v-show="userState.subscription.value.logined">
    <!-- タイトル、詳細 -->
    <div
      class="border border-gray-300 rounded-md bg-white px-4 py-3 sm:px-4 my-2"
    >
      <div
        class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
      >
        <div class="ml-4 mt-4">
          <h3 class="text-base font-semibold leading-6 text-gray-900">
            {{ useMainState.title.subscription.title.value }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ useMainState.title.subscription.memo.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
