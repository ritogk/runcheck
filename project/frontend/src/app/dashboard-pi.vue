<script setup lang="ts">
import { provide, inject } from "vue"
import AlretI from "@/app/dashboard-parts/alret-i.vue"
// 状態
import {
  UseAlretState,
  UseAlretStateKey,
} from "./dashboard-parts/UseAlretState"
import {
  UseUserStateType,
  UseUserStateKey,
} from "@/app/dashboard-parts/UseUserState"
import {
  UseLoadingStateKey,
  UseLoadingStateType,
} from "@/app/loading-parts/loading-state"
import { UseSidebarState, UseSidebarStateKey } from "./use-sidebar-state"
import DesktopSidebarI from "./desktop-sidebar-i.vue"
import MobileHeaderI from "./mobile-header-i.vue"
import MobileSidebarI from "./mobile-sidebar-i.vue"

const useSidebarState = new UseSidebarState()
const useAlretState = UseAlretState()
const useUserState = inject(UseUserStateKey) as UseUserStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType
provide(UseAlretStateKey, useAlretState)
provide(UseSidebarStateKey, useSidebarState)

const loadState = async () => {
  const loadingId = useLoadingState.run()
  await useUserState.load()
  useLoadingState.stop(loadingId)
}
loadState()
</script>

<template>
  <div>
    <MobileSidebarI></MobileSidebarI>
    <MobileHeaderI></MobileHeaderI>
    <DesktopSidebarI></DesktopSidebarI>

    <main class="lg:pl-72">
      <AlretI></AlretI>
      <div class="bg-gray-100 sm:px-1 lg:px-8">
        <!-- Your content -->
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
