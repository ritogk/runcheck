import { computed, ComputedRef, ref, InjectionKey } from "vue";
import {
  IVideoPlayer,
  VideoType,
} from "./parts/video-area-parts/libs/IVideoPlayer";
import { DummyPlayer } from "./parts/video-area-parts/libs/DummyPlayer";
import { VideoNo } from "@/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/UseModalState";

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
    subscription: {
      opened: ComputedRef<boolean>;
      videoNo: ComputedRef<VideoNo>;
      url: ComputedRef<string>;
    };
  };
  syncVideo: {
    playerOwn: {
      setPlayer(player: IVideoPlayer): void;
      getPlayer(): IVideoPlayer | null;
      subscription: {
        videoType: ComputedRef<VideoType>;
      };
    };
    playerTwo: {
      setPlayer(player: IVideoPlayer): void;
      getPlayer(): IVideoPlayer | null;
      subscription: {
        videoType: ComputedRef<VideoType>;
      };
    };
    switchMute(): void;
    switchRepeat(): void;
    adjustSpeed(speed: number): void;
    reload(): void;
    switchSync(): void;
    setCurrentPosition(postion: number): void;
    subscription: {
      muted: ComputedRef<boolean>;
      repeated: ComputedRef<boolean>;
      speed: ComputedRef<number>;
      synced: ComputedRef<boolean>;
      currentPosition: ComputedRef<number>;
    };
  };
};

const UseMainState = (): UseMainStateType => {
  const openedOpenModal = ref(false);
  const openModal = {
    open: () => {
      openedOpenModal.value = true;
    },
    close: () => {
      openedOpenModal.value = false;
    },
    subscription: {
      opened: computed(() => openedOpenModal.value),
    },
  };

  const openedSaveModal = ref(false);
  const saveModal = {
    opened: ref(false),
    open: () => {
      openedSaveModal.value = true;
    },
    close: () => {
      openedSaveModal.value = false;
    },
    subscription: {
      opened: computed(() => openedSaveModal.value),
    },
  };

  const openedYoutubeModal = ref(false);
  const youtubeModalVideoNo = ref(VideoNo.NONE);
  const youtubeModalSelectUrl = ref("");
  const youtubeModal = {
    open: (videoNo: VideoNo) => {
      openedYoutubeModal.value = true;
      youtubeModalVideoNo.value = videoNo;
    },
    close: () => {
      openedYoutubeModal.value = false;
      youtubeModalVideoNo.value = VideoNo.NONE;
    },
    select: (url: string) => {
      youtubeModalSelectUrl.value = url;
    },
    subscription: {
      opened: computed(() => openedYoutubeModal.value),
      videoNo: computed(() => youtubeModalVideoNo.value),
      url: computed(() => youtubeModalSelectUrl.value),
    },
  };

  let syncVideoPlayerOwn = new DummyPlayer();
  const syncVideoPlayerOwnType = ref(VideoType.NONE);
  let syncVideoPlayerTwo = new DummyPlayer();
  const syncVideoPlayerTwoType = ref(VideoType.NONE);
  const syncVideoCurrentPosition = ref(0);
  const syncVideoMuted = ref(false);
  const syncVideoRepeated = ref(false);
  const syncVideoSpeed = ref(1);
  const syncVideoSynced = ref(false);
  const syncVideo = {
    playerOwn: {
      setPlayer: (player: IVideoPlayer) => {
        syncVideoPlayerOwn = player;
        syncVideoPlayerOwnType.value = player.getVideoType();
      },
      getPlayer: (): IVideoPlayer | null => {
        return syncVideoPlayerOwn;
      },
      subscription: {
        videoType: computed(() => syncVideoPlayerOwnType.value),
      },
    },
    playerTwo: {
      setPlayer: (player: IVideoPlayer) => {
        syncVideoPlayerTwo = player;
        syncVideoPlayerTwoType.value = player.getVideoType();
      },
      getPlayer: (): IVideoPlayer | null => {
        return syncVideoPlayerTwo;
      },
      subscription: {
        videoType: computed(() => syncVideoPlayerTwoType.value),
      },
    },
    switchMute: () => {
      syncVideoMuted.value = !syncVideoMuted.value;
    },
    switchRepeat: (): void => {
      syncVideoRepeated.value = !syncVideoRepeated.value;
    },
    adjustSpeed: (speed: number): void => {
      syncVideoSpeed.value = speed;
    },
    reload: (): void => {},
    switchSync: () => {
      syncVideoSynced.value = !syncVideoSynced.value;
    },
    setCurrentPosition: (postion: number): void => {
      syncVideoCurrentPosition.value = postion;
    },
    subscription: {
      muted: computed(() => syncVideoMuted.value),
      repeated: computed(() => syncVideoRepeated.value),
      speed: computed(() => syncVideoSpeed.value),
      synced: computed(() => syncVideoSynced.value),
      currentPosition: computed(() => syncVideoCurrentPosition.value),
    },
  };

  return {
    openModal: openModal,
    saveModal: saveModal,
    youtubeModal: youtubeModal,
    syncVideo: syncVideo,
  };
};

const UseMainStateKey: InjectionKey<UseMainStateType> =
  Symbol("UseMainStateType");

export { UseMainState, UseMainStateKey, UseMainStateType };
