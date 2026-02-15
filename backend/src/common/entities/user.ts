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
