import { writable } from "svelte/store";
import type { User } from "../models/user.model";

interface IAuth {
  isLoggedIn: boolean;
  loading: boolean;
  user?: User;
  open: boolean;
}

const createStore = () => {
  const { subscribe, update } = writable<IAuth>({
    isLoggedIn: false,
    loading: true,
    open: false,
  });

  return {
    subscribe,
    login: (user: User) =>
      update((state) => {
        return {
          ...state,
          isLoggedIn: true,
          loading: false,
          user,
        };
      }),
    logout: () =>
      update((state) => {
        return {
          ...state,
          isLoggedIn: false,
          loading: false,
          user: undefined,
        };
      }),
    openSide: () =>
      update((state) => {
        return {
          ...state,
          open: true,
        };
      }),
    closeSide: () =>
      update((state) => {
        return {
          ...state,
          open: false,
        };
      }),
    initSide: (current: boolean) =>
      update((state) => {
        return {
          ...state,
          open: current,
        };
      }),
  };
};

export const auth = createStore();
