/**
 * User (1:1)
 *   PK = {id}              SK = "USER"
 *   EmailIndex PK = {email}  ※ unique制約なし
 *
 * findById(id)        → GET  PK={id}, SK="USER"
 * findByEmail(email)  → Query EmailIndex PK={email}
 */
export interface User {
  id: string;          // ULID (= PK)
  email: string;       // EmailIndex PK ※ unique制約なし
  name: string;
  password: string;    // bcrypt hash
  carType: string;
  createdAt: string;   // ISO 8601
  updatedAt: string;
}

export interface UserPrimaryKey {
  id: string;
}
