<script setup lang="ts">
import { provide, inject } from "vue"
import { UseMainState, UseMainStateKey } from "@/pages/main/UseMainState"
import { useUserStateKey, useUserStateType } from "@/components/useUserState"

const useMainState = UseMainState()
provide(UseMainStateKey, useMainState)

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
            美浜サーキット ベストラップvsセカンドラップ
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            F:A052 225/50/R15 R:A052 195/50/R15
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
