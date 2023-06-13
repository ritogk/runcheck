<script setup lang="ts">
import { provide, inject } from "vue"
import { UseMainState, UseMainStateKey } from "./UseMainState"
import PlayerOneT from "./main-parts/player-one-t.vue"
import PlayerTwoT from "./main-parts/player-two-t.vue"
import YoutubeSelectorModalT from "./main-parts/youtube-selector-modal-t.vue"
import AdjustSpeedModalT from "./main-parts/adjust-speed-modal-t.vue"
import FileControllerT from "./main-parts/file-controller-t.vue"
import SyncControllerT from "./main-parts/sync-controller-t.vue"
import SyncOptionT from "./main-parts/sync-option-t.vue"
import Memo from "./main-parts/memo.vue"
import {
  UseUserStateKey,
  UseUserStateType,
} from "@/app/dashboard-parts/UseUserState"

const useMainState = UseMainState()
provide(UseMainStateKey, useMainState)

const userState = inject(UseUserStateKey) as UseUserStateType
</script>

<template>
  <div class="max-w-[600px]">
    <div class="px-1">
      <FileControllerT
        v-show="userState.subscription.logined.value"
      ></FileControllerT>
      <Memo
        :title="useMainState.memo.subscription.title.value"
        :memo="useMainState.memo.subscription.memo.value"
        v-show="
          userState.subscription.logined.value &&
          useMainState.memo.subscription.title.value &&
          useMainState.memo.subscription.memo.value
        "
      ></Memo>
      <SyncOptionT class="my-2"></SyncOptionT>
    </div>

    <PlayerOneT></PlayerOneT>
    <PlayerTwoT></PlayerTwoT>
    <SyncControllerT
      v-show="useMainState.syncPlayer.subscription.synced.value"
    ></SyncControllerT>
  </div>
  <YoutubeSelectorModalT></YoutubeSelectorModalT>
  <AdjustSpeedModalT></AdjustSpeedModalT>
</template>
