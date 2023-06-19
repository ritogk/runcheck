import { InjectionKey, ref, computed, ComputedRef } from "vue"
import {
  AuthenticationApi,
  UsersApi,
  StatusApi,
} from "@/core/openapiClient/apis"
import { apiConfig } from "@/core/openapi"

type UseUserStateType = {
  subscription: {
    logined: ComputedRef<boolean>
    isYoutubeAuthroized: ComputedRef<boolean>
    user: ComputedRef<{ id: number; name: string }>
  }
  register(
    handleName: string,
    carType: string,
    email: string,
    password: string
  ): Promise<void>
  login(email: string, password: string, remember: boolean): Promise<void>
  logout(): Promise<void>
  load(): Promise<void>
}

const UseUserState = (): UseUserStateType => {
  const _authenticationApi = new AuthenticationApi(apiConfig)
  const _usersApi = new UsersApi(apiConfig)
  const _statusApi = new StatusApi(apiConfig)
  const _logined = ref(false)
  const _isYoutubeAuthroized = ref(false)
  const _user = ref({ id: 0, name: "" })

  /**
   * 新規登録
   */
  const register = async (
    handleName: string,
    carType: string,
    email: string,
    password: string
  ): Promise<void> => {
    try {
      const response = await _usersApi.usersPost({
        inlineObject: {
          handleName: handleName,
          carType: carType,
          email: email,
          password: password,
        },
      })

      try {
        await login(email, password, true)
      } catch {
        throw new Error()
      }
    } catch {
      throw new Error()
    }
    return
  }

  /**
   * ログイン
   */
  const login = async (
    email: string,
    password: string,
    remember: boolean
  ): Promise<void> => {
    try {
      const response = await _authenticationApi.authenticationLoginPost({
        inlineObject1: {
          email: email,
          password: password,
          remember: remember,
        },
      })
      await load()
      return
    } catch (e) {
      throw new Error()
    }
  }

  /**
   * ログアウト
   */
  const logout = async (): Promise<void> => {
    try {
      await _authenticationApi.authenticationLogoutPost()
      await load()
      return
    } catch (e) {
      throw new Error()
    }
  }

  /**
   * ユーザーの状態を読み込む
   * @returns 
   */
  const load = async (): Promise<void> => {
    try {
      const response = await _statusApi.statusGet()
      _user.value = {
        id: response.user?.id ?? 0,
        name: response.user?.name ?? "",
      }
      _logined.value = response.isLogined
      _isYoutubeAuthroized.value = response.isYoutubeAuthroized
      return
    } catch {
      throw new Error()
    }
  }

  return {
    subscription: {
      logined: computed(() => {
        return _logined.value
      }),
      isYoutubeAuthroized: computed(() => {
        return _isYoutubeAuthroized.value
      }),
      user: computed(() => {
        return _user.value
      }),
    },
    register: register,
    login: login,
    logout: logout,
    load: load,
  }
}

const UseUserStateKey: InjectionKey<UseUserStateType> = Symbol("useUserState")

export { UseUserState, UseUserStateKey, UseUserStateType }
