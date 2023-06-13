<script setup lang="ts">
import { inject } from "vue"
import { useRouter } from "vue-router"
import { Bars3Icon } from "@heroicons/vue/24/outline"
import { UseSidebarStateKey, IUseSidebarState } from "./use-sidebar-state"

const useSidebarState = inject(UseSidebarStateKey) as IUseSidebarState
const router = useRouter()

const hundleHeaderClick = () => {
  location.href = location.origin + router.resolve("index").href
}
</script>

<template>
  <!-- mobile-header -->
  <div
    class="z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-3 shadow-sm sm:px-6 lg:hidden"
  >
    <div
      class="flex-1 cursor-pointer text-sm font-semibold leading-6 text-slate-100"
      @click="hundleHeaderClick()"
    >
      <div>
        <div class="text-lg">RunCheck</div>
        <div class="text-[9px] font-normal leading-3">
          車載動画でサーキットを攻略！タイムアップのための比較アプリ
        </div>
      </div>
    </div>
    <button
      type="button"
      class="-m-2.5 p-2.5 text-gray-400 lg:hidden"
      title="サイドバーを開く"
      aria-label="サイドバーを開く"
      @click="useSidebarState.open()"
    >
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
  </div>
</template>
