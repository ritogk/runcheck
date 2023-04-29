<script setup lang="ts">
import { provide, ref, onMounted } from "vue";
import {
  ChevronDoubleRightIcon,
  ChevronDoubleLeftIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  // SearchIcon,
} from "@heroicons/vue/20/solid";
import YoutubeSelectModal from "@/pages/main/youtube-select-modal/YoutubeSelectModal.vue";
import {
  UseModalState,
  UseModalStateKey,
  VideoNo,
} from "@/pages/main/youtube-select-modal/UseModalState";

const useModalState = UseModalState();
provide(UseModalStateKey, useModalState);
useModalState.load();

const youtube1Url = ref("");
const youtube2Url = ref("");

const handleSelectYoutube = async (videoNo: VideoNo, url: string) => {
  if (!syncVideoState) return;
  if (videoNo === VideoNo.ONE) {
    youtube1Url.value = url;
    await syncVideoState.getVideo1().destory();
    syncVideoState.setVideo1(new YouTubePlayer("youtube-video-1", url));
  } else if (videoNo === VideoNo.TWO) {
    youtube2Url.value = url;
    await syncVideoState.getVideo2().destory();
    syncVideoState.setVideo2(new YouTubePlayer("youtube-video-2", url));
  }
};

import { YouTubePlayer } from "@/components/YouTubePlayer";
import { SyncVideoState } from "@/components/SyncVideoState";

let syncVideoState: SyncVideoState | null = null;
onMounted(() => {
  const youtube1Player = new YouTubePlayer(
    "youtube-video-1",
    "https://www.youtube.com/embed/nLKSSdMWZ8g"
  );
  const youtube2Player = new YouTubePlayer(
    "youtube-video-2",
    "https://www.youtube.com/embed/nLKSSdMWZ8g"
  );
  syncVideoState = new SyncVideoState(youtube1Player, youtube2Player);
});

const onLocalVideoSelect = () => {
  elements.localVideo1.file.value?.click();
};

const elements = {
  localVideo1: {
    file: ref<HTMLInputElement | null>(null),
    video: ref<HTMLVideoElement | null>(null),
  },
};
const localVideo1Src = ref("");
const hundleChangeFileInput = (event: Event) => {
  const file = (event as any).currentTarget.files[0];
  const objectURL = URL.createObjectURL(file);
  localVideo1Src.value = objectURL;
  if (elements.localVideo1.video.value) {
    elements.localVideo1.video.value.load();
  }
};
</script>

<template>
  <div class="max-w-[600px]">
    <div class="px-1 pt-2">
      <!-- ファイル操作 -->
      <div class="">
        <div class="flex gap-2">
          <button
            class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <div class="flex items-center justify-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="stroke-gray-600"
                width="20px"
                height="20px"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                />
              </svg>

              開く
            </div>
          </button>

          <button
            class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <div class="flex items-center justify-center gap-1">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                class="fill-gray-500"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  xmlns="http://www.w3.org/2000/svg"
                  d="M 6.855469 20.570312 L 17.144531 20.570312 L 17.144531 15.429688 L 6.855469 15.429688 Z M 18.855469 20.570312 L 20.570312 20.570312 L 20.570312 8.570312 C 20.570312 8.445312 20.527344 8.273438 20.4375 8.054688 C 20.347656 7.835938 20.257812 7.683594 20.167969 7.59375 L 16.40625 3.832031 C 16.316406 3.742188 16.164062 3.652344 15.949219 3.5625 C 15.738281 3.472656 15.5625 3.429688 15.429688 3.429688 L 15.429688 9 C 15.429688 9.355469 15.304688 9.660156 15.054688 9.910156 C 14.804688 10.160156 14.5 10.285156 14.144531 10.285156 L 6.429688 10.285156 C 6.070312 10.285156 5.769531 10.160156 5.519531 9.910156 C 5.269531 9.660156 5.144531 9.355469 5.144531 9 L 5.144531 3.429688 L 3.429688 3.429688 L 3.429688 20.570312 L 5.144531 20.570312 L 5.144531 15 C 5.144531 14.644531 5.269531 14.339844 5.519531 14.089844 C 5.769531 13.839844 6.070312 13.714844 6.429688 13.714844 L 17.570312 13.714844 C 17.929688 13.714844 18.230469 13.839844 18.480469 14.089844 C 18.730469 14.339844 18.855469 14.644531 18.855469 15 Z M 13.714844 8.144531 L 13.714844 3.855469 C 13.714844 3.742188 13.671875 3.640625 13.585938 3.554688 C 13.503906 3.472656 13.402344 3.429688 13.285156 3.429688 L 10.714844 3.429688 C 10.597656 3.429688 10.496094 3.472656 10.414062 3.554688 C 10.328125 3.640625 10.285156 3.742188 10.285156 3.855469 L 10.285156 8.144531 C 10.285156 8.257812 10.328125 8.359375 10.414062 8.445312 C 10.496094 8.527344 10.597656 8.570312 10.714844 8.570312 L 13.285156 8.570312 C 13.402344 8.570312 13.503906 8.527344 13.585938 8.445312 C 13.671875 8.359375 13.714844 8.257812 13.714844 8.144531 Z M 22.285156 8.570312 L 22.285156 21 C 22.285156 21.355469 22.160156 21.660156 21.910156 21.910156 C 21.660156 22.160156 21.355469 22.285156 21 22.285156 L 3 22.285156 C 2.644531 22.285156 2.339844 22.160156 2.089844 21.910156 C 1.839844 21.660156 1.714844 21.355469 1.714844 21 L 1.714844 3 C 1.714844 2.644531 1.839844 2.339844 2.089844 2.089844 C 2.339844 1.839844 2.644531 1.714844 3 1.714844 L 15.429688 1.714844 C 15.785156 1.714844 16.179688 1.804688 16.605469 1.980469 C 17.035156 2.160156 17.375 2.375 17.625 2.625 L 21.375 6.375 C 21.625 6.625 21.839844 6.964844 22.019531 7.394531 C 22.195312 7.820312 22.285156 8.214844 22.285156 8.570312 Z M 22.285156 8.570312 "
                />
              </svg>
              保存
            </div>
          </button>
        </div>
      </div>

      <div
        class="border border-gray-300 rounded-md bg-white px-4 py-3 sm:px-4 my-2"
      >
        <div
          class="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap"
        >
          <div class="ml-4 mt-4">
            <h3 class="text-base font-semibold leading-6 text-gray-900">
              美浜サーキット ベストラップvsセカンドラップ
            </h3>
            <p class="mt-1 text-sm text-gray-500">
              F:A052 225/50/R15 R:A052 195/50/R15
            </p>
          </div>
        </div>
      </div>

      <!-- 動画を同期 and つぶやく-->
      <div>
        <span class="isolate inline-flex rounded-md shadow-sm">
          <button
            type="button"
            class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-indigo-700 hover:bg-indigo-500 focus:z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              width="20px"
              height="20px"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>

            動画を同期
          </button>
        </span>
        <span class="isolate inline-flex rounded-md shadow-sm ml-2">
          <button
            type="button"
            class="relative inline-flex items-center gap-x-1.5 rounded-md bg-[#16A2F3] px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-[#0C7FF2] hover:bg-indigo-500 focus:z-10"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              viewBox="0,0,256,256"
              width="24px"
              height="24px"
              fill-rule="nonzero"
              style="width: 20px; height: 20px"
            >
              <g
                transform="translate(-21.33333,-21.33333) scale(1.16667,1.16667)"
              >
                <g
                  fill="#ffffff"
                  fill-rule="nonzero"
                  stroke="none"
                  stroke-width="1"
                  stroke-linecap="butt"
                  stroke-linejoin="miter"
                  stroke-miterlimit="10"
                  stroke-dasharray=""
                  stroke-dashoffset="0"
                  font-family="none"
                  font-weight="none"
                  font-size="none"
                  text-anchor="none"
                  style="mix-blend-mode: normal"
                >
                  <g transform="scale(10.66667,10.66667)">
                    <path
                      d="M22,3.999c-0.78,0.463 -2.345,1.094 -3.265,1.276c-0.027,0.007 -0.049,0.016 -0.075,0.023c-0.813,-0.802 -1.927,-1.299 -3.16,-1.299c-2.485,0 -4.5,2.015 -4.5,4.5c0,0.131 -0.011,0.372 0,0.5c-3.353,0 -5.905,-1.756 -7.735,-4c-0.199,0.5 -0.286,1.29 -0.286,2.032c0,1.401 1.095,2.777 2.8,3.63c-0.314,0.081 -0.66,0.139 -1.02,0.139c-0.581,0 -1.196,-0.153 -1.759,-0.617c0,0.017 0,0.033 0,0.051c0,1.958 2.078,3.291 3.926,3.662c-0.375,0.221 -1.131,0.243 -1.5,0.243c-0.26,0 -1.18,-0.119 -1.426,-0.165c0.514,1.605 2.368,2.507 4.135,2.539c-1.382,1.084 -2.341,1.486 -5.171,1.486h-0.964c1.788,1.146 4.065,2.001 6.347,2.001c7.43,0 11.653,-5.663 11.653,-11.001c0,-0.086 -0.002,-0.266 -0.005,-0.447c0,-0.018 0.005,-0.035 0.005,-0.053c0,-0.027 -0.008,-0.053 -0.008,-0.08c-0.003,-0.136 -0.006,-0.263 -0.009,-0.329c0.79,-0.57 1.475,-1.281 2.017,-2.091c-0.725,0.322 -1.503,0.538 -2.32,0.636c0.834,-0.5 2.019,-1.692 2.32,-2.636z"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            動画を共有
          </button>
        </span>
      </div>

      <div class="h-px my-3 bg-gray-300"></div>

      <!-- 進む -->
      <div class="flex gap-2 justify-between">
        <button
          class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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

      <!-- Youtube -->
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
              v-model="youtube1Url"
            />
            <!-- 検索 -->
            <button
              type="button"
              class="relative w-3/12 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md text-sm font-semibold bg-white text-gray-900 ring-1 ring-inset ring-indigo-300 hover:bg-gray-100"
              @click="useModalState.open(VideoNo.ONE)"
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
            @click="onLocalVideoSelect"
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
    </div>
    <input
      type="file"
      :ref="elements.localVideo1.file"
      @change="hundleChangeFileInput"
      hidden
    />
    <video
      :ref="elements.localVideo1.video"
      controls
      playsinline
      preload="none"
      class="w-full h-[220px]"
    >
      <source :src="localVideo1Src" type="video/mp4" />
    </video>
    <div id="youtube-video-1" class="w-full h-[220px]"></div>
    <div id="youtube-video-2" class="w-full h-[220px]"></div>

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
          <!-- ボタン1 -->
          <button type="button" aria-label="Skip 10 seconds">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 16 16"
              class="fill-gray-500"
            >
              <path
                d="M11 4v1.466a.25.25 0 0 0 .41.192l2.36-1.966a.25.25 0 0 0 0-.384l-2.36-1.966a.25.25 0 0 0-.41.192V3H5a5 5 0 0 0-4.48 7.223.5.5 0 0 0 .896-.446A4 4 0 0 1 5 4h6Zm4.48 1.777a.5.5 0 0 0-.896.446A4 4 0 0 1 11 12H5.001v-1.466a.25.25 0 0 0-.41-.192l-2.36 1.966a.25.25 0 0 0 0 .384l2.36 1.966a.25.25 0 0 0 .41-.192V13h6a5 5 0 0 0 4.48-7.223Z"
              />
              <path
                d="M9 5.5a.5.5 0 0 0-.854-.354l-1.75 1.75a.5.5 0 1 0 .708.708L8 6.707V10.5a.5.5 0 0 0 1 0v-5Z"
              />
            </svg>
          </button>
          <!-- ボタン2 -->
          <button type="button" aria-label="Skip 10 seconds">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 16 16"
              class="fill-gray-500"
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
        >
          <svg width="30" height="32" fill="currentColor">
            <rect x="6" y="4" width="4" height="24" rx="2" />
            <rect x="20" y="4" width="4" height="24" rx="2" />
          </svg>
        </button>
        <div class="flex-auto flex items-center justify-evenly">
          <!-- ボタン3 -->
          <button type="button" aria-label="Skip 10 seconds">
            <svg width="24" height="24" fill="none">
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
          <!-- ボタン4 -->
          <button
            type="button"
            class="sm:block lg:hidden xl:block"
            aria-label="Previous"
          >
            <SpeakerWaveIcon
              style="width: 24px; height: 24px; display: none"
            ></SpeakerWaveIcon>
            <SpeakerXMarkIcon
              style="width: 24px; height: 24px"
            ></SpeakerXMarkIcon>
          </button>
        </div>
      </div>
    </div>

    <div class="px-1">
      <div>
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
                v-model="youtube2Url"
              />
              <!-- 検索 -->
              <button
                type="button"
                class="relative w-3/12 -ml-px inline-flex items-center gap-x-1.5 rounded-r-md text-sm font-semibold bg-white text-gray-900 ring-1 ring-inset ring-indigo-300 hover:bg-gray-100"
                @click="useModalState.open(VideoNo.TWO)"
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
      </div>

      <!-- 進む -->
      <div class="mt-2 flex gap-2 justify-between">
        <button
          class="rounded-md shadow-sm bg-white w-1/4 px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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

    <div class="m-5"></div>

    <YoutubeSelectModal
      @handle:select="handleSelectYoutube"
    ></YoutubeSelectModal>
  </div>
</template>
