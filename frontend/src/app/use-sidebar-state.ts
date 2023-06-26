import {
  computed,
  ref,
  shallowRef,
  type ComputedRef,
  type FunctionalComponent,
  type HTMLAttributes,
  type VNodeProps,
  type InjectionKey
} from "vue"
import { useRouter } from "vue-router"
import { type UseUserStateType } from "@/app/use-user-state"
import { type UseLoadingStateType } from "@/app/use-loading-state"
import {
  UserPlusIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  QuestionMarkCircleIcon
} from "@heroicons/vue/24/outline"

export interface IUseSidebarState {
  open(): void
  close(): void
  subscription: {
    opened: ComputedRef<boolean>
    items: ComputedRef<
      {
        name: string
        href: string
        icon: FunctionalComponent<HTMLAttributes & VNodeProps, {}>
        current: boolean
        action: () => void
        show: ComputedRef<boolean>
      }[]
    >
  }
}

export class UseSidebarState implements IUseSidebarState {
  private readonly _router = useRouter()
  private readonly _userState
  private readonly _loadingState
  constructor(userState: UseUserStateType, loadingState: UseLoadingStateType) {
    this._userState = userState
    this._loadingState = loadingState
  }
  private _opened = ref(false)
  private _items = shallowRef([
    {
      name: "ログイン",
      href: "#",
      icon: ArrowRightOnRectangleIcon,
      current: false,
      action: () => {
        this._opened.value = false
        this._router.push({ name: "login" })
      },
      show: computed(() => !this._userState.subscription.logined.value)
    },
    {
      name: "ログアウト",
      href: "#",
      icon: ArrowLeftOnRectangleIcon,
      current: false,
      action: async () => {
        const loadingId = this._loadingState.run()
        this._opened.value = false
        await this._userState.logout()
        location.href = location.origin + this._router.resolve("index").href
        // this._loadingState.stop(loadingId)
      },
      show: computed(() => this._userState.subscription.logined.value)
    },
    {
      name: "新規登録",
      href: "#",
      icon: UserPlusIcon,
      current: false,
      action: async () => {
        this._opened.value = false
        this._router.push({ name: "register" })
      },
      show: computed(() => !this._userState.subscription.logined.value)
    },
    {
      name: "このアプリについて",
      href: "#",
      icon: QuestionMarkCircleIcon,
      current: false,
      action: () => {
        location.href = "/lp/ja"
      },
      show: computed(() => true)
    },
    {
      name: "問い合わせ",
      href: "#",
      icon: ChatBubbleOvalLeftEllipsisIcon,
      current: false,
      action: () => {
        location.href = "https://twitter.com/homing_fd2"
      },
      show: computed(() => true)
    }
  ])

  open = (): void => {
    this._opened.value = true
  }

  close = () => {
    this._opened.value = false
  }

  subscription = {
    opened: computed(() => {
      return this._opened.value
    }),
    items: computed(() => {
      return this._items.value
    })
  }
}

export const UseSidebarStateKey: InjectionKey<IUseSidebarState> = Symbol("UseSidebarStateType")