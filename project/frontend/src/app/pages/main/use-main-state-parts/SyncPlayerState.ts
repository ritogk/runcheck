import { ref, computed, ComputedRef, watch } from "vue"
import {
  IVideoPlayer,
  Status,
  VideoType,
} from "@/app/pages/main/main-parts/player-area-parts/IVideoPlayer"
import { PlayerManager } from "@/app/pages/main/main-parts/player-area-parts/PlayerManager"
import {
  ComparisonsApi,
  VideoType as ApiVideoType,
} from "@/core/openapiClient/index"

export interface ISyncPlayerStateType {
  playerOneManager: PlayerManager
  playerTwoManager: PlayerManager
  switchPlay(): void
  switchMute(): void
  switchRepeat(): void
  adjustSpeed(speed: number): void
  reload(): void
  runSync(): void
  stopSync(): void
  enableSync(): void
  disableSync(): void
  saveSync(
    anonymous: boolean,
    title?: string,
    memo?: string,
    category?: string
  ): Promise<{ id: number }>
  publishSync(id: number): Promise<void>
  seekTo(progressRate: number): Promise<void>
  subscription: {
    playing: ComputedRef<boolean>
    muted: ComputedRef<boolean>
    repeated: ComputedRef<boolean>
    speed: ComputedRef<number>
    synced: ComputedRef<boolean>
    progressRate: ComputedRef<number>
    duration: ComputedRef<number>
  }
}

export class SyncPlayerState implements ISyncPlayerStateType {
  private _playerOneManager: PlayerManager
  private _playerOneStartPosition = 0
  private _playerTwoManager: PlayerManager
  private _playerTwoStartPosition = 0
  private _syncDuration = ref(0)
  private _syncProgressRate = ref(0)
  private _playing = ref(true)
  private _muted = ref(false)
  private _repeated = ref(false)
  private _speed = ref(1)
  private _synced = ref(false)
  private _syncIntervalId = 0
  private comparisonsApi = new ComparisonsApi()

  constructor() {
    this._playerOneManager = new PlayerManager()
    this._playerTwoManager = new PlayerManager()

    watch(this._playing, (value) => {
      if (value) {
        this._playerOneManager.subscription.player.value.play()
        this._playerTwoManager.subscription.player.value.play()
      } else {
        this._playerOneManager.subscription.player.value.stop()
        this._playerTwoManager.subscription.player.value.stop()
      }
    })

    watch(this._muted, (value) => {
      if (value) {
        this._playerOneManager.subscription.player.value.mute()
        this._playerTwoManager.subscription.player.value.mute()
      } else {
        this._playerOneManager.subscription.player.value.unMute()
        this._playerTwoManager.subscription.player.value.unMute()
      }
    })

    watch(this._speed, (value) => {
      this.syncProcessing = true
      this._playerOneManager.subscription.player.value.adjustSpeed(value)
      this._playerTwoManager.subscription.player.value.adjustSpeed(value)
      this.syncProcessing = false
    })
  }

  get playerOneManager() {
    return this._playerOneManager
  }

  get playerTwoManager() {
    return this._playerTwoManager
  }

  switchPlay = async () => {
    this._playing.value = !this._playing.value
  }

  switchMute = (): void => {
    this._muted.value = !this._muted.value
  }

  switchRepeat = (): void => {
    this._repeated.value = !this._repeated.value
  }

  adjustSpeed = (speed: number): void => {
    this._speed.value = speed
  }

  switchSync = () => {
    this._synced.value = !this._synced.value
  }

  reload = async () => {
    this._muted.value = true
    this._playing.value = false
    await this._playerOneManager.subscription.player.value.seekTo(
      this._playerOneStartPosition
    )
    await this._playerTwoManager.subscription.player.value.seekTo(
      this._playerTwoStartPosition
    )
  }

  private syncProcessing = false // 処理中フラグ
  runSync = async () => {
    this._playing.value = false
    this._muted.value = true
    this._repeated.value = true
    const [playerOneStartPosition, playerTwoStartPosition] = await Promise.all([
      this._playerOneManager.subscription.player.value.getCurrentTime(),
      this._playerTwoManager.subscription.player.value.getCurrentTime(),
    ])
    this._playerOneStartPosition =
      Math.floor(playerOneStartPosition * 100) / 100
    this._playerTwoStartPosition =
      Math.floor(playerTwoStartPosition * 100) / 100

    // 動画1と動画2で同期した時間の範囲を算出
    const playerOneDuration =
      await this._playerOneManager.subscription.player.value.getDuration()
    const playerTwoDuration =
      await this._playerTwoManager.subscription.player.value.getDuration()
    const playerOneRange = playerOneDuration - this._playerOneStartPosition
    const playerTwoRange = playerTwoDuration - this._playerTwoStartPosition
    playerOneRange > playerTwoRange
      ? (this._syncDuration.value = playerTwoRange)
      : (this._syncDuration.value = playerOneRange)

    // 1倍速に戻す
    this.adjustSpeed(1)

    this._synced.value = true

    // 同期ぐるぐる
    this._syncIntervalId = setInterval(async () => {
      if (this.syncProcessing) return
      this.syncProcessing = true

      const st = new Date().getTime()
      let [playerOneCurrentPosition, playerTwoCurrentPosition] =
        await Promise.all([
          this._playerOneManager.subscription.player.value.getCurrentTime(),
          this._playerTwoManager.subscription.player.value.getCurrentTime(),
        ])
      playerOneCurrentPosition =
        Math.floor(playerOneCurrentPosition * 100) / 100
      playerTwoCurrentPosition =
        Math.floor(playerTwoCurrentPosition * 100) / 100
      // 動画が再生しきっていてリピートフラグが立っている場合はリロード
      if (
        (this._playerOneManager.subscription.player.value.subscription.status
          .value === Status.ENDED ||
          this._playerTwoManager.subscription.player.value.subscription.status
            .value === Status.ENDED) &&
        this._repeated.value
      ) {
        console.log(
          "動画が再生しきっていてリピートフラグが立っている場合はリロード"
        )
        this.reload()
        this.syncProcessing = false
        return
      }

      if (
        playerOneCurrentPosition < this._playerOneStartPosition ||
        playerTwoCurrentPosition < this._playerTwoStartPosition
      ) {
        // 開始ポジションより手前の場合は開始ポジションに戻す
        console.log("開始ポジションより手前の場合は開始ポジションに戻す")
        // console.log(
        //   `playerOneCurrentPosition:${playerOneCurrentPosition} playerOneStartPosition:${this._playerOneStartPosition}`
        // )
        // console.log(
        //   `playerTwoCurrentPosition:${playerTwoCurrentPosition} playerTwoStartPosition:${this._playerTwoStartPosition}`
        // )
        this.reload()
        this.syncProcessing = false
        return
      }

      const videoOnePosition =
        playerOneCurrentPosition - this._playerOneStartPosition
      const videoTwoPosition =
        playerTwoCurrentPosition - this._playerTwoStartPosition
      // 0.1秒以上ずれていたら同期させる
      const diff = Math.abs(videoOnePosition - videoTwoPosition)
      if (diff >= 0.1) {
        console.log("0.1秒以上ずれていたら同期させる")
        if (videoOnePosition > videoTwoPosition) {
          this._playerOneManager.subscription.player.value.seekTo(
            playerOneCurrentPosition + diff * -1
          )
          // 片方の動画のみをシークすると「シークのタイムラグ」と「再生され続けている時間」をあわせて0.4秒くらいずれてしまうので意味のないシークを挟む
          // なぜかcurrentPositionより前にシークする時がある。
          this._playerTwoManager.subscription.player.value.seekTo(
            playerTwoCurrentPosition
          )
        } else {
          this._playerOneManager.subscription.player.value.seekTo(
            playerOneCurrentPosition
          )
          this._playerTwoManager.subscription.player.value.seekTo(
            playerTwoCurrentPosition + diff * -1
          )
        }
      }

      // 再生完了率を取得
      this._syncProgressRate.value = videoOnePosition / this._syncDuration.value
      this.syncProcessing = false
    }, 500)
  }

  stopSync = (): void => {
    this._synced.value = false
    clearInterval(this._syncIntervalId)
    this._syncIntervalId = 0
  }

  enableSync = () => {
    this.syncProcessing = false
  }

  disableSync = () => {
    this.syncProcessing = true
  }

  saveSync = async (
    anonymous: boolean,
    title?: string,
    memo?: string,
    category?: string
  ): Promise<{ id: number }> => {
    const video1VideoType =
      this.playerOneManager.subscription.videoType.value === VideoType.YOUTUBE
        ? ApiVideoType.YOUTUBE
        : ApiVideoType.LOCAL
    const video1Url =
      await this.playerOneManager.subscription.player.value.getPath()
    const video1EmbedUrl =
      video1VideoType === ApiVideoType.YOUTUBE
        ? `https://www.youtube.com/embed/${video1Url.substring(
            video1Url.length - 11
          )}`
        : video1Url
    const video1TimeSt = this._playerOneStartPosition

    const video2VideoType =
      this.playerTwoManager.subscription.videoType.value === VideoType.YOUTUBE
        ? ApiVideoType.YOUTUBE
        : ApiVideoType.LOCAL
    const video2Url =
      await this.playerTwoManager.subscription.player.value.getPath()
    const video2EmbedUrl =
      video2VideoType === ApiVideoType.YOUTUBE
        ? `https://www.youtube.com/embed/${video2Url.substring(
            video2Url.length - 11
          )}`
        : video2Url
    const video2TimeSt = this._playerTwoStartPosition
    // 同期情報の登録
    const response = await this.comparisonsApi.comparisonsPost({
      videoComparison: {
        title: title,
        category: category,
        memo: memo,
        anonymous: anonymous,
        video1Url: video1EmbedUrl,
        video1TimeSt: video1TimeSt,
        video1VideoType: video1VideoType,
        video2Url: video2EmbedUrl,
        video2TimeSt: video2TimeSt,
        video2VideoType: video2VideoType,
      },
    })
    return { id: response.comparisonId }
  }

  publishSync(id: number): Promise<void> {
    return this.comparisonsApi.comparisonsComparisonIdPublishPut({
      comparisonId: id,
    })
  }

  seekTo = async (progressRate: number) => {
    this._syncProgressRate.value = progressRate
    this._muted.value = true
    // シーク
    this._playerOneManager.subscription.player.value.seekTo(
      this._playerOneStartPosition + this._syncDuration.value * progressRate
    )
    this._playerTwoManager.subscription.player.value.seekTo(
      this._playerTwoStartPosition + this._syncDuration.value * progressRate
    )
  }

  subscription = {
    playing: computed(() => {
      return this._playing.value
    }),
    muted: computed(() => {
      return this._muted.value
    }),
    repeated: computed(() => {
      return this._repeated.value
    }),
    speed: computed(() => {
      return this._speed.value
    }),
    synced: computed(() => {
      return this._synced.value
    }),
    progressRate: computed(() => {
      return this._syncProgressRate.value
    }),
    duration: computed(() => {
      return this._syncDuration.value
    }),
  }
}
