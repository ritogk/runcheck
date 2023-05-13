<script setup lang="ts">
import { provide } from "vue"
import { UseMainState, UseMainStateKey } from "./UseMainState"
import PlayerOneArea from "./main-parts/PlayerOneArea.vue"
import PlayerTwoArea from "./main-parts/PlayerTwoArea.vue"
import YoutubeSelectorModal from "./main-parts/YoutubeSelectorModal.vue"
import AdjustSpeedModal from "./main-parts/AdjustSpeedModal.vue"
import FileController from "./main-parts/FileController.vue"
import SyncController from "./main-parts/SyncController.vue"
import SyncOption from "./main-parts/SyncOption.vue"
import MemoArea from "./main-parts/MemoArea.vue"

const useMainState = UseMainState()
provide(UseMainStateKey, useMainState)
</script>

<template>
  <YoutubeSelectorModal></YoutubeSelectorModal>
  <AdjustSpeedModal></AdjustSpeedModal>
  <div class="max-w-[600px]">
    <div class="px-1 pt-2">
      <FileController></FileController>
      <MemoArea></MemoArea>
      <div class="h-px my-2 bg-gray-300"></div>
      <SyncOption></SyncOption>
      <div class="h-px my-2 bg-gray-300"></div>
    </div>

    <PlayerOneArea></PlayerOneArea>
    <PlayerTwoArea></PlayerTwoArea>
    <SyncController
      v-show="useMainState.syncPlayer.subscription.synced.value"
    ></SyncController>
    <div class="m-5"></div>
  </div>
</template>
