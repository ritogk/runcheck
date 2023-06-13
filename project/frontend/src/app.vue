<script setup lang="ts">
import { provide } from "vue"
import DashboardT from "@/app/dashboard-t.vue"
import LoadingT from "@/app/loading-t.vue"
import "./tailwind.css"
import {
  UseLoading,
  UseLoadingStateKey,
} from "@/app/loading-parts/LoadingState"

const useLoading = UseLoading()
provide(UseLoadingStateKey, useLoading)
useLoading.load()
</script>

<template>
  <DashboardT class="touch-manipulation" />
  <LoadingT v-if="useLoading.subscription.isLoading.value"></LoadingT>
</template>
