<script setup lang="ts">
import { provide } from "vue"
import Dashboard from "@/app/Dashboard.vue"
import Loading from "@/app/Loading.vue"
import "./tailwind.css"
import { UseLoading, UseLoadingKey } from "@/app/loading-parts/LoadingState"

const useLoading = UseLoading()
provide(UseLoadingKey, useLoading)
</script>

<template>
  <Dashboard class="touch-manipulation" />
  <Loading v-if="useLoading.subscription.isLoading.value"></Loading>
</template>
