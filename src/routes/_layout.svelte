<script context="module">
  export async function preload() {
    let resp = await getProducts();
    if (resp.products) return resp;
    return { products: [] };
  }
</script>

<script lang="ts">
  import "nprogress/nprogress.css";
  import Nav from "../components/Nav.svelte";
  import type { Product } from "../models/product.model";
  import { productStore } from "../store/products";
  export let products: Product[];
  import { getProducts, getCategories } from "../services/product.service";
  import NProgress from "nprogress";
  import { stores } from "@sapper/app";
  import Loader from "../components/loader.svelte";
  import "@glidejs/glide/dist/css/glide.core.min.css";
  import { onMount } from "svelte";
  import { auth } from "../store/auth";
  import { initAuth } from "../services/auth.service";
  import { ToastContainer } from "svelte-toasty";

  NProgress.configure({
    // minimum: 0.16,
    showSpinner: false,
  });

  const { preloading } = stores();

  $: {
    if ($preloading) {
      NProgress.start();
    }

    if (!$preloading) {
      NProgress.done();
    }
  }

  onMount(async () => {
    try {
      let user = await initAuth();
      if (user._id) auth.login(user);
    } catch (error) {
      auth.logout();
    }
  });

  onMount(async () => {
    let res = await getProducts();
    if (res.products) productStore.initProducts(products);
    let resp = await getCategories();
    if (resp.categories) productStore.initCategories(resp.categories);
  });

  // onMount(async () => {
  $: productStore.initProducts(products);
  // });

  export let segment: string;
</script>

{#if $productStore.loading}
  <Loader />
{/if}
<Nav {segment} />

<main>
  <ToastContainer />
  <slot />
</main>

<style>
</style>
