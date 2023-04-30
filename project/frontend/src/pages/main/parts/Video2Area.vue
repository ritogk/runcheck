<script setup lang="ts">
import VideoAdjustment from "@/pages/main/parts/video-area-parts/VideoAdjustment.vue";
import VideoSelector from "@/pages/main/parts/video-area-parts/VideoSelector.vue";
import Video from "@/pages/main/parts/video-area-parts/Video.vue";
import { VideoNo } from "@/pages/main/parts/youtube-select-modal/UseModalState";

const props = defineProps<{
  videoNo: VideoNo;
}>();
</script>
<template>
  <Video></Video>
  <VideoSelector></VideoSelector>
  <VideoAdjustment></VideoAdjustment>
</template>
