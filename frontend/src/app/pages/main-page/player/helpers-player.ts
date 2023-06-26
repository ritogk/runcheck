import { type ShallowRef } from "vue"
import { PlayerNo } from "@/app/pages/main-page/main-state/modal-youtube-selector-state"
import { YouTubePlayer } from "./youtube-player"
import { LocalVideoPlayer } from "./local-video-player"
import { type IVideoPlayer } from "./i-video-player"
import { DummyPlayer } from "./dummy-player"
import { extractYoutubeId } from "@/core/extract-youtube-id"

/**
 * playerのヘルパー関数
 */

/**
 * youtubeをマウントする
 * @param player
 * @param youtubeUrl
 * @param playerNo
 * @returns
 */
export const mountYoutube = async (
  player: IVideoPlayer,
  youtubeUrl: string,
  playerNo: PlayerNo
): Promise<IVideoPlayer> => {
  const youtubeId = extractYoutubeId(youtubeUrl)
  if (playerNo === PlayerNo.ONE) {
    await player.destory()
    const newPlayerOne = new YouTubePlayer("youtube-video-one", youtubeId)
    await newPlayerOne.load()
    return newPlayerOne
  } else {
    await player.destory()
    const newPlayerTwo = new YouTubePlayer("youtube-video-two", youtubeId)
    await newPlayerTwo.load()
    return newPlayerTwo
  }
}

/**
 * Local動画をマウントする
 * @param player
 * @param file
 * @param localVideoElement
 * @returns
 */
export const mountLocalVideo = async (
  player: IVideoPlayer,
  file: File,
  localVideoElement: HTMLVideoElement
): Promise<IVideoPlayer> => {
  const objectURL = URL.createObjectURL(file)
  await player.destory()
  const newPlayer = new LocalVideoPlayer(localVideoElement, objectURL)
  await newPlayer.load()
  return newPlayer
}
