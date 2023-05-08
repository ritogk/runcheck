<script setup lang="ts">
import { provide } from "vue"
import { UseMainState, UseMainStateKey } from "./UseMainState"
import PlayerOneArea from "./parts/PlayerOneArea.vue"
import PlayerTwoArea from "./parts/PlayerTwoArea.vue"
import YoutubeSelectModal from "./parts/YoutubeSelectModal.vue"
import AdjustSpeedModal from "./parts/AdjustSpeedModal.vue"
import SyncController from "./parts/SyncController.vue"
import SyncOption from "./parts/SyncOption.vue"

const useMainState = UseMainState()
provide(UseMainStateKey, useMainState)
</script>

<template>
  <YoutubeSelectModal></YoutubeSelectModal>
  <AdjustSpeedModal></AdjustSpeedModal>
  <div class="max-w-[600px]">
    <div class="px-1 pt-2">
      <!-- ファイル操作 -->
      <div class="">
        <div class="flex gap-2">
          <button
            class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <div class="flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-gray-600"
                width="20px"
                height="20px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>

              開く
            </div>
          </button>

          <button
            class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <div class="flex items-center justify-center gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M 6.855469 20.570312 L 17.144531 20.570312 L 17.144531 15.429688 L 6.855469 15.429688 Z M 18.855469 20.570312 L 20.570312 20.570312 L 20.570312 8.570312 C 20.570312 8.445312 20.527344 8.273438 20.4375 8.054688 C 20.347656 7.835938 20.257812 7.683594 20.167969 7.59375 L 16.40625 3.832031 C 16.316406 3.742188 16.164062 3.652344 15.949219 3.5625 C 15.738281 3.472656 15.5625 3.429688 15.429688 3.429688 L 15.429688 9 C 15.429688 9.355469 15.304688 9.660156 15.054688 9.910156 C 14.804688 10.160156 14.5 10.285156 14.144531 10.285156 L 6.429688 10.285156 C 6.070312 10.285156 5.769531 10.160156 5.519531 9.910156 C 5.269531 9.660156 5.144531 9.355469 5.144531 9 L 5.144531 3.429688 L 3.429688 3.429688 L 3.429688 20.570312 L 5.144531 20.570312 L 5.144531 15 C 5.144531 14.644531 5.269531 14.339844 5.519531 14.089844 C 5.769531 13.839844 6.070312 13.714844 6.429688 13.714844 L 17.570312 13.714844 C 17.929688 13.714844 18.230469 13.839844 18.480469 14.089844 C 18.730469 14.339844 18.855469 14.644531 18.855469 15 Z M 13.714844 8.144531 L 13.714844 3.855469 C 13.714844 3.742188 13.671875 3.640625 13.585938 3.554688 C 13.503906 3.472656 13.402344 3.429688 13.285156 3.429688 L 10.714844 3.429688 C 10.597656 3.429688 10.496094 3.472656 10.414062 3.554688 C 10.328125 3.640625 10.285156 3.742188 10.285156 3.855469 L 10.285156 8.144531 C 10.285156 8.257812 10.328125 8.359375 10.414062 8.445312 C 10.496094 8.527344 10.597656 8.570312 10.714844 8.570312 L 13.285156 8.570312 C 13.402344 8.570312 13.503906 8.527344 13.585938 8.445312 C 13.671875 8.359375 13.714844 8.257812 13.714844 8.144531 Z M 22.285156 8.570312 L 22.285156 21 C 22.285156 21.355469 22.160156 21.660156 21.910156 21.910156 C 21.660156 22.160156 21.355469 22.285156 21 22.285156 L 3 22.285156 C 2.644531 22.285156 2.339844 22.160156 2.089844 21.910156 C 1.839844 21.660156 1.714844 21.355469 1.714844 21 L 1.714844 3 C 1.714844 2.644531 1.839844 2.339844 2.089844 2.089844 C 2.339844 1.839844 2.644531 1.714844 3 1.714844 L 15.429688 1.714844 C 15.785156 1.714844 16.179688 1.804688 16.605469 1.980469 C 17.035156 2.160156 17.375 2.375 17.625 2.625 L 21.375 6.375 C 21.625 6.625 21.839844 6.964844 22.019531 7.394531 C 22.195312 7.820312 22.285156 8.214844 22.285156 8.570312 Z M 22.285156 8.570312 "
                />
              </svg>
              保存
            </div>
          </button>
        </div>
      </div>

      <div
        class="border border-gray-300 rounded-md bg-white px-4 py-3 sm:px-4 my-2"
      >
        <div
          class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
        >
          <div class="ml-4 mt-4">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              美浜サーキット ベストラップvsセカンドラップ
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              F:A052 225/50/R15 R:A052 195/50/R15
            </p>
          </div>
        </div>
      </div>

      <SyncOption></SyncOption>

      <div class="h-px my-3 bg-gray-300"></div>
    </div>

    <PlayerOneArea></PlayerOneArea>
    <PlayerTwoArea></PlayerTwoArea>
    <SyncController
      v-show="useMainState.syncPlayer.subscription.synced.value"
    ></SyncController>
    <div class="m-5"></div>
  </div>
</template>
