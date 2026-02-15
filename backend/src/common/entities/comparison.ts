import { VideoType, ReleaseKbn } from './enums';

/**
 * Comparison (1:N per user)
 *   PK = {userId}          SK = "COMPARISON@{id}"
 *   KindIndex PK = "COMPARISON@{id}"
 *
 * findByUserId(userId)      → Query PK={userId}, SK begins_with "COMPARISON@"
 * findById(id)              → Query KindIndex PK="COMPARISON@{id}"
 * delete/patch(id, userId)  → PK={userId}, SK="COMPARISON@{id}"
 */
export interface Comparison {
  id: string;          // ULID (SK の一部: COMPARISON@{id})
  userId: string;      // FK → User.id (= PK)
  title?: string;
  memo?: string;
  category?: string;
  video1Url: string;
  video1TimeSt: number;
  video1VideoType: VideoType;
  video2Url: string;
  video2TimeSt: number;
  video2VideoType: VideoType;
  releaseKbn: ReleaseKbn;
  anonymous: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ComparisonPrimaryKey {
  id: string;
  userId: string;
}
