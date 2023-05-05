<script setup lang="ts">
import { inject } from "vue";
import { UseMainStateKey, UseMainStateType } from "@/pages/main/UseMainState";
import {
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  // SearchIcon,
} from "@heroicons/vue/20/solid";

const useMainState = inject(UseMainStateKey) as UseMainStateType;
const videoOwn = useMainState.syncVideo.videoOwnSwitcher.subscription.player;
const videoTwo = useMainState.syncVideo.videoTwoSwitcher.subscription.player;

const hundlePlaySwitch = () => {
  videoOwn.value.mute();
  videoTwo.value.mute();
  useMainState.syncVideo.switchPlay();
};

const hundleMuteSwitch = () => {
  useMainState.syncVideo.switchMute();
};

const hundleReload = () => {
  useMainState.syncVideo.reload();
};
</script>

<template>
  <div class="max-h-[240px] mb-3">
    <div
      class="bg-gray-50 border-gray-100 dark:bg-gray-800 dark:border-gray-500 border-b px-4 pt-6 pb-4 space-y-6"
    >
      <div class="space-y-2">
        <div class="relative">
          <div
            class="bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"
          >
            <div
              class="bg-cyan-500 dark:bg-cyan-400 w-1/2 h-2"
              role="progressbar"
              aria-label="music progress"
              aria-valuenow="{1456}"
              aria-valuemin="{0}"
              aria-valuemax="{4550}"
            ></div>
          </div>
          <div
            class="ring-cyan-500 dark:ring-cyan-400 ring-2 absolute left-1/2 top-1/2 w-4 h-4 -mt-2 -ml-2 flex items-center justify-center bg-white rounded-full shadow"
          >
            <div
              class="w-1.5 h-1.5 bg-cyan-500 dark:bg-cyan-400 rounded-full ring-1 ring-inset ring-gray-900/5"
            ></div>
          </div>
        </div>
        <div
          class="flex justify-between text-sm leading-6 font-medium tabular-nums"
        >
          <div class="text-cyan-500 dark:text-gray-100">24:16</div>
          <div class="text-gray-500 dark:text-gray-400">75:50</div>
        </div>
      </div>
    </div>
    <div
      class="bg-gray-200 text-gray-500 dark:bg-gray-600 dark:text-gray-200 flex items-center"
    >
      <div class="flex-auto flex items-center justify-evenly">
        <!-- リピート ボタン -->
        <button type="button" aria-label="Skip 10 seconds">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            viewBox="0 0 16 16"
            class="fill-gray-500 hover:fill-gray-400"
          >
            <path
              d="M11 4v1.466a.25.25 0 0 0 .41.192l2.36-1.966a.25.25 0 0 0 0-.384l-2.36-1.966a.25.25 0 0 0-.41.192V3H5a5 5 0 0 0-4.48 7.223.5.5 0 0 0 .896-.446A4 4 0 0 1 5 4h6Zm4.48 1.777a.5.5 0 0 0-.896.446A4 4 0 0 1 11 12H5.001v-1.466a.25.25 0 0 0-.41-.192l-2.36 1.966a.25.25 0 0 0 0 .384l2.36 1.966a.25.25 0 0 0 .41-.192V13h6a5 5 0 0 0 4.48-7.223Z"
            />
            <path
              d="M9 5.5a.5.5 0 0 0-.854-.354l-1.75 1.75a.5.5 0 1 0 .708.708L8 6.707V10.5a.5.5 0 0 0 1 0v-5Z"
            />
          </svg>
        </button>
        <!-- 倍速 ボタン -->
        <button type="button" aria-label="Skip 10 seconds">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 16 16"
            class="fill-gray-500 hover:fill-gray-400"
          >
            <path
              d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"
            />
            <path
              fill-rule="evenodd"
              d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"
            />
          </svg>
        </button>
      </div>
      <!-- 再生ボタン -->
      <button
        type="button"
        class="bg-white text-gray-900 dark:bg-gray-100 dark:text-gray-700 flex-none -my-2 mx-auto w-20 h-20 rounded-full ring-1 ring-gray-900/5 shadow-md flex items-center justify-center"
        aria-label="Pause"
        @click="hundlePlaySwitch()"
      >
        <svg
          width="30"
          height="32"
          class="fill-gray-600 hover:fill-gray-500"
          v-show="useMainState.syncVideo.subscription.playing.value"
        >
          <rect x="6" y="4" width="4" height="24" rx="2" />
          <rect x="20" y="4" width="4" height="24" rx="2" />
        </svg>
        <svg
          width="30"
          height="32"
          class="fill-gray-600 hover:fill-gray-500"
          v-show="!useMainState.syncVideo.subscription.playing.value"
        >
          <path d="M6 4l20 12-20 12z" />
        </svg>
      </button>
      <div class="flex-auto flex items-center justify-evenly">
        <!-- 再読み込み ボタン -->
        <button
          type="button"
          aria-label="Skip 10 seconds"
          @click="hundleReload()"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            class="text-gray-500 hover:text-gray-400"
          >
            <path
              d="M17.509 16.95c-2.862 2.733-7.501 2.733-10.363 0-2.861-2.734-2.861-7.166 0-9.9 2.862-2.733 7.501-2.733 10.363 0 .38.365.711.759.991 1.176"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M19 5v3.111c0 .491-.398.889-.889.889H15"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <!-- ミュート ボタン -->
        <button
          type="button"
          class="sm:block lg:hidden xl:block"
          aria-label="Previous"
          @click="hundleMuteSwitch()"
        >
          <SpeakerWaveIcon
            style="width: 24px; height: 24px"
            class="text-gray-500 hover:text-gray-400"
            v-show="!useMainState.syncVideo.subscription.muted.value"
          ></SpeakerWaveIcon>
          <SpeakerXMarkIcon
            style="width: 24px; height: 24px"
            class="text-gray-500 hover:text-gray-400"
            v-show="useMainState.syncVideo.subscription.muted.value"
          ></SpeakerXMarkIcon>
        </button>
      </div>
    </div>
  </div>
</template>
