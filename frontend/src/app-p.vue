<script setup lang="ts">
import { provide, ref } from "vue"
import SidebarDesktopI from "./app/sidebar-desktop-i.vue"
import HeaderMobileI from "./app/header-mobile-i.vue"
import SidebarMobileI from "./app/sidebar-mobile-i.vue"
import AlretI from "@/app/alret-i.vue"
import Loading from "@/app/loading.vue"
import "./tailwind.css"
import { UseLoadingState, UseLoadingStateKey } from "@/app/loading-state"
import { UseUserState, UseUserStateKey } from "@/app/user-state"
import { UseAlretState, UseAlretStateKey } from "./app/alret-state"
import { UseSidebarState, UseSidebarStateKey } from "./app/sidebar-state"

const useLoadingState = UseLoadingState()
const useUserState = UseUserState()
const useAlretState = UseAlretState()
const useSidebarState = new UseSidebarState(useUserState, useLoadingState)
provide(UseLoadingStateKey, useLoadingState)
provide(UseUserStateKey, useUserState)
provide(UseAlretStateKey, useAlretState)
provide(UseSidebarStateKey, useSidebarState)

const loadState = async () => {
  // ユーザー情報が取得できるまでロードさせる
  const loadingId = useLoadingState.run()
  await useUserState.load()
  useLoadingState.stop(loadingId)
}
loadState()
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
  <Loading v-if="useLoadingState.subscription.isLoading.value"></Loading>
</template>
