<script lang="ts" context="module">
  import {
    getProductsByCategory,
    getCategories,
  } from "../../services/product.service";
  export async function preload(page, session) {
    let { category } = page.params;
    let c: Category;
    let res = await getCategories();
    if (res.categories) {
      c = res.categories.find((ct) => ct.name === category);
    } else return { products: [] };

    let resp = await getProductsByCategory(c?._id);
    if (resp.products) return resp;
    return { products: [] };
  }
</script>

<script lang="ts">
  import { stores } from "@sapper/app";
  const { page } = stores();

  import type {
    Category,
    Product as ProductModel,
  } from "../../models/product.model";
  import Product from "../../components/cards/product.svelte";

  export let products: ProductModel[] = [];
</script>

<style>
  .container {
    padding: 1.5em 16px;
  }

  main {
    margin: auto;
    display: block;
    max-width: 80%;
  }

  h3 {
    text-transform: capitalize;
    font-size: larger;
  }

  .shopping {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(236px, 1fr));
    row-gap: 24px;
    column-gap: 16px;
    grid-auto-flow: dense;
  }
</style>

<div class="container">
  <main>
    {#if products.length}
      <div class="shop">
        <div class="header">
          <h3>{$page.params.category}</h3>
        </div>
        <div class="shopping">
          {#each products as product (product._id)}
            <Product {product} />
          {/each}
        </div>
      </div>
    {:else}
      <div>
        <h4>We are working on this category</h4>
        <p>Come back soon</p>
      </div>
    {/if}
  </main>
</div>
