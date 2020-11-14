<script lang="ts" context="module">
  import { getProduct } from "../../../services/product.service";
  export async function preload(page, session) {
    const { id } = page.params;
    let resp = await getProduct(id);
    if (resp.product) {
      return resp;
    }
    return {
      product: null,
    };
  }
</script>

<script lang="ts">
  import type { Product } from "../../../models/product.model";
  import { cartStore } from "../../../store/cart";

  export let product: Product;
  let current = product?.image;
</script>

<style>
  .product-wrapper {
    padding: 1.5em 16px;
  }
  .product {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
  }

  .product img {
    width: 100%;
    min-width: 300px;
    max-width: 400px;
    max-height: 450px;
  }

  .info {
    max-width: 430px;
    padding: 16px;
  }

  .title {
    font-weight: bold;
    font-size: 26px;
  }

  .description,
  .add {
    margin-top: 24px;
  }

  .add-to-cart {
    cursor: pointer;
    width: 140px;
    border: 1px solid purple;
    color: purple;
    text-align: center;
    padding: 8px;
  }

  .add-to-cart:hover {
    background: purple;
    color: white;
  }

  /* .info > div {
  margin-bottom: 24px;
} */

  .more-images {
    display: flex;
    justify-content: center;
    margin-top: 16px;
  }

  .sizes {
    margin-top: 16px;
    display: flex;
  }

  .size {
    margin-right: 16px;
    color: black;
    text-transform: uppercase;
    cursor: pointer;
  }

  .more-images > .more-image {
    width: 50px;
    height: 50px;
    background: orange;
    margin-right: 16px;
    cursor: pointer;
  }
</style>

<div class="product-container">
  <div class="product-wrapper">
    {#if product}
      <div class="product">
        <div class="show-images">
          <div class="show-image"><img src={current} alt="" /></div>
          <div class="more-images">
            {#each product.images as image (image)}
              <div
                on:click={() => (current = image)}
                class="more-image"
                style="background: url({image})" />
            {/each}
          </div>
        </div>
        <div class="info">
          <div class="title">{product.name}</div>
          <div class="price">Kshs {product.price}</div>
          <div class="description">
            <div>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nisi
              perferendis architecto illum laudantium quasi non maiores numquam
              ipsum? Molestiae, consectetur. Lorem, ipsum dolor sit amet
              consectetur adipisicing elit. Nisi perferendis architecto illum
              laudantium quasi non maiores numquam ipsum? Molestiae,
              consectetur.
            </div>
          </div>
          <div class="sizes">
            <div class="size">s</div>
            <div class="size">m</div>
            <div class="size">l</div>
            <div class="size">xl</div>
            <div class="size">xxl</div>
          </div>
          <div class="add">
            <div
              on:click={() => cartStore.addToCart(product)}
              class="add-to-cart">
              Add to basket
            </div>
          </div>
        </div>
      </div>
    {:else}
      <div>Error</div>
    {/if}
  </div>
</div>
