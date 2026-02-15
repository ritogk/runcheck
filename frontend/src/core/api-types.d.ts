import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface AuthorizeUrlResponseDto {
            /**
             * 認可画面のリダイレクト用URL
             */
            redirectUrl: string;
        }
        export interface ComparisonResponseDto {
            /**
             * 比較ID
             */
            id: string;
            /**
             * カテゴリ
             */
            category?: string;
            /**
             * メモ
             */
            memo?: string;
            /**
             * タイトル
             */
            title?: string;
            /**
             * 動画1 URL
             */
            video1Url: string;
            /**
             * 動画1 開始時間
             */
            video1TimeSt: number;
            /**
             * 動画1 動画タイプ
             */
            video1VideoType: "1" | "2";
            /**
             * 動画2 URL
             */
            video2Url: string;
            /**
             * 動画2 開始時間
             */
            video2TimeSt: number;
            /**
             * 動画2 動画タイプ
             */
            video2VideoType: "1" | "2";
            /**
             * 匿名投稿
             */
            anonymous: boolean;
        }
        export interface CreateComparisonDto {
            /**
             * カテゴリ
             */
            category?: string;
            /**
             * メモ
             */
            memo?: string;
            /**
             * タイトル
             */
            title?: string;
            /**
             * 動画1 URL
             */
            video1Url: string;
            /**
             * 動画1 開始時間
             */
            video1TimeSt: number;
            /**
             * 動画1 動画タイプ
             */
            video1VideoType: "1" | "2";
            /**
             * 動画2 URL
             */
            video2Url: string;
            /**
             * 動画2 開始時間
             */
            video2TimeSt: number;
            /**
             * 動画2 動画タイプ
             */
            video2VideoType: "1" | "2";
            /**
             * 匿名投稿
             */
            anonymous: boolean;
        }
        export interface CreateComparisonResponseDto {
            /**
             * 比較ID
             */
            comparisonId: string;
        }
        export interface CreateUserDto {
            /**
             * ハンドルネーム
             */
            handleName: string;
            /**
             * 車種
             */
            carType: string;
            /**
             * メールアドレス
             */
            email: string;
            /**
             * パスワード
             */
            password: string;
        }
        export interface ExchangeTokenResponseDto {
            /**
             * YouTubeアクセストークン
             */
            accessToken: string;
        }
        export interface LoginDto {
            /**
             * メールアドレス
             */
            email: string;
            /**
             * パスワード
             */
            password: string;
            /**
             * ログイン状態を保持
             */
            remember: boolean;
        }
        export interface LoginResponseDto {
            /**
             * ユーザーID
             */
            id: string;
            /**
             * ネーム
             */
            name: string;
            /**
             * アクセストークン
             */
            accessToken: string;
        }
        export interface OperationLogDto {
            /**
             * 操作コード
             */
            operationCd: "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30";
        }
        export interface StatusResponseDto {
            /**
             * ログイン済みかどうか
             */
            isLogined: boolean;
            /**
             * YouTube認証済みかどうか
             */
            isYoutubeAuthroized: boolean;
            /**
             * ユーザー情報
             */
            user?: {
                /**
                 * ユーザーID
                 */
                id: string;
                /**
                 * ネーム
                 */
                name: string;
            } | null;
        }
        export interface StatusUserDto {
            /**
             * ユーザーID
             */
            id: string;
            /**
             * ネーム
             */
            name: string;
        }
        export interface UserResponseDto {
            /**
             * ユーザーID
             */
            id: string;
            /**
             * ネーム
             */
            name: string;
        }
        export interface YoutubeOauthDto {
            /**
             * OAuth認可コード
             */
            code: string;
        }
        export interface YoutubeVideoDto {
            /**
             * URL
             */
            url: string;
            /**
             * タイトル
             */
            title: string;
            /**
             * 説明
             */
            description: string;
            /**
             * サムネ画像のURL
             */
            thumbnailUrl: string;
        }
    }
}
declare namespace Paths {
    namespace CreateComparison {
        export type RequestBody = Components.Schemas.CreateComparisonDto;
        namespace Responses {
            export type $201 = Components.Schemas.CreateComparisonResponseDto;
        }
    }
    namespace DeleteComparison {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace ExchangeToken {
        export type RequestBody = Components.Schemas.YoutubeOauthDto;
        namespace Responses {
            export type $200 = Components.Schemas.ExchangeTokenResponseDto;
        }
    }
    namespace FetchVideos {
        export interface HeaderParameters {
            "x-youtube-access-token": Parameters.XYoutubeAccessToken;
        }
        namespace Parameters {
            export type XYoutubeAccessToken = string;
        }
        namespace Responses {
            export type $200 = Components.Schemas.YoutubeVideoDto[];
        }
    }
    namespace FindComparison {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export type $200 = Components.Schemas.ComparisonResponseDto;
        }
    }
    namespace GetAuthorizeUrl {
        namespace Responses {
            export type $200 = Components.Schemas.AuthorizeUrlResponseDto;
        }
    }
    namespace GetComparisons {
        namespace Responses {
            export type $200 = Components.Schemas.ComparisonResponseDto[];
        }
    }
    namespace GetMe {
        namespace Responses {
            export type $200 = Components.Schemas.UserResponseDto;
        }
    }
    namespace GetStatus {
        namespace Responses {
            export type $200 = Components.Schemas.StatusResponseDto;
        }
    }
    namespace Login {
        export type RequestBody = Components.Schemas.LoginDto;
        namespace Responses {
            export type $200 = Components.Schemas.LoginResponseDto;
        }
    }
    namespace Logout {
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace PublishComparison {
        namespace Parameters {
            export type Id = string;
        }
        export interface PathParameters {
            id: Parameters.Id;
        }
        namespace Responses {
            export interface $200 {
            }
        }
    }
    namespace RegisterUser {
        export type RequestBody = Components.Schemas.CreateUserDto;
        namespace Responses {
            export type $201 = Components.Schemas.UserResponseDto;
        }
    }
    namespace UpdateOperationLog {
        export type RequestBody = Components.Schemas.OperationLogDto;
        namespace Responses {
            export interface $201 {
            }
        }
    }
}


export interface OperationMethods {
  /**
   * registerUser - 新規登録
   */
  'registerUser'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.RegisterUser.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.RegisterUser.Responses.$201>
  /**
   * login - ログイン
   */
  'login'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.Login.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Login.Responses.$200>
  /**
   * logout - ログアウト
   */
  'logout'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.Logout.Responses.$200>
  /**
   * getMe - ログイン済のユーザー情報を取得
   */
  'getMe'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetMe.Responses.$200>
  /**
   * getComparisons - 比較情報一覧を取得
   */
  'getComparisons'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetComparisons.Responses.$200>
  /**
   * createComparison - 比較情報を登録
   */
  'createComparison'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.CreateComparison.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.CreateComparison.Responses.$201>
  /**
   * findComparison - 比較情報を取得
   */
  'findComparison'(
    parameters?: Parameters<Paths.FindComparison.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FindComparison.Responses.$200>
  /**
   * deleteComparison - 比較情報を削除
   */
  'deleteComparison'(
    parameters?: Parameters<Paths.DeleteComparison.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.DeleteComparison.Responses.$200>
  /**
   * publishComparison - 比較情報を公開状態にする
   */
  'publishComparison'(
    parameters?: Parameters<Paths.PublishComparison.PathParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.PublishComparison.Responses.$200>
  /**
   * getAuthorizeUrl - 認可画面のURLを取得
   */
  'getAuthorizeUrl'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetAuthorizeUrl.Responses.$200>
  /**
   * exchangeToken - アクセストークンを取得
   */
  'exchangeToken'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.ExchangeToken.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.ExchangeToken.Responses.$200>
  /**
   * fetchVideos - 本人がアップロードした動画一覧を取得
   */
  'fetchVideos'(
    parameters?: Parameters<Paths.FetchVideos.HeaderParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.FetchVideos.Responses.$200>
  /**
   * updateOperationLog - 操作ログを送信
   */
  'updateOperationLog'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.UpdateOperationLog.RequestBody,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.UpdateOperationLog.Responses.$201>
  /**
   * getStatus - 未ログインユーザーも含めたユーザーの状態を取得
   */
  'getStatus'(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetStatus.Responses.$200>
}

export interface PathsDictionary {
  ['/api/v1/users']: {
    /**
     * registerUser - 新規登録
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.RegisterUser.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.RegisterUser.Responses.$201>
  }
  ['/api/v1/authentication/login']: {
    /**
     * login - ログイン
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.Login.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Login.Responses.$200>
  }
  ['/api/v1/authentication/logout']: {
    /**
     * logout - ログアウト
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.Logout.Responses.$200>
  }
  ['/api/v1/authentication/me']: {
    /**
     * getMe - ログイン済のユーザー情報を取得
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetMe.Responses.$200>
  }
  ['/api/v1/comparisons']: {
    /**
     * createComparison - 比較情報を登録
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.CreateComparison.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.CreateComparison.Responses.$201>
    /**
     * getComparisons - 比較情報一覧を取得
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetComparisons.Responses.$200>
  }
  ['/api/v1/comparisons/{id}']: {
    /**
     * findComparison - 比較情報を取得
     */
    'get'(
      parameters?: Parameters<Paths.FindComparison.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FindComparison.Responses.$200>
    /**
     * deleteComparison - 比較情報を削除
     */
    'delete'(
      parameters?: Parameters<Paths.DeleteComparison.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.DeleteComparison.Responses.$200>
  }
  ['/api/v1/comparisons/{id}/publish']: {
    /**
     * publishComparison - 比較情報を公開状態にする
     */
    'put'(
      parameters?: Parameters<Paths.PublishComparison.PathParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.PublishComparison.Responses.$200>
  }
  ['/api/v1/youtube/oauth/authorize']: {
    /**
     * getAuthorizeUrl - 認可画面のURLを取得
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetAuthorizeUrl.Responses.$200>
  }
  ['/api/v1/youtube/oauth']: {
    /**
     * exchangeToken - アクセストークンを取得
     */
    'post'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.ExchangeToken.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.ExchangeToken.Responses.$200>
  }
  ['/api/v1/youtube/videos']: {
    /**
     * fetchVideos - 本人がアップロードした動画一覧を取得
     */
    'get'(
      parameters?: Parameters<Paths.FetchVideos.HeaderParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.FetchVideos.Responses.$200>
  }
  ['/api/v1/operation-log']: {
    /**
     * updateOperationLog - 操作ログを送信
     */
    'put'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.UpdateOperationLog.RequestBody,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.UpdateOperationLog.Responses.$201>
  }
  ['/api/v1/status']: {
    /**
     * getStatus - 未ログインユーザーも含めたユーザーの状態を取得
     */
    'get'(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetStatus.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type AuthorizeUrlResponseDto = Components.Schemas.AuthorizeUrlResponseDto;
export type ComparisonResponseDto = Components.Schemas.ComparisonResponseDto;
export type CreateComparisonDto = Components.Schemas.CreateComparisonDto;
export type CreateComparisonResponseDto = Components.Schemas.CreateComparisonResponseDto;
export type CreateUserDto = Components.Schemas.CreateUserDto;
export type ExchangeTokenResponseDto = Components.Schemas.ExchangeTokenResponseDto;
export type LoginDto = Components.Schemas.LoginDto;
export type LoginResponseDto = Components.Schemas.LoginResponseDto;
export type OperationLogDto = Components.Schemas.OperationLogDto;
export type StatusResponseDto = Components.Schemas.StatusResponseDto;
export type StatusUserDto = Components.Schemas.StatusUserDto;
export type UserResponseDto = Components.Schemas.UserResponseDto;
export type YoutubeOauthDto = Components.Schemas.YoutubeOauthDto;
export type YoutubeVideoDto = Components.Schemas.YoutubeVideoDto;
