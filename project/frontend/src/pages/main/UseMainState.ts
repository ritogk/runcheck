import { ComputedRef, InjectionKey, WritableComputedRef } from "vue";
import {
  IVideoPlayer,
  VideoType,
} from "./parts/video-area-parts/libs/IVideoPlayer";
import { VideoNo } from "@/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/UseModalState";
import { openModalState } from "./state/openModalState";
import { saveModalState } from "./state/saveModalState";
import { YoutubeSelectorModalState } from "./state/YoutubeSelectorModalState";
import { SyncVideoState } from "./state/SyncVideoState";

type UseMainStateType = {
  openModal: {
    open(): void;
    close(): void;
    subscription: {
      opened: ComputedRef<boolean>;
    };
  };
  saveModal: {
    open(): void;
    close(): void;
    subscription: {
      opened: ComputedRef<boolean>;
    };
  };
  youtubeModal: {
    open(videoNo: VideoNo): void;
    close(): void;
    select(url: string): void;
    load(): void;
    save(): void;
    subscription: {
      opened: ComputedRef<boolean>;
      currentVideoNo: ComputedRef<VideoNo>;
      selectUrl: ComputedRef<string>;
    };
  };
  syncVideo: {
    videoOwn: IVideoPlayer;
    videoTwo: IVideoPlayer;
    currentPosition: WritableComputedRef<number>;
    switchMute(): void;
    switchRepeat(): void;
    adjustSpeed(speed: number): void;
    reload(): void;
    runSync(): void;
    stopSync(): void;
    subscription: {
      muted: ComputedRef<boolean>;
      repeated: ComputedRef<boolean>;
      speed: ComputedRef<number>;
      synced: ComputedRef<boolean>;
      videoOwnType: ComputedRef<VideoType>;
      videoTwoType: ComputedRef<VideoType>;
    };
  };
};

const UseMainState = (): UseMainStateType => {
  return {
    openModal: openModalState(),
    saveModal: saveModalState(),
    youtubeModal: new YoutubeSelectorModalState(),
    syncVideo: new SyncVideoState(),
  };
};

const UseMainStateKey: InjectionKey<UseMainStateType> =
  Symbol("UseMainStateType");
export { UseMainState, UseMainStateKey, UseMainStateType };
