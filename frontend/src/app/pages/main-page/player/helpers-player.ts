import { ShallowRef } from "vue"
import { PlayerNo } from "@/app/pages/main-page/main-state/modal-youtube-selector-state"
import { YouTubePlayer } from "./youtube-player"
import { LocalVideoPlayer } from "./local-video-player"
import { IVideoPlayer } from "./i-video-player"
import { DummyPlayer } from "./dummy-player"
import { extractYoutubeId } from "@/core/extract-youtube-id"

/**
 * playerのヘルパー関数
 */

export const changeYoutube = async (
  player: ShallowRef<IVideoPlayer>,
  youtubeUrl: string,
  playerNo: PlayerNo
) => {
  const youtubeId = extractYoutubeId(youtubeUrl)
  player.value.destory()
  const elementId =
    playerNo === PlayerNo.ONE ? "youtube-video-one" : "youtube-video-two"
  const newPlayer = new YouTubePlayer(elementId, youtubeId)
  await newPlayer.load()
  player.value = newPlayer
  return
}

export const changeLocalVideo = (
  player: ShallowRef<IVideoPlayer>,
  file: File,
  localVideoElement: HTMLVideoElement
) => {
  const objectURL = URL.createObjectURL(file)
  player.value.destory()
  const newPlayer = new LocalVideoPlayer(localVideoElement, objectURL)
  newPlayer.load()
  player.value = newPlayer
}

export const changeDummy = (player: ShallowRef<IVideoPlayer>) => {
  player.value = new DummyPlayer()
}
