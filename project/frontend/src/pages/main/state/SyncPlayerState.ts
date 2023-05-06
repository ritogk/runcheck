import {
  ref,
  computed,
  ComputedRef,
  WritableComputedRef,
  watchEffect,
  Ref,
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
  diff: Ref<{ abs: number; own: number; two: number }[]>;
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
  public diff = ref([{ abs: 0, own: 0, two: 0 }]);
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

  switchPlay = async () => {
    this._playing.value = !this._playing.value;
    if (this._playing.value) {
      this._playerOneManager.subscription.player.value.play();
      this._playerTwoManager.subscription.player.value.play();
    } else {
      await Promise.all([
        this._playerOneManager.subscription.player.value.stop(),
        this._playerTwoManager.subscription.player.value.stop(),
      ]);
    }
    return;
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
    this._playerOneManager.subscription.player.value.mute();
    this._playerTwoManager.subscription.player.value.mute();
    await Promise.all([
      this._playerOneManager.subscription.player.value.stop(),
      this._playerTwoManager.subscription.player.value.stop(),
    ]);
    this._playing.value = false;
    await Promise.all([
      this._playerOneManager.subscription.player.value.seekTo(
        this._playerOneStartPosition
      ),
      this._playerTwoManager.subscription.player.value.seekTo(
        this._playerTwoStartPosition
      ),
    ]);
  };

  private syncFlg = false;
  runSync = async () => {
    this._playing.value = false;
    await Promise.all([
      this._playerOneManager.subscription.player.value.stop(),
      this._playerTwoManager.subscription.player.value.stop(),
    ]);

    const [videoOwnCurrentPosition, videoTwoCurrentPosition] =
      await Promise.all([
        this._playerOneManager.subscription.player.value.getCurrentPosition(),
        this._playerTwoManager.subscription.player.value.getCurrentPosition(),
      ]);
    this._playerOneStartPosition = videoOwnCurrentPosition;
    this._playerTwoStartPosition = videoTwoCurrentPosition;
    this._synced.value = true;
    // 同期ぐるぐる
    this._syncIntervalId = setInterval(async () => {
      if (this.syncFlg) return;
      this.syncFlg = true;

      const st = new Date().getTime();
      const [videoOwnCurrentPosition, videoTwoCurrentPosition] =
        await Promise.all([
          this._playerOneManager.subscription.player.value.getCurrentPosition(),
          this._playerTwoManager.subscription.player.value.getCurrentPosition(),
        ]);
      // 動画が再生しきっていてリピートフラグが立っている場合はリロード処理
      if (
        (this._playerOneManager.subscription.player.value.subscription.status
          .value === Status.ENDED ||
          this._playerTwoManager.subscription.player.value.subscription.status
            .value === Status.ENDED) &&
        this._repeated.value
      ) {
        console.log(
          "動画が再生しきっていてリピートフラグが立っている場合はリロード処理"
        );
        await this._playerOneManager.subscription.player.value.mute();
        await this._playerTwoManager.subscription.player.value.mute();
        this._muted.value = false;
        await Promise.all([
          this._playerOneManager.subscription.player.value.stop(),
          this._playerTwoManager.subscription.player.value.stop(),
        ]);
        this._playing.value = false;
        await Promise.all([
          this._playerOneManager.subscription.player.value.seekTo(
            this._playerOneStartPosition
          ),
          this._playerTwoManager.subscription.player.value.seekTo(
            this._playerTwoStartPosition
          ),
        ]);
        await Promise.all([
          this._playerOneManager.subscription.player.value.play(),
          this._playerTwoManager.subscription.player.value.play(),
        ]);
        this._playing.value = true;
        this.syncFlg = false;
        // alert("リピートしたよ！");
        return;
      }

      if (
        videoOwnCurrentPosition < this._playerOneStartPosition ||
        videoTwoCurrentPosition < this._playerTwoStartPosition
      ) {
        // 開始ポジションより手前の場合は開始ポジションに戻す
        console.log("開始ポジションより手前の場合は開始ポジションに戻す");

        Promise.all([
          this._playerOneManager.subscription.player.value.mute(),
          this._playerOneManager.subscription.player.value.seekTo(
            this._playerOneStartPosition
          ),
          this._playerOneManager.subscription.player.value.stop(),
        ]);

        Promise.all([
          this._playerTwoManager.subscription.player.value.mute(),
          this._playerTwoManager.subscription.player.value.seekTo(
            this._playerTwoStartPosition
          ),
          this._playerTwoManager.subscription.player.value.stop(),
        ]);
        // alert("もどしたよ！");
        // alert("videoOwnCurrentPosition:" + videoOwnCurrentPosition);
        // alert("videoTwoCurrentPosition:" + videoTwoCurrentPosition);
        this._playing.value = false;
        this.syncFlg = false;
        return;
      }

      const videoOwnPosition =
        videoOwnCurrentPosition - this._playerOneStartPosition;
      const videoTwoPosition =
        videoTwoCurrentPosition - this._playerTwoStartPosition;
      // 0.1秒以上ずれていたら同期させる
      const diff = Math.abs(videoOwnPosition - videoTwoPosition);
      if (diff >= 0.1) {
        this.diff.value.push({
          abs: Math.floor(diff * 100) / 100,
          own: Math.floor(videoOwnPosition * 100) / 100,
          two: Math.floor(videoTwoPosition * 100) / 100,
        });
        console.log(`diff: ${diff}`);
        console.log("0.1秒以上ずれていたら同期させる");
        if (videoOwnPosition > videoTwoPosition) {
          this._playerOneManager.subscription.player.value.seekTo(
            videoOwnCurrentPosition + diff * -1
          );
          // 片方の動画のみをシークすると「シークのタイムラグ」と「再生され続けている時間」をあわせて0.4秒くらいずれてしまうので意味のないシークを挟む
          this._playerTwoManager.subscription.player.value.seekTo(
            videoTwoCurrentPosition
          );
        } else {
          this._playerOneManager.subscription.player.value.seekTo(
            videoOwnCurrentPosition
          );
          this._playerTwoManager.subscription.player.value.seekTo(
            videoTwoCurrentPosition + diff * -1
          );
        }
      }
      this.syncFlg = false;
    }, 500);
  };

  stopSync = (): void => {
    this.diff.value = [];
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
