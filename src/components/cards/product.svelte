<script lang="ts">
  import type { Product } from "../../models/product.model";
  import { cartStore } from "../../store/cart";
  import { goto } from "@sapper/app";

  export let product: Product;
</script>

<style>
  .item {
    min-height: 300px;
    max-height: 330px;
    min-width: 220px;
    background: green;
    overflow: hidden;
    border-radius: 4px;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    margin: 12px 24px 12px 0;
    flex-direction: column;
  }

  .s-image {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .explore {
    width: 100%;
    background: orange;
    text-align: center;
    padding: 8px 16px;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: unset;
  }

  .explore span {
    padding: 8px 16px;
  }
  .explore span:first-child {
    background: mediumpurple;
  }
  .explore span:first-child a {
    color: #fff;
  }

  .item {
    /* background: url("/images/tshirt2.jpeg"); */
    background-size: contain;
    background-color: #fff;
    box-shadow: 0 0 12px #ddd;
    width: 95%;
  }

  .item img {
    max-width: 100%;
    height: 100%;
    max-height: 210px;
  }

  .item .details {
    background: #fff;
    width: 100%;
    padding: 4px;
  }
</style>

<div class="item">
  <div class="s-image"><img src={product.image} alt="some" /></div>
  <div class="details">
    <div class="name">{product.name}</div>
    <div class="price">Kshs {product.price}</div>
  </div>
  <div class="explore">
    <span on:click={() => goto(`products/product/${product._id}`)}>
      <a preload="true" href={`products/product/${product._id}`}>View</a></span>
    <span on:click={() => cartStore.addToCart(product)}>Add to basket</span>
  </div>
</div>
