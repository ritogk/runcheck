import { computed, ref } from "vue";
import { DummyPlayer } from "@/pages/main/parts/video-area-parts/libs/DummyPlayer";
import {
  IVideoPlayer,
  VideoType,
} from "@/pages/main/parts/video-area-parts/libs/IVideoPlayer";

export const syncVideoState = () => {
  const playerOwn = () => {
    let player = new DummyPlayer();
    const videoType = ref(VideoType.NONE);
    const setPlayer = (value: IVideoPlayer) => {
      player = value;
      // ①ここで変更したら
      videoType.value = player.getVideoType();
    };
    const getPlayer = (): IVideoPlayer => {
      return player;
    };
    const subscription = {
      // ②算出プロパティが再計算されるはずなのになぜか動かん
      videoType: computed(() => {
        return videoType.value;
      }),
    };
    return {
      setPlayer: setPlayer,
      getPlayer: getPlayer,
      subscription: subscription,
    };
  };

  const playerTwo = () => {
    let player = new DummyPlayer();
    const videoType = ref(VideoType.NONE);
    const setPlayer = (value: IVideoPlayer) => {
      player = value;
      videoType.value = player.getVideoType();
    };
    const getPlayer = (): IVideoPlayer => {
      return player;
    };
    const subscription = {
      videoType: computed(() => videoType.value),
    };
    return {
      setPlayer: setPlayer,
      getPlayer: getPlayer,
      subscription: subscription,
    };
  };

  const sync = () => {
    const currentPosition = ref(0);
    const muted = ref(false);
    const repeted = ref(false);
    const speed = ref(1);
    const synced = ref(false);
    let syncVideoSyncIntervalId = 0;
    let syncVideoOwnCurrentPosition = 0;
    let syncVideoTwoCurrentPosition = 0;
    const switchMute = () => {
      muted.value = !muted.value;
    };

    const switchRepeat = (): void => {
      repeted.value = !repeted.value;
    };

    const adjustSpeed = (value: number): void => {
      speed.value = value;
    };

    const reload = (): void => {};

    const runSync = async () => {
      synced.value = true;
      syncVideoOwnCurrentPosition = await playerOwn()
        .getPlayer()
        .getCurrentPosition();
      syncVideoTwoCurrentPosition = await playerTwo()
        .getPlayer()
        .getCurrentPosition();
      syncVideoSyncIntervalId = setInterval(async () => {
        const videoOwnCurrentPosition =
          (await playerOwn().getPlayer().getCurrentPosition()) -
          syncVideoOwnCurrentPosition;
        const videoTwoCurrentPosition =
          (await playerTwo().getPlayer().getCurrentPosition()) -
          syncVideoTwoCurrentPosition;

        // 0.3秒以上ずれていたら同期させる
        const diff = Math.abs(
          videoOwnCurrentPosition - videoTwoCurrentPosition
        );
        if (diff >= 0.3) {
          videoOwnCurrentPosition > videoTwoCurrentPosition
            ? playerOwn()
                .getPlayer()
                .seekTo(diff * -1)
            : playerTwo()
                .getPlayer()
                .seekTo(diff * -1);
        }
      }, 500);
    };

    const stopSync = () => {
      synced.value = false;
      clearInterval(syncVideoSyncIntervalId);
      syncVideoSyncIntervalId = 0;
    };

    const setCurrentPosition = (postion: number): void => {
      currentPosition.value = postion;
    };

    const subscription = {
      muted: computed(() => muted.value),
      repeated: computed(() => repeted.value),
      speed: computed(() => speed.value),
      synced: computed(() => synced.value),
      currentPosition: computed(() => currentPosition.value),
    };

    return {
      switchMute: switchMute,
      switchRepeat: switchRepeat,
      adjustSpeed: adjustSpeed,
      reload: reload,
      runSync: runSync,
      stopSync: stopSync,
      setCurrentPosition: setCurrentPosition,
      subscription: subscription,
    };
  };

  return {
    playerOwn: playerOwn,
    playerTwo: playerTwo,
    sync: sync,
  };
};
