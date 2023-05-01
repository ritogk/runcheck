<script setup lang="ts">
import Video from "@/pages/main/parts/video-area-parts/Video.vue";
import { ref, onMounted, inject, watch, watchEffect } from "vue";
import { VideoNo } from "@/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/UseModalState";
import { YouTubePlayer } from "./video-area-parts/libs/YouTubePlayer";
import { UseMainStateKey, UseMainStateType } from "@/pages/main/UseMainState";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  VideoCameraIcon,
  // SearchIcon,
} from "@heroicons/vue/20/solid";
import { VideoType } from "./video-area-parts/libs/IVideoPlayer";

const videoNo = VideoNo.ONE;

const useMainState = inject(UseMainStateKey) as UseMainStateType;
const youtubeUrl = ref("");
watch(useMainState.youtubeModal.subscription.url, () => {
  if (useMainState.youtubeModal.subscription.videoNo.value !== videoNo) return;
  youtubeUrl.value = useMainState.youtubeModal.subscription.url.value;
});

const elements = {
  localVideo: {
    file: ref<HTMLInputElement | null>(null),
    video: ref<HTMLVideoElement | null>(null),
  },
  videoArea: ref<HTMLInputElement | null>(null),
};

const calcVideoHeight = ref("300px");
watch(elements.videoArea, () => {
  const width = elements.videoArea.value?.offsetWidth ?? 600;
  calcVideoHeight.value = `${width * (9 / 16)}px`;
});

import { LocalVideoPlayer } from "@/pages/main/parts/video-area-parts/libs/LocalVideoPlayer";

const hundleLocalVideoSelect = () => {
  elements.localVideo.file.value?.click();
};

const hundleLocalVideoChange = async (event: Event) => {
  const file = (event as any).currentTarget.files[0];
  const objectURL = URL.createObjectURL(file);
  await useMainState.syncVideo.playerOwn.getPlayer()?.destory();
  const localVideoPlayer = new LocalVideoPlayer(
    elements.localVideo.video.value as HTMLVideoElement,
    objectURL
  );
  useMainState.syncVideo.playerOwn.setPlayer(localVideoPlayer);
};

const hundleYoutubeUrlEnter = async (youtubeUrl: string) => {
  await useMainState.syncVideo.playerOwn.getPlayer()?.destory();
  useMainState.syncVideo.playerOwn.setPlayer(
    new YouTubePlayer("youtube-video-own", youtubeUrl)
  );
};

const hundleVideoSeek = (seconds: number) => {
  useMainState.syncVideo.playerOwn.getPlayer().seekTo(seconds);
};
</script>
<template>
  <!-- ajust-->
  <div v-show="!useMainState.syncVideo.subscription.synced.value">
    <!-- 進む -->
    <div class="mt-2 flex gap-2 justify-between">
      <button
        class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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
        class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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
        class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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
        class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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
    <div class="mt-2 flex gap-2 justify-between">
      <button
        class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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
        class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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
        class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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
        class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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

  <!-- selector -->
  <div v-show="!useMainState.syncVideo.subscription.synced.value">
    <div>
      <div class="mt-2 flex gap-2 rounded-md">
        <!-- Youtube -->
        <div
          class="flex w-10/12 relative flex-grow items-stretch focus-within:z-10 shadow-sm"
        >
          <label
            for="name"
            class="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
            >YouTube</label
          >
          <!-- Youtube url -->
          <input
            type="email"
            name="email"
            id="email"
            class="block w-9/12 rounded-none rounded-l-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-indigo-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            placeholder="https://youtube.com/nLKSSdMWZ8g"
            v-model="youtubeUrl"
            @keyup.enter="hundleYoutubeUrlEnter(youtubeUrl)"
          />
          <!-- 検索 -->
          <button
            type="button"
            class="relative w-3/12 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md text-sm font-semibold bg-white text-gray-900 ring-1 ring-inset ring-indigo-300 hover:bg-gray-100"
            @click="useMainState.youtubeModal.open(videoNo)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              width="20px"
              height="20px"
              class="stroke-gray-500 mx-auto"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <!-- 端末動画選択 -->
        <button
          class="rounded-md shadow-sm bg-white w-2/12 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-10"
          @click="hundleLocalVideoSelect()"
        >
          <div class="flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 56 41"
              xmlns="http://www.w3.org/2000/svg"
              class="fill-gray-500"
            >
              <path
                d="M43.6667 7.33333C43.6667 5.91885 43.1048 4.56229 42.1046 3.5621C41.1044 2.5619 39.7478 2 38.3333 2H6.33333C4.91885 2 3.56229 2.5619 2.5621 3.5621C1.5619 4.56229 1 5.91885 1 7.33333V34C1 35.4145 1.5619 36.771 2.5621 37.7712C3.56229 38.7714 4.91885 39.3333 6.33333 39.3333H38.3333C39.7478 39.3333 41.1044 38.7714 42.1046 37.7712C43.1048 36.771 43.6667 35.4145 43.6667 34V25.112L54.3333 34V7.33333L43.6667 16.2213V7.33333ZM33 23.3333H25V31.3333H19.6667V23.3333H11.6667V18H19.6667V10H25V18H33V23.3333Z"
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
    <input
      type="file"
      :ref="elements.localVideo.file"
      @change="hundleLocalVideoChange"
      hidden
    />
  </div>

  <!-- Video -->
  <div :ref="elements.videoArea">
    <!-- dummy -->
    <div
      v-show="
        useMainState.syncVideo.playerOwn.subscription.videoType.value ===
        VideoType.NONE
      "
    >
      <div
        class="w-full bg-gray-300 relative border-b-2 border-gray-200"
        :style="{ height: calcVideoHeight }"
      >
        <VideoCameraIcon
          class="h-2/5 w-2/5 text-gray-400 absolute top-0 right-0 bottom-0 left-0 m-auto"
          aria-hidden="true"
        />
      </div>
    </div>
    <!-- youtube -->
    <div
      v-show="
        useMainState.syncVideo.playerOwn.subscription.videoType.value ===
        VideoType.YOUTUBE
      "
    >
      <div
        id="youtube-video-own"
        class="w-full"
        :style="{ height: calcVideoHeight }"
      ></div>
    </div>
    <!-- local -->
    <div
      v-show="
        useMainState.syncVideo.playerOwn.subscription.videoType.value ===
        VideoType.LOCAL
      "
    >
      <video
        :ref="elements.localVideo.video"
        controls
        playsinline
        preload="none"
        class="w-full"
        :style="{ height: calcVideoHeight }"
      ></video>
    </div>
  </div>
</template>
