<script setup lang="ts">
import { IVideoPlayer } from "@/app/pages/main-page-parts/player-area-parts/i-video-player"
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/vue/20/solid"

const props = defineProps<{
  player: IVideoPlayer
}>()

const hundleVideoSeek = async (seconds: number) => {
  const currentPosition = await props.player.getCurrentTime()
  props.player.seekTo(currentPosition + seconds)
}
</script>

<template>
  <div>
    <!-- 進む -->
    <div class="flex justify-between gap-2">
      <button
        class="w-1/4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        title="1秒進む"
        aria-label="1秒進む"
        @click="hundleVideoSeek(1)"
      >
        <div class="flex items-center justify-center">
          <ChevronDoubleRightIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          1s
        </div>
      </button>
      <button
        class="w-1/4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        title="0.5秒進む"
        aria-label="0.5秒進む"
        @click="hundleVideoSeek(0.5)"
      >
        <div class="flex items-center justify-center">
          <ChevronDoubleRightIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          0.5s
        </div>
      </button>
      <button
        class="w-1/4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        title="0.1秒進む"
        aria-label="0.1秒進む"
        @click="hundleVideoSeek(0.1)"
      >
        <div class="flex items-center justify-center">
          <ChevronDoubleRightIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          0.1s
        </div>
      </button>
      <button
        class="w-1/4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        title="0.05秒進む"
        aria-label="0.05秒進む"
        @click="hundleVideoSeek(0.05)"
      >
        <div class="flex items-center justify-center">
          <ChevronDoubleRightIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          0.05s
        </div>
      </button>
    </div>
    <!-- 戻る -->
    <div class="mt-2 flex justify-between gap-2">
      <button
        class="w-1/4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        title="1秒戻る"
        aria-label="1秒戻る"
        @click="hundleVideoSeek(-1)"
      >
        <div class="flex items-center justify-center">
          <ChevronDoubleLeftIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          1s
        </div>
      </button>
      <button
        class="w-1/4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        title="0.5秒戻る"
        aria-label="0.5秒戻る"
        @click="hundleVideoSeek(-0.5)"
      >
        <div class="flex items-center justify-center">
          <ChevronDoubleLeftIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          0.5s
        </div>
      </button>
      <button
        class="w-1/4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        title="0.1秒戻る"
        aria-label="0.1秒戻る"
        @click="hundleVideoSeek(-0.1)"
      >
        <div class="flex items-center justify-center">
          <ChevronDoubleLeftIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          0.1s
        </div>
      </button>
      <button
        class="w-1/4 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
        title="0.05秒戻る"
        aria-label="0.05秒戻る"
        @click="hundleVideoSeek(-0.05)"
      >
        <div class="flex items-center justify-center">
          <ChevronDoubleLeftIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
          0.05s
        </div>
      </button>
    </div>
  </div>
</template>
