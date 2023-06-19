import {
  computed,
  ref,
  shallowRef,
  ComputedRef,
  FunctionalComponent,
  HTMLAttributes,
  VNodeProps,
  InjectionKey,
} from "vue"
import { useRouter } from "vue-router"
import { UseUserStateType } from "@/app/user-state"
import { UseLoadingStateType } from "@/app/loading-state"
import {
  UserPlusIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  QuestionMarkCircleIcon,
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
  private readonly _useUserState
  private readonly _useLoadingState
  constructor(
    useUserStateType: UseUserStateType,
    useLoadingStateType: UseLoadingStateType
  ) {
    this._useUserState = useUserStateType
    this._useLoadingState = useLoadingStateType
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
      show: computed(() => !this._useUserState.subscription.logined.value),
    },
    {
      name: "ログアウト",
      href: "#",
      icon: ArrowLeftOnRectangleIcon,
      current: false,
      action: async () => {
        const loadingId = this._useLoadingState.run()
        this._opened.value = false
        await this._useUserState.logout()
        this._useLoadingState.stop(loadingId)
        location.href = location.origin + this._router.resolve("index").href
      },
      show: computed(() => this._useUserState.subscription.logined.value),
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
      show: computed(() => !this._useUserState.subscription.logined.value),
    },
    {
      name: "このアプリについて",
      href: "#",
      icon: QuestionMarkCircleIcon,
      current: false,
      action: () => {
        location.href = "/lp/ja"
      },
      show: computed(() => true),
    },
    {
      name: "問い合わせ",
      href: "#",
      icon: ChatBubbleOvalLeftEllipsisIcon,
      current: false,
      action: () => {
        location.href = "https://twitter.com/homing_fd2"
      },
      show: computed(() => true),
    },
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
    }),
  }
}

export const UseSidebarStateKey: InjectionKey<IUseSidebarState> = Symbol(
  "UseSidebarStateType"
)
