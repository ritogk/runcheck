export interface StatusResponseDto {
  isLogined: boolean;
  isYoutubeAuthroized: boolean;
  user: { id: string; name: string } | null;
}
