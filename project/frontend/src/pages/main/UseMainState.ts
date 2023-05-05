import { ComputedRef, InjectionKey, WritableComputedRef } from "vue";
import {
  IVideoPlayer,
  VideoType,
} from "./parts/video-area-parts/libs/IVideoPlayer";
import { VideoNo } from "@/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/UseModalState";
import { OpenModalState } from "./state/OpenModalState";
import { SaveModalState } from "./state/SaveModalState";
import { YoutubeSelectorModalState } from "./state/YoutubeSelectorModalState";
import { SyncVideoState } from "./state/SyncVideoState";
import { PlayerManager } from "@/pages/main/parts/video-area-parts/libs/PlayerManager";

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
    videoOwnManager: PlayerManager;
    videoTwoManager: PlayerManager;
    currentPosition: WritableComputedRef<number>;
    switchPlay(): void;
    switchMute(): void;
    switchRepeat(): void;
    adjustSpeed(speed: number): void;
    reload(): void;
    runSync(): void;
    stopSync(): void;
    subscription: {
      playing: ComputedRef<boolean>;
      muted: ComputedRef<boolean>;
      repeated: ComputedRef<boolean>;
      speed: ComputedRef<number>;
      synced: ComputedRef<boolean>;
    };
  };
};

const UseMainState = (): UseMainStateType => {
  return {
    openModal: new OpenModalState(),
    saveModal: new SaveModalState(),
    youtubeModal: new YoutubeSelectorModalState(),
    syncVideo: new SyncVideoState(),
  };
};

const UseMainStateKey: InjectionKey<UseMainStateType> =
  Symbol("UseMainStateType");
export { UseMainState, UseMainStateKey, UseMainStateType };
