<script setup lang="ts">
import { type IVideoPlayer } from "@/app/pages/main-page/player/i-video-player"
import Button from "@/components/button.vue"
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from "@heroicons/vue/20/solid"

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
      <Button
        class="w-1/4"
        :label="'1s'"
        :accessibility-title="'1秒進む'"
        @click="hundleVideoSeek(1)"
        ><ChevronDoubleRightIcon
      /></Button>

      <Button
        class="w-1/4"
        :label="'0.5s'"
        :accessibility-title="'0.5秒進む'"
        @click="hundleVideoSeek(0.5)"
        ><ChevronDoubleRightIcon
      /></Button>

      <Button
        class="w-1/4"
        :label="'0.1s'"
        :accessibility-title="'0.1秒進む'"
        @click="hundleVideoSeek(0.1)"
        ><ChevronDoubleRightIcon
      /></Button>

      <Button
        class="w-1/4"
        :label="'0.05s'"
        :accessibility-title="'0.05秒進む'"
        @click="hundleVideoSeek(0.05)"
        ><ChevronDoubleRightIcon
      /></Button>
    </div>
    <!-- 戻る -->
    <div class="mt-2 flex justify-between gap-2">
      <Button
        class="w-1/4"
        :label="'1s'"
        :accessibility-title="'1秒戻る'"
        @click="hundleVideoSeek(-1)"
        ><ChevronDoubleLeftIcon
      /></Button>

      <Button
        class="w-1/4"
        :label="'0.5s'"
        :accessibility-title="'0.5秒戻る'"
        @click="hundleVideoSeek(-0.5)"
        ><ChevronDoubleLeftIcon
      /></Button>

      <Button
        class="w-1/4"
        :label="'0.1s'"
        :accessibility-title="'0.1秒戻る'"
        @click="hundleVideoSeek(-0.1)"
        ><ChevronDoubleLeftIcon
      /></Button>

      <Button
        class="w-1/4"
        :label="'0.05s'"
        :accessibility-title="'0.05秒戻る'"
        @click="hundleVideoSeek(-0.05)"
        ><ChevronDoubleLeftIcon
      /></Button>
    </div>
  </div>
</template>
