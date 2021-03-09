import { writable } from "svelte/store";
import { getId } from "../services/util";

interface Toast {
  id?: string;
  type: "s" | "d" | "w" | "i";
  text: string;
}

const createStore = () => {
  const { subscribe, update } = writable<{ toasts: Toast[] }>({ toasts: [] });

  return {
    subscribe,
    toast: (toast: Toast) => {
      toast.id = getId();
      update((state) => ({ toasts: [...state.toasts, toast] }));
      setTimeout(() => {
        update((state) => ({
          toasts: state.toasts.filter((t) => t.id !== toast.id),
        }));
      }, 3000);
    },
  };
};

export const toasts = createStore();
