<script setup lang="ts">
import { inject, computed } from "vue"
import {
  UseMainStateKey,
  UseMainStateType,
} from "@/app/pages/main/UseMainState"
import {
  UseLoadingStateKey,
  UseLoadingStateType,
} from "@/app/loading-parts/LoadingState"
import { handleComparisonOpen } from "./sync-option-parts/HandleComparisonOpen"
import { VideoType } from "./player-area-parts/IVideoPlayer"

const useMainState = inject(UseMainStateKey) as UseMainStateType
const useLoadingState = inject(UseLoadingStateKey) as UseLoadingStateType

const hundleVideoRunSyncClick = () => {
  useMainState.syncPlayer.runSync()
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })
}

const hundleVideoStopSyncClick = () => {
  useMainState.syncPlayer.stopSync()
}

const hundleTweetClick = async () => {
  if (
    useMainState.syncPlayer.playerOne.value.subscription.videoType.value !==
      VideoType.YOUTUBE ||
    useMainState.syncPlayer.playerTwo.value.subscription.videoType.value !=
      VideoType.YOUTUBE
  ) {
    alert("共有はYouTube同士の組み合わせのみ行えます。")
    return
  }
  const loadingId = useLoadingState.run()
  const compoarion = await useMainState.syncPlayer.saveSync(true)
  await useMainState.syncPlayer.publishSync(compoarion.id)
  // ツイートする
  const url = `${window.location.origin}${window.location.pathname}?comparisonId=${compoarion.id}`
  useLoadingState.stop(loadingId)
  location.href = "https://twitter.com/intent/tweet?text=" + url
}

const isSyncButtonDisabled = computed(() => {
  return (
    useMainState.syncPlayer.playerOne.value.subscription.videoType.value ===
      VideoType.NONE ||
    useMainState.syncPlayer.playerTwo.value.subscription.videoType.value ===
      VideoType.NONE
  )
})

// ツイートしたURLから飛んできた時の処理
const urlParams = new URLSearchParams(window.location.search)
const comparisonId = urlParams.get("comparisonId")
if (comparisonId) handleComparisonOpen(Number(comparisonId))
</script>

<template>
  <!-- 動画を同期 and つぶやく-->
  <div class="flex gap-2">
    <button
      type="button"
      class="w-1/2 items-center gap-x-1.5 rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-slate-700 hover:bg-slate-500 focus:z-10 disabled:pointer-events-none disabled:opacity-50"
      v-show="!useMainState.syncPlayer.subscription.synced.value"
      :disabled="isSyncButtonDisabled"
      @click="hundleVideoRunSyncClick"
    >
      <div class="flex items-center justify-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          width="20px"
          height="20px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>

        動画を同期
      </div>
    </button>

    <button
      type="button"
      class="w-1/2 items-center gap-x-1.5 rounded-md bg-slate-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-slate-700 hover:bg-slate-500 focus:z-10"
      v-show="useMainState.syncPlayer.subscription.synced.value"
      @click="hundleVideoStopSyncClick"
    >
      <div class="flex items-center justify-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          width="20px"
          height="20px"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        同期解除
      </div>
    </button>

    <button
      type="button"
      class="w-1/2 items-center gap-x-1.5 rounded-md bg-[#16A2F3] px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-[#1697f3] hover:bg-[#45b7f7] focus:z-10 disabled:pointer-events-none disabled:opacity-50"
      :disabled="!useMainState.syncPlayer.subscription.synced.value"
      @click="hundleTweetClick()"
    >
      <div class="flex items-center justify-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0,0,256,256"
          width="24px"
          height="24px"
          fill-rule="nonzero"
          style="width: 20px; height: 20px"
        >
          <g transform="translate(-21.33333,-21.33333) scale(1.16667,1.16667)">
            <g
              fill="#ffffff"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              style="mix-blend-mode: normal"
            >
              <g transform="scale(10.66667,10.66667)">
                <path
                  d="M22,3.999c-0.78,0.463 -2.345,1.094 -3.265,1.276c-0.027,0.007 -0.049,0.016 -0.075,0.023c-0.813,-0.802 -1.927,-1.299 -3.16,-1.299c-2.485,0 -4.5,2.015 -4.5,4.5c0,0.131 -0.011,0.372 0,0.5c-3.353,0 -5.905,-1.756 -7.735,-4c-0.199,0.5 -0.286,1.29 -0.286,2.032c0,1.401 1.095,2.777 2.8,3.63c-0.314,0.081 -0.66,0.139 -1.02,0.139c-0.581,0 -1.196,-0.153 -1.759,-0.617c0,0.017 0,0.033 0,0.051c0,1.958 2.078,3.291 3.926,3.662c-0.375,0.221 -1.131,0.243 -1.5,0.243c-0.26,0 -1.18,-0.119 -1.426,-0.165c0.514,1.605 2.368,2.507 4.135,2.539c-1.382,1.084 -2.341,1.486 -5.171,1.486h-0.964c1.788,1.146 4.065,2.001 6.347,2.001c7.43,0 11.653,-5.663 11.653,-11.001c0,-0.086 -0.002,-0.266 -0.005,-0.447c0,-0.018 0.005,-0.035 0.005,-0.053c0,-0.027 -0.008,-0.053 -0.008,-0.08c-0.003,-0.136 -0.006,-0.263 -0.009,-0.329c0.79,-0.57 1.475,-1.281 2.017,-2.091c-0.725,0.322 -1.503,0.538 -2.32,0.636c0.834,-0.5 2.019,-1.692 2.32,-2.636z"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        比較結果を共有
      </div>
    </button>
  </div>
</template>
