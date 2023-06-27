<script setup lang="ts">
import { provide, watch } from "vue"
import SidebarDesktopI from "./app/sidebar-desktop-i.vue"
import HeaderMobileI from "./app/header-mobile-i.vue"
import SidebarMobileI from "./app/sidebar-mobile-i.vue"
import AlretI from "@/app/alret-i.vue"
import Loading from "@/app/loading.vue"
import { UseLoadingState, UseLoadingStateKey } from "@/app/use-loading-state"
import { UseAlretState, UseAlretStateKey } from "./app/use-alret-state"
import { UseSidebarState, UseSidebarStateKey } from "./app/use-sidebar-state"

const loadingState = UseLoadingState()
const alretState = UseAlretState()
const sidebarState = new UseSidebarState(loadingState)
provide(UseLoadingStateKey, loadingState)
provide(UseAlretStateKey, alretState)
provide(UseSidebarStateKey, sidebarState)
</script>

<template>
  <div class="touch-manipulation">
    <HeaderMobileI class="lg:hidden"></HeaderMobileI>
    <SidebarMobileI class="lg:hidden"></SidebarMobileI>
    <SidebarDesktopI
      class="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col"
    ></SidebarDesktopI>
    <main class="lg:pl-72">
      <AlretI></AlretI>
      <div class="bg-gray-100 sm:px-1 lg:px-8">
        <!-- Your content -->
        <router-view></router-view>
      </div>
    </main>
  </div>
  <Loading v-if="loadingState.subscription.isLoading.value"></Loading>
</template>
