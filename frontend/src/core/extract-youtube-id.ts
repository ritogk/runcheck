/**
 * youtubeUrlからidを抽出する
 */
export const extractYoutubeId = (youtubeUrl: string): string => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = youtubeUrl.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  } else {
    console.error("Invalid YouTube URL")
    return ""
  }
}
