<script setup lang="ts">
import { inject } from "vue"
import Button from "@/components/button.vue"
import OpenIcon from "@/components/svg/open.vue"
import SaveIcon from "@/components/svg/save.vue"
import { UseMainStateType, UseMainStateKey } from "@/app/pages/main-page/use-main-state"
import { VideoType } from "@/app/pages/main-page/player/i-video-player"

const mainState = inject(UseMainStateKey) as UseMainStateType

const hundleOpenClick = () => {
  mainState.openModal.open()
}

const hundleSaveClick = () => {
  if (
    mainState.syncPlayer.playerOne.value.subscription.videoType.value !== VideoType.YOUTUBE ||
    mainState.syncPlayer.playerTwo.value.subscription.videoType.value != VideoType.YOUTUBE
  ) {
    alert("保存はYouTube同士の組み合わせのみ行えます。")
    return
  }
  mainState.saveModal.open()
}
</script>

<template>
  <div>
    <div class="my-2">
      <!-- ファイル操作 -->
      <div>
        <div class="flex gap-2">
          <Button :label="'開く'" class="w-1/4" @click="hundleOpenClick">
            <OpenIcon></OpenIcon>
          </Button>

          <Button :label="'保存'" class="w-1/4" @click="hundleSaveClick">
            <SaveIcon></SaveIcon>
          </Button>
        </div>
        <div class="pb-2 border-b border-gray-300"></div>
      </div>
    </div>
  </div>
</template>
