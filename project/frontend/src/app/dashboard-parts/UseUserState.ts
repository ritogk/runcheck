import { InjectionKey, ref, computed, ComputedRef } from "vue"
import {
  AuthenticationApi,
  UsersApi,
  StatusApi,
} from "@/core/openapiClient/apis"

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
  const _authenticationApi = new AuthenticationApi()
  const _usersApi = new UsersApi()
  const _statusApi = new StatusApi()
  const _logined = ref(false)
  const _isYoutubeAuthroized = ref(false)
  const _user = ref({ id: 0, name: "" })

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
        _user.value = { id: response.id, name: response.name }
        _logined.value = true
      } catch {
        throw new Error()
      }
    } catch {
      throw new Error()
    }
    return
  }

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
      _user.value = { id: response.id, name: response.name }
      _logined.value = true
      return
    } catch (e) {
      throw new Error()
    }
  }

  const logout = async (): Promise<void> => {
    try {
      await _authenticationApi.authenticationLogoutPost()
      _user.value = { id: 0, name: "" }
      _logined.value = false
      _isYoutubeAuthroized.value = false
      return
    } catch (e) {
      throw new Error()
    }
  }

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
