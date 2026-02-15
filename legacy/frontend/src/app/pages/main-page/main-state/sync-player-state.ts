import { ref, shallowRef, computed, type ComputedRef, watch } from "vue"
import { type IVideoPlayer, Status, VideoType } from "@/app/pages/main-page/player/i-video-player"
import { DummyPlayer } from "@/app/pages/main-page/player/dummy-player"
import { VideoType as ApiVideoType } from "@/core/openapiClient/index"
import { extractYoutubeId } from "@/core/extract-youtube-id"
import { YouTubePlayer } from "@/app/pages/main-page/player/youtube-player"
import { postComparisons } from "@/core/post-comparisons"
import { putComparisonsIdPublish } from "@/core/put-comparisons-id-publish"

/**
 * プレイヤーの同期状態を管理するクラス
 */
export type ISyncPlayerStateType = {
  changePlayerOne(player: IVideoPlayer): void
  changePlayerTwo(player: IVideoPlayer): void
  switchPlay(): void
  switchMute(): void
  switchRepeat(): void
  adjustSpeed(speed: number): void
  mute(): void
  unmute(): void
  reload(): void
  seekTo(progressRate: number): Promise<void>
  loadSync(
    video1Url: string,
    video1TimeSt: number,
    video2Url: string,
    video2TimeSt: number
  ): Promise<boolean>
  runSync(): Promise<void>
  stopSync(): void
  enableSync(): void
  disableSync(): void
  saveSync(
    anonymous: boolean,
    title?: string,
    memo?: string,
    category?: string
  ): Promise<{ id: string }>
  publishSync(id: string): Promise<void>
  resetSync(): Promise<void>
  subscription: {
    playerOne: ComputedRef<IVideoPlayer>
    playerTwo: ComputedRef<IVideoPlayer>
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
  private _playerOne = shallowRef<IVideoPlayer>(new DummyPlayer())
  private _playerOneStartPosition = 0
  private _playerTwo = shallowRef<IVideoPlayer>(new DummyPlayer())
  private _playerTwoStartPosition = 0
  private _syncDuration = ref(0)
  private _syncProgressRate = ref(0)
  private _playing = ref(true)
  private _muted = ref(false)
  private _repeated = ref(false)
  private _speed = ref(1)
  private _synced = ref(false)
  private _syncIntervalId = 0

  constructor() {
    watch(this._playing, (value) => {
      if (value) {
        this._playerOne.value.play()
        this._playerTwo.value.play()
      } else {
        this._playerOne.value.stop()
        this._playerTwo.value.stop()
      }
    })

    watch(this._muted, (value) => {
      if (value) {
        this._playerOne.value.mute()
        this._playerTwo.value.mute()
      } else {
        this._playerOne.value.unMute()
        this._playerTwo.value.unMute()
      }
    })

    watch(this._speed, (value) => {
      this.syncProcessing = true
      this._playerOne.value.adjustSpeed(value)
      this._playerTwo.value.adjustSpeed(value)
      this.syncProcessing = false
    })
  }

  changePlayerOne = (player: IVideoPlayer): void => {
    this._playerOne.value = player
  }

  changePlayerTwo = (player: IVideoPlayer): void => {
    this._playerTwo.value = player
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

  mute = (): void => {
    this._muted.value = true
  }

  unmute = (): void => {
    this._muted.value = false
  }

  switchSync = () => {
    this._synced.value = !this._synced.value
  }

  reload = async () => {
    // 固まった時用の救済処置
    this._muted.value = true
    this._playing.value = false
  }

  seekTo = async (progressRate: number) => {
    this._syncProgressRate.value = progressRate
    this._muted.value = true
    // シーク
    this._playerOne.value.seekTo(
      this._playerOneStartPosition + this._syncDuration.value * progressRate
    )
    this._playerTwo.value.seekTo(
      this._playerTwoStartPosition + this._syncDuration.value * progressRate
    )
  }

  private resetPosition = async (): Promise<void> => {
    this._muted.value = true
    this._playing.value = false
    await this._playerOne.value.seekTo(this._playerOneStartPosition)
    await this._playerTwo.value.seekTo(this._playerTwoStartPosition)
  }

  loadSync = async (
    video1Url: string,
    video1TimeSt: number,
    video2Url: string,
    video2TimeSt: number
  ): Promise<boolean> => {
    try {
      this.stopSync()
      await this.subscription.playerOne.value.destory()
      await this.subscription.playerTwo.value.destory()
      const youtubeOneId = extractYoutubeId(video1Url)
      const youtubeTwoId = extractYoutubeId(video2Url)
      const playerOne = new YouTubePlayer("youtube-video-one", youtubeOneId)
      const playerTwo = new YouTubePlayer("youtube-video-two", youtubeTwoId)
      await playerOne.load()
      await playerTwo.load()
      const promise = await new Promise<boolean>((resolve: (value: boolean) => void) => {
        // iframe生成後に数秒待機しないとなぜかiframeの制御が効かない。
        setTimeout(async () => {
          await playerOne.stop()
          await playerTwo.stop()
          await playerOne.seekTo(video1TimeSt)
          await playerTwo.seekTo(video2TimeSt)
          this.changePlayerOne(playerOne)
          this.changePlayerTwo(playerTwo)
          // seekToをした後に数秒待機しないとcurrentTimeが古い値になる。
          setTimeout(async () => {
            this.runSync()
            resolve(true)
          }, 3000)
        }, 2000)
      })
      return promise
    } catch {
      return false
    }
  }

  private syncProcessing = false // 処理中フラグ
  runSync = async () => {
    this._playing.value = false
    this._muted.value = true
    this._repeated.value = true
    const [playerOneStartPosition, playerTwoStartPosition] = await Promise.all([
      this._playerOne.value.getCurrentTime(),
      this._playerTwo.value.getCurrentTime()
    ])
    this._playerOneStartPosition = Math.floor(playerOneStartPosition * 100) / 100
    this._playerTwoStartPosition = Math.floor(playerTwoStartPosition * 100) / 100

    // 動画1と動画2で同期した時間の範囲を算出
    const playerOneDuration = await this._playerOne.value.getDuration()
    const playerTwoDuration = await this._playerTwo.value.getDuration()
    const playerOneRange = playerOneDuration - this._playerOneStartPosition
    const playerTwoRange = playerTwoDuration - this._playerTwoStartPosition
    playerOneRange > playerTwoRange
      ? (this._syncDuration.value = playerTwoRange)
      : (this._syncDuration.value = playerOneRange)

    // 1倍速に戻す
    this.adjustSpeed(1)

    this._synced.value = true

    // 同期ぐるぐる
    this._syncIntervalId = window.setInterval(async () => {
      if (this.syncProcessing) return
      this.syncProcessing = true

      const st = new Date().getTime()
      let [playerOneCurrentPosition, playerTwoCurrentPosition] = await Promise.all([
        this._playerOne.value.getCurrentTime(),
        this._playerTwo.value.getCurrentTime()
      ])
      playerOneCurrentPosition = Math.floor(playerOneCurrentPosition * 100) / 100
      playerTwoCurrentPosition = Math.floor(playerTwoCurrentPosition * 100) / 100
      // 動画が再生しきっていてリピートフラグが立っている場合はリロード
      if (
        (this._playerOne.value.subscription.status.value === Status.ENDED ||
          this._playerTwo.value.subscription.status.value === Status.ENDED) &&
        this._repeated.value
      ) {
        console.log("動画が再生しきっていてリピートフラグが立っている場合はリロード")
        this.resetPosition()
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

      const videoOnePosition = playerOneCurrentPosition - this._playerOneStartPosition
      const videoTwoPosition = playerTwoCurrentPosition - this._playerTwoStartPosition
      // 0.1秒以上ずれていたら同期させる
      const diff = Math.abs(videoOnePosition - videoTwoPosition)
      if (diff >= 0.1) {
        console.log("0.1秒以上ずれていたら同期させる")
        if (videoOnePosition > videoTwoPosition) {
          this._playerOne.value.seekTo(playerOneCurrentPosition + diff * -1)
          // 片方の動画のみをシークすると「シークのタイムラグ」と「再生され続けている時間」をあわせて0.4秒くらいずれてしまうので意味のないシークを挟む
          // なぜかcurrentPositionより前にシークする時がある。
          this._playerTwo.value.seekTo(playerTwoCurrentPosition)
        } else {
          this._playerOne.value.seekTo(playerOneCurrentPosition)
          this._playerTwo.value.seekTo(playerTwoCurrentPosition + diff * -1)
        }
      }

      // 再生完了率を取得
      this._syncProgressRate.value = videoOnePosition / this._syncDuration.value
      this.syncProcessing = false
    }, 500)
  }

  stopSync = (): void => {
    this._synced.value = false
    this._muted.value = false
    clearInterval(this._syncIntervalId)
    this._syncIntervalId = 0
    this._playerOneStartPosition = 0
    this._playerTwoStartPosition = 0
    this._syncDuration.value = 0
    this._syncProgressRate.value = 0
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
  ): Promise<{ id: string }> => {
    const video1VideoType =
      this._playerOne.value.subscription.videoType.value === VideoType.YOUTUBE
        ? ApiVideoType.YOUTUBE
        : ApiVideoType.LOCAL
    const video1Url = await this._playerOne.value.getPath()
    const video1EmbedUrl =
      video1VideoType === ApiVideoType.YOUTUBE
        ? `https://www.youtube.com/embed/${extractYoutubeId(video1Url)}`
        : video1Url
    const video1TimeSt = this._playerOneStartPosition

    const video2VideoType =
      this._playerTwo.value.subscription.videoType.value === VideoType.YOUTUBE
        ? ApiVideoType.YOUTUBE
        : ApiVideoType.LOCAL
    const video2Url = await this._playerTwo.value.getPath()
    const video2EmbedUrl =
      video2VideoType === ApiVideoType.YOUTUBE
        ? `https://www.youtube.com/embed/${extractYoutubeId(video2Url)}`
        : video2Url
    const video2TimeSt = this._playerTwoStartPosition
    // 同期情報の登録
    const response = await postComparisons({
      title: title ?? "",
      category: category ?? "",
      memo: memo ?? "",
      anonymous: anonymous,
      video1EmbedUrl: video1EmbedUrl,
      video1TimeSt: video1TimeSt,
      video1VideoType: video1VideoType,
      video2EmbedUrl: video2EmbedUrl,
      video2TimeSt: video2TimeSt,
      video2VideoType: video2VideoType
    })
    return { id: response.comparisonId }
  }

  publishSync = (id: string): Promise<void> => {
    return putComparisonsIdPublish(id)
  }

  resetSync = async (): Promise<void> => {
    this.stopSync()
    await this.subscription.playerOne.value.destory()
    await this.subscription.playerTwo.value.destory()
    this.changePlayerOne(new DummyPlayer())
    this.changePlayerTwo(new DummyPlayer())
    return
  }

  subscription = {
    playerOne: computed(() => {
      return this._playerOne.value
    }),
    playerTwo: computed(() => {
      return this._playerTwo.value
    }),
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
    })
  }
}
