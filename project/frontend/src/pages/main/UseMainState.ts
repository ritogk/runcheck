import { computed, ComputedRef, ref, InjectionKey } from "vue";
import {
  IVideoPlayer,
  VideoType,
} from "./parts/video-area-parts/libs/IVideoPlayer";
import { DummyPlayer } from "./parts/video-area-parts/libs/DummyPlayer";
import { VideoNo } from "@/pages/main/parts/video-area-parts/video-selector-parts/youtube-select-modal/UseModalState";
import { openModalState } from "./state/openModalState";
import { saveModalState } from "./state/saveModalState";
import { youtubeSelectModalState } from "./state/youtubeSelectModalState";

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
      videoNo: ComputedRef<VideoNo>;
      url: ComputedRef<string>;
    };
  };
  syncVideo: {
    playerOwn: {
      setPlayer(player: IVideoPlayer): void;
      getPlayer(): IVideoPlayer;
      subscription: {
        videoType: ComputedRef<VideoType>;
      };
    };
    playerTwo: {
      setPlayer(player: IVideoPlayer): void;
      getPlayer(): IVideoPlayer;
      subscription: {
        videoType: ComputedRef<VideoType>;
      };
    };
    switchMute(): void;
    switchRepeat(): void;
    adjustSpeed(speed: number): void;
    reload(): void;
    runSync(): void;
    stopSync(): void;
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
  let syncVideoPlayerOwn = new DummyPlayer();
  const syncVideoPlayerOwnType = ref(VideoType.NONE);
  let syncVideoPlayerTwo = new DummyPlayer();
  const syncVideoPlayerTwoType = ref(VideoType.NONE);
  const syncVideoCurrentPosition = ref(0);
  const syncVideoMuted = ref(false);
  const syncVideoRepeated = ref(false);
  const syncVideoSpeed = ref(1);
  const syncVideoSynced = ref(false);
  let syncVideoSyncIntervalId = 0;
  let syncVideoOwnCurrentPosition = 0;
  let syncVideoTwoCurrentPosition = 0;
  const syncVideo = {
    playerOwn: {
      setPlayer: (player: IVideoPlayer) => {
        syncVideoPlayerOwn = player;
        // ここで発火
        syncVideoPlayerOwnType.value = player.getVideoType();
      },
      getPlayer: (): IVideoPlayer => {
        return syncVideoPlayerOwn;
      },
      subscription: {
        videoType: computed(() => {
          return syncVideoPlayerOwnType.value;
        }),
      },
      testDayo: () => {
        const subscription = {
          videoType: computed(() => {
            return syncVideoPlayerOwnType.value;
          }),
        };
      },
    },
    playerTwo: {
      setPlayer: (player: IVideoPlayer) => {
        syncVideoPlayerTwo = player;
        syncVideoPlayerTwoType.value = player.getVideoType();
      },
      getPlayer: (): IVideoPlayer => {
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
    runSync: async () => {
      syncVideoSynced.value = true;
      syncVideoOwnCurrentPosition =
        await syncVideoPlayerOwn.getCurrentPosition();
      syncVideoTwoCurrentPosition =
        await syncVideoPlayerTwo.getCurrentPosition();
      syncVideoSyncIntervalId = setInterval(async () => {
        const videoOwnCurrentPosition =
          (await syncVideoPlayerOwn.getCurrentPosition()) -
          syncVideoOwnCurrentPosition;
        const videoTwoCurrentPosition =
          (await syncVideoPlayerTwo.getCurrentPosition()) -
          syncVideoTwoCurrentPosition;

        // 0.3秒以上ずれていたら同期させる
        const diff = Math.abs(
          videoOwnCurrentPosition - videoTwoCurrentPosition
        );
        if (diff >= 0.3) {
          videoOwnCurrentPosition > videoTwoCurrentPosition
            ? syncVideoPlayerOwn.seekTo(diff * -1)
            : syncVideoPlayerTwo.seekTo(diff * -1);
        }
      }, 500);
    },
    stopSync: () => {
      syncVideoSynced.value = false;
      clearInterval(syncVideoSyncIntervalId);
      syncVideoSyncIntervalId = 0;
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
    openModal: openModalState(),
    saveModal: saveModalState(),
    youtubeModal: youtubeSelectModalState(),
    syncVideo: syncVideo,
  };
};

const UseMainStateKey: InjectionKey<UseMainStateType> =
  Symbol("UseMainStateType");
export { UseMainState, UseMainStateKey, UseMainStateType };
