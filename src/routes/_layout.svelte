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
  import { toasts } from "../store/toasts";
  import { fly, slide } from "svelte/transition";
  import Footer from "../components/Footer.svelte";

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
  <div class="toast-container">
    {#each $toasts.toasts as { id, text, type } (id)}
      <div class="t" in:slide out:fly={{ y: -100 }}>
        <div
          class="toast"
          class:s={type === "s"}
          class:w={type === "w"}
          class:d={type === "d"}
          class:i={type === "i"}
        >
          <div class="t-body">{text}</div>
        </div>
      </div>
    {/each}
  </div>
  <slot />
  <Footer />
</main>

<style>
  main {
    position: relative;
  }
  .toast-container {
    position: fixed;
    top: 16px;
    right: 30px;
    z-index: 1001;
  }

  .toast {
    width: 200px;
    height: 50px;
    border-radius: 4px;
    box-shadow: 0 2px 4px #ddd;
    padding: 8px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
  }

  .t {
    background: #fff;
  }

  .toast.d {
    background: rgba(255, 0, 0, 0.2);
  }
  .toast.s {
    background: rgba(0, 128, 0, 0.2);
  }
  .toast.i {
    background: rgba(0, 119, 255, 0.2);
  }
  .toast.w {
    background: rgba(255, 166, 0, 0.2);
  }

  .toast.d .t-body {
    color: rgb(177, 8, 8);
  }
  .toast.s .t-body {
    color: rgb(9, 145, 77);
  }
  .toast.i .t-body {
    color: rgb(6, 151, 170);
  }
  .toast.w .t-body {
    color: rgb(166, 168, 2);
  }
</style>
