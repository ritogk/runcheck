/**
 * YoutubeToken (1:1 per user)
 *   PK = {userId}          SK = "YOUTUBE_TOKEN"
 *
 * findByUserId(userId) → GET  PK={userId}, SK="YOUTUBE_TOKEN"
 * save(record)         → PUT  PK={userId}, SK="YOUTUBE_TOKEN"
 */
export interface YoutubeToken {
  id: string;          // ULID
  userId: string;      // FK → User.id (= PK)
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface YoutubePrimaryKey {
  userId: string;
}
