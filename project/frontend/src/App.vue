<script setup lang="ts">
import Dashboard from "./pages/Dashboard.vue"
import "./tailwind.css"
import { provide } from "vue"
import { useUserState, useUserStateKey } from "@/components/useUserState"

const userState = useUserState()
provide(useUserStateKey, userState)
userState.load()
</script>

<template>
  <Dashboard />
</template>
