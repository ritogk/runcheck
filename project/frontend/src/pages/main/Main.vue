<script setup lang="ts">
import { provide, onMounted } from "vue";
import {
  UseMainState,
  UseMainStateKey,
  UseMainStateType,
} from "./UseMainState";
import Video1Area from "./parts/Video1Area.vue";
import Video2Area from "./parts/Video2Area.vue";
import YoutubeSelectModal from "./parts/YoutubeSelectModal.vue";
import SyncController from "./parts/SyncController.vue";

const useMainState = UseMainState();
provide(UseMainStateKey, useMainState);

const hundleVideoRunSyncClick = () => {
  useMainState.syncVideo.runSync();
};

const hundleVideoStopSyncClick = () => {
  useMainState.syncVideo.stopSync();
};
</script>

<template>
  <YoutubeSelectModal></YoutubeSelectModal>
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
        <span
          class="isolate inline-flex rounded-md shadow-sm"
          v-show="!useMainState.syncVideo.subscription.synced.value"
        >
          <button
            type="button"
            class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-indigo-700 hover:bg-indigo-500 focus:z-10"
            @click="hundleVideoRunSyncClick"
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

        <span
          class="isolate inline-flex rounded-md shadow-sm"
          v-show="useMainState.syncVideo.subscription.synced.value"
        >
          <button
            type="button"
            class="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-indigo-700 hover:bg-indigo-500 focus:z-10"
            @click="hundleVideoStopSyncClick"
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
            同期解除
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
    </div>

    <Video1Area></Video1Area>
    <Video2Area></Video2Area>
    <SyncController></SyncController>
    <div class="m-5"></div>
  </div>
</template>
