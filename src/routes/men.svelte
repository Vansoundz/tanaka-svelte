<script lang="ts">
  import Product from "../components/cards/product.svelte";
  import { productStore } from "../store/products";
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

  .shopping {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(236px, 1fr));
    row-gap: 24px;
    column-gap: 16px;
    grid-auto-flow: dense;
  }

  .header {
    margin-top: 36px;
  }

  .header h3 {
    font-size: 26px;
    font-weight: 300;
  }
</style>

<div class="container">
  <main>
    <div class="shop">
      <div class="header">
        <h3>Men</h3>
      </div>
      <div class="shopping">
        {#each $productStore.products as product (product._id)}
          <Product {product} />
        {/each}
      </div>
    </div>

    <div class="shop">
      <div class="header">
        <h3>T-shirts</h3>
      </div>
      <div class="shopping">
        {#each $productStore.products as product (product._id)}
          <Product {product} />
        {/each}
      </div>
    </div>
    <div class="shop">
      <div class="header">
        <h3>Pants</h3>
      </div>
      <div class="shopping">
        {#each $productStore.products as product (product._id)}
          <Product {product} />
        {/each}
      </div>
    </div>
    <div class="shop">
      <div class="header">
        <h3>Skirts</h3>
      </div>
      <div class="shopping">
        {#each $productStore.products as product (product._id)}
          <Product {product} />
        {/each}
      </div>
    </div>
  </main>
</div>
