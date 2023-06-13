<script setup lang="ts">
import { provide } from "vue"
import DashboardPI from "@/app/dashboard-pi.vue"
import Loading from "@/app/loading.vue"
import "./tailwind.css"
import {
  UseLoading,
  UseLoadingStateKey,
} from "@/app/loading-parts/loading-state"

const useLoading = UseLoading()
provide(UseLoadingStateKey, useLoading)
useLoading.load()
</script>

<template>
  <DashboardPI class="touch-manipulation" />
  <Loading v-if="useLoading.subscription.isLoading.value"></Loading>
</template>
