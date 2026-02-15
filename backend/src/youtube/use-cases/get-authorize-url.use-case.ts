import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { AuthorizeUrlResponseDto } from '../dto/authorize-url-response.dto';

@Injectable()
export class GetAuthorizeUrlUseCase {
  execute(): AuthorizeUrlResponseDto {
    const oauth2Client = new google.auth.OAuth2(
      process.env.YOUTUBE_CLIENT_ID,
      process.env.YOUTUBE_CLIENT_SECRET,
      process.env.YOUTUBE_REDIRECT_URL,
    );

    const redirectUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/youtube.readonly'],
      prompt: 'consent',
    });

    return { redirectUrl };
  }
}
