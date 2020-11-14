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
  import { getProducts } from "../services/product.service";
  import NProgress from "nprogress";
  import { stores } from "@sapper/app";
  import Loader from "../components/loader.svelte";

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

  // onMount(async () => {
  $: productStore.init(products);
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
