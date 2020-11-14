import { writable } from "svelte/store";
import type { Product } from "../models/product.model";

const createStore = () => {
  const { set, subscribe, update } = writable<{
    products: Product[];
    loading: boolean;
  }>({
    products: [],
    loading: true,
  });

  return {
    subscribe,
    init: (products) => set({ products, loading: false }),
  };
};

export const productStore = createStore();
