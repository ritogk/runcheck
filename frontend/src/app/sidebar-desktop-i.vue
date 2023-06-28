<script setup lang="ts">
import { inject } from "vue"
import { useRouter } from "vue-router"
import { UserIcon } from "@heroicons/vue/24/outline"
import { UseSidebarStateKey, type IUseSidebarState } from "./use-sidebar-state"
import { UseGetStatus } from "@/core/api-state/use-get-status"

const sidebarState = inject(UseSidebarStateKey) as IUseSidebarState
const router = useRouter()
const apiGetStatus = UseGetStatus()

const hundleHeaderClick = () => {
  location.href = location.origin + router.resolve("index").href
}

const hundleHomeClick = () => {
  sidebarState.close()
  router.push({ name: "home" })
}
</script>

<style>
.item-enter-from {
  opacity: 0;
}

.item-enter-to {
  opacity: 1;
}

.item-enter-active {
  transition: opacity 0.7s ease;
}
</style>

<template>
  <!-- desktop-sidebar -->
  <div>
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
            <!-- スケルトン -->
            <ul
              v-show="apiGetStatus.isFetching.value"
              role="list"
              class="-mx-2 animate-pulse space-y-1"
            >
              <li v-for="index in 4" :key="index" class="h-10 px-2 py-3">
                <div class="h-full rounded-full bg-gray-700"></div>
              </li>
            </ul>
            <Transition name="item">
              <ul role="list" class="-mx-2 space-y-1" v-show="!apiGetStatus.isFetching.value">
                <!-- ホーム -->
                <li v-show="apiGetStatus.data.value?.isLogined">
                  <a
                    class="group flex cursor-pointer gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                    @click="hundleHomeClick()"
                  >
                    <component :is="UserIcon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ apiGetStatus.data.value?.user.name }}
                  </a>
                </li>
                <!-- その他 -->
                <li v-for="item in sidebarState.subscription.items.value" :key="item.name">
                  <a
                    v-if="item.show.value"
                    :href="item.href"
                    :class="[
                      item.current
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white',
                      'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6'
                    ]"
                    @click="item.action"
                  >
                    <component :is="item.icon" class="h-6 w-6 shrink-0" aria-hidden="true" />
                    {{ item.name }}
                  </a>
                </li>
              </ul>
            </Transition>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
