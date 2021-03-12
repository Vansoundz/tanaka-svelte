<script lang="ts">
  import Product from "../components/cards/product.svelte";
  import { productStore } from "../store/products";
</script>

<div class="container">
  <main>
    <div class="shop">
      <div class="header">
        <h3>Explore Products</h3>
      </div>
      <!-- <div class="shopping">
        {#each $productStore.products as product (product._id)}
          <Product {product} />
        {/each}
      </div> -->
    </div>

    {#each $productStore.categories as category (category._id)}
      {#if $productStore.products.filter((p) => p.category._id === category._id).length > 0}
        <div class="shop">
          <div class="header">
            <h3>
              <a href="/products/{category.name}">{category.name}</a>
            </h3>
            <a class="view-all" href="/products/{category.name}"
              >View All <i class="material-icons">arrow_right_alt</i></a
            >
          </div>
          <div class="shopping">
            {#each $productStore.products
              .filter((p) => p.category._id === category._id)
              .slice(0, 4) as product (product._id)}
              <Product {product} />
            {/each}
          </div>
        </div>
      {/if}
    {/each}
  </main>
</div>

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
    display: flex;
    justify-content: space-between;
  }

  .header h3 {
    font-size: 26px;
    font-weight: 300;
    text-transform: uppercase;
  }

  .view-all {
    cursor: pointer;
    font-size: 14px;
    border: 1px solid var(--black);
    color: var(--black);
    justify-content: center;
    padding: 8px;
    display: flex;
    align-items: center;
  }
</style>
