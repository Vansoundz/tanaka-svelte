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
    let resp = await getCategories();
    if (resp.categories) productStore.initCategories(resp.categories);
  });

  // onMount(async () => {
  $: productStore.initProducts(products);
  // });

  export let segment: string;
</script>

<style>
</style>

{#if $productStore.loading}
  <Loader />
{/if}
<Nav {segment} />

<main>
  <slot />
</main>
