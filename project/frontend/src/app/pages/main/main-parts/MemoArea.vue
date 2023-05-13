<script setup lang="ts">
import { inject } from "vue"
import {
  UseMainStateType,
  UseMainStateKey,
} from "@/app/pages/main/UseMainState"
import {
  UseUserStateKey,
  UseUserStateType,
} from "@/app/dashboard-parts/UseUserState"

const useMainState = inject(UseMainStateKey) as UseMainStateType

const userState = inject(UseUserStateKey) as UseUserStateType
</script>

<template>
  <div
    v-show="
      userState.subscription.logined.value &&
      useMainState.memo.subscription.title.value &&
      useMainState.memo.subscription.memo.value
    "
  >
    <!-- タイトル、詳細 -->
    <div class="border border-gray-300 rounded-md bg-white px-4 py-3 sm:px-4">
      <div
        class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
      >
        <div class="ml-4 mt-4">
          <h3 class="text-base font-semibold leading-6 text-gray-900">
            {{ useMainState.memo.subscription.title.value }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ useMainState.memo.subscription.memo.value }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
