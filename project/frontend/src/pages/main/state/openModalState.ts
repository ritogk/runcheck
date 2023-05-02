import { computed, ComputedRef, ref, InjectionKey } from "vue";

export const openModalState = () => {
  const opened = ref(false);
  const open = () => {
    opened.value = true;
  };
  const close = () => {
    opened.value = false;
  };
  const subscription = {
    opened: computed(() => opened.value),
  };
  return {
    open: open,
    close: close,
    subscription: subscription,
  };
};
