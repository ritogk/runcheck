<script setup lang="ts">
import { provide, inject } from "vue"
import { useRouter } from "vue-router"
import { UserIcon } from "@heroicons/vue/24/outline"
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

const router = useRouter()

const hundleHeaderClick = () => {
  location.href = location.origin + router.resolve("index").href
}

const hundleHomeClick = () => {
  useSidebarState.close()
  router.push({ name: "home" })
}
</script>

<template>
  <div>
    <MobileSidebarI></MobileSidebarI>
    <MobileHeaderI></MobileHeaderI>

    <!-- desktop-sidebar -->
    <div
      class="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col"
    >
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
        <div
          class="mt-5 cursor-pointer text-sm font-semibold leading-6 text-slate-100"
          @click="hundleHeaderClick()"
        >
          <div>
            <div class="text-[20px]">RunCheck</div>
            <div class="text-[10px] font-normal leading-5">
              車載動画でサーキットを攻略！タイムアップのための比較アプリ
            </div>
          </div>
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" class="-mx-2 space-y-1">
                <li v-if="useUserState.subscription.logined.value">
                  <a
                    class="group flex cursor-pointer gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                    @click="hundleHomeClick()"
                  >
                    <component
                      :is="UserIcon"
                      class="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {{ useUserState.subscription.user.value.name }}
                  </a>
                </li>
                <li
                  v-for="item in useSidebarState.subscription.items.value"
                  :key="item.name"
                >
                  <a
                    v-if="item.show.value"
                    :href="item.href"
                    :class="[
                      item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                    ]"
                    @click="item.action"
                  >
                    <component
                      :is="item.icon"
                      class="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <main class="lg:pl-72">
      <AlretI></AlretI>
      <div class="bg-gray-100 sm:px-1 lg:px-8">
        <!-- Your content -->
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>
