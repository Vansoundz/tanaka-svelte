import { writable } from "svelte/store";
import type { User } from "../models/user.model";

interface IAuth {
  isLoggedIn: boolean;
  loading: boolean;
  user?: User;
}

const createStore = () => {
  const { subscribe, update } = writable<IAuth>({
    isLoggedIn: false,
    loading: true,
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
  };
};

export const auth = createStore();
