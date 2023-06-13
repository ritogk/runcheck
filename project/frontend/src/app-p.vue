<script setup lang="ts">
import { provide } from "vue"
import DashboardPI from "@/app/dashboard-pi.vue"
import Loading from "@/app/loading.vue"
import "./tailwind.css"
import {
  UseLoading,
  UseLoadingStateKey,
} from "@/app/loading-parts/loading-state"
import {
  UseUserState,
  UseUserStateKey,
} from "@/app/dashboard-parts/UseUserState"

const useLoading = UseLoading()
const useUserState = UseUserState()
provide(UseLoadingStateKey, useLoading)
provide(UseUserStateKey, useUserState)
useLoading.load()
</script>

<template>
  <DashboardPI class="touch-manipulation" />
  <Loading v-if="useLoading.subscription.isLoading.value"></Loading>
</template>
