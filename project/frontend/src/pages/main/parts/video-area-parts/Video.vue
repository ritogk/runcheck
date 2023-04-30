<script setup lang="ts">
import { provide, ref, onMounted } from "vue";
import {
  UseModalState,
  UseModalStateKey,
  VideoNo,
} from "@/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/UseModalState";
import { YouTubePlayer } from "./libs/YouTubePlayer";
const elements = {
  localVideo: {
    video: ref<HTMLVideoElement | null>(null),
  },
};

onMounted(() => {
  const youtubePlayer = new YouTubePlayer(
    "youtube-video-1",
    "https://www.youtube.com/embed/nLKSSdMWZ8g"
  );
});
</script>

<template>
  <div id="youtube-video-1" class="w-full h-[220px]"></div>
  <video
    :ref="elements.localVideo.video"
    controls
    playsinline
    preload="none"
    class="w-full h-[220px]"
  ></video>
  <div class="w-full h-[220px]"></div>
</template>
