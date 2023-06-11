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
  <div class="max-w-[600px]">
    <div class="px-1">
      <FileController></FileController>
      <MemoArea></MemoArea>
      <SyncOption class="my-2"></SyncOption>
    </div>

    <PlayerOneArea></PlayerOneArea>
    <PlayerTwoArea class="pb-2"></PlayerTwoArea>
    <SyncController
      v-show="useMainState.syncPlayer.subscription.synced.value"
    ></SyncController>
  </div>
  <YoutubeSelectorModal></YoutubeSelectorModal>
  <AdjustSpeedModal></AdjustSpeedModal>
</template>
