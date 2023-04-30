import { InjectionKey, reactive, computed, ComputedRef } from "vue";
import { localStorageKeys } from "@/core/localstorageKey";

enum VideoNo {
  ONE,
  TWO,
  NONE,
}

type UseModalStateType = {
  subscription: {
    videoNo: ComputedRef<VideoNo>;
    opened: ComputedRef<boolean>;
  };
  open(videoNo: VideoNo): void;
  close(): void;
  load(): void;
};

const UseModalState = (): UseModalStateType => {
  const state = reactive({ videoNo: VideoNo.NONE, opened: false });
  const open = (videoNo: VideoNo) => {
    state.videoNo = videoNo;
    state.opened = true;
    save();
  };

  const close = () => {
    state.videoNo = VideoNo.NONE;
    state.opened = false;
    save();
  };

  const load = () => {
    const storage = localStorage.getItem(
      localStorageKeys.YOUTUBE_SELECT_MODAL_STATE
    );
    if (storage) {
      const item = <{ videoNo: VideoNo; opened: boolean }>JSON.parse(storage);
      state.opened = item.opened;
      state.videoNo = item.videoNo;
    }
  };

  const save = () => {
    localStorage.setItem(
      localStorageKeys.YOUTUBE_SELECT_MODAL_STATE,
      JSON.stringify(state)
    );
  };

  return {
    subscription: {
      videoNo: computed(() => state.videoNo),
      opened: computed(() => state.opened),
    },
    open: open,
    close: close,
    load: load,
  };
};

const UseModalStateKey: InjectionKey<UseModalStateType> =
  Symbol("UseModalState");

export { UseModalState, UseModalStateKey, UseModalStateType, VideoNo };
