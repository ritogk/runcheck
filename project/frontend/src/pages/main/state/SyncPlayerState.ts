import {
  ref,
  computed,
  ComputedRef,
  WritableComputedRef,
  watchEffect,
} from "vue";
import {
  IVideoPlayer,
  Status,
} from "@/pages/main/parts/video-area-parts/libs/IVideoPlayer";
import { PlayerManager } from "@/pages/main/parts/video-area-parts/libs/PlayerManager";

/**
 * 動画を同期させるための状態クラス
 * @returns
 */
interface ISyncPlayerStateType {
  playerOneManager: PlayerManager;
  playerTwoManager: PlayerManager;
  currentPosition: WritableComputedRef<number>;
  switchPlay(): void;
  switchMute(): void;
  switchRepeat(): void;
  adjustSpeed(speed: number): void;
  reload(): void;
  runSync(): void;
  stopSync(): void;
  subscription: {
    videoOwn: ComputedRef<IVideoPlayer>;
    videoTwo: ComputedRef<IVideoPlayer>;
    playing: ComputedRef<boolean>;
    muted: ComputedRef<boolean>;
    repeated: ComputedRef<boolean>;
    speed: ComputedRef<number>;
    synced: ComputedRef<boolean>;
  };
}

export class SyncPlayerState implements ISyncPlayerStateType {
  private _currentPosition = ref(0);
  private _playerOneManager: PlayerManager;
  private _playerOneStartPosition = 0;
  private _playerTwoManager: PlayerManager;
  private _playerTwoStartPosition = 0;
  private _playing = ref(false);
  private _muted = ref(true);
  private _repeated = ref(false);
  private _speed = ref(1);
  private _synced = ref(false);
  private _syncIntervalId = 0;

  constructor() {
    this._playerOneManager = new PlayerManager();
    this._playerTwoManager = new PlayerManager();

    // リピート処理
    watchEffect(() => {
      if (!this._repeated.value) return;
      if (
        this._playerOneManager.subscription.player.value.subscription.status
          .value === Status.ENDED ||
        this._playerTwoManager.subscription.player.value.subscription.status
          .value === Status.ENDED
      ) {
        this.reload();
      }
    });
  }

  get playerOneManager() {
    return this._playerOneManager;
  }

  get playerTwoManager() {
    return this._playerTwoManager;
  }

  currentPosition = computed({
    get: () => {
      return this._currentPosition.value;
    },
    set: (value) => {
      this._currentPosition.value = value;
    },
  });

  switchPlay = (): void => {
    this._playing.value = !this._playing.value;
    if (this._playing.value) {
      this._playerOneManager.subscription.player.value.play();
      this._playerTwoManager.subscription.player.value.play();
    } else {
      this._playerOneManager.subscription.player.value.stop();
      this._playerTwoManager.subscription.player.value.stop();
    }
  };

  switchMute = (): void => {
    this._muted.value = !this._muted.value;
    if (this._muted.value) {
      this._playerOneManager.subscription.player.value.mute();
      this._playerTwoManager.subscription.player.value.mute();
    } else {
      this._playerOneManager.subscription.player.value.unMute();
      this._playerTwoManager.subscription.player.value.unMute();
    }
  };

  switchRepeat = (): void => {
    this._repeated.value = !this._repeated.value;
  };

  adjustSpeed = (speed: number): void => {
    this._speed.value = speed;
  };

  switchSync = () => {
    this._synced.value = !this._synced.value;
  };

  reload = async () => {
    this._playing.value = false;
    await this._playerOneManager.subscription.player.value.stop();
    await this._playerTwoManager.subscription.player.value.stop();
    this.switchMute();
    this._playerOneManager.subscription.player.value.seekTo(
      this._playerOneStartPosition
    );
    this._playerTwoManager.subscription.player.value.seekTo(
      this._playerTwoStartPosition
    );
    this._playerOneManager.subscription.player.value.play();
    this._playerTwoManager.subscription.player.value.play();
  };

  runSync = async () => {
    this._playing.value = false;
    this._synced.value = true;
    this._playerOneStartPosition =
      await this._playerOneManager.subscription.player.value.getCurrentPosition();
    this._playerTwoStartPosition =
      await this._playerTwoManager.subscription.player.value.getCurrentPosition();

    // 同期ぐるぐる
    this._syncIntervalId = setInterval(async () => {
      const videoOwnCurrentPosition =
        await this._playerOneManager.subscription.player.value.getCurrentPosition();
      const videoTwoCurrentPosition =
        await this._playerTwoManager.subscription.player.value.getCurrentPosition();

      // 開始ポジションより手前の場合は開始ポジションに戻す
      if (
        videoOwnCurrentPosition < this._playerOneStartPosition ||
        videoTwoCurrentPosition < this._playerTwoStartPosition
      ) {
        console.log("開始ポジションより手前の場合は開始ポジションに戻す");
        await this._playerOneManager.subscription.player.value.seekTo(
          this._playerOneStartPosition
        );
        await this._playerTwoManager.subscription.player.value.seekTo(
          this._playerTwoStartPosition
        );
        return;
      }

      const videoOwnPosition =
        videoOwnCurrentPosition - this._playerOneStartPosition;
      const videoTwoPosition =
        videoTwoCurrentPosition - this._playerTwoStartPosition;
      // 0.1秒以上ずれていたら同期させる
      const diff = Math.abs(videoOwnPosition - videoTwoPosition);
      if (diff >= 0.1) {
        console.log("0.1秒以上ずれていたら同期させる");
        if (videoOwnPosition > videoTwoPosition) {
          await this._playerOneManager.subscription.player.value.seekTo(
            videoOwnCurrentPosition + diff * -1
          );
        } else {
          await this._playerTwoManager.subscription.player.value.seekTo(
            videoTwoCurrentPosition + diff * -1
          );
        }
      }
    }, 500);
  };

  stopSync = (): void => {
    this._synced.value = false;
    clearInterval(this._syncIntervalId);
    this._syncIntervalId = 0;
  };

  get subscription() {
    return {
      videoOwn: computed(() => {
        return this._playerOneManager.subscription.player.value;
      }),
      videoTwo: computed(() => {
        return this._playerTwoManager.subscription.player.value;
      }),
      playing: computed(() => {
        return this._playing.value;
      }),
      muted: computed(() => {
        return this._muted.value;
      }),
      repeated: computed(() => {
        return this._repeated.value;
      }),
      speed: computed(() => {
        return this._speed.value;
      }),
      synced: computed(() => {
        return this._synced.value;
      }),
    };
  }
}
