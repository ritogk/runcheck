<script setup lang="ts">
import Dashboard from "@/app/Dashboard.vue"
import "./tailwind.css"
import { provide } from "vue"
import {
  useUserState,
  useUserStateKey,
} from "@/app/dashboard-parts/useUserState"

const userState = useUserState()
provide(useUserStateKey, userState)
userState.load()
</script>

<template>
  <Dashboard class="touch-manipulation" />
</template>
