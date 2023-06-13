<script setup lang="ts">
import { provide, inject } from "vue"
import { UseMainState, UseMainStateKey } from "./UseMainState"
import PlayerOneArea from "./main-parts/PlayerOneArea.vue"
import PlayerTwoArea from "./main-parts/PlayerTwoArea.vue"
import YoutubeSelectorModal from "./main-parts/YoutubeSelectorModal.vue"
import AdjustSpeedModal from "./main-parts/AdjustSpeedModal.vue"
import FileController from "./main-parts/FileController.vue"
import SyncController from "./main-parts/SyncController.vue"
import SyncOption from "./main-parts/SyncOption.vue"
import MemoArea from "./main-parts/MemoArea.vue"
import { VideoType } from "@/app/pages/main/main-parts/player-area-parts/IVideoPlayer"
import {
  UseUserStateKey,
  UseUserStateType,
} from "@/app/dashboard-parts/UseUserState"

const useMainState = UseMainState()
provide(UseMainStateKey, useMainState)

const userState = inject(UseUserStateKey) as UseUserStateType

const hundleOpenClick = () => {
  useMainState.openModal.open()
}

const hundleSaveClick = () => {
  if (
    useMainState.syncPlayer.playerOne.value.subscription.videoType.value !==
      VideoType.YOUTUBE ||
    useMainState.syncPlayer.playerTwo.value.subscription.videoType.value !=
      VideoType.YOUTUBE
  ) {
    alert("保存はYouTube同士の組み合わせのみ行えます。")
    return
  }
  useMainState.saveModal.open()
}
</script>

<template>
  <div class="max-w-[600px]">
    <div class="px-1">
      <FileController
        v-show="userState.subscription.logined.value"
        @hundle-open-click="hundleOpenClick"
        @hundle-save-click="hundleSaveClick"
      ></FileController>
      <MemoArea
        :title="useMainState.memo.subscription.title.value"
        :memo="useMainState.memo.subscription.memo.value"
        v-show="
          userState.subscription.logined.value &&
          useMainState.memo.subscription.title.value &&
          useMainState.memo.subscription.memo.value
        "
      ></MemoArea>
      <SyncOption class="my-2"></SyncOption>
    </div>

    <PlayerOneArea></PlayerOneArea>
    <PlayerTwoArea></PlayerTwoArea>
    <SyncController
      v-show="useMainState.syncPlayer.subscription.synced.value"
    ></SyncController>
  </div>
  <YoutubeSelectorModal></YoutubeSelectorModal>
  <AdjustSpeedModal></AdjustSpeedModal>
</template>
