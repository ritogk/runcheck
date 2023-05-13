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
  ): Promise<boolean>
  login(email: string, password: string, remember: boolean): Promise<boolean>
  logout(): Promise<boolean>
  load(): Promise<boolean>
}

const UseUserState = (): UseUserStateType => {
  const authenticationApi = new AuthenticationApi()
  const usersApi = new UsersApi()
  const statusApi = new StatusApi()
  const _logined = ref(false)
  const _isYoutubeAuthroized = ref(false)
  const _user = ref({ id: 0, name: "" })

  const register = async (
    handleName: string,
    carType: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    try {
      const response = await usersApi.usersPost({
        inlineObject: {
          handleName: handleName,
          carType: carType,
          email: email,
          password: password,
        },
      })

      if (await login(email, password, true)) {
        _user.value = { id: response.id, name: response.name }
        _logined.value = true
      }
      return true
    } catch {
      return false
    }
  }

  const login = async (email: string, password: string, remember: boolean) => {
    try {
      const response = await authenticationApi.authenticationLoginPost({
        inlineObject1: {
          email: email,
          password: password,
          remember: remember,
        },
      })
      _user.value = { id: response.id, name: response.name }
      _logined.value = true
      return true
    } catch (e) {
      // debugger
    }
    return false
  }

  const logout = async () => {
    try {
      await authenticationApi.authenticationLogoutPost()
      _user.value = { id: 0, name: "" }
      _logined.value = false
      _isYoutubeAuthroized.value = false
      return true
    } catch (e) {
      // debugger
    }
    return false
  }

  const load = async (): Promise<boolean> => {
    try {
      const response = await statusApi.statusGet()
      _user.value = {
        id: response.user?.id ?? 0,
        name: response.user?.name ?? "",
      }
      _logined.value = response.isLogined
      _isYoutubeAuthroized.value = response.isYoutubeAuthroized

      return true
    } catch {
      return false
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
