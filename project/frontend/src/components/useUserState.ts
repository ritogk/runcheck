import { InjectionKey, reactive, computed, ComputedRef } from "vue"
import { AuthenticationApi, UsersApi } from "@/core/openapiClient/apis"

type useUserStateType = {
  subscription: ComputedRef<{
    logined: boolean
    user: { id: number; name: string }
  }>
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

const useUserState = (): useUserStateType => {
  const authenticationApi = new AuthenticationApi()
  const usersApi = new UsersApi()
  const state = reactive({ logined: false, user: { id: 0, name: "" } })

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
        state.user.id = response.id
        state.user.name = response.name
        state.logined = true
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
      state.user.id = response.id
      state.user.name = response.name
      state.logined = true
      return true
    } catch (e) {
      // debugger
    }
    return false
  }

  const logout = async () => {
    try {
      await authenticationApi.authenticationLogoutPost()
      state.user.id = 0
      state.user.name = ""
      state.logined = false
      return true
    } catch (e) {
      // debugger
    }
    return false
  }

  const load = async (): Promise<boolean> => {
    try {
      const response = await authenticationApi.authenticationMeGet()
      state.user.id = response.id
      state.user.name = response.name
      state.logined = true
      return true
    } catch {
      return false
    }
  }

  return {
    subscription: computed(() => state),
    register: register,
    login: login,
    logout: logout,
    load: load,
  }
}

const useUserStateKey: InjectionKey<useUserStateType> = Symbol("useUserState")

export { useUserState, useUserStateKey, useUserStateType }
