import { computed, ref } from "vue";
import { VideoNo } from "@/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/UseModalState";
import { localStorageKeys } from "@/core/localstorageKey";
export const youtubeSelectModalState = () => {
  const opened = ref(false);
  const currentVideoNo = ref(VideoNo.NONE);
  const selectUrl = ref("");
  const open = (videoNo: VideoNo) => {
    opened.value = true;
    currentVideoNo.value = videoNo;
  };

  const close = () => {
    opened.value = false;
    currentVideoNo.value = VideoNo.NONE;
  };

  const select = (url: string) => {
    selectUrl.value = url;
  };

  const load = () => {
    const storage = localStorage.getItem(
      localStorageKeys.YOUTUBE_SELECT_MODAL_STATE
    );
    if (storage) {
      const item = <{ videoNo: VideoNo; opened: boolean }>JSON.parse(storage);
      opened.value = item.opened;
      currentVideoNo.value = item.videoNo;
    }
  };

  const save = () => {
    localStorage.setItem(
      localStorageKeys.YOUTUBE_SELECT_MODAL_STATE,
      JSON.stringify({ videoNo: currentVideoNo.value, opened: true })
    );
  };

  const subscription = {
    opened: computed(() => {
      console.log("youtubeSelectModal");
      return opened.value;
    }),
    videoNo: computed(() => currentVideoNo.value),
    url: computed(() => selectUrl.value),
  };

  return {
    open: open,
    close: close,
    select: select,
    load: load,
    save: save,
    subscription: subscription,
  };
};
