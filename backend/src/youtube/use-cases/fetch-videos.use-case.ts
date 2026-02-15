import { Injectable, BadRequestException } from '@nestjs/common';
import { google } from 'googleapis';
import { YoutubeVideoDto } from '../dto/youtube-video.dto';

@Injectable()
export class FetchVideosUseCase {
  async execute(accessToken: string): Promise<YoutubeVideoDto[]> {
    if (!accessToken) {
      throw new BadRequestException('YouTubeアクセストークンが必要です');
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    const youtube = google.youtube({ version: 'v3', auth: oauth2Client });

    try {
      const channelsResponse = await youtube.channels.list({
        part: ['contentDetails'],
        mine: true,
      });

      const uploadsPlaylistId =
        channelsResponse.data.items?.[0]?.contentDetails?.relatedPlaylists
          ?.uploads;

      if (!uploadsPlaylistId) {
        return [];
      }

      const playlistResponse = await youtube.playlistItems.list({
        part: ['snippet'],
        playlistId: uploadsPlaylistId,
        maxResults: 50,
      });

      return (playlistResponse.data.items || []).map((item) => ({
        url: `https://www.youtube.com/watch?v=${item.snippet?.resourceId?.videoId}`,
        title: item.snippet?.title || '',
        description: item.snippet?.description || '',
        thumbnailUrl:
          item.snippet?.thumbnails?.medium?.url ||
          item.snippet?.thumbnails?.default?.url ||
          '',
      }));
    } catch {
      throw new BadRequestException('YouTube動画の取得に失敗しました');
    }
  }
}
