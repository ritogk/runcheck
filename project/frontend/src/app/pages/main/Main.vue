<script setup lang="ts">
import { provide } from "vue"
import { UseMainState, UseMainStateKey } from "./UseMainState"
import PlayerOneArea from "./parts/PlayerOneArea.vue"
import PlayerTwoArea from "./parts/PlayerTwoArea.vue"
import YoutubeSelectorModal from "./parts/YoutubeSelectorModal.vue"
import AdjustSpeedModal from "./parts/AdjustSpeedModal.vue"
import FileController from "./parts/FileController.vue"
import SyncController from "./parts/SyncController.vue"
import SyncOption from "./parts/SyncOption.vue"
import MemoArea from "./parts/MemoArea.vue"

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
